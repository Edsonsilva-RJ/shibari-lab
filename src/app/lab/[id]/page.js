// src/app/lab/[id]/page.js
import Link from 'next/link';
import styles from '../lab.module.css';

export default function PesquisaCompletaPage({ params }) {
  const { id } = params;

  // "Banco de dados" dos seus artigos completos
  const artigos = {
    1: {
      titulo: "Energia Fotovoltaica e Sustentabilidade",
      tag: "Engenharia",
      introducao: "Uma análise técnica aprofundada sobre a viabilidade e o dimensionamento de sistemas solares fotovoltaicos residenciais em ambientes urbanos, com foco na eficiência energética baseada nas normas vigentes (NBR 5410).",
      conteudo: [
        "A busca por fontes de energia renováveis tem deixado de ser apenas uma alternativa ecológica e se tornado uma necessidade estrutural urbana. No cenário atual, os sistemas fotovoltaicos conectados à rede (on-grid) representam a tecnologia mais viável para a transição energética residencial.",
        "Para um dimensionamento correto, é essencial analisar o índice de irradiação solar local e a média de consumo em quilowatts-hora (kWh) da residência. Cabos com isolamento adequado (como condutores de 10mm para altas correntes) e dispositivos de proteção como disjuntores e DPS são críticos para evitar quedas de tensão e garantir a segurança do sistema contra surtos atmosféricos.",
      ],
      links: [
        { texto: "Simulador de Potência Solar (CRESESB)", url: "http://www.cresesb.cepel.br" },
        { texto: "Consulta de Irradiação Solar no Rio de Janeiro", url: "#" }
      ],
      referencias: [
        "ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 5410: Instalações elétricas de baixa tensão. Rio de Janeiro, 2004.",
        "COELHO, S. T. Energia Solar Fotovoltaica no Brasil: Desafios e Perspectivas. São Paulo: Editora Técnica, 2024."
      ]
    },
    2: {
      titulo: "A Estética do Shibari no Século XXI",
      tag: "Cultura",
      introducao: "Este ensaio explora a evolução técnica das amarras japonesas e como os conceitos de física, engenharia de cordas e fotografia DSLR manual se conectam para criar narrativas visuais contemporâneas.",
      conteudo: [
        "O Shibari transcendeu seu contexto histórico para se consolidar como uma expressão de arte e performance geométrica. Sob a ótica da fotografia, as linhas criadas pelas cordas funcionam como guias de enquadramento natural, dividindo o espaço e direcionando o olhar do espectador.",
        "Do ponto de vista físico, a distribuição de carga e o controle milimétrico das tensões nas cordas de juta ou cânhamo são fundamentais. O atrito das fibras determina a estabilidade dos nós, exigindo do aplicador um conhecimento intuitivo de tração, equilíbrio e anatomia, garantindo que a estética ande de mãos dadas com a segurança e o conforto da modelo.",
      ],
      links: [
        { texto: "Galeria e Portfólio de Fotografia de Amarras", url: "/portfolio" },
        { texto: "Estudos de Tensão e Geometria da Amarra", url: "#" }
      ],
      referencias: [
        "MATHIAS, C. Cordas de Mathias: Técnica e Expressão Visual. Rio de Janeiro: Lab Press, 2025.",
        "RICCI, G. A Arte da Corda: Estética e Prática Ocidental. Lisboa: Edições Corpo, 2022."
      ]
    }
  };

  const artigo = artigos[id];

  // Se o usuário digitar um ID que não existe na URL
  if (!artigo) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>404</h1>
          <p>Artigo ou pesquisa não encontrada no acervo do Lab.</p>
          <Link href="/lab" className={styles.readMore}>← Voltar para o Lab</Link>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Botão de Voltar */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/lab" style={{ fontSize: '0.9rem', opacity: 0.7 }}>← Voltar para o Lab</Link>
      </div>

      <article>
        <header className={styles.header} style={{ marginBottom: '2.5rem' }}>
          <span className={styles.tag}>{artigo.tag}</span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', lineHeight: '1.2' }}>{artigo.titulo}</h1>
        </header>

        {/* Introdução Destacada */}
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9, lineHeight: '1.6', marginBottom: '2rem', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
          {artigo.introducao}
        </p>

        {/* Corpo do Texto */}
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {artigo.conteudo.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
        </div>

        {/* Links Úteis / Materiais Relacionados */}
        {artigo.links && artigo.links.length > 0 && (
          <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '6px' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--accent)' }}>Links & Materiais Úteis</h3>
            <ul style={{ listStyleType: 'square', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {artigo.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target={link.url.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '500' }}>
                    {link.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Seção de Referências Bibliográficas */}
        {artigo.referencias && artigo.referencias.length > 0 && (
          <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', opacity: 0.8 }}>Referências</h3>
            <ol style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {artigo.referencias.map((ref, idx) => (
                <li key={idx} style={{ paddingLeft: '0.5rem' }}>{ref}</li>
              ))}
            </ol>
          </footer>
        )}
      </article>
    </div>
  );
}