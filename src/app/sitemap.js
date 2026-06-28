// src/app/sitemap.js
export default function sitemap() {
  const baseUrl = 'https://www.shibarilab.com'; // Altere para o seu domínio final quando fizer o deploy

  // Suas rotas principais do projeto
  const routes = ['', '/portfolio', '/agenda', '/lab', '/loja', '/contato'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: route === '/agenda' || route === '/loja' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  return routes;
}