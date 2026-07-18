// src/app/loja/sucesso/page.js
"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConteudoSucesso() {
  const searchParams = useSearchParams();
  
  // Captura os parâmetros reais que o Mercado Pago injetou na URL
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  // Verifica se o pagamento é offline/pendente (ex: Pix ou boleto gerado)
  const isPendente = status === 'pending';

  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      {isPendente ? (
        <>
          <h1 style={{ color: '#f57c00', marginBottom: '1rem' }}>Pedido recebido! ⏳</h1>
          <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1.5rem' }}>
            Seu pedido foi gerado com sucesso e está **aguardando a confirmação do pagamento** pelo Mercado Pago.
          </p>
          {paymentId && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              Código da transação: <strong>{paymentId}</strong>
            </p>
          )}
          <p style={{ fontSize: '1rem', color: '#555', marginBottom: '1.5rem' }}>
            Se você escolheu Pix ou Boleto, efetue o pagamento no aplicativo do seu banco para que possamos liberar o envio das suas cordas.
          </p>
        </>
      ) : (
        <>
          <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Pagamento confirmado 🎉</h1>
          <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1.5rem' }}>
            Obrigado pela sua compra! Recebemos a confirmação do seu pagamento com sucesso.
          </p>
          {paymentId && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              ID do Pagamento: <strong>{paymentId}</strong>
            </p>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="/loja" style={{ padding: '0.6rem 1rem', background: isPendente ? '#f57c00' : '#2e7d32', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
          Voltar para a Loja[cite: 4]
        </a>
        <a href="/" style={{ padding: '0.6rem 1rem', border: '1px solid #ccc', borderRadius: 6, textDecoration: 'none', color: '#333' }}>
          Ir para o Início[cite: 4]
        </a>
      </div>
      
      <p style={{ marginTop: '1.5rem', color: '#666' }}>
        {isPendente 
          ? "Assim que o pagamento for compensado, você receberá um e-mail de confirmação com os detalhes do envio."
          : "Em breve você receberá um e-mail com os detalhes do pedido. Se tiver dúvidas, entre em contato conosco[cite: 4]."
        }
      </p>
    </div>
  );
}

// O Next.js exige que componentes que usam useSearchParams fiquem dentro de um Suspense
export default function SucessoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Carregando dados da compra...</div>}>
      <ConteudoSucesso />
    </Suspense>
  );
}