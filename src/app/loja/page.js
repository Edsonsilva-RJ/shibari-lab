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

  const produtos = [
    {
      id: 1,
      titulo: "Corda de Juta Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta natural de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em amarras de chão ou suspensões.",
      preco: "R$ 75,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Tratada+de+8m",
      galeria: ["opcao1", "hero-bg_fpjh2t"] 
    },
    {
      id: 2,
      titulo: "Cera hidratante para cordas- 50ml",
      categoria: "Item",
      imagem: "", 
      descricao: "Cera hidratante ideal para cordas de fibra natural, feita com ingredientes pensados para mantém a corda hidratada, flexível e resistente.",
      preco: "R$ 34,20",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+cera+hidratante+para+cordas",
      galeria: ["opcao1"]
    },
    {
      id: 3,
      titulo: "Kit iniciante: 2 Cordas + Tesoura de ponta romba",
      categoria: "Kit",
      imagem: "",
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: "R$ 165,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+no+Kit+iniciante",
      galeria: ["opcao1"]
    },
    {
      id: 4,
      titulo: "Corda de Juta colorida Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta antiga de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em amarras de chão ou suspensões.",
      preco: "R$ 115,00",
      linkWhats: "https://wa.me/5521994430177?text=Ol%C3%A1%21+Tenho+interesse+na+Corda+de+Juta+Colorida+Tratada+de+8m",
      galeria: ["opcao1"]
    },
    {
      id: 5,
      titulo: "Cera hidratante premium para cordas- 50ml",
      categoria: "Item",
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

  const abrirGaleria = (index) => {
    setProdutoAtivoIndex(index);
    setFotoAtualIndex(0);
  };

  const fecharGaleria = () => {
    setProdutoAtivoIndex(-1);
  };

  const proximaFoto = (e) => {
    e.stopPropagation();
    const totalFotos = produtos[produtoAtivoIndex].galeria.length;
    setFotoAtualIndex((prev) => (prev + 1) % totalFotos);
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    const totalFotos = produtos[produtoAtivoIndex].galeria.length;
    setFotoAtualIndex((prev) => (prev - 1 + totalFotos) % totalFotos);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Loja Lab</h1>
        <p>Equipamentos selecionados, cordas tratadas artesanalmente e produções artísticas autorais.</p>
      </header>

      <main className={styles.grid}>
        {produtos.map((produto, index) => (
          <article key={produto.id} className={styles.productCard}>
            
            <div className={styles.imageWrapper} onClick={() => abrirGaleria(index)}>
              <CldImage
                src={produto.imagem || ID_IMAGEM_PADRAO}
                fill
                alt={produto.titulo}
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.hoverOverlay}>
                <span>Ver Detalhes ({produto.galeria ? produto.galeria.length : 1})</span>
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
                >
                  Garantir Item
                </a>
              </div>
            </div>
          </article>
        ))}
      </main> {/* Fechamento correto da tag main */}

      {/* Modal Lightbox para fotos do Produto */}
      {produtoAtivoIndex !== -1 && (
        <div className={styles.lightbox} onClick={fecharGaleria}>
          <button className={styles.btnClose} onClick={fecharGaleria}>&times;</button>
          
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