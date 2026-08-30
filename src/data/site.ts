/* ============================================================================
 *  FÁBRICA DE SITES — ARQUIVO ÚNICO DE CONTEÚDO E CONFIGURAÇÃO
 * ============================================================================
 *
 *  Tudo que é texto, link, preço, projeto ou informação comercial vive aqui.
 *  Nenhum componente deve conter conteúdo hardcoded.
 *
 *  ┌──────────────────────────────────────────────────────────────────────┐
 *  │  ⚠  ITENS PENDENTES — PROCURE POR "PENDENTE" NESTE ARQUIVO           │
 *  │                                                                      │
 *  │  1. clientes[]             → logos reais (hoje: placeholders)        │
 *  │  2. projetos[]             → screenshots reais (hoje: placeholders)  │
 *  │  3. plano.condicoes[]      → condições comerciais não definidas      │
 *  │  4. links.politicaPrivacidade → URL da política                      │
 *  └──────────────────────────────────────────────────────────────────────┘
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 *  1. WHATSAPP  ◀── ALTERE AQUI E PRONTO
 * ---------------------------------------------------------------------------
 *  O número é usado por:
 *    · CTA principal do hero  ("Quero ver uma prévia")
 *    · CTA do header          ("Quero meu site")
 *    · CTA da seção Plano     ("Quero conversar")
 *    · CTA final              ("Quero ver uma prévia")
 *    · Botão flutuante de WhatsApp
 *    · Link do rodapé
 *
 *  FORMATO OBRIGATÓRIO: apenas dígitos, com código do país e DDD, sem
 *  espaços, sinais ou pontuação.
 *
 *      País (55) + DDD (2 dígitos) + número (8 ou 9 dígitos)
 *
 *      Exemplo de formato: "5511987654321"
 *                           ││ ││ └────────── número
 *                           ││ └───────────── DDD
 *                           └└──────────────── Brasil
 *
 *  Contato configurado em 30/08/2026.
 * ------------------------------------------------------------------------ */
export const WHATSAPP = {
  /** Somente dígitos, com país e DDD. */
  numero: '5511964101827',

  /** Mensagem pré-preenchida por origem do clique. Ajuda a saber de onde veio o lead. */
  mensagens: {
    hero: 'Olá! Vim pelo site da Fábrica de Sites e quero ver uma prévia do meu site.',
    header: 'Olá! Vim pelo site da Fábrica de Sites e quero fazer meu site.',
    plano: 'Olá! Vim pelo site da Fábrica de Sites e quero conversar sobre os planos.',
    ctaFinal: 'Olá! Vim pelo site da Fábrica de Sites e quero ver uma prévia.',
    flutuante: 'Olá! Vim pelo site da Fábrica de Sites.',
    rodape: 'Olá! Vim pelo site da Fábrica de Sites.',
    servicos: 'Olá! Vim pela página de serviços da Fábrica de Sites e quero entender melhor.',
    quemSomos: 'Olá! Vim pela página Quem somos da Fábrica de Sites.',
    contato: 'Olá! Vim pela página de contato da Fábrica de Sites.',
    comoFazemos: 'Olá! Vim pela página Como fazemos da Fábrica de Sites.',
    porQueFazemos: 'Olá! Vim pela página Por que fazemos da Fábrica de Sites.',
  },
} as const

export type OrigemWhatsApp = keyof typeof WHATSAPP.mensagens

/** Monta a URL do WhatsApp. Devolve null quando o número ainda não foi definido. */
export function linkWhatsApp(origem: OrigemWhatsApp): string | null {
  const numero = WHATSAPP.numero.replace(/\D/g, '')
  if (!numero) return null
  return `https://wa.me/${numero}?text=${encodeURIComponent(WHATSAPP.mensagens[origem])}`
}

/** true quando o número já foi configurado. */
export const whatsappConfigurado = WHATSAPP.numero.replace(/\D/g, '').length > 0

/* ---------------------------------------------------------------------------
 *  2. MARCA E LINKS
 * ------------------------------------------------------------------------ */
export const marca = {
  nome: 'Fábrica de Sites',
  dominio: 'fabricadesites.com',
  monograma: 'FS',
} as const

export const links = {
  /** Preencher quando a página existir. Enquanto estiver nulo, o link não aparece. */
  politicaPrivacidade: null as string | null,
} as const

/* O checkout pode ser montado antes da definição do meio de pagamento.
 * Preencha a URL quando o link/preferência da operadora estiver disponível. */
