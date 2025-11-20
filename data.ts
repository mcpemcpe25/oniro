import { Question, ResultType, Theme } from './types';

export const THEMES: Theme[] = [
  { id: 1, name: "Segurança / Família", keywords: ["Segurança", "Família", "Casa", "Memória", "Raiz"] },
  { id: 2, name: "Social / Exposição", keywords: ["Social", "Exposição", "Público", "Julgamento"] },
  { id: 3, name: "Liberdade / Espiritualidade", keywords: ["Liberdade", "Espiritualidade", "Natureza", "Expansão", "Aspiração"] },
  { id: 4, name: "Sombra / Medo", keywords: ["Sombra", "Medo", "Ansiedade", "Barreiras", "Labirinto"] },
  { id: 5, name: "Identidade / Reflexão", keywords: ["Identidade", "Reflexão", "Espelho", "Autoimagem", "Eu"] },
  { id: 6, name: "Desejo / Paixão", keywords: ["Desejo", "Paixão", "Vontade", "Atração"] },
  { id: 7, name: "Cura / Aceitação", keywords: ["Cura", "Aceitação", "Serenidade", "Perdão", "Crescimento"] },
  { id: 8, name: "Transformação / Renascimento", keywords: ["Transformação", "Renascimento", "Mudança", "Metamorfose", "Novidade"] },
  { id: 9, name: "Criatividade / Imaginação", keywords: ["Criatividade", "Imaginação", "Sonho", "Fantástico", "Caos"] },
  { id: 10, name: "Poder / Controle", keywords: ["Poder", "Controle", "Conflito", "Autonomia", "Luta"] },
  { id: 11, name: "Perda / Luto", keywords: ["Perda", "Luto", "Dor", "Separação", "Fim"] },
  { id: 12, name: "Mistério / Inconsciente", keywords: ["Mistério", "Inconsciente", "Enigma", "Desconhecido", "Vazio"] },
  { id: 13, name: "Relacionamento / Confronto", keywords: ["Relacionamento", "Confronto", "Outro", "Par", "Conexão"] },
  { id: 14, name: "Vocação / Propósito", keywords: ["Vocação", "Propósito", "Chamado", "Destino", "Sentido"] },
];

