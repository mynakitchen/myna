#!/usr/bin/env node

/**
 * Synchronise menu + gallery data with filesystem images.
 *
 * Responsibilities:
 *  - Ensure metadata (`data/menu-items.json`) contains an entry for every
 *    menu item folder created under `public/images/menu/<category>/<slug>`.
 *  - Auto-create metadata stubs for new folders so cards appear without any
 *    manual code changes.
 *  - Generate `src/data/generatedMenuGallery.json` consumed by the React
 *    components. New dishes are automatically sorted to the front and carry
 *    a "new" badge for a configurable window.
 *
 * Usage:
 *    node scripts/sync-menu-gallery.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const MENU_IMAGE_ROOT = path.join(PUBLIC_DIR, 'images', 'menu');
const METADATA_PATH = path.join(ROOT, 'data', 'menu-items.json');
const OUTPUT_PATH = path.join(ROOT, 'src', 'data', 'generatedMenuGallery.json');

const CATEGORY_SLUG_TO_LABEL = {
  'day-starters': 'Day Starters',
  'super-meals': 'Super Meals',
  'comfort-meals': 'Comfort Meals',
  'add-ons': 'Add-ons'
};

const CATEGORY_LABEL_TO_SLUG = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_TO_LABEL).map(([slug, label]) => [label, slug])
);

const CATEGORY_DEFAULT_PRICE = {
  'Day Starters': 80,
  'Super Meals': 150,
  'Comfort Meals': 130,
  'Add-ons': 70
};

const CATEGORY_ORDER = ['Day Starters', 'Super Meals', 'Comfort Meals', 'Add-ons'];
const ALLOWED_IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);
const NEW_BADGE_DURATION_DAYS = 14;

function normaliseRelativePath(maybePath) {
  if (typeof maybePath !== 'string' || maybePath.trim() === '') {
    return null;
  }
  const trimmed = maybePath.trim();
  const withoutLeadingSlash = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  return withoutLeadingSlash.split(path.sep).join('/');
}

function assetExists(relativePath) {
  if (!relativePath) {
    return false;
  }
  const absolute = path.join(PUBLIC_DIR, relativePath);
  return fs.existsSync(absolute);
}

function readJson(filepath, fallback) {
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return fallback;
    }
    throw error;
  }
}

function writeJson(filepath, data) {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, json, 'utf8');
}

function toTitleCase(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function normalisePath(absolutePath) {
  const relative = path.relative(PUBLIC_DIR, absolutePath);
  return relative.split(path.sep).join('/');
}

function collectImages(itemDir) {
  const entries = fs.readdirSync(itemDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && ALLOWED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => normalisePath(path.join(itemDir, entry.name)))
    .sort((a, b) => a.localeCompare(b));
}

function findLocalMeta(itemDir) {
  const candidates = ['meta.json', 'metadata.json'];
  for (const candidate of candidates) {
    const fullPath = path.join(itemDir, candidate);
    if (fs.existsSync(fullPath)) {
      try {
        return readJson(fullPath, null);
      } catch (error) {
        console.warn(`⚠️  Could not parse ${fullPath}: ${error.message}`);
      }
    }
  }
  return null;
}

function resolveGalleryImage(rawValue, images) {
  const candidates = [];

  if (Array.isArray(rawValue)) {
    for (const value of rawValue) {
      const normalised = normaliseRelativePath(value);
      if (normalised) {
        candidates.push(normalised);
      }
    }
  } else {
    const normalised = normaliseRelativePath(rawValue);
    if (normalised) {
      candidates.push(normalised);
    }
  }

  for (const candidate of candidates) {
    if (assetExists(candidate)) {
      return candidate;
    }
  }

  for (const fallback of images) {
    if (assetExists(fallback)) {
      return fallback;
    }
  }

  return null;
}

function ensureMetadataEntries(metadata) {
  const nowIso = new Date().toISOString();
  const items = Array.isArray(metadata.items) ? [...metadata.items] : [];
  const itemIndexByKey = new Map();

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    if (!item || !item.slug || !item.category) {
      throw new Error(
        `Invalid metadata entry at index ${index}. Each item must have both "slug" and "category".`
      );
    }
    const key = `${item.category}::${item.slug}`;
    if (itemIndexByKey.has(key)) {
      throw new Error(`Duplicate metadata entry for ${key}`);
    }
    itemIndexByKey.set(key, index);
  }

  const discoveredKeys = new Set();

  for (const [categorySlug, categoryLabel] of Object.entries(CATEGORY_SLUG_TO_LABEL)) {
    const categoryDir = path.join(MENU_IMAGE_ROOT, categorySlug);
    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    const entries = fs.readdirSync(categoryDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const { name: folderSlug } = entry;
      const fullDir = path.join(categoryDir, folderSlug);
      const key = `${categoryLabel}::${folderSlug}`;
      discoveredKeys.add(key);

      const images = collectImages(fullDir);
      if (images.length === 0) {
        console.warn(`⚠️  No images found for ${folderSlug} in ${categoryLabel}. Skipping.`);
        continue;
      }

      const existingIndex = itemIndexByKey.get(key);
      if (existingIndex != null) {
        const existing = items[existingIndex];
        existing.images = images;

        if (!existing.galleryImage) {
          existing.galleryImage = images[0];
        }

        if (!existing.galleryTitle) {
          existing.galleryTitle = existing.name;
        }

        if (!existing.galleryDescription) {
          existing.galleryDescription = existing.description;
        }

        if (!existing.createdAt) {
          existing.createdAt = nowIso;
        }

        existing.galleryImage = resolveGalleryImage(existing.galleryImage, images);

        continue;
      }

      const localMeta = findLocalMeta(fullDir) || {};
      const defaultName = localMeta.name || toTitleCase(folderSlug);
      const defaultDescription =
        localMeta.description ||
        `Freshly prepared ${defaultName.toLowerCase()} crafted for our ${categoryLabel.toLowerCase()} menu.`;
      const price = Number.isFinite(Number(localMeta.price))
        ? Number(localMeta.price)
        : CATEGORY_DEFAULT_PRICE[categoryLabel] || 0;

      const resolvedGalleryImage = resolveGalleryImage(localMeta.galleryImage, images);

      const newEntry = {
        slug: folderSlug,
        category: categoryLabel,
        name: defaultName,
        description: defaultDescription,
        price,
        images,
        showInGallery: localMeta.showInGallery !== undefined ? Boolean(localMeta.showInGallery) : true,
        galleryTitle: localMeta.galleryTitle || defaultName,
        galleryDescription: localMeta.galleryDescription || defaultDescription,
        galleryImage: resolvedGalleryImage,
        isNew: true,
        createdAt: nowIso
      };

      items.push(newEntry);
      console.log(`✨  Added new menu item: ${categoryLabel} → ${defaultName}`);
    }
  }

  // Clean up metadata for entries whose folders were removed - keep manual items without directories.
  const filteredItems = items.map((item) => {
    if (!item.createdAt) {
      item.createdAt = nowIso;
    }
    return item;
  });

  return { items: filteredItems };
}

function refreshNewBadgeFlags(metadata) {
  const now = Date.now();
  const cutoffMs = NEW_BADGE_DURATION_DAYS * 24 * 60 * 60 * 1000;

  metadata.items = metadata.items.map((item) => {
    if (!item.createdAt) {
      return { ...item, isNew: false };
    }
    const createdAtMs = new Date(item.createdAt).getTime();
    if (Number.isNaN(createdAtMs)) {
      return { ...item, isNew: false };
    }
    const isFresh = now - createdAtMs <= cutoffMs;
    return { ...item, isNew: item.isNew && isFresh };
  });
}

function sortMetadataItems(metadata) {
  metadata.items.sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category);
    const catB = CATEGORY_ORDER.indexOf(b.category);
    if (catA !== catB) {
      return catA - catB;
    }

    const newDiff = Number(b.isNew || false) - Number(a.isNew || false);
    if (newDiff !== 0) {
      return newDiff;
    }

    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (dateA !== dateB) {
      return dateB - dateA;
    }

    return a.name.localeCompare(b.name);
  });
}

function buildGeneratedData(metadata) {
  const items = metadata.items.map((item) => {
    const categorySlug = CATEGORY_LABEL_TO_SLUG[item.category] || 'uncategorised';
    const safeImages = Array.isArray(item.images) ? item.images : [];
    const images = safeImages
      .map((img) => (typeof img === 'string' ? img.replace(/\\/g, '/') : null))
      .filter(Boolean);

    const galleryImageCandidate = resolveGalleryImage(item.galleryImage, images);
    const primaryImageRaw = galleryImageCandidate || images[0] || null;
    const primaryImage =
      typeof primaryImageRaw === 'string' ? primaryImageRaw.replace(/\\/g, '/') : null;

    return {
      id: `${categorySlug}:${item.slug}`,
      slug: item.slug,
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      images,
      isNew: Boolean(item.isNew),
      createdAt: item.createdAt || null,
      showInGallery: item.showInGallery !== false || Boolean(item.isNew),
      gallery: {
        title: item.galleryTitle || item.name,
        description: item.galleryDescription || item.description,
        image: primaryImage
      }
    };
  });

  const categories = CATEGORY_ORDER.filter((category) =>
    items.some((item) => item.category === category)
  );

  return {
    generatedAt: new Date().toISOString(),
    categories,
    items
  };
}

function main() {
  if (!fs.existsSync(MENU_IMAGE_ROOT)) {
    throw new Error(`Menu image root not found: ${MENU_IMAGE_ROOT}`);
  }

  const metadata = readJson(METADATA_PATH, { items: [] });
  const updatedMetadata = ensureMetadataEntries(metadata);
  refreshNewBadgeFlags(updatedMetadata);
  sortMetadataItems(updatedMetadata);

  writeJson(METADATA_PATH, updatedMetadata);

  const generated = buildGeneratedData(updatedMetadata);
  writeJson(OUTPUT_PATH, generated);

  console.log(`✅  Wrote ${updatedMetadata.items.length} menu items to ${OUTPUT_PATH}`);
}

main();