export const CHECKOUT = {
  pagamentoMensalUrl: '',
  pagamentoPixUrl: '',
} as const

export type FormaPagamento = 'mensal' | 'pix'

export const obterPagamentoUrl = (forma: FormaPagamento) =>
  forma === 'pix' ? CHECKOUT.pagamentoPixUrl : CHECKOUT.pagamentoMensalUrl

/* ⚠ O valor de referência do .com.br (R$ 40/ano no Registro.br) aparece na
 * copy do checkout — em checkoutPagina.dominio.texto e resumo.dominioValor.
 * Conferir o preço atual em registro.br antes de publicar. */

/* Navegação principal.
 * `href` que começa com '/' e não tem '#' é rota.
 * `href` com '#' é âncora — sempre prefixada com a rota onde a seção existe,
 * para funcionar também quando o usuário está em outra página. */
export const navegacao = [
  { rotulo: 'Serviços', href: '/servicos' },
  { rotulo: 'Como fazemos', href: '/como-fazemos' },
  { rotulo: 'Por que fazemos', href: '/por-que-fazemos' },
  { rotulo: 'Quem somos', href: '/quem-somos' },
  { rotulo: 'Contato', href: '/contato' },
] as const

/** Links secundários — só no rodapé, para não inchar o header. */
export const navegacaoRodape = [
  { rotulo: 'Contratar online', href: '/checkout' },
  { rotulo: 'Nosso trabalho', href: '/#nosso-trabalho' },
  { rotulo: 'Diferencial', href: '/#diferencial' },
  { rotulo: 'Preço', href: '/#preco' },
  { rotulo: 'Dúvidas', href: '/#duvidas' },
] as const

/* ---------------------------------------------------------------------------
 *  3. PREÇO
 * ------------------------------------------------------------------------ */
export const preco = {
  valor: 'R$ 80',
  periodo: '/mês',
  chamada: 'Sites a partir de R$ 80/mês.',
  prefixo: 'a partir de',
  observacao: 'no plano de 24 meses',
} as const

/* ---------------------------------------------------------------------------
 *  4. HERO
 * ------------------------------------------------------------------------ */
export const hero = {
  eyebrow: 'Direção humana. Velocidade de IA.',
  titulo: 'Seu site, sem complicação.',
  palavrasDinamicas: ['presença', 'confiança', 'clareza', 'resultado'],
  apoio:
    'A parte chata fica com a gente. Você cuida de expandir o negócio e gerar receita enquanto um designer sênior usa IA para colocar sua presença digital no ar.',
  ctaPrincipal: 'Contratar sem conversa',
  ctaSecundario: 'Ver sites criados',
} as const

/* ---------------------------------------------------------------------------
 *  5. CLIENTES (faixa de logos)
 * ---------------------------------------------------------------------------
 *  ⚠ PENDENTE — nenhuma empresa real está listada. Todos os itens abaixo são
 *  placeholders declarados. Para publicar:
 *    · substitua `nome` pelo nome real do negócio atendido;
 *    · coloque o arquivo em /public/clientes/ e ajuste `logo`;
 *    · marque `placeholder: false`.
 *  A seção inteira some do site quando não houver nenhum item com
 *  placeholder: false — ver `mostrarProvaVisual` abaixo.
 * ------------------------------------------------------------------------ */
export type Cliente = {
  nome: string
  logo: string
  placeholder: boolean
}

export const clientes: Cliente[] = [
  { nome: 'Cliente 01', logo: '/placeholders/logo-01.png', placeholder: true },
  { nome: 'Cliente 02', logo: '/placeholders/logo-02.png', placeholder: true },
  { nome: 'Cliente 03', logo: '/placeholders/logo-03.png', placeholder: true },
  { nome: 'Cliente 04', logo: '/placeholders/logo-04.png', placeholder: true },
  { nome: 'Cliente 05', logo: '/placeholders/logo-05.png', placeholder: true },
  { nome: 'Cliente 06', logo: '/placeholders/logo-06.png', placeholder: true },
  { nome: 'Cliente 07', logo: '/placeholders/logo-07.png', placeholder: true },
  { nome: 'Cliente 08', logo: '/placeholders/logo-08.png', placeholder: true },
]

