// src/app/loja/page.js
import styles from './loja.module.css';

export default function LojaPage() {
  // Catálogo de itens para venda
  const produtos = [
    {
      id: 1,
      titulo: "Corda de Juta Tratada - 8m",
      categoria: "Equipamentos",
      descricao: "Corda de juta natural de alta qualidade (6mm), lavada, fervida, amaciada com óleo mineral e cera de abelha. Pronta para uso em suspensões ou amarras de chão.",
      preco: "R$ 85,00",
      linkWhats: "https://wa.me/SEUNUMERO?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Tratada+de+8m"
    },
    {
      id: 2,
      titulo: "Print Fotográfico - Ensaio Geométrico",
      categoria: "Arte & Fotografia",
      descricao: "Impressão Fine Art em papel fosco de alta gramatura (Tamanho A3). Fotografia autoral analógica focada nas linhas, sombras e contrastes das amarras.",
      preco: "R$ 120,00",
      linkWhats: "https://wa.me/SEUNUMERO?text=Ol%C3%A1%21+Tenho+interesse+no+Print+Fotogr%C3%A1fico+do+Ensaio+Geom%C3%A9trico"
    },
    {
      id: 3,
      titulo: "Kit Principiante: 2 Cordas + Canivete ESD",
      categoria: "Kits",
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m e um canivete de segurança (bico redondo) para cortes rápidos de emergência.",
      preco: "R$ 190,00",
      linkWhats: "https://wa.me/SEUNUMERO?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+Principiante"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Loja Lab</h1>
        <p>Equipamentos selecionados, cordas tratadas artesanalmente e produções artísticas autorais.</p>
      </header>

      <main className={styles.grid}>
        {produtos.map((produto) => (
          <article key={produto.id} className={styles.productCard}>
            <div className={styles.productInfo}>
              <span className={styles.tag}>{produto.categoria}</span>
              <h2>{produto.titulo}</h2>
              <p className={styles.description}>{produto.descricao}</p>
              
              <div className={styles.footerRow}>
                <span className={styles.price}>{produto.preco}</span>
                <a 
                  href={produto.linkWhats} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.btnBuy}
                >
                  Garantir Item
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}