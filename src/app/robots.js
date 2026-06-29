// src/app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'], // Caso tenha alguma página de rascunho no futuro
    },
    sitemap: 'https://www.shibarilab.com/sitemap.xml', // Substitua pelo seu domínio oficial futuramente
  };
}