/* ---------------------------------------------------------------------------
 *  6. PROJETOS (portfólio)
 * ---------------------------------------------------------------------------
 *  ⚠ PENDENTE — screenshots reais. Nenhuma métrica ou resultado deve ser
 *  adicionado aqui sem comprovação.
 *  `link` pode ficar como null enquanto o site não estiver no ar.
 * ------------------------------------------------------------------------ */
export type Projeto = {
  nome: string
  segmento: string
  servico: string
  imagem: string
  link: string | null
  placeholder: boolean
  /** 'alta' = card mais alto, cria o ritmo editorial alternado */
  formato: 'alta' | 'larga'
}

export const projetos: Projeto[] = [
  {
    nome: 'Projeto 01',
    segmento: 'Barbearia',
    servico: 'Site institucional',
    imagem: '/placeholders/site-clube-da-navalha.png',
    link: null,
    placeholder: true,
    formato: 'larga',
  },
  {
    nome: 'Projeto 02',
    segmento: 'Panificação',
    servico: 'Site institucional',
    imagem: '/placeholders/site-padaria-industrial.png',
    link: null,
    placeholder: true,
    formato: 'alta',
  },
  {
    nome: 'Projeto 03',
    segmento: 'Engenharia',
    servico: 'Site institucional',
    imagem: '/placeholders/site-felice-engenharia.png',
    link: null,
    placeholder: true,
    formato: 'alta',
  },
  {
    nome: 'Projeto 04',
    segmento: 'Odontologia',
    servico: 'Landing page',
    imagem: '/placeholders/site-consultorio-odonto.png',
    link: null,
    placeholder: true,
    formato: 'larga',
  },
  {
    nome: 'Projeto 05',
    segmento: 'Consultoria de vendas',
    servico: 'Site institucional',
    imagem: '/placeholders/site-consultoria-natura.png',
    link: null,
    placeholder: true,
    formato: 'larga',
  },
  {
    nome: 'Projeto 06',
    segmento: 'Serviços locais',
    servico: 'Site institucional',
    imagem: '/placeholders/site-projeto-06.png',
    link: null,
    placeholder: true,
    formato: 'alta',
  },
]

/** A faixa de logos só aparece quando existir pelo menos um cliente real. */
export const mostrarProvaVisual = clientes.some((c) => !c.placeholder)

/* ---------------------------------------------------------------------------
 *  7. BAIXO ESFORÇO / PROCESSO
 * ------------------------------------------------------------------------ */
export const processo = {
  titulo: 'Você cuida do negócio. A parte chata fica com a gente.',
  texto:
    'Sem briefing infinito e sem formulário com quarenta perguntas. Nós pesquisamos, organizamos e criamos a primeira direção. Você entra apenas para confirmar o essencial e continua focado em expandir e gerar receita.',
  etapas: [
    {
      numero: '01',
      titulo: 'Reunimos as informações',
      texto:
        'Você envia o que já existe: redes sociais, perfil do Google, materiais e dados essenciais. Nós pesquisamos o restante. Você não precisa explicar tudo do zero.',
    },
    {
      numero: '02',
      titulo: 'Montamos a prévia',
      texto:
        'Montamos estrutura, textos e identidade a partir dessa leitura. Você recebe algo pronto para reagir, não uma página em branco.',
    },
    {
      numero: '03',
      titulo: 'Fazemos os ajustes',
      texto:
        'Você confirma o que está certo e aponta o que precisa mudar. A revisão acontece sobre algo concreto e não vira um projeto paralelo.',
    },
    {
      numero: '04',
      titulo: 'Escolhemos o domínio em ligação',
      texto:
        'A compra do domínio é feita junto com você em uma ligação curta. Afinal, ninguém conhece melhor do que o dono qual endereço representa o negócio.',
    },
    {
      numero: '05',
      titulo: 'Colocamos no ar',
      texto: 'Com o domínio escolhido e os dados aprovados, publicamos o site e deixamos o endereço funcionando para seus clientes encontrarem.',
    },
  ],
} as const

/* ---------------------------------------------------------------------------
 *  8. DIFERENCIAL DE IA
 * ------------------------------------------------------------------------ */
