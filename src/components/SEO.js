import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  schema,
  schemas = [],
  image = 'https://mynakitchen.in/images/myna-logo.jpg',
  breadcrumbs = null
}) => {
  const siteTitle = 'Myna Kitchen';
  const siteUrl = 'https://mynakitchen.in';
  const fullTitle = title === siteTitle ? siteTitle : `${title} | ${siteTitle}`;
  const fullUrl = `${siteUrl}${canonical}`;

  // Base Organization schema (always included)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Myna Kitchen",
    "url": siteUrl,
    "logo": image,
    "description": "Fresh, home-cooked meals delivered daily to your doorstep in Chennai.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7418688269",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["en", "ta"]
    },
    "sameAs": [
      "https://www.instagram.com/mynakitchen.in"
    ]
  };

  // Breadcrumb schema generator
  const generateBreadcrumbSchema = (breadcrumbs) => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${siteUrl}${crumb.url}`
      }))
    };
  };

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    ...(schema ? [schema] : []),
    ...schemas,
    ...(breadcrumbs ? [generateBreadcrumbSchema(breadcrumbs)] : [])
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) - Multiple schemas */}
      {allSchemas.map((schemaData, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

