// src/app/loja/page.js
"use client"; 
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import styles from './loja.module.css';

export default function LojaPage() {
  const ID_IMAGEM_PADRAO = "opcao1"; 

  // Estados do Modal / Lightbox
  const [produtoAtivoIndex, setProdutoAtivoIndex] = useState(-1);
  const [fotoAtualIndex, setFotoAtualIndex] = useState(0);

  // Estado do Carrinho de Compras e Visibilidade da gaveta
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  // NOVO: Estado para a categoria ativa no filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Inicializa o carrinho com dados salvos no navegador
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('cordas_mathias_cart');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
  }, []);

  // Salva o carrinho localmente sempre que sofrer mutações
  const salvarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('cordas_mathias_cart', JSON.stringify(novoCarrinho));
  };

  // Catálogo com os 7 itens cadastrados
  const produtos = [
    {
      id: 1,
      titulo: "Corda de Juta Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta natural de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em amarrações de chão ou suspensões.",
      preco: 75.00,
      status: "Pronta entrega",
      quantidadeDisponivel: 5,
      galeria: ["opcao1", "hero-bg_fpjh2t"] 
    },
    {
      id: 2,
      titulo: "Cera Hidratante para Cordas - 50Gr",
      categoria: "Manutenção",
      imagem: "", 
      descricao: "Cera hidratante ideal para cordas de fibra natural, feita com ingredientes pensados para mantém a corda hidratada, flexível e resistente.",
      preco: 35.00,
      status: "Pronta entrega",
      quantidadeDisponivel: 12,
      galeria: ["opcao1", "hero-bg_fpjh2t"] 
    },
    {
      id: 3,
      titulo: "Kit iniciante: 2 Cordas + Tesoura de ponta romba",
      categoria: "Kit",
      imagem: "", 
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: 165.00,
      status: "Sob demanda",
      quantidadeDisponivel: 99,
      galeria: ["opcao1"] 
    },
    {
      id: 4,
      titulo: "Corda de Juta colorida Tratada - 8m / 5.5mm",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "Corda de juta temporariamente tingida de alta qualidade, tratada com óleo de jojoba e cera de abelha. Pronta para uso em amarras de chão ou suspensões.",
      preco: 115.00,
      status: "Sob demanda",
      quantidadeDisponivel: 99,
      galeria: ["opcao1"] 
    },
    {
      id: 5,
      titulo: "Cera hidratante premium para cordas- 50GR",
      categoria: "Manutenção",
      imagem: "", 
      descricao: "Cera hidratante premium ideal para cordas de fibra natural, feita com ingredientes 100% organicos pensados para manter a corda hidratada, flexível e resistente.",
      preco: 45.25,
      status: "Pronta entrega",
      quantidadeDisponivel: 3,
      galeria: ["opcao1"] 
    },
    {
      id: 6,
      titulo: "Kit iniciante II: 2 Cordas + Tesoura de ponta romba + Cera hidratante 50 Gr",
      categoria: "Kit",
      imagem: "", 
      descricao: "Combo ideal para quem está iniciando: duas cordas de juta tratadas de 8m, cera hidratante 50Gr e uma tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: 195.00,
      status: "Não disponível",
      quantidadeDisponivel: 0,
      galeria: ["opcao1"] 
    },
    {
      id: 7,
      titulo: "Tesoura de ponta romba",
      categoria: "Equipamento",
      imagem: "", 
      descricao: "tesoura de ponta romba (ponta redonda) para cortes seguros e rápidos nos momentos de emergência.",
      preco: 25.00,
      status: "Pronta entrega",
      quantidadeDisponivel: 8,
      galeria: ["opcao1"] 
    }
  ];

  // NOVO: Extração dinâmica das categorias únicas existentes no catálogo
  const categoriasDisponiveis = ["Todos", ...new Set(produtos.map(p => p.categoria))];

  // NOVO: Filtragem dos produtos que serão de fato exibidos na tela
  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtos 
    : produtos.filter(produto => produto.categoria === categoriaAtiva);

  // Funções da Galeria Lightbox
  const abrirLightbox = (indexInFiltrados) => {
    // Encontra o index real no array original de produtos para não quebrar o modal
    const produtoSelecionado = produtosFiltrados[indexInFiltrados];
    const indexReal = produtos.findIndex(p => p.id === produtoSelecionado.id);
    setProdutoAtivoIndex(indexReal);
    setFotoAtualIndex(0);
  };

  const fecharLightbox = () => setProdutoAtivoIndex(-1);

  const proximaFoto = (e) => {
    e.stopPropagation();
    const galeria = produtos[produtoAtivoIndex].galeria;
    setFotoAtualIndex((prev) => (prev + 1) % galeria.length);
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    const galeria = produtos[produtoAtivoIndex].galeria;
    setFotoAtualIndex((prev) => (prev - 1 + galeria.length) % galeria.length);
  };

  // Funções do Carrinho
  const adicionarAoCarrinho = (e, produto) => {
    e.stopPropagation();
    if (produto.status === "Não disponível") return;

    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
      if (produto.status === "Pronta entrega" && itemExistente.quantidade >= produto.quantidadeDisponivel) {
        alert(`Desculpe, temos apenas ${produto.quantidadeDisponivel} unidades deste item em pronta entrega.`);
        return;
      }
      const carrinhoAtualizado = carrinho.map(item =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      salvarCarrinho(carrinhoAtualizado);
    } else {
      salvarCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
    setCarrinhoAberto(true);
  };

  const alterarQuantidade = (id, delta, maxDisponivel, status) => {
    const carrinhoAtualizado = carrinho.map(item => {
      if (item.id === id) {
        const novaQtd = item.quantidade + delta;
        if (novaQtd < 1) return item;
        if (status === "Pronta entrega" && novaQtd > maxDisponivel) {
          alert(`Limite de estoque atingido para pronta entrega (${maxDisponivel} unidades).`);
          return item;
        }
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });
    salvarCarrinho(carrinhoAtualizado);
  };

  const removerDoCarrinho = (id) => {
    const carrinhoFiltrado = carrinho.filter(item => item.id !== id);
    salvarCarrinho(carrinhoFiltrado);
  };

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const prosseguirParaCheckout = () => {
    alert("Redirecionando de forma segura para a verificação de cadastro, confirmação de pedido e gateway de pagamentos com criptografia SSL...");
  };

  const renderBadgeStatus = (status) => {
    if (status === "Pronta entrega") return <span className={`${styles.badge} ${styles.badgePronta}`}>Pronta Entrega</span>;
    if (status === "Sob demanda") return <span className={`${styles.badge} ${styles.badgeDemanda}`}>Sob Demanda</span>;
    return <span className={`${styles.badge} ${styles.badgeEsgotado}`}>Não Disponível</span>;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Loja Lab</h1>
        <p>Equipamentos selecionados, cordas tratadas artesanalmente e produções autorais da Cordas de Mathias.</p>
        
        <button className={styles.btnCartToggle} onClick={() => setCarrinhoAberto(true)}>
          🛒 Carrinho ({totalItens})
        </button>
      </header>

      {/* NOVO: Barra de Filtros por Categoria */}
      <nav className={styles.filterNav}>
        {categoriasDisponiveis.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${categoriaAtiva === cat ? styles.filterBtnActive : ''}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className={styles.grid}>
        {/* MODIFICADO: Mapeia o array já filtrado ao invés do estático */}
        {produtosFiltrados.map((produto, index) => {
          const imagemExibida = produto.imagem || ID_IMAGEM_PADRAO;
          
          return (
            <article 
              key={produto.id} 
              className={`${styles.productCard} ${produto.status === "Não disponível" ? styles.disabledCard : ''}`}
              onClick={() => abrirLightbox(index)}
            >
              <div className={styles.imageWrapper}>
                <CldImage
                  src={imagemExibida}
                  fill
                  alt={produto.titulo}
                  className={styles.productImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.hoverOverlay}>
                  Ver Detalhes ({produto.galeria.length})
                </div>
                <div className={styles.statusBadgeWrapper}>
                  {renderBadgeStatus(produto.status)}
                </div>
              </div>

              <div className={styles.productInfo}>
                <span className={styles.tag}>{produto.categoria}</span>
                <h2>{produto.titulo}</h2>
                <p className={styles.description}>{produto.descricao}</p>
                
                <div className={styles.footerRow}>
                  <span className={styles.price}>
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  
                  <button 
                    className={`${styles.btnBuy} ${produto.status === "Não disponível" ? styles.btnDisabled : ''}`}
                    disabled={produto.status === "Não disponível"}
                    onClick={(e) => adicionarAoCarrinho(e, produto)}
                  >
                    {produto.status === "Pronta entrega" && "Adicionar item"}
                    {produto.status === "Sob demanda" && "Encomendar"}
                    {produto.status === "Não disponível" && "Esgotado"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Gaveta / Sidebar Lateral do Carrinho */}
      {carrinhoAberto && (
        <div className={styles.cartOverlay} onClick={() => setCarrinhoAberto(false)}>
          <div className={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h2>Seu Carrinho</h2>
              <button className={styles.btnCloseCart} onClick={() => setCarrinhoAberto(false)}>&times;</button>
            </div>

            {carrinho.length === 0 ? (
              <p className={styles.emptyCartText}>Seu carrinho está vazio no momento.</p>
            ) : (
              <>
                <div className={styles.cartItemsList}>
                  {carrinho.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.cartItemDetails}>
                        <h4>{item.titulo}</h4>
                        <span className={styles.cartItemCategory}>{item.categoria} - {item.status}</span>
                        <p className={styles.cartItemPrice}>
                          {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                      
                      <div className={styles.cartItemActions}>
                        <div className={styles.quantitySelector}>
                          <button onClick={() => alterarQuantidade(item.id, -1, item.quantidadeDisponivel, item.status)}>-</button>
                          <span>{item.quantidade}</span>
                          <button onClick={() => alterarQuantidade(item.id, 1, item.quantidadeDisponivel, item.status)}>+</button>
                        </div>
                        <button className={styles.btnRemoveItem} onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cartFooter}>
                  <div className={styles.totalRow}>
                    <span>Subtotal:</span>
                    <strong>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                  </div>
                  <button className={styles.btnCheckout} onClick={prosseguirParaCheckout}>
                    Fechar Pedido Seguramente
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Lightbox / Modal Expandido */}
      {produtoAtivoIndex !== -1 && (
        <div className={styles.lightbox} onClick={fecharLightbox}>
          <button className={styles.btnClose} onClick={fecharLightbox}>&times;</button>
          
          {produtos[produtoAtivoIndex].galeria.length > 1 && (
            <>
              <button className={styles.btnNavLeft} onClick={fotoAnterior}>&#10094;</button>
              <button className={styles.btnNavRight} onClick={proximaFoto}>&#10095;</button>
            </>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageContainer}>
              <CldImage
                src={produtos[produtoAtivoIndex].galeria[fotoAtualIndex] || ID_IMAGEM_PADRAO}
                width="800"
                height="800"
                crop="fit"
                alt="Visualização do produto"
                className={styles.lightboxImage}
              />
            </div>

            <footer className={styles.lightboxFooter}>
              <div className={styles.footerMain}>
                <h3>{produtos[produtoAtivoIndex].titulo}</h3>
                <span className={styles.counter}>
                  {fotoAtualIndex + 1} de {produtos[produtoAtivoIndex].galeria.length}
                </span>
              </div>
              <p className={styles.modalDescription}>{produtos[produtoAtivoIndex].descricao}</p>
              <div className={styles.modalFooterRow}>
                <span className={styles.modalPrice}>
                  {produtos[produtoAtivoIndex].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                
                <button 
                  className={`${styles.btnBuy} ${produtos[produtoAtivoIndex].status === "Não disponível" ? styles.btnDisabled : ''}`}
                  disabled={produtos[produtoAtivoIndex].status === "Não disponível"}
                  onClick={(e) => {
                    adicionarAoCarrinho(e, produtos[produtoAtivoIndex]);
                    fecharLightbox();
                  }}
                >
                  {produtos[produtoAtivoIndex].status === "Pronta entrega" && "Adicionar ao Carrinho"}
                  {produtos[produtoAtivoIndex].status === "Sob demanda" && "Encomendar sob demanda"}
                  {produtos[produtoAtivoIndex].status === "Não disponível" && "Esgotado"}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}