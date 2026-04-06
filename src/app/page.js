"use client";
import { CldImage } from 'next-cloudinary';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.heroContainer}>
      {/* A imagem de fundo vinda do seu Cloudinary */}
      <CldImage
        src="hero-bg_fpjh2t" // Seu Public ID
        fill
        alt="Background Shibari Lab"
        className={styles.heroImage}
        priority // Garante que carregue primeiro que tudo
      />

      {/* Camada de sobreposição (Overlay) para o texto não sumir */}
      <div className={styles.overlay}></div>

      {/* Conteúdo Centralizado */}
      <div className={styles.heroContent}>
        <h1>SHIBARI LAB</h1>
        <p>A intersecção entre a técnica, a estética e a pesquisa.</p>
        <div className={styles.ctaButtons}>
          <a href="/workshops" className={styles.btnPrimary}>Ver Workshops</a>
          <a href="/lab" className={styles.btnSecondary}>Explorar o Lab</a>
        </div>
      </div>
    </div>
  );
}