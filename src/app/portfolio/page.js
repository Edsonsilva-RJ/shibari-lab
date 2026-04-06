"use client";
import { CldImage } from 'next-cloudinary';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  // Aqui você colocará os IDs das fotos que subir no Cloudinary
  const fotos = [
    { id: 'hero-bg_fpjh2t', alt: 'Trabalho de Shibari 1', legenda: 'Estudo de Linhas' },
    { id: 'WhatsApp_Image_2023-05-28_at_20.39.24_mcw7vh', alt: 'Trabalho de Shibari 1', legenda: 'Estudo de Linhas' },
     { id: 'WhatsApp_Image_2023-05-28_at_20.39.28_sq7nz5', alt: 'Trabalho de Shibari 1', legenda: 'Estudo de Linhas' },
    // Adicione mais IDs conforme for subindo as fotos
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfólio</h1>
        <p>Registos fotográficos de amarrações e explorações estéticas.</p>
      </header>

      <section className={styles.galleryGrid}>
        {fotos.map((foto) => (
          <div key={foto.id} className={styles.photoCard}>
            <div className={styles.imageWrapper}>
              <CldImage
                src={foto.id}
                width="600"
                height="800"
                crop="fill"
                alt={foto.alt}
                className={styles.image}
              />
            </div>
            <div className={styles.photoInfo}>
              <span>{foto.legenda}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}