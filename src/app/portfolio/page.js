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
      titulo: 'Estudo de cores e luz',
      descricao: 'Esse ensaio foi em colaboração com uma fotógrafa cujo trabalho admiro muito. A Priscila Melo sabe bem como capturar esses momentos únicos e espontâneos que têm a força para ficar na memória. O Ferri foi um modelo incrível, muito paciente e dedicado. Sua expressividade deu a energia que precisava para esse ensaio.',
      capa: 'IMG-meta_2161_kv83yb_aidwl9.jpg',
      creditos: {
        artista: "Mathias", 
        fotografo: "Priscila Melo",
        modelo: "Ferri" 
      },
      resumo: "Este ensaio técnico-artístico explora o uso de cores e o jogo entre luz natural e artificial, evidenciando o contraste sutil entre a textura rústica da juta, as paisagens orgânicas e a imponência dos monumentos urbanos.",
      galeria: [
        'IMG-meta_2161_kv83yb_aidwl9.jpg',
        'IMG-mta_2100_axdfy0_wjudmt.jpg',
        'IMG-meta_2176red_trkfus_mph1po.jpg',
        'IMG-meta_2068redu_xdqiii_qvc1ez.jpg',
        'IMG-meta_2110red_qjsxau_vsssjb.jpg'
      ]
    },
    {
      id: 2,
      titulo: 'Registro espontâneo de um Domingo',
      descricao: 'Aqui faço um breve registro de um dos meus primeiros workshops. A Naty foi uma das minhas primeiras modelos e parceiras em iniciativas com Shibari. Sou muito grato por ter tido a sua presença e por ela ter me ajudado a chegar a este momento.',
      capa: 'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh',
      creditos: {
        artista: "Mathias",
        fotografo: "Mathias",
        modelo: "Naty"
      },
      resumo: "Registro de um workshop de Shibari num domingo, capturando a espontaneidade e a naturalidade do momento.",
      galeria: [
        'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh',
        'WhatsApp_Image_2023-05-28_at_20.39.28_sq7nz5'
      ]
    },
    {
      id: 3,
      titulo: 'Instantes que Ficam para Sempre',
      descricao: 'Há ensaios que são marcas no tempo. Fotografar a Ester era um desejo antigo e, quando aconteceu, virou um divisor de águas. Aquele mesmo dia me deu a amizade do Pavel, um cara incrível que infelizmente nos deixou pouco tempo depois. O resultado são imagens puras, carregadas de sentimento, vida e memória',
      capa: 'ester-pawel06_vpqlit.jpg',
      creditos: {
        artista: "Mathias",
        fotografo: "Pavel",
        modelo: "Ayanami Ester"
      },
      resumo: "Um ensaio fotográfico com shibari e ikebana, explorando a fusão entre a artes das cordas e a delicadeza das flores. Com Ester e em memória de Pavel.",
      galeria: [
        'ester-pawel06_vpqlit.jpg',
        'ester-pawel02.jpg_aovimw.jpg',
        'ester-pawel03_ddm7ke.jpg',
        'ester-pawel05_iqmgqg.jpg',
        'ester-pawel04_qbdvuw.jpg',
        'pawel_nuctnk.jpg'
      ]
    },
    {
      id: 4,
      titulo: 'O Mundo realmente parou Entre Cordas',
      descricao: 'Valorizo muito os momentos em que conseguimos nos encontrar e nos conectar. É sempre tão prazeroso que entramos em nosso próprio mundo e ali ficamos, nos curtindo e existindo. O final desses momentos sempre chega e, apesar de nunca ser apreciado, é justamente ele que alimenta o nosso desejo de nos conectarmos novamente. Um registro sobre a suspensão do tempo, a entrega e o silêncio que só a corda cria.',
      capa: 'mathias-mist01_gj6hoj.jpg',
      creditos: {
        artista: "Mathias",
        fotografo: "Lucas Gibson",
        modelo: "Mist"
      },
      resumo: "Um ensaio fotográfico sobre o tempo que desacelera na amarração. Registro poético e intimista de Shibari por Mathias, com foto de Lucas Gibson e modelo Mist.",
      galeria: [
        'mathias-mist01_gj6hoj.jpg',
        'mathias-mist06_tumkf1.jpg',
        'mathias-mist05_zgdnrz.jpg',
        'mathias-mist03_vvsos3.jpg',
        'mathias-mist04_tcpetf.jpg'
      ]
    },
    {
      id: 5,
      titulo: 'Gratidão e Confiança em Suspensão',
      descricao: 'Recém-chegado da Costa Rica, trouxe na bagagem intangível novas técnicas e experiências. Bastou um convite para que a Lis aceitasse me dar o presente mais precioso que um rigger pode receber. O resultado dessa entrega corajosa foi o registro da Tenshi Scorpion, uma posição de força e elegância singulares. A Lis foi uma modelo espetacular, sustentando cada tensão, enquanto o olhar atento de Lucas Gibson eternizou esse momento de forma impecável. Fica aqui meu profundo agradecimento à Lis por essa parceria e pela confiança sem hesitação; transformamos essa experiência e aprendizado em arte.',
      capa: 'mathias-lis02_cmhl11.jpg',
      creditos: {
        artista: "Mathias",
        fotografo: "Lucas Gibson",
        modelo: "Lis"
      },
      resumo: "Um registro de gratidão e pura confiança em meio à um festa. registro da Tenshi Scorpion por Mathias com a modelo Lis e fotos de Lucas Gibson.",
      galeria: [
        'mathias-lis02_cmhl11.jpg',
        'mathias-lis05_bgitcf.jpg',
        'mathias-lis04_muvqn3.jpg',
        'mathias-lis01_vfisav.jpg',
        'mathias-lis03_wc2mb2.jpg'
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