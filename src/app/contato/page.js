import styles from './contato.module.css';

export default function ContatoPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Contato</h1>
        <p>Vamos conversar sobre projetos, workshops ou colaborações fotográficas.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.infoSection}>
          <div className={styles.contactCard}>
            <h3>E-mail</h3>
            <p>edson@exemplo.com</p> 
            <a href="mailto:edson@exemplo.com" className={styles.link}>Enviar Mensagem</a>
          </div>

          <div className={styles.contactCard}>
            <h3>Redes Sociais</h3>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/seuusuario" target="_blank">Instagram</a>
              <a href="https://github.com/seuusuario" target="_blank">GitHub</a>
              <a href="https://linkedin.com/in/seuusuario" target="_blank">LinkedIn</a>
            </div>
          </div>
        </section>

        <section className={styles.locationSection}>
          <h3>Localização</h3>
          <p>Rio de Janeiro, Brasil</p>
          <div className={styles.status}>
            <span className={styles.dot}></span> Disponível para workshops presenciais
          </div>
        </section>
      </div>
    </div>
  );
}