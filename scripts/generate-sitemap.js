const fs = require('fs');
const path = require('path');

// Site configuration
const SITE_URL = 'https://mynakitchen.in';
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const BUILD_SITEMAP_PATH = path.join(__dirname, '..', 'build', 'sitemap.xml');

// Define all pages with their metadata
const pages = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    description: 'Home page - Fresh homely meals delivered daily'
  },
  {
    path: '/menu',
    changefreq: 'daily',
    priority: '0.9',
    description: 'Daily rotating menu of South & North Indian meals'
  },
  {
    path: '/browse-plans',
    changefreq: 'weekly',
    priority: '0.9',
    description: 'Meal subscription plans and customization options'
  },
  {
    path: '/how-it-works',
    changefreq: 'monthly',
    priority: '0.8',
    description: 'How our meal subscription service works'
  },
  {
    path: '/why-us',
    changefreq: 'monthly',
    priority: '0.8',
    description: 'Why choose Myna Kitchen for your daily meals'
  },
  {
    path: '/corporate',
    changefreq: 'monthly',
    priority: '0.7',
    description: 'Corporate food solutions and employee meal programs'
  },
  {
    path: '/corporate-orders',
    changefreq: 'monthly',
    priority: '0.7',
    description: 'Corporate catering services and bulk orders'
  },
  {
    path: '/faq',
    changefreq: 'monthly',
    priority: '0.6',
    description: 'Frequently asked questions about our service'
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: '0.5',
    description: 'Privacy policy for Myna Kitchen'
  },
  {
    path: '/terms-and-conditions',
    changefreq: 'yearly',
    priority: '0.5',
    description: 'Terms and conditions for Myna Kitchen services'
  }
];

/**
 * Generate sitemap XML content
 */
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  
  return xml;
}

/**
 * Write sitemap to file
 */
function writeSitemap(filePath) {
  try {
    const xml = generateSitemap();
    fs.writeFileSync(filePath, xml, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${filePath}`);
    console.log(`   Updated ${pages.length} URLs with lastmod: ${new Date().toISOString().split('T')[0]}`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating sitemap: ${error.message}`);
    return false;
  }
}

// Main execution
if (require.main === module) {
  console.log('🗺️  Generating sitemap...\n');
  
  // Generate for public folder (source)
  const publicDir = path.dirname(SITEMAP_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  writeSitemap(SITEMAP_PATH);
  
  // Generate for build folder if it exists (after build)
  if (fs.existsSync(path.dirname(BUILD_SITEMAP_PATH))) {
    writeSitemap(BUILD_SITEMAP_PATH);
  }
}

module.exports = { generateSitemap, writeSitemap, pages };

