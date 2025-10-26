#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const HERO_INPUT_DIR = path.join(__dirname, '../public/images/hero');
const OUTPUT_DIR = path.join(__dirname, '../public/images/hero-optimized');
const SIZES = {
  mobile: 480,
  tablet: 768,
  desktop: 1200
};
const QUALITY = 80;
const LQIP_SIZE = 20; // Low Quality Image Placeholder size

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all image files from hero directory
const getImageFiles = (dir) => {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });
};

// Generate LQIP (Low Quality Image Placeholder)
async function generateLQIP(inputPath, outputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(LQIP_SIZE, LQIP_SIZE, { fit: 'cover' })
      .webp({ quality: 20 })
      .blur(2)
      .toBuffer();
    
    // Convert to base64 for inline embedding
    return `data:image/webp;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error generating LQIP for ${inputPath}:`, error.message);
    return null;
  }
}

// Sanitize filename - replace spaces and special characters with hyphens
function sanitizeFilename(filename) {
  return filename
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[+()]/g, '-')         // Replace +, (, ) with hyphens
    .replace(/,/g, '')              // Remove commas
    .replace(/-+/g, '-')            // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

// Optimize single image
async function optimizeImage(filename) {
  const inputPath = path.join(HERO_INPUT_DIR, filename);
  const originalBaseName = path.parse(filename).name;
  const baseName = sanitizeFilename(originalBaseName);
  
  console.log(`\nProcessing: ${filename}`);
  if (baseName !== originalBaseName) {
    console.log(`  Sanitized: "${originalBaseName}" → "${baseName}"`);
  }
  
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)}MB`);
    
    // Generate LQIP
    console.log('  Generating LQIP...');
    const lqip = await generateLQIP(inputPath, path.join(OUTPUT_DIR, `${baseName}-lqip.webp`));
    
    // Generate responsive sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      const outputPath = path.join(OUTPUT_DIR, `${baseName}-${sizeName}.webp`);
      
      await sharp(inputPath)
        .resize(width, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${sizeName}: ${width}px, ${(stats.size / 1024).toFixed(2)}KB`);
    }
    
    return {
      original: filename,
      originalBaseName: originalBaseName,
      baseName: baseName,
      lqip: lqip,
      sizes: SIZES
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
    return null;
  }
}

// Main execution
async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`Input directory: ${HERO_INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);
  
  const imageFiles = getImageFiles(HERO_INPUT_DIR);
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  if (imageFiles.length === 0) {
    console.log('No images found to process!');
    return;
  }
  
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  // Process each image
  for (const file of imageFiles) {
    const originalPath = path.join(HERO_INPUT_DIR, file);
    const originalSize = fs.statSync(originalPath).size;
    totalOriginalSize += originalSize;
    
    const result = await optimizeImage(file);
    if (result) {
      results.push(result);
      
      // Calculate optimized size (desktop version)
      const optimizedPath = path.join(OUTPUT_DIR, `${result.baseName}-desktop.webp`);
      if (fs.existsSync(optimizedPath)) {
        const optimizedSize = fs.statSync(optimizedPath).size;
        totalOptimizedSize += optimizedSize;
      }
    }
  }
  
  // Generate mapping file
  const mappingPath = path.join(OUTPUT_DIR, 'image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Generated image mapping: ${mappingPath}`);
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log(`   Total images processed: ${results.length}`);
  console.log(`   Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Optimized total size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Size reduction: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`   Savings: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB`);
  console.log('\n✅ Image optimization complete!\n');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