export const diferencial = {
  titulo: 'Não é um site feito pela IA. É um site dirigido por quem entende de experiência.',
  texto:
    'A inteligência artificial amplia possibilidades e acelera a produção. O olhar humano escolhe o que faz sentido, elimina o genérico e cuida da experiência de quem vai visitar seu site.',
  fluxo: [
    { rotulo: 'IA propõe', descricao: 'Pesquisa, caminhos, variações, produção.' },
    { rotulo: 'Designer dirige', descricao: 'Posicionamento, hierarquia, conteúdo, acessibilidade.' },
    { rotulo: 'Você aprova', descricao: 'Confirmação dos dados essenciais antes de publicar.' },
  ],
  pontos: [
    {
      titulo: 'Mais velocidade sem perder critério.',
      texto: 'A produção acelera, mas cada escolha continua passando por um olhar treinado.',
    },
    {
      titulo: 'Menos esforço para o cliente.',
      texto: 'Você responde o essencial. O resto é nossa responsabilidade.',
    },
    {
      titulo: 'Decisões conduzidas por experiência humana.',
      texto: 'Hierarquia, leitura e acessibilidade são decisões de design, não de automação.',
    },
  ],
} as const

/* ---------------------------------------------------------------------------
 *  9. POR QUE FAZEMOS
 * ------------------------------------------------------------------------ */
export const porque = {
  eyebrow: 'Por que fazemos',
  titulo: 'Negócios pequenos também merecem uma presença digital bem pensada.',
  paragrafos: [
    'Muita gente boa toca o negócio inteiro pelo Instagram, pela indicação de cliente e por um WhatsApp que não para. Funciona — até a hora em que alguém procura seu nome no Google e não encontra nada.',
    'Um endereço próprio muda essa conversa. É o lugar onde você diz o que faz, para quem, onde e como falar com você, sem depender do humor de um algoritmo ou de quem lembrou de te indicar.',
    'Site bem pensado nunca foi exclusividade de empresa grande. Só era caro, demorado e cheio de reunião. É isso que a gente resolve.',
  ],
} as const

/* ---------------------------------------------------------------------------
 *  9.1 PÁGINA — COMO FAZEMOS
 * ------------------------------------------------------------------------ */
export const comoFazemosPagina = {
  eyebrow: 'Como fazemos',
  titulo: 'A primeira versão começa com a gente, não com um formulário.',
  lead:
    'Pesquisamos o que já existe, organizamos a informação e criamos uma direção inicial. Você entra para confirmar o que só você pode confirmar.',
  participacao: {
    eyebrow: 'Seu esforço',
    titulo: 'Você não precisa gerenciar o projeto.',
    texto:
      'O processo foi desenhado para ocupar pouco espaço na rotina de quem já cuida de um negócio inteiro.',
    itens: [
      {
        titulo: 'Confirme os fatos',
        texto: 'Você valida serviços, contatos, localização e as informações que precisam estar corretas.',
      },
      {
        titulo: 'Reaja à primeira versão',
        texto: 'É mais fácil dizer o que funciona quando existe algo concreto na tela.',
      },
      {
        titulo: 'Aprove a publicação',
        texto: 'Nada vai ao ar sem a sua revisão final.',
      },
      {
        titulo: 'Escolha o domínio com a gente',
        texto:
          'Em uma ligação curta, avaliamos as opções e fazemos a compra junto com você. A decisão do endereço continua sendo sua.',
      },
    ],
  },
  ia: {
    eyebrow: 'IA com direção',
    titulo: 'A ferramenta acelera. O olhar humano mantém o critério.',
    texto:
      'Usamos IA para pesquisar, explorar e produzir mais rápido. Um designer sênior conduz a estrutura, a hierarquia, o conteúdo e a experiência antes de qualquer proposta chegar até você.',
  },
} as const

/* ---------------------------------------------------------------------------
 *  9.2 PÁGINA — POR QUE FAZEMOS
 * ------------------------------------------------------------------------ */
