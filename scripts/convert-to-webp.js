#!/usr/bin/env node

/**
 * Convert all JPG/JPEG/PNG assets under public/images to WebP while preserving
 * directory structure and high visual quality. Existing WebP files are skipped.
 *
 * Usage: node scripts/convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..', 'public', 'images');
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const QUALITY = 85;

function findImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return findImages(fullPath);
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!SOURCE_EXTENSIONS.has(ext)) {
      return [];
    }

    return [
      {
        inputPath: fullPath,
        outputPath: `${fullPath.slice(0, -ext.length)}.webp`,
        relative: path.relative(ROOT_DIR, fullPath)
      }
    ];
  });
}

async function convertImage({ inputPath, outputPath, relative }) {
  try {
    if (fs.existsSync(outputPath)) {
      console.log(`skip  - ${relative} (already has webp)`);
      return;
    }

    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
    const { size: inputSize } = fs.statSync(inputPath);
    const { size: outputSize } = fs.statSync(outputPath);
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(
      `done  - ${relative} → ${path.relative(ROOT_DIR, outputPath)} (${savings}% smaller)`
    );
  } catch (error) {
    console.error(`fail  - ${relative}: ${error.message}`);
  }
}

async function main() {
  if (!fs.existsSync(ROOT_DIR)) {
    console.error(`Images directory not found: ${ROOT_DIR}`);
    process.exit(1);
  }

  console.log(`Converting images in ${ROOT_DIR} to WebP (quality ${QUALITY})\n`);
  const images = findImages(ROOT_DIR);

  if (images.length === 0) {
    console.log('No eligible images found.');
    return;
  }

  for (const image of images) {
    // eslint-disable-next-line no-await-in-loop
    await convertImage(image);
  }

  console.log('\nConversion complete.');
  console.log('Review the output and remove original files if everything looks good.');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

