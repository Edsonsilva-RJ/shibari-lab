// src/app/loja/page.js
"use client"; 
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import styles from './loja.module.css';

export default function LojaPage() {
  const ID_IMAGEM_PADRAO = "opcao1"; 

  // Estados para controlar qual produto está aberto e qual foto da galeria está ativa
  const [produtoAtivoIndex, setProdutoAtivoIndex] = useState(-1);
  const [fotoAtualIndex, setFotoAtualIndex] = useState(0);

  // Seu catálogo completo com os 7 itens estruturados
  const produtos = [
    {
      id: 1,
      titulo: "Corda de Juta Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta natural de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em amarrações de chão ou suspensões.",
      preco: "R$ 75,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Tratada+de+8m",
      galeria: ["opcao1", "hero-bg_fpjh2t"] 
    },
    {
      id: 2,
      titulo: "Cera Hidratante para Cordas - 50Gr",
      categoria: "Manutenção",
      imagem: "", 
      descricao: "Cera hidratante ideal para cordas de fibra natural, feita com ingredientes pensados para mantém a corda hidratada, flexível e resistente.",
      preco: "R$ 35,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Cera+hidratante+para+cordas",
      galeria: ["opcao1", "hero-bg_fpjh2t"] 
    },
    {
      id: 3,
      titulo: "Kit iniciante: 2 Cordas + Tesoura de ponta romba",
      categoria: "Kit",
      imagem: "", // Puxa a imagem padrão automaticamente
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 165,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+Principiante",
      galeria: ["opcao1"] 
    },
    {
      id: 4,
      titulo: "Corda de Juta colorida Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta tingida de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em  amarras de chão ou suspensões.",
      preco: "R$ 115,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Print+Fotogr%C3%A1fico+Linhas+de+Tens%C3%A3o",
      galeria: ["opcao1"] 
    },
    {
      id: 5,
      titulo: "Cera hidratante premium para cordas- 50GR",
      categoria: "Manutenção",
      imagem: "", 
      descricao: "Cera hidratante premium ideal para cordas de fibra natural, feita com ingredientes 100% organicos pensados para manter a corda hidratada, flexível e resistente.",
      preco: "R$ 45,25",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+cera+hidratante+premium+para+cordas",
      galeria: ["opcao1"] 
    },
    {
      id: 6,
      titulo: "Kit iniciante II: 2 Cordas + Tesoura de ponta romba + Cera hidratante 50 Gr",
      categoria: "Kit",
      imagem: "", 
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m, cera hidratante 50Gr e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 195,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+iniciante+II",
      galeria: ["opcao1"] 
    },
    {
      id: 7,
      titulo: "Tesoura de ponta romba",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 25,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Tesoura+de+ponta+romba",
      galeria: ["opcao1"] 
    }
  ];

  const abrirLightbox = (index) => {
    setProdutoAtivoIndex(index);
    setFotoAtualIndex(0);
  };

  const fecharLightbox = () => {
    setProdutoAtivoIndex(-1);
  };

  const proximaFoto = (e) => {
    e.stopPropagation();
    const galeria = produtos[produtoAtivoIndex].galeria;
    setFotoAtualIndex((prev) => (prev + 1) % galeria.length);
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    const galeria = produtos[produtoAtivoIndex].galeria;
    setFotoAtualIndex((prev) => (prev - 1 + galeria.length) % galeria.length);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Loja Lab</h1>
        <p>Equipamentos selecionados, cordas tratadas artesanalmente e produções artísticas autorais.</p>
      </header>

      <main className={styles.grid}>
        {produtos.map((produto, index) => {
          const imagemExibida = produto.imagem || ID_IMAGEM_PADRAO;
          
          return (
            <article 
              key={produto.id} 
              className={styles.productCard}
              onClick={() => abrirLightbox(index)}
            >
              <div className={styles.imageWrapper}>
                <CldImage
                  src={imagemExibida}
                  fill
                  alt={produto.titulo}
                  className={styles.productImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.hoverOverlay}>
                  Ver Fotos ({produto.galeria.length})
                </div>
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    Garantir Item
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Lightbox / Modal Expandido */}
      {produtoAtivoIndex !== -1 && (
        <div className={styles.lightbox} onClick={fecharLightbox}>
          <button className={styles.btnClose} onClick={fecharLightbox}>&times;</button>
          
          {produtos[produtoAtivoIndex].galeria.length > 1 && (
            <>
              <button className={styles.btnNavLeft} onClick={fotoAnterior}>&#10094;</button>
              <button className={styles.btnNavRight} onClick={proximaFoto}>&#10095;</button>
            </>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageContainer}>
              <CldImage
                src={produtos[produtoAtivoIndex].galeria[fotoAtualIndex] || ID_IMAGEM_PADRAO}
                width="800"
                height="800"
                crop="fit"
                alt="Visualização do produto"
                className={styles.lightboxImage}
              />
            </div>

            <footer className={styles.lightboxFooter}>
              <div className={styles.footerMain}>
                <h3>{produtos[produtoAtivoIndex].titulo}</h3>
                <span className={styles.counter}>
                  {fotoAtualIndex + 1} de {produtos[produtoAtivoIndex].galeria.length}
                </span>
              </div>
              <p className={styles.modalDescription}>{produtos[produtoAtivoIndex].descricao}</p>
              <div className={styles.modalFooterRow}>
                <span className={styles.modalPrice}>{produtos[produtoAtivoIndex].preco}</span>
                <a 
                  href={produtos[produtoAtivoIndex].linkWhats}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnBuy}
                  onClick={(e) => e.stopPropagation()}
                >
                  Fazer Pedido no WhatsApp
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}