export const porQueFazemosPagina = {
  eyebrow: 'Por que fazemos',
  titulo: 'Presença digital bem feita não deveria ser privilégio de empresa grande.',
  lead:
    'Nossa missão é ajudar micro e pequenos empresários a terem um endereço digital claro, profissional e possível de manter.',
  missao: {
    eyebrow: 'Nossa missão',
    titulo: 'Dar estrutura digital a quem já faz o negócio acontecer.',
    paragrafos: [
      'Pequenos empresários acumulam atendimento, operação, venda e administração. Criar um site não deveria virar mais um projeto para gerenciar.',
      'Por isso reduzimos o esforço de entrada, usamos tecnologia para acelerar a produção e mantemos um designer experiente no comando das decisões.',
      'O objetivo é simples: quando alguém procurar pelo negócio, encontrar uma presença que transmita a mesma confiança do trabalho feito fora da tela.',
    ],
  },
  compromissos: [
    {
      numero: '01',
      titulo: 'O domínio e o conteúdo são seus',
      texto:
        'O endereço, os textos e as imagens ficam no seu nome. Se um dia quiser levar para outro lugar, leva.',
    },
    {
      numero: '02',
      titulo: 'Nada vai ao ar sem você aprovar',
      texto:
        'Você revisa textos, dados e identidade antes da publicação. A última palavra é sempre sua.',
    },
    {
      numero: '03',
      titulo: 'Genérico a gente refaz',
      texto:
        'Se a primeira versão não tiver a cara do seu negócio, voltamos e ajustamos até ter.',
    },
  ],
  paraQuem: {
    eyebrow: 'Para quem fazemos',
    titulo: 'Para negócios que são bons no que fazem, mas ainda não parecem isso na internet.',
    perfis: [
      'Quem ainda depende apenas do Instagram e do WhatsApp',
      'Quem tem um site antigo ou que já não representa o negócio',
      'Quem precisa ser encontrado e entendido com mais facilidade',
      'Quem quer melhorar a presença digital sem assumir outro projeto para cuidar',
    ],
  },
} as const

/* ---------------------------------------------------------------------------
 *  10. PLANO
 * ---------------------------------------------------------------------------
 *  Só entram aqui informações CONFIRMADAS.
 *  ⚠ PENDENTE: as condições abaixo ainda não foram definidas. Enquanto
 *  `definido: false`, o item NÃO é exibido no site. Quando decidir, escreva o
 *  valor em `valor` e marque `definido: true`.
 * ------------------------------------------------------------------------ */
export const plano = {
  eyebrow: 'Plano de site',
  titulo: 'Quanto maior o plano, menor a mensalidade.',
  texto:
    'No plano de 24 meses a mensalidade fica em R$ 80. Precisa de menos tempo de compromisso? O valor ajusta — entre R$ 80 e R$ 140 por mês. No Pix à vista, o período escolhido tem 5% de desconto.',
  cta: 'Quero começar',
  mesesMinimos: 10,
  mesesMaximos: 24,
  mensalidadeInicial: 140,
  mensalidadeFinal: 80,
  /* Desconto do Pix à vista sobre a soma das mensalidades do período. */
  descontoAVista: 0.05,
} as const

export function calcularPlano(meses: number) {
  const mesesLimitados = Math.min(
    plano.mesesMaximos,
    Math.max(plano.mesesMinimos, Math.round(meses)),
  )
  const progresso =
    (mesesLimitados - plano.mesesMinimos) /
    (plano.mesesMaximos - plano.mesesMinimos)
  const mensalidade = Math.round(
    plano.mensalidadeInicial +
      (plano.mensalidadeFinal - plano.mensalidadeInicial) * progresso,
  )

  return {
    meses: mesesLimitados,
    mensalidade,
    total: mesesLimitados * mensalidade,
  }
}

/* ---------------------------------------------------------------------------
 *  10.1 PACOTES
 * ------------------------------------------------------------------------ */
export const pacotes = {
  eyebrow: 'Encontre o seu ponto de partida',
  titulo: 'Você não precisa saber o que pedir. A gente parte da sua situação.',
  texto:
    'Não precisa saber a diferença entre formatos, plataformas ou entregáveis. Escolha a situação que mais parece com a sua empresa.',
  itens: [
    {
      nome: 'Tenho apenas o nome da empresa',
      paraQuem:
        'Para quem está começando do zero e precisa construir a marca antes de colocá-la no ar.',
      solucao: 'Marca + presença digital',
      inclui: ['Identidade visual', 'Site ou e-commerce', 'Direção de conteúdo'],
    },
    {
      nome: 'Já tenho logo e informações',
      paraQuem:
        'Para quem já tem uma base pronta e precisa transformá-la em uma presença digital organizada.',
      solucao: 'Colocar o negócio no ar',
      inclui: ['Site ou e-commerce', 'Organização das informações', 'Aplicação da identidade existente'],
    },
    {
      nome: 'Minha empresa precisa explicar mais',
      paraQuem:
        'Para negócios com mais serviços, áreas ou informações que não cabem bem em uma única página.',
      solucao: 'Site institucional completo',
      inclui: ['Site com várias páginas', 'Arquitetura de conteúdo', 'Navegação por serviços ou temas'],
    },
    {
      nome: 'Meu site não me representa',
      paraQuem:
        'Para quem já tem um site, mas ele parece antigo, confuso ou distante da empresa de hoje.',
      solucao: 'Repaginação do site',
      inclui: ['Leitura do site atual', 'Nova estrutura e direção visual', 'Revisão da experiência no celular'],
    },
  ],
  nota:
    'Os valores de identidade visual e e-commerce dependem do escopo. O seletor abaixo apresenta somente os planos de site.',
} as const

