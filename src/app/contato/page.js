import styles from './contato.module.css';

export default function ContatoPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Contato</h1>
        <p>Vamos conversar sobre projetos, aulas, workshops ou colabs.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.infoSection}>
          <div className={styles.contactCard}>
            <h3>E-mail</h3>
            <p>cordasdomathias@gmail.com</p> 
            <a href="mailto:cordasdomathias@gmail.com" className={styles.link}> Enviar Mensagem </a>
          </div>

          <div className={styles.contactCard}>
            <h3>Redes Sociais</h3>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/cordasdemathias/" target="_blank">Instagram</a>
              
             
            </div>
          </div>
        </section>

        <section className={styles.locationSection}>
          <h3>Localização</h3>
          <p>Rio de Janeiro, Brasil</p>
          <div className={styles.status}>
            <span className={styles.dot}></span> Disponível para workshops presenciais e colabs.
          </div>
        </section>
      </div>
    </div>
  );
}