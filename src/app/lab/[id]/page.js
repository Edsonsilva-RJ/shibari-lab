// src/app/lab/[id]/page.js
import Link from 'next/link';
import styles from '../lab.module.css';

export default async function PesquisaCompletaPage({ params }) {
  const { id } = await params;
  const artigoId = Array.isArray(id) ? id[0] : id;

  // "Banco de dados" dos seus artigos completos
  const artigos = {
    1: {
      titulo: "Lorem Ipsum",
      tag: "teste",
      introducao: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      conteudo: [
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
      ],
      links: [
        { texto: "O que é Lorem Ipsum?", url: "https://br.lipsum.com/" },
        { texto: "Lorem Ipsum usado", url: "https://loremipsum.io/generator/?n=5&t=p" }
      ],
      referencias: [
        "Silva, E. H.Coisas não tão aleatorias que aprendi: Uma reflexão sobre coisas que você nem procurou saber. Rio de Janeiro, 2018.",
    
      ]
    },
    2: {
      titulo: "O que é o Shibari? Qual a sua historia ?",
      tag: "Historia e Cultura",
      introducao: "Para quem vê de fora, o Shibari pode parecer apenas um emaranhado complexo de nós e cordas. Para quem estuda e pratica, ele é uma linguagem. Mas para entender o que essa arte representa hoje, é preciso desatar os preconceitos do senso comum e fazer uma viagem no tempo.",
      conteudo: [
        "O que é o Shibari? Qual a sua historia ?",
        "Para quem vê de fora, o Shibari pode parecer apenas um emaranhado complexo de nós e cordas. Para quem estuda e pratica, ele é uma linguagem. Mas para entender o que essa arte representa hoje, é preciso desatar os preconceitos do senso comum e fazer uma viagem no tempo.",

        "O Shibari não nasceu nos estúdios de arte contemporânea e nem nos quartos de fetiche. Ele nasceu nos campos de batalha do Japão Feudal, por volta do século XIV.",

        "Nessa época, os Samurais e a polícia japonesa não usavam algemas de metal para prender seus prisioneiros; eles usavam cordas (nawa). Esse sistema altamente sofisticado de contenção física e aplicação da lei chamava-se Hojo-jutsu ou Nawajutsu.",

        "O nascimento do Hojo-jutsu também foi uma resposta estratégica à escassez de recursos. Em um Japão feudal — sendo um arquipélago vulcânico, isolado e em guerra constante —, o metal era um recurso precioso e limitado, reservado quase que exclusivamente para a fundição de katanas, lanças, armas num geral e armaduras. Fabricar algemas de metal em larga escala era inviável. Em contrapartida, as fibras naturais estavam abundantemente à mão. Os japoneses transformaram a fibra vegetal em uma arma de contenção leve, barata e inegavelmente versátil.",

        "Diferente do que muitos imaginam, o Hojo-jutsu não era uma técnica de tortura. Havia uma ética rigorosa por trás das amarrações: o prisioneiro deveria ser contido com segurança absoluta para não escapar, e a corda não podia causar danos permanentes à sua circulação ou articulações. Ele precisava chegar intacto ao julgamento e, aí sim, receber sua sentença.",

        "Outra coisa bem interessante é que as amarrações refletiam a estrutura social da época. Um samurai capturado era amarrado com nós complexos e discretos, que escondiam as pontas da corda para preservar sua dignidade e honra. Já um criminoso comum recebia amarrações mais brutas e visíveis. Os nós precisavam ser geometricamente limpos e simétricos. Um nó feio ou mal feito era visto como um sinal de fraqueza técnica e desonra por parte de quem amarrava. Foi exatamente esse cuidado com a geometria, a simetria e o respeito à anatomia que plantou a semente do que viria a seguir.",

        "Com o fim da era dos Samurais e a modernização do Japão, as técnicas de restrição tiveram de mudar. O Hojo-jutsu perdeu sua utilidade prática nas ruas e campos de batalha, mas não desapareceu: ele migrou para os palcos do Teatro Kabuki, encenando o drama e a plasticidade dos prisioneiros capturados, e derivou práticas que hoje conhecemos como Shibari, Kinbaku e Torinawa-jutsu.",

        "No início do século XX, o artista e fotógrafo japonês Seiu Ito (1882–1961) mudou o rumo da história. Ele começou a resgatar os manuais antigos de Hojo-jutsu e a aplicar aquelas amarrações em modelos, registrando tudo em fotografias. Ao fazer isso, Seiu Ito transformou a corda de uma ferramenta de restrição em uma ferramenta de expressão emocional, drama e beleza visual. Ali nascia o Kinbaku moderno, que significa (amarração apertada), focado na conexão, na entrega e no diálogo psicológico entre os praticantes.",

        "Com o passar das décadas, a técnica se espalhou pelo mundo e ganhou o nome de Shibari, que significa literalmente (amarrar).",

        "No século XXI, o Shibari rompeu definitivamente as barreiras dos nichos restritos e das visões puramente sexualizadas. Hoje, ele é reconhecido globalmente como uma vertente de arte contemporânea, performance e intervenção visual. Artistas modernos usam a corda de juta para criar geometrias abstratas no corpo humano, dialogar com a gravidade através de suspensões e até mesmo realizar intervenções na natureza, atando pedras, árvores e transformando cenários inteiros.",

        "Hoje, fazer Shibari é entender de física (vetores de força, fricção e distribuição de carga), de anatomia (preservação de nervos e zonas de risco) e de presença absoluta. A corda deixou de ser um item puramente utilitário para se tornar uma extensão do sentir; uma estrutura viva onde o nó é o ponto de encontro entre a técnica, a segurança e a poesia visual.",
      ],
      links: [
        { texto: "Galeria e Portfólio de Fotografia de Amarras", url: "/portfolio" }

      ],
      referencias: [
        "MATHIAS, C. Cordas de Mathias: Técnica e Expressão Visual. Rio de Janeiro: Lab Press, 2030."
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
        { texto: "Galeria e Portfólio de Fotografia de Amarras", url: "/portfolio" }
      ],
      referencias: [
        "MATHIAS, C. Cordas de Mathias: Técnica e Expressão Visual. Rio de //Janeiro: Lab Press, 2035."]
      
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