/* ---------------------------------------------------------------------------
 *  11. FAQ
 * ---------------------------------------------------------------------------
 *  `pendente: true` marca respostas que dependem de decisão comercial ainda
 *  não tomada. Elas aparecem no site com a resposta possível hoje, sem
 *  inventar condição. Revise todas antes de publicar.
 * ------------------------------------------------------------------------ */
export type Pergunta = {
  pergunta: string
  resposta: string
  pendente: boolean
}

export const faq: Pergunta[] = [
  {
    pergunta: 'Preciso escrever os textos?',
    resposta:
      'Não. Nós pesquisamos o que seu negócio já comunica e escrevemos uma primeira versão. Você lê, corrige o que estiver errado e confirma. Se quiser escrever alguma parte, também dá.',
    pendente: false,
  },
  {
    pergunta: 'O site é feito somente por inteligência artificial?',
    resposta:
      'Não. A IA acelera pesquisa e produção. As decisões de estrutura, conteúdo, hierarquia, identidade e acessibilidade são conduzidas por um designer sênior, que revisa tudo antes de você ver.',
    pendente: false,
  },
  {
    pergunta: 'Já tenho Instagram. Ainda preciso de um site?',
    resposta:
      'O Instagram é ótimo para mostrar o dia a dia, mas ele é da plataforma, não seu. O site é um endereço próprio, que aparece na busca, funciona sem algoritmo e concentra o que alguém precisa saber para te contratar. Um não substitui o outro.',
    pendente: false,
  },
  {
    pergunta: 'Posso usar meu próprio domínio?',
    resposta:
      'Sim, é possível apontar um domínio que você já tenha. As condições de domínio incluso ainda estão sendo definidas — fale com a gente e explicamos a situação do seu caso.',
    pendente: true,
  },
  {
    pergunta: 'Posso pedir alterações?',
    resposta:
      'Sim. A revisão faz parte do processo antes de publicar. A quantidade de alterações incluídas no plano ainda está sendo definida — combinamos isso na conversa.',
    pendente: true,
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Você escolhe a duração do plano, de 10 a 24 meses. Quanto maior o plano, menor a mensalidade: de R$ 140 por mês em 10 meses a R$ 80 por mês em 24 meses. Pode pagar mensalmente ou antecipar o período escolhido via Pix com 5% de desconto.',
    pendente: false,
  },
]

/* ---------------------------------------------------------------------------
 *  12. CTA FINAL
 * ------------------------------------------------------------------------ */
export const ctaFinal = {
  titulo: [
    'Você faz o negócio crescer.',
    'A parte chata fica com a gente.',
  ],
  texto: 'Uma conversa curta no WhatsApp já é o suficiente para começar.',
  botao: 'Contratar online',
} as const

/* ---------------------------------------------------------------------------
 *  13. RODAPÉ
 * ------------------------------------------------------------------------ */
export const rodape = {
  assinatura: 'Direção humana. Velocidade de IA.',
  copyright: `© ${new Date().getFullYear()} ${marca.nome}`,
} as const

/* ===========================================================================
 *  PÁGINAS INTERNAS
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 *  QUEM SOMOS
 * ---------------------------------------------------------------------------
 *  O texto abaixo deriva do posicionamento já aprovado. Nenhum dado factual
 *  (nome, anos de mercado, tamanho de equipe, cidade, número de projetos) foi
 *  inventado — tudo isso está em `responsavel` e `numeros`, marcado como
 *  pendente, e não aparece no site enquanto não for preenchido.
 * ------------------------------------------------------------------------ */
