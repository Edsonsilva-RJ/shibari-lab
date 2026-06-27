// src/app/loja/page.js
"use client"; 
import { CldImage } from 'next-cloudinary';
import styles from './loja.module.css';

export default function LojaPage() {
  // Constante com a URL da imagem genérica que você escolheu
  const IMAGEM_PADRAO = "https://res.cloudinary.com/diq7wl2bm/image/upload/v1782361100/opcao1.png";

  // Catálogo de itens
  const produtos = [
    {
      id: 1,
      titulo: "Corda de Juta Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", // Deixei vaio para testar ouso da imagem generica
      descricao: "Corda de juta natural de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em  amarras de chão ou suspensões.",
      preco: "R$ 75,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Tratada+de+8m"
    },
    {
      id: 2,
      titulo: "Cera hidratante para cordas- 50ml",
      categoria: "Item",
      imagem: "", // Deixando vazio para testar o funcionamento da imagem genérica
      descricao: "Cera hidratante ideal para cordas de fibra natural, feita com ingredientes pensados para mantém a corda hidratada, flexível e resistente.",
      preco: "R$ 34,20",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+cera+hidratante+para+cordas"
    },
    {
      id: 3,
      titulo: "Kit iniciante: 2 Cordas + Tesoura de ponta romba",
      categoria: "Kit",
      imagem: "",
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 165,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+iniciante"
    },
    {
      id: 4,
      titulo: "Corda de Juta colorida Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", // Deixei vaio para testar o uso da imagem generica
      descricao: "Corda de juta tingida de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em  amarras de chão ou suspensões.",
      preco: "R$ 115,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Colorida+Tratada+de+8m"
    },
    {
      id: 5,
      titulo: "Cera hidratante premium para cordas- 50ml",
      categoria: "Item",
      imagem: "", // Deixando vazio para testar o funcionamento da imagem genérica
      descricao: "Cera hidratante premium ideal para cordas de fibra natural, feita com ingredientes 100% organicos pensados para manter a corda hidratada, flexível e resistente.",
      preco: "R$ 45,25",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+cera+hidratante+premium+para+cordas"
    },
    {
      id: 6,
      titulo: "Kit iniciante II: 2 Cordas + Tesoura de ponta romba + Cera hidratante 50 Gr",
      categoria: "Kit",
      imagem: "",
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m, cera hidratante 50Gr e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 195,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+iniciante+II"
    },
    {
      id: 7,
      titulo: "Tesoura de ponta romba",
      categoria: "Equipamento",
      imagem: "",
      descricao: "tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 25,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Tesoura+de+ponta+romba"
    }

      // ,{
    //   id: 2,
    //   titulo: "Print Fotográfico - Ensaio Geométrico",
    //   categoria: "Arte & Fotografia",
    //   imagem: "", // Deixando vazio para testar o funcionamento da imagem genérica
    //   descricao: "Impressão Fine Art em papel fosco de alta gramatura (Tamanho A3). Fotografia autoral analógica focada nas lines, sombras e contrastes das amarras.",
    //   preco: "R$ 120,00",
    //   linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Print+Fotogr%C3%A1fico+do+Ensaio+Geom%C3%A9trico"
    // }
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
            
            {/* Bloco de Imagem Otimizada com Fallback */}
            <div className={styles.imageWrapper}>
              <CldImage
                src={produto.imagem || IMAGEM_PADRAO} // Se produto.imagem for vazio, puxa a URL genérica
                fill
                alt={produto.titulo}
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

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