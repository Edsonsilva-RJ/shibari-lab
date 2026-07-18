// src/app/api/checkout/route.js
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const cleanDigits = (value = '') => String(value).replace(/\D/g, '');
const parsePhone = (rawPhone = '') => {
  const onlyDigits = cleanDigits(rawPhone);
  const area_code = onlyDigits.length >= 10 ? onlyDigits.slice(0, 2) : '';
  const number = onlyDigits.length >= 10 ? onlyDigits.slice(2) : onlyDigits;
  return { area_code, number };
};

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
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error('MERCADOPAGO_ACCESS_TOKEN não definido.');
      return NextResponse.json({ error: 'Configuração de Mercado Pago incompleta.' }, { status: 500 });
    }

    if (!itens || itens.length === 0 || !cliente) {
      return NextResponse.json({ error: "Dados do pedido ausentes." }, { status: 400 });
    }

    const requiredClienteFields = [
      'nome', 'email', 'telefone', 'cpf', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'
    ];

    const missingClienteField = requiredClienteFields.find((field) => !cliente[field] || String(cliente[field]).trim().length === 0);
    if (missingClienteField) {
      return NextResponse.json({ error: `Campo do cliente ausente: ${missingClienteField}` }, { status: 400 });
    }

    // 3. Monta os itens pegando os valores reais do Servidor (Evita adulteração de preço)
    const itemsPreference = itens.map(item => {
      const produtoReal = PRODUTOS_DB[item.id];
      const quantidade = Number(item.quantidade);
      if (!produtoReal) {
        throw new Error(`Produto com ID ${item.id} não encontrado no catálogo seguro.`);
      }
      if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(`Quantidade inválida para o produto ${item.id}.`);
      }
      return {
        id: String(item.id),
        title: produtoReal.titulo,
        quantity: quantidade,
        unit_price: produtoReal.preco,
        currency_id: 'BRL'
      };
    });

    const { area_code, number } = parsePhone(cliente.telefone);
    const zip_code = cleanDigits(cliente.cep);
    const street_number = cleanDigits(cliente.numero) || '0';

    // 4. Cria a preferência de pagamento no Mercado Pago
    // Garante uma `origin` confiável — prefere variável de ambiente, depois cabeçalhos, por fim fallback
    const origin = process.env.NEXT_PUBLIC_SITE_URL
      || (request.headers.get('x-forwarded-proto') ? `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}` : (request.headers.get('host') ? `http://${request.headers.get('host')}` : (request.nextUrl?.origin || 'http://localhost:3000')));

    const preference = new Preference(client);

    // Log para diagnóstico: origin calculada, itens e dados básicos do cliente
    console.log('[checkout] origin:', origin);
    console.log('[checkout] itemsPreference:', JSON.stringify(itemsPreference));
    console.log('[checkout] cliente:', JSON.stringify({ nome: cliente.nome, email: cliente.email }));

    // Decide se deve enviar `auto_return` — Mercado Pago exige URLs públicas/HTTPS para auto_return
    const allowAutoReturn = origin.startsWith('https://');

    if (!allowAutoReturn) console.log('[checkout] auto_return disabled for origin:', origin);

    // Proteção: O Mercado Pago rejeita a criação da preferência se a notification_url contiver 'localhost'
    const isLocalhost = origin.includes('localhost');
    const notificationUrl = isLocalhost ? undefined : `${origin}/api/webhooks/mercadopago`;

    const bodyPayload = {
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1
      },
      items: itemsPreference,
      payer: {
        name: cliente.nome,
        email: cliente.email,
        phone: {
          area_code,
          number
        },
        identification: {
          type: "CPF",
          number: cleanDigits(cliente.cpf)
        },
        address: {
          zip_code,
          street_name: cliente.rua,
          street_number
        }
      },
      // URLs de retorno para onde o cliente vai após pagar ou cancelar
      back_urls: {
        success: `${origin}/loja/sucesso`,
        failure: `${origin}/loja/checkout`,
        pending: `${origin}/loja/sucesso`
      },
      auto_return: allowAutoReturn ? "approved" : undefined,
      notification_url: notificationUrl,
      // Vincula metadados ocultos que você receberá de volta no webhook (útil para seu painel)
      metadata: {
        cliente_whatsapp: cliente.telefone,
        endereco_completo: `${cliente.rua}, Nº ${cliente.numero} - ${cliente.bairro}, ${cliente.cidade}/${cliente.estado}`
      }
    };

    console.log('[checkout] bodyPayload:', JSON.stringify(bodyPayload));

    const response = await preference.create({ body: bodyPayload });

    // 5. Retorna a URL segura do checkout gerada pelo Mercado Pago
    return NextResponse.json({ url: response.init_point });

  } catch (error) {
    console.error("Erro interno no servidor do Mercado Pago:", error);
    // detalhes adicionais quando disponíveis
    try {
      if (error && error.response) console.error('[checkout] mercado pago response:', JSON.stringify(error.response));
    } catch (e) {
      console.error('[checkout] falha ao serializar error.cause', e);
    }

    return NextResponse.json({ error: "Erro ao gerar preferência de pagamento de forma segura.", details: error?.message || null }, { status: 500 });
  }
}