export const quemSomos = {
  eyebrow: 'Quem somos',
  titulo: 'Um estúdio que usa IA como ferramenta, não como argumento de venda.',
  lead: 'Fazemos sites para quem toca o próprio negócio e não tem tempo de tocar um projeto digital em paralelo.',

  manifesto: [
    {
      titulo: 'A parte chata do projeto é nossa.',
      texto:
        'Briefing de quarenta perguntas existe para transferir trabalho para o cliente. A gente prefere pesquisar antes, chegar com uma proposta pronta e usar o seu tempo só onde ele é insubstituível: confirmar o que é verdade sobre o seu negócio.',
    },
    {
      titulo: 'A IA acelera. Quem decide continua sendo gente.',
      texto:
        'Usamos IA para pesquisar, explorar caminhos e produzir mais rápido. O que ela não faz é escolher. Hierarquia, o que entra e o que sai, o que soa honesto e o que soa vendido, se a página funciona para quem lê no celular no meio da rua — isso é decisão de design, e passa por um olhar treinado antes de você ver.',
    },
    {
      titulo: 'Site bom nunca foi privilégio de empresa grande.',
      texto:
        'Era caro, demorado e cheio de reunião. Nada disso era sobre qualidade — era sobre processo mal desenhado. Quando você conserta o processo, o mesmo cuidado cabe no orçamento de um negócio pequeno.',
    },
  ],

  principios: [
    {
      titulo: 'Não prometemos o que não sabemos entregar.',
      texto: 'Se uma condição ainda não está definida, a gente diz que não está — em vez de inventar um número que soa bem.',
    },
    {
      titulo: 'Menos etapas, não menos critério.',
      texto: 'Cortamos reunião e formulário. Não cortamos revisão, acessibilidade nem leitura no celular.',
    },
    {
      titulo: 'Você continua dono de tudo.',
      texto: 'O endereço é seu, o conteúdo é seu, as decisões finais são suas. A gente conduz, não sequestra.',
    },
  ],

  /* ⚠ PENDENTE — nada aqui aparece no site enquanto `definido` for false. */
  responsavel: {
    definido: false,
    nome: null as string | null,
    papel: null as string | null,
    bio: null as string | null,
    foto: null as string | null,
  },

  /* ⚠ PENDENTE — não inventar métricas. Item sem `valor` não é renderizado. */
  numeros: [
    { rotulo: 'Anos de experiência em design', valor: null as string | null },
    { rotulo: 'Sites publicados', valor: null as string | null },
    { rotulo: 'Cidade / base', valor: null as string | null },
  ],
} as const

/* ---------------------------------------------------------------------------
 *  SERVIÇOS
 * ------------------------------------------------------------------------ */
export type Servico = {
  id: string
  nome: string
  paraQuem: string
  descricao: string
  inclui: string[]
  pendente: boolean
}

export const servicos: Servico[] = [
  {
    id: 'one-page',
    nome: 'Site de página única',
    paraQuem: 'Quem ainda não tem site e precisa de um endereço próprio.',
    descricao:
      'Uma página que responde o essencial: o que você faz, para quem, onde fica e como falar com você. É o formato que resolve a maioria dos negócios locais.',
    inclui: [
      'Pesquisa do que seu negócio já comunica',
      'Estrutura, textos e identidade da página',
      'Leitura no celular',
      'Botão de WhatsApp',
    ],
    pendente: false,
  },
  {
    id: 'institucional',
    nome: 'Site institucional',
    paraQuem: 'Quem tem mais de um serviço ou precisa explicar melhor o que faz.',
    descricao:
      'Várias páginas quando o negócio realmente exige. Serve para quem precisa detalhar serviços, equipe ou processo sem espremer tudo numa página só.',
    inclui: [
      'Tudo do site de página única',
      'Páginas internas por serviço ou tema',
      'Navegação e organização de conteúdo',
    ],
    pendente: false,
  },
  {
    id: 'reforma',
    nome: 'Reforma de site existente',
    paraQuem: 'Quem já tem site, mas ele está velho ou não representa mais o negócio.',
    descricao:
      'Reaproveitamos o que ainda serve e refazemos o resto. Em muitos casos o problema não é o site inteiro, é a estrutura e o texto.',
    inclui: [
      'Leitura do que existe hoje',
      'Reestruturação de conteúdo e hierarquia',
      'Identidade e leitura no celular',
    ],
    pendente: false,
  },
  {
    id: 'ecommerce',
    nome: 'E-commerce',
    paraQuem: 'Quem precisa apresentar e vender produtos pela internet.',
    descricao:
      'Organizamos a experiência da loja para o cliente encontrar produtos, entender o que está comprando e concluir o pedido com clareza.',
    inclui: [
      'Estrutura e navegação da loja',
      'Organização visual de produtos e categorias',
      'Experiência de compra no celular',
      'Direção dos conteúdos essenciais',
    ],
    pendente: false,
  },
  {
    id: 'identidade-visual',
    nome: 'Identidade visual',
    paraQuem: 'Quem precisa construir ou organizar a forma como o negócio se apresenta.',
    descricao:
      'Criamos uma direção visual coerente para o negócio ser reconhecido e manter consistência no site e nos pontos de contato da marca.',
    inclui: [
      'Direção visual da marca',
      'Logo e versões de uso',
      'Cores e tipografia',
      'Orientação para aplicação digital',
    ],
    pendente: false,
  },
]

