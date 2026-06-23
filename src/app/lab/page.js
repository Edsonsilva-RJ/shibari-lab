import Link from 'next/link';
import styles from './lab.module.css';

export default function LabPage() {
  const pesquisas = [
    {
      id: 1,
      titulo: "Energia Fotovoltaica e Sustentabilidade",
      resumo: "Uma análise técnica sobre a implementação de painéis solares em áreas urbanas.",
      tag: "Engenharia"
    },
    {
      id: 2,
      titulo: "A Estética do Shibari no Século XXI",
      resumo: "Pesquisa sobre a evolução das amarrações e seu impacto visual na fotografia contemporânea.",
      tag: "Cultura"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>O Lab</h1>
        <p>Espaço dedicado a pesquisas, ensaios técnicos e informativos sobre engenharia, arte e Shibari.</p>
      </header>

      <section className={styles.grid}>
        {pesquisas.map((item) => (
          <article key={item.id} className={styles.card}>
            <span className={styles.tag}>{item.tag}</span>
            <h2>{item.titulo}</h2>
            <p>{item.resumo}</p>
            <Link href={`/lab/${item.id}`} className={styles.readMore}>Ler pesquisa completa →</Link>
          </article>
        ))}
      </section>
    </div>
  );
}