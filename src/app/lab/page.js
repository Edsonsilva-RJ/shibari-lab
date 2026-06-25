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
      titulo: "O que é o Shibari? Qual a sua historia ?",
      resumo: "Para quem vê de fora, o Shibari pode parecer apenas um emaranhado complexo de nós e cordas. Para quem estuda e pratica, ele é uma linguagem.",
      tag: "Historia e Cultura"
    },
    {
      id: 3,
      titulo: "Minha inesperada história com o Shibari",
      resumo: "Era 2009. Eu estava no meu notebook olhando coisas aleatórias na internet quando, do nada...",
      tag: "Biografia"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>O Lab</h1>
        <p>Espaço dedicado a pesquisas, ensaios técnicos e informativos sobre a arte do shibari.</p>
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