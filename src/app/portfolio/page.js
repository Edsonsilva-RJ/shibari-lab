// src/app/portfolio/page.js
"use client";
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  const [ensaioAtivoIndex, setEnsaioAtivoIndex] = useState(-1);
  const [fotoAtualIndex, setFotoAtualIndex] = useState(0);

  // Lista de Ensaios detalhada com créditos e resumo
  const ensaios = [
    {
      id: 1,
      titulo: 'Estudo de Linhas',
      descricao: 'Exploração de simetria e linhas de tensão paralelas.',
      capa: 'hero-bg_fpjh2t',
      creditos: {
        artista: "Edson Henrique", // Quem aplicou as cordas
        fotografo: "Edson Henrique",
        modelo: "Modelo 1" // Substitua pelos nomes reais
      },
      resumo: "Este ensaio técnico-artístico foca no alinhamento geométrico e no equilíbrio de forças em suspensões parciais, destacando o contraste sutil entre a rigidez da juta natural e as curvas anatômicas.",
      galeria: [
        'hero-bg_fpjh2t',
        'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh',
        'WhatsApp_Image_2023-05-28_at_20.39.28_sq7nz5'
      ]
    },
    {
      id: 2,
      titulo: 'Ensaio Geométrico',
      descricao: 'Contraste entre formas orgânicas e sombras projetadas.',
      capa: 'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh',
      creditos: {
        artista: "Edson Henrique",
        fotografo: "Edson Henrique",
        modelo: "Modelo 2"
      },
      resumo: "Sessão focada na captura manual (DSLR) de sombras projetadas pelas cordas tensionadas, criando um jogo de luz e linhas contínuas em fundo escuro.",
      galeria: [
        'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh',
        'WhatsApp_Image_2023-05-28_at_20.39.28_sq7nz5'
      ]
    }
  ];

  const abrirGaleria = (index) => {
    setEnsaioAtivoIndex(index);
    setFotoAtualIndex(0);
  };

  const fecharGaleria = () => {
    setEnsaioAtivoIndex(-1);
  };

  const proximaFoto = (e) => {
    e.stopPropagation();
    const totalFotos = ensaios[ensaioAtivoIndex].galeria.length;
    setFotoAtualIndex((prev) => (prev + 1) % totalFotos);
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    const totalFotos = ensaios[ensaioAtivoIndex].galeria.length;
    setFotoAtualIndex((prev) => (prev - 1 + totalFotos) % totalFotos);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfólio</h1>
        <p>Registos fotográficos ordenados por ensaios e explorações estéticas.</p>
      </header>

      {/* Grid de Capas */}
      <section className={styles.galleryGrid}>
        {ensaios.map((ensaio, index) => (
          <div 
            key={ensaio.id} 
            className={styles.photoCard} 
            onClick={() => abrirGaleria(index)}
          >
            <div className={styles.imageWrapper}>
              <CldImage
                src={ensaio.capa}
                width="600"
                height="800"
                crop="fill"
                alt={ensaio.titulo}
                className={styles.image}
              />
              <div className={styles.hoverOverlay}>
                <span>Ver Galeria ({ensaio.galeria.length} fotos)</span>
              </div>
            </div>
            <div className={styles.photoInfo}>
              <h2>{ensaio.titulo}</h2>
              <p>{ensaio.descricao}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Modal Lightbox */}
      {ensaioAtivoIndex !== -1 && (
        <div className={styles.lightbox} onClick={fecharGaleria}>
          <button className={styles.btnClose} onClick={fecharGaleria}>&times;</button>
          
          <button className={styles.btnNavLeft} onClick={fotoAnterior}>&#10094;</button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageContainer}>
              <CldImage
                src={ensaios[ensaioAtivoIndex].galeria[fotoAtualIndex]}
                width="1000"
                height="1333"
                crop="fit"
                alt="Visualização ampliada"
                className={styles.lightboxImage}
              />
            </div>

            {/* Novo Rodapé de Informações Detalhadas */}
            <footer className={styles.lightboxFooter}>
              <div className={styles.footerMain}>
                <h3>{ensaios[ensaioAtivoIndex].titulo}</h3>
                <span className={styles.counter}>
                  {fotoAtualIndex + 1} de {ensaios[ensaioAtivoIndex].galeria.length}
                </span>
              </div>
              
              <p className={styles.workSummary}>
                {ensaios[ensaioAtivoIndex].resumo}
              </p>

              <div className={styles.creditsGrid}>
                <div><strong>Artista das Cordas:</strong> {ensaios[ensaioAtivoIndex].creditos.artista}</div>
                <div><strong>Fotografia:</strong> {ensaios[ensaioAtivoIndex].creditos.fotografo}</div>
                <div><strong>Modelo:</strong> {ensaios[ensaioAtivoIndex].creditos.modelo}</div>
              </div>
            </footer>
          </div>

          <button className={styles.btnNavRight} onClick={proximaFoto}>&#10095;</button>
        </div>
      )}
    </div>
  );
}