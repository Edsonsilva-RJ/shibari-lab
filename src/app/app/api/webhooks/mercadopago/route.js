// src/app/api/webhooks/mercadopago/route.js
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Resend } from 'resend';

// Inicializa as ferramentas seguras com variáveis de ambiente
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    // 1. O Mercado Pago envia parâmetros na URL para indicar o ID do evento
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const dataId = searchParams.get('data.id');

    // Só processamos se a notificação for explicitamente sobre um pagamento
    if (type === 'payment' && dataId) {
      const payment = new Payment(client);
      
      // 2. Buscamos os dados reais do pagamento direto na API deles (Evita fraudes de falsos webhooks)
      const paymentData = await payment.get({ id: dataId });
      
      // 3. Verificamos se o pagamento está formalmente Aprovado
      if (paymentData.status === 'approved') {
        const totalPago = paymentData.transaction_amount;
        const comprador = paymentData.payer;
        
        // Recuperamos as informações extras que escondemos lá na criação do checkout
        const whatsapp = paymentData.metadata?.cliente_whatsapp || 'Não informado';
        const endereco = paymentData.metadata?.endereco_completo || 'Não informado';
        
        // Mapeamos a lista de produtos comprados
        const itensComprados = paymentData.additional_info?.items || [];
        const listaProdutosHtml = itensComprados.map(item => `
          <li>
            <strong>${item.title}</strong><br/>
            Quantidade: ${item.quantity} | Preço Un.: R$ ${Number(item.unit_price).toFixed(2)}
          </li>
        `).join('');

        // 4. Disparamos o e-mail de notificação para você
        await resend.emails.send({
          from: 'Loja Cordas de Mathias <onboarding@resend.dev>', // No início usa o domínio padrão de teste deles
          to: 'seu-email-aqui@gmail.com', // Coloque o e-mail onde você deseja receber os alertas de venda
          subject: `🚨 NOVO PEDIDO APROVADO - R$ ${totalPago.toFixed(2)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; color: #333;">
              <h2 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px;">
                🎉 Venda Confirmada!
              </h2>
              <p>O pagamento do pedido <strong>#${dataId}</strong> foi processado e aprovado com sucesso.</p>
              
              <h3>👥 Dados do Cliente:</h3>
              <ul>
                <li><strong>Nome:</strong> ${comprador.first_name || 'Cliente'}</li>
                <li><strong>E-mail:</strong> ${comprador.email}</li>
                <li><strong>WhatsApp:</strong> ${whatsapp}</li>
                <li><strong>CPF:</strong> ${comprador.identification?.number || 'Não informado'}</li>
              </ul>

              <h3>📍 Endereço de Envio:</h3>
              <p style="background: #f5f5f5; padding: 10px; border-radius: 4px;">
                ${endereco}
              </p>

              <h3>🛒 Itens do Pedido:</h3>
              <ul style="padding-left: 20px;">
                ${listaProdutosHtml}
              </ul>

              <h3 style="margin-top: 20px;">💰 Total Recebido:</h3>
              <p style="font-size: 1.2rem; font-weight: bold; color: #2e7d32;">
                R$ ${totalPago.toFixed(2)}
              </p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
              <small style="color: #888;">Notificação automática gerada pelo ecossistema Next.js da sua loja.</small>
            </div>
          `
        });

        console.log(`[Webhook MP] Pedido ${dataId} processado e e-mail enviado.`);
      }
    }

    // O Mercado Pago exige que seu site responda com status 200 rápido para saber que o aviso foi entregue
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error("Erro ao processar Webhook do Mercado Pago:", error);
    // Mesmo se der erro no nosso envio de e-mail, devolvemos 200 para o Mercado Pago não ficar bombardeando o servidor
    return new Response('Erro Interno Tratado', { status: 200 });
  }
}