export const RESULTS: ResultType[] = [
  {
    themeId: 1,
    title: "Guardião da Casa",
    subtitle: "Segurança / Família",
    description: "Seu sonho indica foco em estabilidade, proteção e raízes emocionais. Ele aponta para algo que você está tentando preservar — talvez demais.",
    reflections: ["O que você chama de “lar” hoje?", "O que você teme perder se mudar?"],
    exercise: "Liste 3 coisas que você faria se o medo da perda não existisse.",
    oracleTitle: "O Guardião Submerso",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Guardião Submerso. Ele representa aquilo dentro de você que tenta proteger partes antigas da sua identidade — memórias, crenças, feridas. O Guardião não é inimigo, mas ele mantém você em territórios emocionais onde já não pertence. Sua psique está lhe mostrando que você cresceu, mas uma parte sua continua presa ao passado, tentando impedir que você se machuque novamente. Esta figura submersa é o eco de uma proteção que já cumpriu sua função. Pergunte a si: O que em mim ainda vive no passado? Escreva o nome de uma lembrança que você sente que ainda te define, mas que já deveria ter sido liberada."
  },
  {
    themeId: 2,
    title: "Palco Social",
    subtitle: "Social / Exposição",
    description: "O sonho mostra conflitos entre como você se vê e como acha que é visto. Indica sensação de julgamento ou desejo de reconhecimento.",
    reflections: ["Quem realmente te vê?", "Você performa demais?"],
    exercise: "Compartilhe uma pequena verdade sua com alguém de confiança.",
    oracleTitle: "O Lobo Silencioso",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Lobo Silencioso. Este símbolo poderoso representa sua força instintiva — aquela parte sua que sabe se proteger, se posicionar e se manter firme, mas que você tem reprimido para não incomodar os outros. O lobo aparece quando sua autenticidade foi domesticada por muito tempo. Ele não quer atacar; ele quer recuperar sua voz. Há limites que você não está colocando, opiniões que você não está expressando, e uma parte de você sente fome de honestidade emocional. Pergunte a si: Onde tenho permitido que me silenciem? Escreva essa situação. O lobo desperta para devolver sua força."
  },
  {
    themeId: 3,
    title: "Chamado do Verde",
    subtitle: "Liberdade / Espiritualidade",
    description: "O sonho aponta para expansão, liberdade e reconexão com seu espírito.",
    reflections: ["O que te dá espaço?", "O que te prende?"],
    exercise: "Caminhe 20min por 3 dias sem celular.",
    oracleTitle: "A Voz do Vento Invisível",
    oracleText: "Prezado(a) buscador(a), o arquétipo revelado é a Voz do Vento Invisível. Ele representa intuições e impulsos tão sutis que sua mente consciente tenta descartar como bobagens. No entanto, elas são mensagens legítimas do seu inconsciente, tentando guiar você para escolhas mais alinhadas com quem realmente é. O vento não grita — ele sussurra. E você tem ignorado esses sussurros. Há algo que você sabe que precisa fazer, mas ainda se recusa a admitir. Este vento aparece para lembrar que a alma fala primeiro baixinho, depois com sinais, depois com sonhos. Pergunte a si: O que eu sei, mas finjo não saber? Escreva sua resposta. Ela é o início da sua clareza."
  },
  {
    themeId: 4,
    title: "Sombra na Porta",
    subtitle: "Sombra / Medo",
    description: "Partes reprimidas pedem reconhecimento. É hora de olhar para a emoção que você evita.",
    reflections: ["O que você não admite sentir?", "O que te assusta em você?"],
    exercise: "Escreva 3 emoções evitadas e o que elas querem te dizer.",
    oracleTitle: "A Sombra na Porta",
    oracleText: "Prezado(a) buscador(a), a sua jornada onírica revelou o profundo arquétipo da Sombra na Porta. Este resultado é um sussurro direto das profundezas do seu inconsciente, uma mensagem crucial. A Sombra, no sentido junguiano, representa as partes de si que foram negadas ou reprimidas, muitas vezes desconhecidas, mas carregadas de potencial e sabedoria latente. Ela está na porta, sinalizando que o momento de confronto e reconhecimento chegou, um portal para uma maior integridade e completude do seu ser. O medo que você pode sentir é uma reação natural ao encarar o desconhecido, esses elementos reprimidos que, como Freud nos ensinou, buscam agora sua expressão e libertação. Ao abrir essa porta, você não apenas libera o que está preso, mas também acessa um manancial de energia psíquica."
  },
  {
    themeId: 5,
    title: "Espelho Partido",
    subtitle: "Identidade / Reflexão",
    description: "Sua autoimagem está mudando. O sonho revela um eu antigo se dissolvendo.",
    reflections: ["Quem você era?", "Quem está nascendo?"],
    exercise: "Escreva uma carta do seu “eu futuro” ao seu “eu presente”.",
    oracleTitle: "A Luz que Tremula",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo da Luz que Tremula. É a representação perfeita da sua força interior em um momento de fragilidade emocional. A chama fraca não significa fraqueza — ela significa sensibilidade. Jung dizia que a luz interior precisa ser protegida até que se torne estável. Esta instabilidade emocional que você sente não é sinal de queda, mas de renascimento. Uma nova versão sua está sendo gestada, mas precisa de cuidado, descanso e honestidade emocional. Pergunte a si: O que estou tentando sustentar sozinho(a)? Escreva uma coisa que você precisa admitir que te cansa. A luz se estabiliza quando reconhecemos nossos limites."
  },
  {
    themeId: 6,
    title: "Fogo do Desejo",
    subtitle: "Desejo / Paixão",
    description: "Desejos ignorados estão vindo à tona.",
    reflections: ["O que você quer e não assume?"],
    exercise: "Escolha um desejo pequeno e dê um passo hoje.",
    oracleTitle: "O Coração Incendiado",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Coração Incendiado. Este fogo não representa destruição, mas sim uma energia emocional que você tem tentado controlar, silenciar ou racionalizar. Jung diria que o fogo é a metáfora viva da transformação, e o seu aparece não como chama mansa, mas como uma convocação. Em você, há um desejo reprimido — seja por mudança, por amor, por expressão ou até por ruptura — que está queimando para ser reconhecido. O Incêndio no Coração não quer consumir sua vida, mas iluminar o caminho que você não ousou seguir. Pergunte a si mesmo(a): O que dentro de mim pede coragem? O que eu venho apagando por medo de me transformar?"
  },
  {
    themeId: 7,
    title: "Riacho que Cura",
    subtitle: "Cura / Aceitação",
    description: "Seu inconsciente está curando algo — mesmo que você não note.",
    reflections: ["O que já está cicatrizando?", "O que ainda dói?"],
    exercise: "Escreva algo que precisa aceitar e depois rasgue.",
    oracleTitle: "O Chamado das Águas Profundas",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Chamado das Águas Profundas, símbolo de tudo o que vive abaixo da superfície da sua consciência. A água profunda é o território da emoção bruta, da intuição antiga, da verdade que você sente, mas evita nomear. Freud via a água como o retorno ao inconsciente; Jung a enxergava como o espaço da origem e da possibilidade. Se você sonhou com águas, não foi um acaso: sua psique está pedindo uma descida. Há perguntas que você evita, tristezas que segurou por tempo demais, intuições que vêm sendo ignoradas. Sua alma agora diz: mergulhe. O que você teme encontrar é exatamente o que irá te curar."
  },
  {
    themeId: 8,
    title: "Metamorfose",
    subtitle: "Transformação / Renascimento",
    description: "Grandes mudanças internas estão ocorrendo.",
    reflections: ["O que precisa morrer para algo nascer?"],
    exercise: "Descreva em 3 frases sua versão antiga e sua nova versão.",
    oracleTitle: "A Metamorfose Suspensa",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo da Metamorfose Suspensa. Este símbolo aparece quando você está às portas de uma grande mudança interna, mas ainda hesita em atravessar. É como se sua alma já estivesse se transformando, mas sua mente consciente ainda se apega ao conhecido. A borboleta que não rompe o casulo sofre — mas ela sofre mais se tentar permanecer nele. Sua psique está dizendo: você já cresceu, mas ainda não percebeu. Há um papel, uma identidade ou uma fase da vida que está pronta para ser deixada para trás. Pergunte a si mesmo(a): O que não faz mais sentido, mas eu continuo tentando carregar?"
  },
  {
    themeId: 9,
    title: "Oficina do Imaginário",
    subtitle: "Criatividade / Imaginação",
    description: "O sonho aponta para criatividade reprimida ou em ebulição.",
    reflections: ["Que cena do sonho vira arte?"],
    exercise: "Desenhe a cena mais estranha do sonho.",
    oracleTitle: "A Semente que Desperta",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo da Semente que Desperta. Este é um dos símbolos mais potentes da psique: representa algo novo nascendo dentro de você — uma ideia, uma nova perspectiva, um novo eu. Mas a semente cresce no escuro primeiro. Isso significa que há algo em você que ainda está sendo formado, algo que você ainda não consegue definir, mas que já ganhou vida. Este símbolo aparece quando o inconsciente começa a preparar você para um ciclo de expansão. Pergunte a si: Que pequena ideia, desejo ou impulso vem tentando aparecer em minha vida? Escreva-o. Cuidar dessa semente é cuidar de você."
  },
  {
    themeId: 10,
    title: "Trono e Correntes",
    subtitle: "Poder / Controle",
    description: "O sonho mostra disputas de controle e limites internos.",
    reflections: ["Quem comanda sua vida?"],
    exercise: "Refaça um limite pessoal hoje.",
    oracleTitle: "O Lobo Silencioso",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Lobo Silencioso. Este símbolo poderoso representa sua força instintiva — aquela parte sua que sabe se proteger, se posicionar e se manter firme, mas que você tem reprimido para não incomodar os outros. O lobo aparece quando sua autenticidade foi domesticada por muito tempo. Ele não quer atacar; ele quer recuperar sua voz. Há limites que você não está colocando, opiniões que você não está expressando, e uma parte de você sente fome de honestidade emocional. Pergunte a si: Onde tenho permitido que me silenciem? Escreva essa situação. O lobo desperta para devolver sua força."
  },
  {
    themeId: 11,
    title: "Sala do Luto",
    subtitle: "Perda / Luto",
    description: "Seu inconsciente tenta completar um ciclo de despedida.",
    reflections: ["O que você nunca concluiu?"],
    exercise: "Faça um ritual de encerramento para algo que ficou pendente.",
    oracleTitle: "O Guardião Submerso",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo do Guardião Submerso. Ele representa aquilo dentro de você que tenta proteger partes antigas da sua identidade — memórias, crenças, feridas. O Guardião não é inimigo, mas ele mantém você em territórios emocionais onde já não pertence. Sua psique está lhe mostrando que você cresceu, mas uma parte sua continua presa ao passado, tentando impedir que você se machuque novamente. Esta figura submersa é o eco de uma proteção que já cumpriu sua função. Pergunte a si: O que em mim ainda vive no passado? Escreva o nome de uma lembrança que você sente que ainda te define, mas que já deveria ter sido liberada."
  },
  {
    themeId: 12,
    title: "Cofre do Mistério",
    subtitle: "Mistério / Inconsciente",
    description: "Algo ainda sem nome está pedindo atenção.",
    reflections: ["O que se repete?", "O que permanece sem sentido?"],
    exercise: "Anote seus sonhos por 7 dias.",
    oracleTitle: "A Voz do Vento Invisível",
    oracleText: "Prezado(a) buscador(a), o arquétipo revelado é a Voz do Vento Invisível. Ele representa intuições e impulsos tão sutis que sua mente consciente tenta descartar como bobagens. No entanto, elas são mensagens legítimas do seu inconsciente, tentando guiar você para escolhas mais alinhadas com quem realmente é. O vento não grita — ele sussurra. E você tem ignorado esses sussurros. Há algo que você sabe que precisa fazer, mas ainda se recusa a admitir. Este vento aparece para lembrar que a alma fala primeiro baixinho, depois com sinais, depois com sonhos. Pergunte a si: O que eu sei, mas finjo não saber? Escreva sua resposta. Ela é o início da sua clareza."
  },
  {
    themeId: 13,
    title: "Labirinto da Relação",
    subtitle: "Relacionamento / Confronto",
    description: "O sonho reflete padrões afetivos e tensões emocionais.",
    reflections: ["Qual padrão você repete?"],
    exercise: "Mapeie uma relação importante: ação → reação → sentimento.",
    oracleTitle: "A Luz que Tremula",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo da Luz que Tremula. É a representação perfeita da sua força interior em um momento de fragilidade emocional. A chama fraca não significa fraqueza — ela significa sensibilidade. Jung dizia que a luz interior precisa ser protegida até que se torne estável. Esta instabilidade emocional que você sente não é sinal de queda, mas de renascimento. Uma nova versão sua está sendo gestada, mas precisa de cuidado, descanso e honestidade emocional. Pergunte a si: O que estou tentando sustentar sozinho(a)? Escreva uma coisa que você precisa admitir que te cansa. A luz se estabiliza quando reconhecemos nossos limites."
  },
  {
    themeId: 14,
    title: "Vocação Invisível",
    subtitle: "Vocação / Propósito",
    description: "Um chamado interno está surgindo.",
    reflections: ["O que te chama intimamente?"],
    exercise: "Crie um hábito de 5 minutos diários ligado ao seu propósito.",
    oracleTitle: "A Porta Entreaberta",
    oracleText: "Prezado(a) buscador(a), seu sonho revelou o arquétipo da Porta Entreaberta. Este é o símbolo universal das oportunidades psíquicas: algo em você está pronto, mas você ainda não atravessou. Esta porta representa um desejo silencioso de mudança — seja emocional, profissional, afetiva ou espiritual. A porta está aberta, mas você permanece olhando pela fresta. Isso indica cautela, mas também medo. Pergunte a si: Que mudança eu sei que preciso fazer, mas ainda não permito? Escreva essa mudança. A porta só se abre completamente quando você aceita o passo."
  },
];

