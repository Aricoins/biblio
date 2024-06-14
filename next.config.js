const cspHeader = `
  default-src 'self';
  tab.js 'self';
  script-src 'self' 'unsafe-inline' 'report-only';  // Allow inline scripts (for now) with report-only
  style-src 'self' 'unsafe-inline' 'report-only';  // Allow inline styles (for now) with report-only
  img-src 'self' data: blob: 'report-only';  // Allow data URIs and blobs with report-only
  font-src 'self' data: 'report-only';  // Allow data URIs for fonts with report-only
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`

module.exports = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          }
        ]	
        
      },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ``,
          },
        ],
      },
    ];
  },
};
