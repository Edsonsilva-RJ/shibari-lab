// src/app/api/checkout/route.js
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Inicializa o Mercado Pago de forma segura usando a variável de ambiente
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

// 2. Tabela Verdade dos Preços (Protegida no Servidor - Blindagem Antifraude)
const PRODUTOS_DB = {
  1: { titulo: "Corda de Juta Tratada - 8m / 5.5mm", preco: 75.00 },
  2: { titulo: "Cera Hidratante para Cordas - 50Gr", preco: 35.00 },
  3: { titulo: "Kit iniciante: 2 Cordas + Tesoura de ponta romba", preco: 165.00 },
  4: { titulo: "Corda de Juta colorida Tratada - 8m / 5.5mm", preco: 115.00 },
  5: { titulo: "Cera hidratante premium para cordas- 50GR", preco: 45.25 },
  6: { titulo: "Kit iniciante II: 2 Cordas + Tesoura de ponta romba + Cera hidratante 50 Gr", preco: 195.00 },
  7: { titulo: "Tesoura de ponta romba", preco: 25.00 }
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { cliente, itens } = body;

    // Validação básica de segurança
    if (!itens || itens.length === 0 || !cliente) {
      return NextResponse.json({ error: "Dados do pedido ausentes." }, { status: 400 });
    }

    // 3. Monta os itens pegando os valores reais do Servidor (Evita adulteração de preço)
    const itemsPreference = itens.map(item => {
      const produtoReal = PRODUTOS_DB[item.id];
      if (!produtoReal) {
        throw new Error(`Produto com ID ${item.id} não encontrado no catálogo seguro.`);
      }
      return {
        id: String(item.id),
        title: produtoReal.titulo,
        quantity: Number(item.quantidade),
        unit_price: Number(produtoReal.preco),
        currency_id: 'BRL'
      };
    });

    // 4. Cria a preferência de pagamento no Mercado Pago
    const preference = new Preference(client);
    
    const response = await preference.create({
      body: {
        items: itemsPreference,
        payer: {
          name: cliente.nome,
          email: cliente.email,
          phone: {
            area_code: cliente.telefone.substring(1, 3), // Pega o DDD se digitado ex: (21)
            number: cliente.telefone.replace(/\D/g, '') // Remove caracteres não numéricos
          },
          identification: {
            type: "CPF",
            number: cliente.cpf.replace(/\D/g, '')
          },
          address: {
            zip_code: cliente.cep.replace(/\D/g, ''),
            street_name: cliente.rua,
            street_number: Number(cliente.numero)
          }
        },
        // URLs de retorno para onde o cliente vai após pagar ou cancelar
        back_urls: {
          success: `${request.nextUrl.origin}/loja/sucesso`,
          failure: `${request.nextUrl.origin}/loja/checkout`,
          pending: `${request.nextUrl.origin}/loja/sucesso`
        },
        auto_return: "approved",
        // Vincula metadados ocultos que você receberá de volta no webhook (útil para seu painel)
        metadata: {
          cliente_whatsapp: cliente.telefone,
          endereco_completo: `${cliente.rua}, Nº ${cliente.numero} - ${cliente.bairro}, ${cliente.cidade}/${cliente.estado}`
        }
      }
    });

    // 5. Retorna a URL segura do checkout gerada pelo Mercado Pago
    return NextResponse.json({ url: response.init_point });

  } catch (error) {
    console.error("Erro interno no servidor do Mercado Pago:", error);
    return NextResponse.json({ error: "Erro ao gerar preferência de pagamento de forma segura." }, { status: 500 });
  }
}