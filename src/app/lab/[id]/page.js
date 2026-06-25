// src/app/lab/[id]/page.js
import Link from 'next/link';
import styles from '../lab.module.css';

export default async function PesquisaCompletaPage({ params }) {
  const { id } = await params;
  const artigoId = Array.isArray(id) ? id[0] : id;

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
    },
    3: {
      titulo: "Minha inesperada história com o Shibari", 
      tag: "biografia",
      introducao: "Hoje percebo que meu primeiro contato foi bem incomum, pois até então, na época em questão, o Shibari não estava tendo tantas intervenções artísticas.",
      conteudo: [
        "Minha história com o Shibari começou de uma forma inesperada e até um pouco inusitada.",
        "Era 2009. Eu estava no meu notebook olhando coisas aleatórias na internet quando, do nada, encontrei uma reportagem que mostrava uma pedra e uma árvore atadas por cordas em uma simetria impecável. Aquela intervenção artística num cenário verde e tranquilo chamou a minha atenção. A reportagem falava de um artista japonês que fazia arte com cordas de uma forma inovadora. Fiquei intrigado: como poderia ser tão inovador fazer arte com cordas? Depois, descobri que o Shibari era muito difundido como uma prática mais sensual feita entre pessoas. Fazer Shibari sem mostrar pessoas era bem incomum. Até ali, para mim, a corda era um item puramente utilitário. Naquele dia, percebi que ela poderia ser poesia visual; poderia ser arte.",
        "Intrigado e querendo ver aquela estética de perto, comecei a pesquisar. Descobri que aqui no Rio de Janeiro o Shibari existia em eventos voltados ao público BDSM. Aos 19 anos, peguei o transporte e fui a um desses eventos. Sozinho. Meus amigos não quiseram ir, mas desde cedo aprendi uma regra de ouro para a minha vida: se eu quero que algo aconteça, eu preciso ir atrás e fazer acontecer.",
        "A experiência foi marcante, mas gerou um estranhamento profundo. O Shibari que vi ali, inserido em um contexto estritamente sexualizado, era bonito e excitante, mas não era o que eu buscava. Minha mente ainda estava presa àquela árvore e àquela pedra; eu enxergava a corda como uma manifestação artística abstrata.",
        "Hoje percebo que meu primeiro contato foi bem incomum, pois até então, na época em questão, o Shibari não estava tendo tantas intervenções artísticas. A maioria das pessoas tem um primeiro contato com um Shibari mais sexualizado, sensualizado.",
        "Busquei pessoas que ensinassem a técnica, mas nenhuma abordagem alcançava a minha expectativa. Foi então que, com a ousadia típica de um ariano em sua plena juventude, pensei comigo mesmo: Vou aprender sozinho, Quão difícil pode ser aprender a amarrar alguém?.",
        "Resumindo a história: quebrei a cara.", 
        "O Shibari provou ser uma das artes mais complexas e profundas que já tentei dominar. Não havia material em português; eu passava noites decifrando vídeos escassos em inglês. Minha primeira corda foi uma de 8 milímetros com 20 metros de comprimento, de algodão, que comprei numa casa de construção no centro do Rio de Janeiro. Demorou para eu conseguir juntar uma grana e comprar minhas primeiras cordas de juta. Meus primeiros nós eram horrorosos. Eu não sabia a espessura correta, não entendia a anatomia das cordas e nem das suas particularidades, nem como gerenciar a tensão. Eu só fui!",
        "Foram 8 anos quebrando a cabeça em um processo puramente autodidata.",
        "Hoje, olhando para trás em 2026, vejo que esse caminho árduo e solitário foi o meu maior presente. Foram esses anos de tentativa e erro que me permitiram construir uma identidade própria no Shibari, livre de vícios e cheia de respeito pela técnica. Anos mais tarde, a vida me levou a estudar Engenharia, e toda aquela intuição sobre tração, forças e segurança que desenvolvi na marra com as cordas finalmente ganhou nomes técnicos. Mas a paixão pela estrutura nasceu ali, no chão do quarto, errando o mesmo nó dezenas de vezes.",
        "O apelido Mathias, que pegou em 2009 por conta de um filme, acabou se tornando o nome que define quem eu sou e como assino o meu trabalho.",
        "Hoje, o projeto Cordas de Mathias não é apenas o meu portfólio. Este Lab nasceu com a missão de desmistificar, educar e conscientizar. Aqui, eu transformo a minha jornada em conhecimento acessível. Da fabricação artesanal das minhas próprias cordas de juta até a sala de aula onde hoje ensino outras pessoas, meu objetivo permanece o mesmo de quando vi aquela primeira foto: mostrar que a corda é um diálogo, uma estrutura viva e, acima de tudo, arte."],
      links: [
        { texto: "Galeria e Portfólio de Fotografia de Amarras", url: "/portfolio" },
        { texto: "Estudos de Tensão e Geometria da Amarra", url: "#" }
      ],
      //referencias: [
        //"MATHIAS, C. Cordas de Mathias: Técnica e Expressão Visual. Rio de //Janeiro: Lab Press, 2025.",
        //"RICCI, G. A Arte da Corda: Estética e Prática Ocidental. Lisboa: Edições Corpo, 2022."
      //]
    }
  };

  const artigo = artigos[artigoId] || artigos[String(artigoId)] || artigos[Number(artigoId)];

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