export const FORTUNE_COOKIE_PHRASES = [
  "A resposta que você procura está na pergunta que você evita fazer.",
  "O que você resiste, persiste. O que você encara, se transforma.",
  "Às vezes, perder o caminho é a única forma de encontrar um novo.",
  "A sombra só existe onde há uma luz que você ainda não acendeu.",
  "Não confunda o mapa com o território. Seu sonho é o território.",
  "O silêncio do seu sonho é a sua mais alta canção.",
  "Para voar, é preciso primeiro aceitar o abismo.",
  "A chave que você procura está trancada dentro de você mesmo.",
  "O eco que te assombra é a sua própria voz pedindo para ser ouvida.",
  "A rachadura na sua armadura é por onde a luz entra.",
];


// Manually mapped based on the prompt's text cues to the 14 Themes
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Onde o sonho acontece principalmente?",
    options: [
      { id: "A", text: "Em uma casa", primaryThemeId: 1, secondaryThemeId: 1 },
      { id: "B", text: "Na rua/cidade", primaryThemeId: 2, secondaryThemeId: 2 },
      { id: "C", text: "Na natureza", primaryThemeId: 3, secondaryThemeId: 3 },
      { id: "D", text: "Em um local indefinido/sonhador", primaryThemeId: 12, secondaryThemeId: 12 },
    ]
  },
  {
    id: 2,
    text: "Quem aparece com maior destaque?",
    options: [
      { id: "A", text: "Pessoas conhecidas", primaryThemeId: 13, secondaryThemeId: 1 }, // Relacionamento / Memoria(Roots)
      { id: "B", text: "Estranhos", primaryThemeId: 4, secondaryThemeId: 6 }, // Sombra / Desejo
      { id: "C", text: "Você mesmo, mais jovem/mais velho", primaryThemeId: 5, secondaryThemeId: 8 }, // Identidade / Tempo(Transf)
      { id: "D", text: "Um animal", primaryThemeId: 4, secondaryThemeId: 12 }, // Instinto(Shadow/Nature) / Simbolo
    ]
  },
  {
    id: 3,
    text: "Qual é a ação central no sonho?",
    options: [
      { id: "A", text: "Fugir", primaryThemeId: 4, secondaryThemeId: 8 }, // Medo / Mudança
      { id: "B", text: "Perseguir ou ser perseguido", primaryThemeId: 10, secondaryThemeId: 13 }, // Poder / Conflito
      { id: "C", text: "Encontrar/descobrir algo", primaryThemeId: 12, secondaryThemeId: 2 }, // Revelação / Curiosidade
      { id: "D", text: "Conversar/conviver", primaryThemeId: 13, secondaryThemeId: 2 }, // Conexão / Comunicação
    ]
  },
  {
    id: 4,
    text: "Há perda (coisa/pessoa)?",
    options: [
      { id: "A", text: "Sim, perda irreversível", primaryThemeId: 11, secondaryThemeId: 7 }, // Luto / Aceitação
      { id: "B", text: "Perda temporária que é recuperada", primaryThemeId: 7, secondaryThemeId: 10 }, // Resiliencia / Risco
      { id: "C", text: "Não houve perda", primaryThemeId: 1, secondaryThemeId: 5 }, // Estabilidade / Rotina
      { id: "D", text: "Perda simbólica", primaryThemeId: 5, secondaryThemeId: 8 }, // Identidade / Transformação
    ]
  },
  {
    id: 5,
    text: "Qual a atmosfera emocional predominante?",
    options: [
      { id: "A", text: "Medo/ansiedade", primaryThemeId: 4, secondaryThemeId: 4 }, // Medo / Sombra
      { id: "B", text: "Alegria/leviandade", primaryThemeId: 6, secondaryThemeId: 9 }, // Alegria / Criatividade
      { id: "C", text: "Culpa/vergonha", primaryThemeId: 4, secondaryThemeId: 2 }, // Culpa(Shadow) / Moral(Social)
      { id: "D", text: "Serenidade/aceitação", primaryThemeId: 7, secondaryThemeId: 3 }, // Cura / Espiritualidade
    ]
  },
  {
    id: 6,
    text: "Existe um objeto que chama atenção?",
    options: [
      { id: "A", text: "Um espelho", primaryThemeId: 5, secondaryThemeId: 5 }, // Identidade / Reflexão
      { id: "B", text: "Uma chave/porta", primaryThemeId: 8, secondaryThemeId: 12 }, // Oportunidade / Mistério
      { id: "C", text: "Água", primaryThemeId: 7, secondaryThemeId: 8 }, // Emoção(Cura) / Renovação
      { id: "D", text: "Dinheiro/joia", primaryThemeId: 10, secondaryThemeId: 6 }, // Valor / Desejo
    ]
  },
  {
    id: 7,
    text: "O espaço parece realista ou fantástico?",
    options: [
      { id: "A", text: "Totalmente realista", primaryThemeId: 1, secondaryThemeId: 1 }, // Memória(Family/Roots) / Cotidiano
      { id: "B", text: "Levemente distorcido", primaryThemeId: 12, secondaryThemeId: 9 }, // Simbólico / Criatividade
      { id: "C", text: "Totalmente fantástico", primaryThemeId: 9, secondaryThemeId: 4 }, // Imaginário / Sombra criativa
      { id: "D", text: "Fragmentado/inescrutável", primaryThemeId: 12, secondaryThemeId: 11 }, // Inconsciente / Ruptura
    ]
  },
  {
    id: 8,
    text: "Você tem controle sobre suas ações no sonho?",
    options: [
      { id: "A", text: "Sim, totalmente", primaryThemeId: 10, secondaryThemeId: 10 }, // Autonomia / Poder
      { id: "B", text: "Parcialmente", primaryThemeId: 13, secondaryThemeId: 10 }, // Conflito interno / Escolha
      { id: "C", text: "Não", primaryThemeId: 4, secondaryThemeId: 4 }, // Vulnerabilidade / Medo
      { id: "D", text: "Não sabe/não lembra", primaryThemeId: 12, secondaryThemeId: 12 }, // Amnésia / Mistério
    ]
  },
  {
    id: 9,
    text: "Há uma perseguição ou corrida?",
    options: [
      { id: "A", text: "Sim, você foge", primaryThemeId: 4, secondaryThemeId: 4 }, // Medo / Evitação
      { id: "B", text: "Sim, você persegue", primaryThemeId: 6, secondaryThemeId: 10 }, // Desejo / Agressividade
      { id: "C", text: "Não, mas há pressa", primaryThemeId: 4, secondaryThemeId: 10 }, // Ansiedade / Pressão
      { id: "D", text: "Não há corrida", primaryThemeId: 7, secondaryThemeId: 5 }, // Calma / Ponderação
    ]
  },
  {
    id: 10,
    text: "Como termina o sonho normalmente?",
    options: [
      { id: "A", text: "Acordando com pânico", primaryThemeId: 4, secondaryThemeId: 11 }, // Trauma / Alerta
      { id: "B", text: "Acordando aliviado", primaryThemeId: 7, secondaryThemeId: 8 }, // Resolução / Aprendizado
      { id: "C", text: "Continua/se repete", primaryThemeId: 1, secondaryThemeId: 4 }, // Processo / Fixação
      { id: "D", text: "Termina com um enigma", primaryThemeId: 12, secondaryThemeId: 5 }, // Mistério / Insight
    ]
  },
  {
    id: 11,
    text: "Qual é a presença do corpo (lesão, mudança física)?",
    options: [
      { id: "A", text: "Dor/ferida", primaryThemeId: 11, secondaryThemeId: 4 }, // Sofrimento / Sombra
      { id: "B", text: "Transformação corporal", primaryThemeId: 5, secondaryThemeId: 8 }, // Identidade / Renascimento
      { id: "C", text: "Imobilidade/paralisia", primaryThemeId: 4, secondaryThemeId: 10 }, // Vulnerabilidade / Medo
      { id: "D", text: "Corpo saudável e ativo", primaryThemeId: 6, secondaryThemeId: 10 }, // Vitalidade / Energia
    ]
  },
  {
    id: 12,
    text: "Qual a sensação com relação ao tempo no sonho?",
    options: [
      { id: "A", text: "O tempo corre rápido", primaryThemeId: 11, secondaryThemeId: 10 }, // Perda / Urgência
      { id: "B", text: "O tempo para / fica lento", primaryThemeId: 10, secondaryThemeId: 5 }, // Congelamento / Reflexão
      { id: "C", text: "Idas e vindas no tempo", primaryThemeId: 1, secondaryThemeId: 14 }, // Nostalgia / Destino
      { id: "D", text: "Tempo indefinido", primaryThemeId: 3, secondaryThemeId: 12 }, // Eterno / Mitológico
    ]
  },
  {
    id: 13,
    text: "Há presença de texto/escrita (cartas, placas, números)?",
    options: [
      { id: "A", text: "Sim, mensagens claras", primaryThemeId: 14, secondaryThemeId: 10 }, // Orientação / Realidade
      { id: "B", text: "Frases desconexas", primaryThemeId: 9, secondaryThemeId: 12 }, // Simbólico / Enigma
      { id: "C", text: "Números repetitivos", primaryThemeId: 1, secondaryThemeId: 12 }, // Ciclos / Rotina
      { id: "D", text: "Não há texto", primaryThemeId: 6, secondaryThemeId: 5 }, // Impressão sensorial / Emoção
    ]
  },
  {
    id: 14,
    text: "Que clima faz no sonho?",
    options: [
      { id: "A", text: "Tempestade/chuva forte", primaryThemeId: 13, secondaryThemeId: 7 }, // Conflito / Purificação
      { id: "B", text: "Céu claro/ensolarado", primaryThemeId: 6, secondaryThemeId: 5 }, // Alegria / Clareza
      { id: "C", text: "Névoa/penumbra", primaryThemeId: 12, secondaryThemeId: 4 }, // Confusão / Mistério
      { id: "D", text: "Frio/congelamento", primaryThemeId: 10, secondaryThemeId: 11 }, // Estagnação / Bloqueio
    ]
  },
  {
    id: 15,
    text: "O que você mais sente ao despertar?",
    options: [
      { id: "A", text: "Necessidade de agir", primaryThemeId: 10, secondaryThemeId: 8 }, // Urgência / Mudança
      { id: "B", text: "Desejo de entender", primaryThemeId: 12, secondaryThemeId: 5 }, // Curiosidade / Pesquisa interna
      { id: "C", text: "Alívio/passividade", primaryThemeId: 7, secondaryThemeId: 11 }, // Aceitação / Letting go
      { id: "D", text: "Confusão", primaryThemeId: 4, secondaryThemeId: 12 }, // Incerteza / Mistério
    ]
  },
  {
    id: 16,
    text: "Há uma figura de autoridade no sonho?",
    options: [
      { id: "A", text: "Sim, uma figura controladora", primaryThemeId: 10, secondaryThemeId: 13 }, // Autoridade / Conflito
      { id: "B", text: "Sim, alguém que orienta", primaryThemeId: 14, secondaryThemeId: 3 }, // Mentoria / Inspiração
      { id: "C", text: "Não há autoridades", primaryThemeId: 10, secondaryThemeId: 4 }, // Autonomia / Isolamento
      { id: "D", text: "Autoridade ambígua", primaryThemeId: 12, secondaryThemeId: 5 }, // Dúvida / Moral
    ]
  },
  {
    id: 17,
    text: "O espaço do sonho é fechado ou aberto?",
    options: [
      { id: "A", text: "Muito fechado", primaryThemeId: 10, secondaryThemeId: 4 }, // Limitação / Ansiedade
      { id: "B", text: "Semi-aberto", primaryThemeId: 1, secondaryThemeId: 12 }, // Proteção / Curiosidade
      { id: "C", text: "Totalmente aberto", primaryThemeId: 3, secondaryThemeId: 2 }, // Liberdade / Exposição
      { id: "D", text: "Mudando", primaryThemeId: 8, secondaryThemeId: 9 }, // Transição / Fluxo
    ]
  },
  {
    id: 18,
    text: "Existia uma divisão (portas, muros, separações)?",
    options: [
      { id: "A", text: "Sim, muros altos", primaryThemeId: 10, secondaryThemeId: 4 }, // Barreiras / Sombra
      { id: "B", text: "Portas abertas/fechadas", primaryThemeId: 10, secondaryThemeId: 8 }, // Escolha / Oportunidade
      { id: "C", text: "Fronteiras fluidas", primaryThemeId: 9, secondaryThemeId: 5 }, // Flexibilidade / Identidade
      { id: "D", text: "Sem divisões", primaryThemeId: 7, secondaryThemeId: 1 }, // Integração / Unidade
    ]
  },
  {
    id: 19,
    text: "A cor que domina o sonho?",
    options: [
      { id: "A", text: "Tons escuros", primaryThemeId: 4, secondaryThemeId: 4 }, // Sombra / Medo
      { id: "B", text: "Tons vívidos/quentes", primaryThemeId: 6, secondaryThemeId: 9 }, // Paixão / Criatividade
      { id: "C", text: "Tons frios/azuis", primaryThemeId: 11, secondaryThemeId: 7 }, // Tristeza / Contemplação
      { id: "D", text: "Tons neutros/claros", primaryThemeId: 7, secondaryThemeId: 1 }, // Sossego / Simplicidade
    ]
  },
  {
    id: 20,
    text: "Há movimento coletivo (muitos juntos) ou foco individual?",
    options: [
      { id: "A", text: "Multidão/conjunto", primaryThemeId: 2, secondaryThemeId: 5 }, // Social / Anonimato
      { id: "B", text: "Duas pessoas", primaryThemeId: 13, secondaryThemeId: 13 }, // Relação / Confronto
      { id: "C", text: "Você isolado", primaryThemeId: 5, secondaryThemeId: 4 }, // Autoconhecimento / Solidão
      { id: "D", text: "Varia", primaryThemeId: 8, secondaryThemeId: 9 }, // Oscilação / Complexidade
    ]
  },
  // ABSTRACT PART
  {
    id: 21,
    text: "Escolha a forma geométrica que mais “parece” com seu sonho:",
    options: [
      { id: "A", text: "Círculo", primaryThemeId: 7, secondaryThemeId: 1 }, // Integração / Ciclos
      { id: "B", text: "Triângulo", primaryThemeId: 14, secondaryThemeId: 10 }, // Ambição / Estrutura
      { id: "C", text: "Quadrado", primaryThemeId: 1, secondaryThemeId: 10 }, // Segurança / Limite
      { id: "D", text: "Linha irregular", primaryThemeId: 9, secondaryThemeId: 9 }, // Caos / Criatividade
    ]
  },
  {
    id: 22,
    text: "Se seu sonho fosse uma cor, qual seria?",
    options: [
      { id: "A", text: "Vermelho", primaryThemeId: 6, secondaryThemeId: 4 }, // Paixão / Alerta
      { id: "B", text: "Azul", primaryThemeId: 12, secondaryThemeId: 11 }, // Profundidade / Tristeza
      { id: "C", text: "Verde", primaryThemeId: 8, secondaryThemeId: 7 }, // Crescimento / Cura
      { id: "D", text: "Cinza/Bege", primaryThemeId: 5, secondaryThemeId: 10 }, // Sutileza / Distanciamento
    ]
  },
  {
    id: 23,
    text: "Qual seria a textura do sonho?",
    options: [
      { id: "A", text: "Lisa", primaryThemeId: 10, secondaryThemeId: 1 }, // Controle / Superfície
      { id: "B", text: "Áspera", primaryThemeId: 1, secondaryThemeId: 4 }, // Realidade dura / Sombra
      { id: "C", text: "Pegajosa", primaryThemeId: 4, secondaryThemeId: 1 }, // Apego / Fixação
      { id: "D", text: "Leve como pena", primaryThemeId: 3, secondaryThemeId: 9 }, // Liberação / Sonho lúcido
    ]
  },
  {
    id: 24,
    text: "Que som melhor representa o sonho?",
    options: [
      { id: "A", text: "Batida/ruído", primaryThemeId: 4, secondaryThemeId: 10 }, // Alerta / Pressão
      { id: "B", text: "Música suave", primaryThemeId: 1, secondaryThemeId: 1 }, // Conforto / Memória
      { id: "C", text: "Sussurro", primaryThemeId: 12, secondaryThemeId: 13 }, // Segredo / Intimidade
      { id: "D", text: "Silêncio pesado", primaryThemeId: 12, secondaryThemeId: 7 }, // Vazio / Contemplação
    ]
  },
  {
    id: 25,
    text: "O clima emocional do sonho é parecido com:",
    options: [
      { id: "A", text: "Tempestade", primaryThemeId: 13, secondaryThemeId: 7 }, // Conflito / Catarse
      { id: "B", text: "Aurora", primaryThemeId: 14, secondaryThemeId: 8 }, // Possibilidade / Renovação
      { id: "C", text: "Crepúsculo", primaryThemeId: 12, secondaryThemeId: 11 }, // Liminaridade / Fim
      { id: "D", text: "Névoa", primaryThemeId: 12, secondaryThemeId: 9 }, // Incerteza / Simbólico
    ]
  },
  {
    id: 26,
    text: "Se o sonho fosse um verbo, seria:",
    options: [
      { id: "A", text: "Fugir", primaryThemeId: 4, secondaryThemeId: 4 }, // Evasão / Medo
      { id: "B", text: "Encontrar", primaryThemeId: 12, secondaryThemeId: 14 }, // Descoberta / Sentido
      { id: "C", text: "Transformar", primaryThemeId: 8, secondaryThemeId: 8 }, // Metamorfose / Renovação
      { id: "D", text: "Parar", primaryThemeId: 10, secondaryThemeId: 5 }, // Estagnação / Reflexão
    ]
  },
  {
    id: 27,
    text: "Se fosse uma direção:",
    options: [
      { id: "A", text: "Para cima", primaryThemeId: 3, secondaryThemeId: 3 }, // Aspiração / Espiritualidade
      { id: "B", text: "Para baixo", primaryThemeId: 1, secondaryThemeId: 4 }, // Raiz / Sombra
      { id: "C", text: "Para frente", primaryThemeId: 8, secondaryThemeId: 14 }, // Progresso / Futuro
      { id: "D", text: "Para trás", primaryThemeId: 1, secondaryThemeId: 1 }, // Memória / Passado
    ]
  },
  {
    id: 28,
    text: "Se fosse um número:",
    options: [
      { id: "A", text: "1", primaryThemeId: 5, secondaryThemeId: 5 }, // Eu / Singularidade
      { id: "B", text: "2", primaryThemeId: 13, secondaryThemeId: 13 }, // Par / Relação
      { id: "C", text: "3", primaryThemeId: 8, secondaryThemeId: 9 }, // Processo / Criatividade
      { id: "D", text: "0", primaryThemeId: 12, secondaryThemeId: 14 }, // Vazio / Potencial
    ]
  },
  {
    id: 29,
    text: "Escolha um símbolo universal:",
    options: [
      { id: "A", text: "Porta/portal", primaryThemeId: 8, secondaryThemeId: 14 }, // Transição / Oportunidade
      { id: "B", text: "Labirinto", primaryThemeId: 12, secondaryThemeId: 4 }, // Busca / Sombra
      { id: "C", text: "Espelho", primaryThemeId: 5, secondaryThemeId: 5 }, // Autoimagem / Reflexão
      { id: "D", text: "Água corrente", primaryThemeId: 8, secondaryThemeId: 6 }, // Fluxo / Emoção
    ]
  },
  {
    id: 30,
    text: "Qual frase combina com seu sonho?",
    options: [
      { id: "A", text: "“Algo me chama”", primaryThemeId: 14, secondaryThemeId: 6 }, // Vocação / Desejo
      { id: "B", text: "“Fico preso”", primaryThemeId: 10, secondaryThemeId: 11 }, // Limite / Trauma
      { id: "C", text: "“Algo muda”", primaryThemeId: 8, secondaryThemeId: 8 }, // Transformação / Crescimento
      { id: "D", text: "“Nada é certo”", primaryThemeId: 12, secondaryThemeId: 10 }, // Incerteza / Provocação
    ]
  }
];