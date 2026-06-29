// src/app/loja/checkout/page.js
"use client";
import { useState, useEffect } from 'react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  // Estado do formulário de cadastro e envio
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  // Carrega o carrinho preenchido na página da loja
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('cordas_mathias_cart');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (e) {
        console.error("Erro ao carregar o carrinho no checkout", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Autocompleta o endereço de forma segura usando a API pública ViaCEP
  const buscarCep = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar CEP", err);
    }
  };

  const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const handleFinalizarPedido = async (e) => {
    e.preventDefault();
    setCarregando(true);

    // Estrutura de dados segura para enviar à API
    const payload = {
      cliente: formData,
      itens: carrinho.map(item => ({
        id: item.id,
        quantidade: item.quantity || item.quantidade // Garante conformidade com o estado do carrinho
      }))
    };

    try {
      // Aqui faremos a chamada para nossa rota de API backend /api/checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redireciona o cliente para o ambiente de pagamento criptografado (Stripe/Mercado Pago)
        localStorage.removeItem('cordas_mathias_cart'); // Limpa o carrinho após sucesso
        window.location.href = data.url;
      } else {
        alert(data.error || "Houve um erro ao processar o checkout. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no fluxo de checkout:", error);
      alert("Erro de conexão com o servidor de pagamentos.");
    } finally {
      setCarregando(false);
    }
  };

  if (carrinho.length === 0) {
    return (
      <div className={styles.containerEmpty}>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione itens na loja antes de prosseguir para o checkout.</p>
        <a href="/loja" className={styles.btnVoltar}>Voltar para a Loja</a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirmação do Pedido</h1>
      
      <div className={styles.layoutGrid}>
        {/* Formulário de Cadastro e Envio */}
        <form onSubmit={handleFinalizarPedido} className={styles.checkoutForm}>
          <section className={styles.section}>
            <h3>1. Seus Dados de Cadastro</h3>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input type="text" name="nome" required value={formData.nome} onChange={handleChange} />
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>E-mail</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Telefone / WhatsApp</label>
                <input type="tel" name="telefone" placeholder="(21) 99999-9999" required value={formData.telefone} onChange={handleChange} />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>CPF (Necessário para emissão da nota/segurança antifraude)</label>
              <input type="text" name="cpf" placeholder="000.000.000-00" required value={formData.cpf} onChange={handleChange} />
            </div>
          </section>

          <section className={styles.section}>
            <h3>2. Endereço de Entrega</h3>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>CEP</label>
                <input type="text" name="cep" onBlur={buscarCep} required value={formData.cep} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup} style={{ flex: 2 }}>
                <label>Rua / Logradouro</label>
                <input type="text" name="rua" required value={formData.rua} onChange={handleChange} />
              </div>
            </div>
            
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Número</label>
                <input type="text" name="numero" required value={formData.numero} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup} style={{ flex: 2 }}>
                <label>Complemento</label>
                <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Bairro</label>
                <input type="text" name="bairro" required value={formData.bairro} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Cidade</label>
                <input type="text" name="cidade" required value={formData.cidade} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup} style={{ maxWdith: '100px' }}>
                <label>Estado</label>
                <input type="text" name="estado" maxLength="2" required value={formData.estado} onChange={handleChange} />
              </div>
            </div>
          </section>

          <button type="submit" disabled={carregando} className={styles.btnSubmitPayment}>
            {carregando ? "Processando Ambiente Seguro..." : "Ir para o Pagamento Seguro"}
          </button>
        </form>

        {/* Resumo Fixo do Pedido ao Lado */}
        <div className={styles.summarySidebar}>
          <h3>Resumo do Pedido</h3>
          <div className={styles.itemsList}>
            {carrinho.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div>
                  <h4>{item.titulo}</h4>
                  <span className={styles.itemMeta}>Qtd: {item.quantidade} x {item.status}</span>
                </div>
                <strong className={styles.itemPrice}>
                  {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>
              </div>
            ))}
          </div>
          
          <div className={styles.totalContainer}>
            <div className={styles.totalRow}>
              <span>Produtos:</span>
              <span>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Frete:</span>
              <span className={styles.freteGratis}>A calcular / Combinar</span>
            </div>
            <hr className={styles.divider} />
            <div className={styles.finalTotalRow}>
              <span>Total Geral:</span>
              <strong>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}