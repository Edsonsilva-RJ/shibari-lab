import styles from './workshops.module.css';

export default function WorkshopsPage() {
  // Lista de eventos - Você pode atualizar as datas aqui facilmente
  const eventos = [
    {
      id: 1,
      titulo: "Introdução às Amarras de Chão",
      data: "25 de Abril, 2026",
      horario: "14:00 - 18:00",
      local: "Estúdio Glória, RJ",
      status: "Inscrições encerradas",
      formsLink: ""
    },
    {
      id: 2,
      titulo: "Workshop de Fotografia e Performance",
      data: "10 de Maio, 2026",
      horario: "09:00 - 13:00",
      local: "Santa Teresa, RJ",
      status: "Brevemente",
      formsLink: "#"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Agenda & Workshops</h1>
        <p>Fique por dentro da minha agenda aberta e sessões de estudo coletivo.</p>
      </header>

      <section className={styles.agendaList}>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} className={styles.eventoCard}>
              <div className={styles.dateBadge}>
                <span className={styles.day}>{evento.data.split(' ')[0]}</span>
                <span className={styles.month}>{evento.data.split(' ')[2]}</span>
              </div>
              
              <div className={styles.details}>
                <h2>{evento.titulo}</h2>
                <p>📍 {evento.local} | ⏰ {evento.horario}</p>
                <span className={styles.statusTag}>{evento.status}</span>
              </div>

              <div className={styles.action}>
                {evento.formsLink !== "#" ? (
                  <a href={evento.formsLink} target="_blank" className={styles.btnInscriçao}>
                    Inscrever-se via Google Forms
                  </a>
                ) : (
                  <button disabled className={styles.btnDisabled}>Vagas em breve</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Nenhum workshop agendado no momento. Acompanhe as redes sociais!</p>
        )}
      </section>

      <footer className={styles.infoFooter}>
        <p>Você tem uma proposta de oficina ou quer um workshop/aula privada? <a href="/contato">Entre em contato</a>.</p>
      </footer>
    </div>
  );
}