/* ---------------------------------------------------------------------------
 *  CONTATO
 * ---------------------------------------------------------------------------
 *  Não há backend nesta etapa. O formulário monta uma mensagem e abre o
 *  WhatsApp — nada é enviado para servidor nenhum.
 * ------------------------------------------------------------------------ */
export const contato = {
  eyebrow: 'Contato',
  titulo: 'Uma conversa curta resolve mais que um formulário longo.',
  lead: 'Conte em duas linhas o que você faz. A gente responde com uma primeira ideia do que dá para fazer.',

  /** ⚠ PENDENTE — canais ainda não definidos. Item sem `valor` não aparece. */
  canais: [
    { rotulo: 'E-mail', valor: null as string | null, tipo: 'email' as const },
    { rotulo: 'Horário de atendimento', valor: null as string | null, tipo: 'texto' as const },
    { rotulo: 'Cidade', valor: null as string | null, tipo: 'texto' as const },
  ],

  expectativa: {
    titulo: 'O que acontece depois que você manda',
    passos: [
      'A gente lê e olha o que seu negócio já tem no ar.',
      'Responde com uma primeira leitura e as dúvidas que sobraram.',
      'Se fizer sentido para os dois lados, seguimos para a primeira versão.',
    ],
  },

  formulario: {
    titulo: 'Manda pelo WhatsApp',
    /* Sem backend: os campos viram uma mensagem pré-preenchida. */
    aviso:
      'Os campos abaixo apenas montam a mensagem. Nada é enviado até você tocar no botão e confirmar no WhatsApp.',
    campos: {
      nome: 'Seu nome',
      negocio: 'Nome do negócio',
      segmento: 'O que você faz',
      mensagem: 'O que você precisa (opcional)',
    },
    botao: 'Abrir no WhatsApp',
  },
} as const

/* ---------------------------------------------------------------------------
 *  CHECKOUT AUTÔNOMO
 * ------------------------------------------------------------------------ */
export const checkoutPagina = {
  eyebrow: 'Contratação online',
  titulo: 'Comece sem reunião e sem briefing interminável.',
  lead:
    'Escolha o plano e envie o que seu negócio já tem. A primeira conversa acontece depois da contratação e é reservada à escolha do domínio.',
  secoes: {
    responsavel: 'Seus dados',
    negocio: 'Sobre o negócio',
    presenca: 'O que já existe no ar',
    dominio: 'Ideias para o domínio',
  },
  dominio: {
    titulo: 'O domínio fica no seu nome, registrado por você.',
    texto:
      'Depois da contratação, fazemos uma ligação curta para conferir disponibilidade e escolher o endereço junto com você. Um .com.br normalmente custa a partir de R$ 40 por ano no Registro.br, pago direto por você — não entra nas mensalidades do site.',
  },
  campos: {
    nome: 'Seu nome',
    whatsapp: 'Seu WhatsApp',
    email: 'Seu e-mail',
    negocio: 'Nome do negócio',
    segmento: 'O que o negócio faz',
    cidade: 'Cidade e estado',
    instagram: 'Instagram',
    facebook: 'Facebook ou outra rede',
    google: 'Link do perfil no Google ou Google Maps',
    siteAtual: 'Site atual, se tiver',
    dominio: 'Domínios que você imagina',
    observacoes: 'Algo importante que devemos saber?',
  },
  resumo: {
    titulo: 'Resumo do pedido',
    plano: 'Plano de site',
    recorrencia: 'Duração do plano',
    pagamento: 'Forma de pagamento',
    total: 'Valor total do plano',
    aVista: 'Desconto no Pix',
    dominio: 'Domínio (.com.br)',
    dominioValor: 'a partir de R$ 40/ano, à parte',
  },
} as const
