import { getSortedPostsData } from '@/lib/markdown'; // Importa a nova função
import styles from './lab.module.css';
import Link from 'next/link';

export default function LabPage() {
  const todasAsPesquisas = getSortedPostsData(); // Puxa os arquivos reais

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>O Lab</h1>
        <p>Pesquisas técnicas, ensaios e documentação de processos.</p>
      </header>

      <section className={styles.grid}>
        {todasAsPesquisas.map(({ slug, date, title, excerpt }) => (
          <article key={slug} className={styles.card}>
            <span className={styles.tag}>Pesquisa</span>
            <h2>{title}</h2>
            <p className={styles.date}>{date}</p>
            <p>{excerpt}</p>
            <Link href={`/lab/${slug}`} className={styles.readMore}>
              Ler pesquisa completa →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}