import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Usa gray-matter para separar o "topo" do "texto"
  const matterResult = matter(fileContents);

  // Converte Markdown em String HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
export function getSortedPostsData() {
  // Pega os nomes dos arquivos na pasta /posts
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("Arquivos encontrados na pasta posts:", fileNames);
  
  const allPostsData = fileNames.map((fileName) => {
    // Remove o ".md" do nome para criar o slug (ID)
    const slug = fileName.replace(/\.md$/, '');

    // Lê o conteúdo do arquivo
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Extrai o título e data (metadata)
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data,
    };
  });

  // Ordena por data (mais recente primeiro)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}