import type { StudyModule } from "./types";

const SRC3 = "PDF Conteúdo da recuperação de Língua Portuguesa — Capítulo 3, a partir da p. 58";
const SRC4 = "PDF Conteúdo da recuperação de Língua Portuguesa — Capítulo 4";
const SRC5 = "PDF Conteúdo da recuperação de Língua Portuguesa — Capítulo 5, até a p. 101";
const SRC6 = "PDF Conteúdo da recuperação de Língua Portuguesa — Capítulo 6";
const SRCN = "PDF Conteúdo da recuperação de Língua Portuguesa — Concordância nominal";
const SRCV = "PDF Conteúdo da recuperação de Língua Portuguesa — Concordância verbal";

const REPORT_TEXT = "Texto-base criado para a revisão: Durante três semanas, estudantes de uma escola registraram o desperdício de água nos bebedouros. Segundo o relatório do grêmio, a troca de duas torneiras reduziu o volume coletado nos baldes. A diretora afirmou que a escola ainda avaliará outras medidas. Para especialistas ouvidos pela turma, hábitos cotidianos também influenciam o consumo.";
const LETTER_TEXT = "Texto-base criado para a revisão: Senhor editor, a reportagem sobre o uso da biblioteca apresentou dados importantes, mas ouviu apenas adultos. Como os estudantes são os principais usuários do espaço, suas opiniões deveriam aparecer em uma próxima edição. Essa inclusão tornaria a discussão mais completa. Atenciosamente, Helena, 7º ano.";

export const recPort2Tri26: StudyModule = {
  id: "RecPort2Tri26",
  subject: "Língua Portuguesa",
  period: "2º trimestre de 2026",
  title: "Gramática, Gêneros e Argumentação",
  subtitle: "Recuperação de Língua Portuguesa · 7º ano",
  description: "Transitividade, coordenação, reportagem, carta do leitor, interpretação, referenciação e concordância.",
  chapterCount: 4,
  reviewFacts: [
    "A transitividade depende do uso do verbo na oração, não apenas do verbo isolado.",
    "Objeto direto normalmente não exige preposição; objeto indireto é introduzido por preposição exigida pelo verbo.",
    "Orações coordenadas são sintaticamente independentes; a conjunção indica a relação de sentido entre elas.",
    "Citação direta reproduz palavras; citação indireta reformula a fala e costuma exigir ajustes de pessoa e tempo verbal.",
    "Tema é o assunto; tese é a posição defendida; argumento é a razão usada para sustentá-la.",
    "Adjetivos concordam com os substantivos, mas advérbios permanecem invariáveis.",
    "Haver, com sentido de existir, e fazer, indicando tempo decorrido, permanecem na terceira pessoa do singular.",
    "Expressões referenciais conectam partes do texto e evitam repetições, mas precisam ter referente claro.",
  ],
  questions: [
    {
      id: "p01", chapter: "Capítulo 3", topic: "Verbo intransitivo", kind: "desafio-mental",
      prompt: "Em “As crianças chegaram cedo”, como se classifica o verbo “chegaram” nesse uso?",
      options: [
        { id: "a", text: "Verbo intransitivo", feedback: "Correto: “cedo” indica circunstância de tempo e não completa a transitividade do verbo." },
        { id: "b", text: "Verbo transitivo direto", feedback: "Não há objeto direto. “Cedo” é um advérbio." },
        { id: "c", text: "Verbo transitivo indireto", feedback: "Não existe complemento preposicionado exigido pelo verbo." },
      ],
      correctOptionId: "a", correctExplanation: "O verbo possui sentido completo; o termo “cedo” apenas acrescenta uma circunstância.", source: SRC3,
    },
    {
      id: "p02", chapter: "Capítulo 3", topic: "Verbo transitivo direto", kind: "analise-de-texto",
      prompt: "Em “Maya analisou a reportagem”, qual é a classificação de “analisou”?",
      options: [
        { id: "a", text: "VI, porque a oração termina ali", feedback: "A posição final não define transitividade. O verbo exige aquilo que foi analisado." },
        { id: "b", text: "VTD, porque “a reportagem” é objeto direto", feedback: "Correto: o complemento liga-se ao verbo sem preposição exigida." },
        { id: "c", text: "VTI, porque existe o artigo “a”", feedback: "O “a” é artigo de “reportagem”, não preposição exigida pelo verbo." },
      ],
      correctOptionId: "b", correctExplanation: "Quem analisa, analisa algo. “A reportagem” completa diretamente o verbo.", source: SRC3,
    },
    {
      id: "p03", chapter: "Capítulo 3", topic: "Objeto direto", kind: "pista",
      prompt: "Na oração “O repórter conferiu os dados”, qual termo exerce a função de objeto direto?",
      options: [
        { id: "a", text: "O repórter", feedback: "Esse termo é o sujeito: pratica a ação." },
        { id: "b", text: "conferiu", feedback: "Esse é o verbo da oração." },
        { id: "c", text: "os dados", feedback: "Correto: indica aquilo que o repórter conferiu." },
      ],
      correctOptionId: "c", correctExplanation: "O objeto direto completa um verbo transitivo direto sem preposição obrigatória.", source: SRC3,
    },
    {
      id: "p04", chapter: "Capítulo 3", topic: "Verbo transitivo indireto", kind: "analise-de-texto",
      prompt: "Em “Os estudantes precisam de orientação”, qual é a análise correta?",
      options: [
        { id: "a", text: "“precisam” é VTI; “de orientação” é OI", feedback: "Correto: nesse sentido, o verbo precisar exige a preposição “de”." },
        { id: "b", text: "“precisam” é VTD; “orientação” é OD", feedback: "A preposição “de” é exigida pelo verbo e introduz objeto indireto." },
        { id: "c", text: "“precisam” é VI; “de orientação” é circunstância", feedback: "Sem o complemento, falta indicar do que os estudantes precisam." },
      ],
      correctOptionId: "a", correctExplanation: "Quem precisa, precisa de algo; o complemento preposicionado é objeto indireto.", source: SRC3,
    },
    {
      id: "p05", chapter: "Capítulo 3", topic: "Objeto indireto", kind: "pista",
      prompt: "Em “A turma confia na professora”, qual termo é objeto indireto?",
      options: [
        { id: "a", text: "A turma", feedback: "É o sujeito da oração." },
        { id: "b", text: "na professora", feedback: "Correto: “confiar em” exige preposição; em + a forma “na”." },
        { id: "c", text: "confia", feedback: "É o verbo transitivo indireto." },
      ],
      correctOptionId: "b", correctExplanation: "O objeto indireto completa o sentido do verbo por meio da preposição exigida.", source: SRC3,
    },
    {
      id: "p06", chapter: "Capítulo 3", topic: "Verbo transitivo direto e indireto", kind: "analise-de-texto",
      prompt: "Analise: “A bibliotecária entregou o livro ao estudante.”",
      options: [
        { id: "a", text: "VTD; “o livro ao estudante” é um único OD", feedback: "Existem dois complementos com funções diferentes." },
        { id: "b", text: "VTDI; “o livro” é OD e “ao estudante” é OI", feedback: "Correto: entrega-se algo a alguém." },
        { id: "c", text: "VTI; os dois complementos são OI", feedback: "“O livro” se liga diretamente ao verbo e é objeto direto." },
      ],
      correctOptionId: "b", correctExplanation: "O verbo apresenta simultaneamente um complemento direto e outro indireto.", source: SRC3,
    },
    {
      id: "p07", chapter: "Capítulo 3", topic: "Transitividade no contexto", kind: "revisao",
      prompt: "Segundo a norma-padrão, em “A turma assistiu ao documentário”, o verbo é:",
      options: [
        { id: "a", text: "VTI, e “ao documentário” é OI", feedback: "Correto: no sentido de ver, assistir rege a preposição “a”." },
        { id: "b", text: "VTD, e “o documentário” é OD", feedback: "Na norma-padrão cobrada em análise sintática, “assistir a” é transitivo indireto." },
        { id: "c", text: "VI, e “ao documentário” é adjunto adverbial", feedback: "O termo completa aquilo a que a turma assistiu." },
      ],
      correctOptionId: "a", correctExplanation: "A classificação considera a regência do verbo no sentido empregado.", source: SRC3,
    },
    {
      id: "p08", chapter: "Capítulo 3", topic: "Transitividade verbal", kind: "desafio-mental",
      prompt: "Em qual alternativa o verbo destacado é intransitivo?",
      options: [
        { id: "a", text: "A estudante comprou um caderno.", feedback: "“Um caderno” é objeto direto; comprar é VTD nesse uso." },
        { id: "b", text: "A estudante gosta de poesia.", feedback: "“De poesia” é objeto indireto; gostar é VTI." },
        { id: "c", text: "A estudante sorriu durante a leitura.", feedback: "Correto: “durante a leitura” indica circunstância, não objeto." },
      ],
      correctOptionId: "c", correctExplanation: "O verbo “sorriu” tem sentido completo; o restante informa quando ocorreu a ação.", source: SRC3,
    },
    {
      id: "p09", chapter: "Capítulo 4", topic: "Reportagem", kind: "conexao",
      prompt: "Qual característica costuma distinguir a reportagem de uma notícia breve?",
      options: [
        { id: "a", text: "A reportagem aprofunda o tema com contexto, fontes e diferentes perspectivas", feedback: "Correto: ela tende a desenvolver o assunto de modo mais amplo." },
        { id: "b", text: "A reportagem obrigatoriamente inventa personagens", feedback: "Reportagem é gênero jornalístico e trabalha com apuração, não invenção ficcional obrigatória." },
        { id: "c", text: "A reportagem não pode apresentar dados nem entrevistas", feedback: "Dados e entrevistas são recursos frequentes de aprofundamento." },
      ],
      correctOptionId: "a", correctExplanation: "Notícia e reportagem informam, mas a reportagem costuma ampliar investigação, contexto e vozes.", source: SRC4,
    },
    {
      id: "p10", chapter: "Capítulo 4", topic: "Notícia e reportagem", kind: "analise-de-texto",
      prompt: "Qual proposta está mais adequada a uma reportagem?",
      options: [
        { id: "a", text: "Informar em três linhas que uma feira começou hoje", feedback: "Essa formulação se aproxima de uma notícia breve." },
        { id: "b", text: "Investigar os efeitos da feira, entrevistar participantes e contextualizar sua criação", feedback: "Correto: há aprofundamento, diversidade de fontes e contexto." },
        { id: "c", text: "Narrar uma aventura fantástica sem apuração", feedback: "Isso corresponde a uma narrativa ficcional, não a uma reportagem." },
      ],
      correctOptionId: "b", correctExplanation: "A reportagem desenvolve um recorte temático por meio de pesquisa e apuração.", source: SRC4,
    },
    {
      id: "p11", chapter: "Capítulo 4", topic: "Partes da reportagem", kind: "pista",
      prompt: "Em uma reportagem, qual é a função principal do título?",
      options: [
        { id: "a", text: "Apresentar o assunto e atrair a atenção para o texto", feedback: "Correto: o título sintetiza ou destaca o enfoque." },
        { id: "b", text: "Substituir todo o desenvolvimento", feedback: "O título não apresenta toda a apuração." },
        { id: "c", text: "Identificar apenas a opinião do leitor", feedback: "Isso não define o título de uma reportagem." },
      ],
      correctOptionId: "a", correctExplanation: "Título, subtítulo, abertura e corpo cumprem funções distintas na organização do gênero.", source: SRC4,
    },
    {
      id: "p12", chapter: "Capítulo 4", topic: "Interpretação de reportagem", kind: "analise-de-texto",
      context: REPORT_TEXT,
      prompt: "Qual informação está explícita no texto-base?",
      options: [
        { id: "a", text: "Todas as torneiras da escola foram trocadas", feedback: "O texto menciona apenas duas torneiras." },
        { id: "b", text: "O acompanhamento durou três semanas", feedback: "Correto: essa duração aparece diretamente na primeira frase." },
        { id: "c", text: "A escola encerrou definitivamente o projeto", feedback: "A diretora ainda avaliará outras medidas; não há encerramento explícito." },
      ],
      correctOptionId: "b", correctExplanation: "Informação explícita aparece declarada no texto e não depende de inferência.", source: SRC4,
    },
    {
      id: "p13", chapter: "Capítulo 4", topic: "Interpretação de reportagem", kind: "analise-de-texto",
      context: REPORT_TEXT,
      prompt: "Qual inferência é sustentada pelo texto-base?",
      options: [
        { id: "a", text: "A troca de equipamentos pode ajudar, mas não é apresentada como única solução", feedback: "Correto: o texto também menciona hábitos e novas medidas." },
        { id: "b", text: "Somente os estudantes desperdiçam água", feedback: "O texto não atribui o problema exclusivamente aos estudantes." },
        { id: "c", text: "Os especialistas rejeitaram qualquer mudança de hábito", feedback: "O texto afirma justamente que hábitos influenciam o consumo." },
      ],
      correctOptionId: "a", correctExplanation: "A inferência combina informações do texto sem acrescentar uma conclusão incompatível.", source: SRC4,
    },
    {
      id: "p14", chapter: "Capítulo 4", topic: "Fontes da reportagem", kind: "conexao",
      context: REPORT_TEXT,
      prompt: "Quais vozes ou fontes aparecem no texto-base?",
      options: [
        { id: "a", text: "Apenas a narradora", feedback: "O texto menciona relatório, diretora e especialistas." },
        { id: "b", text: "Grêmio, diretora e especialistas ouvidos pela turma", feedback: "Correto: essas fontes sustentam diferentes informações." },
        { id: "c", text: "Somente pessoas anônimas da internet", feedback: "Nenhuma fonte é apresentada dessa maneira." },
      ],
      correctOptionId: "b", correctExplanation: "Identificar fontes ajuda a avaliar como a reportagem sustenta e amplia as informações.", source: SRC4,
    },
    {
      id: "p15", chapter: "Capítulo 4", topic: "Período composto por coordenação", kind: "desafio-mental",
      prompt: "Qual período é composto por coordenação?",
      options: [
        { id: "a", text: "A reportagem extensa.", feedback: "Não há oração completa, pois falta verbo." },
        { id: "b", text: "Os alunos pesquisaram e a professora revisou o texto.", feedback: "Correto: há duas orações sintaticamente independentes ligadas por “e”." },
        { id: "c", text: "A revisão cuidadosa dos alunos.", feedback: "Também não há verbo formando oração." },
      ],
      correctOptionId: "b", correctExplanation: "O período composto possui mais de uma oração; na coordenação, nenhuma exerce função sintática dentro da outra.", source: SRC4,
    },
    {
      id: "p16", chapter: "Capítulo 4", topic: "Oração coordenada assindética", kind: "analise-de-texto",
      prompt: "Em “Abriu o livro, leu o título, iniciou a atividade”, as orações são:",
      options: [
        { id: "a", text: "Coordenadas assindéticas", feedback: "Correto: estão coordenadas sem conjunção." },
        { id: "b", text: "Coordenadas sindéticas adversativas", feedback: "Não há conjunção adversativa nem oposição." },
        { id: "c", text: "Uma única oração", feedback: "Há três formas verbais organizando três orações." },
      ],
      correctOptionId: "a", correctExplanation: "Assindéticas são coordenadas justapostas, geralmente separadas por vírgula, sem conectivo.", source: SRC4,
    },
    {
      id: "p17", chapter: "Capítulo 4", topic: "Coordenação aditiva", kind: "analise-de-texto",
      prompt: "Qual período apresenta oração coordenada sindética aditiva?",
      options: [
        { id: "a", text: "Leu a reportagem, mas não anotou os dados.", feedback: "“Mas” indica oposição: adversativa." },
        { id: "b", text: "Leu a reportagem e anotou os dados.", feedback: "Correto: “e” acrescenta uma ação à anterior." },
        { id: "c", text: "Leia a reportagem, pois haverá debate.", feedback: "“Pois” introduz uma explicação." },
      ],
      correctOptionId: "b", correctExplanation: "Conjunções aditivas expressam soma ou acréscimo de ideias.", source: SRC4,
    },
    {
      id: "p18", chapter: "Capítulo 4", topic: "Coordenação adversativa", kind: "desafio-mental",
      prompt: "Em “A fonte parecia confiável, contudo os dados não foram confirmados”, “contudo” expressa:",
      options: [
        { id: "a", text: "Adição", feedback: "Não há simples soma; a segunda ideia contrasta com a expectativa criada." },
        { id: "b", text: "Conclusão", feedback: "A falta de confirmação não é apresentada como conclusão por “contudo”." },
        { id: "c", text: "Oposição", feedback: "Correto: “contudo” é conjunção adversativa." },
      ],
      correctOptionId: "c", correctExplanation: "Adversativas introduzem contraste, ressalva ou quebra de expectativa.", source: SRC4,
    },
    {
      id: "p19", chapter: "Capítulo 4", topic: "Coordenação alternativa", kind: "conexao",
      prompt: "Qual período estabelece alternância?",
      options: [
        { id: "a", text: "Ou você verifica a fonte, ou mantém a informação fora do texto.", feedback: "Correto: as duas possibilidades são apresentadas como alternativas." },
        { id: "b", text: "Verifique a fonte, portanto publique.", feedback: "“Portanto” indica conclusão." },
        { id: "c", text: "Verifique a fonte e registre a autoria.", feedback: "“E” indica adição." },
      ],
      correctOptionId: "a", correctExplanation: "Conjunções alternativas apresentam escolha, alternância ou possibilidades excludentes.", source: SRC4,
    },
    {
      id: "p20", chapter: "Capítulo 4", topic: "Coordenação conclusiva", kind: "analise-de-texto",
      prompt: "Em “Os dados foram conferidos; portanto, a equipe publicou o gráfico”, a segunda oração é:",
      options: [
        { id: "a", text: "Sindética explicativa", feedback: "Ela não justifica uma ordem; apresenta consequência ou conclusão." },
        { id: "b", text: "Sindética conclusiva", feedback: "Correto: “portanto” introduz a conclusão decorrente da primeira ideia." },
        { id: "c", text: "Assindética", feedback: "A conjunção “portanto” torna a oração sindética." },
      ],
      correctOptionId: "b", correctExplanation: "Conclusivas indicam resultado lógico ou conclusão em relação à oração anterior.", source: SRC4,
    },
    {
      id: "p21", chapter: "Capítulo 4", topic: "Coordenação explicativa", kind: "analise-de-texto",
      prompt: "Em “Não divulgue a informação, porque a fonte não a confirmou”, a segunda oração é:",
      options: [
        { id: "a", text: "Sindética explicativa", feedback: "Correto: explica ou justifica a orientação dada na primeira oração." },
        { id: "b", text: "Sindética alternativa", feedback: "Não há escolha entre possibilidades." },
        { id: "c", text: "Sindética aditiva", feedback: "A segunda oração não apenas soma uma ação; apresenta justificativa." },
      ],
      correctOptionId: "a", correctExplanation: "A explicativa costuma justificar uma ordem, conselho ou afirmação anterior.", source: SRC4,
    },
    {
      id: "p22", chapter: "Capítulo 4", topic: "Sentido das conjunções", kind: "revisao",
      prompt: "Qual substituição preserva o sentido de “porém” em “O texto é curto, porém complexo”?",
      options: [
        { id: "a", text: "portanto", feedback: "“Portanto” mudaria a relação para conclusão." },
        { id: "b", text: "mas", feedback: "Correto: ambos estabelecem oposição." },
        { id: "c", text: "porque", feedback: "“Porque” indicaria explicação ou causa." },
      ],
      correctOptionId: "b", correctExplanation: "A classificação depende do sentido estabelecido entre as orações.", source: SRC4,
    },
    {
      id: "p23", chapter: "Capítulo 4", topic: "Citação direta", kind: "analise-de-texto",
      prompt: "Qual alternativa apresenta citação direta?",
      options: [
        { id: "a", text: "A diretora afirmou que o projeto continuaria.", feedback: "A fala foi incorporada e reformulada: citação indireta." },
        { id: "b", text: "Segundo a diretora, o projeto teria continuidade.", feedback: "Há paráfrase da posição, sem reprodução literal marcada." },
        { id: "c", text: "A diretora afirmou: “O projeto continuará.”", feedback: "Correto: as palavras são apresentadas como reprodução literal." },
      ],
      correctOptionId: "c", correctExplanation: "Citação direta reproduz a fala e costuma ser delimitada por aspas ou travessão.", source: SRC4,
    },
    {
      id: "p24", chapter: "Capítulo 4", topic: "Citação indireta", kind: "revisao",
      prompt: "Transforme adequadamente em discurso indireto: Ana disse: “Eu revisarei o texto amanhã.”",
      options: [
        { id: "a", text: "Ana disse que ela revisaria o texto no dia seguinte.", feedback: "Correto: pessoa, tempo verbal e referência temporal foram ajustados." },
        { id: "b", text: "Ana disse: ela revisará o texto amanhã.", feedback: "A estrutura mistura marcas do discurso direto e indireto." },
        { id: "c", text: "Ana disse que eu revisarei o texto amanhã.", feedback: "Mantém “eu” como se o narrador fosse Ana e não ajusta o ponto de vista." },
      ],
      correctOptionId: "a", correctExplanation: "Na citação indireta, a fala integra a sintaxe do narrador e pode exigir mudanças de pessoa, tempo e espaço.", source: SRC4,
    },
    {
      id: "p25", chapter: "Capítulo 4", topic: "Verbos de elocução", kind: "pista",
      prompt: "Qual verbo de elocução indica discordância de modo mais preciso?",
      options: [
        { id: "a", text: "contestou", feedback: "Correto: o verbo caracteriza a fala como oposição ou questionamento." },
        { id: "b", text: "caminhou", feedback: "Indica movimento, não ato de fala." },
        { id: "c", text: "observou", feedback: "Pode introduzir fala, mas não expressa necessariamente discordância." },
      ],
      correctOptionId: "a", correctExplanation: "Verbos como afirmar, perguntar, explicar e contestar apresentam e qualificam falas.", source: SRC4,
    },
    {
      id: "p26", chapter: "Capítulos 4 e 5", topic: "Paráfrase", kind: "desafio-mental",
      prompt: "Qual opção parafraseia “A leitura frequente amplia o repertório” sem alterar a ideia principal?",
      options: [
        { id: "a", text: "Ler com regularidade aumenta o conjunto de conhecimentos e referências.", feedback: "Correto: a formulação muda, mas o sentido central permanece." },
        { id: "b", text: "Somente textos longos produzem conhecimento.", feedback: "Acrescenta exclusividade e uma condição inexistente." },
        { id: "c", text: "A leitura frequente reduz o repertório.", feedback: "Inverte o sentido original." },
      ],
      correctOptionId: "a", correctExplanation: "Paráfrase reformula uma ideia com outras palavras, preservando seu núcleo de sentido.", source: SRC5,
    },
    {
      id: "p27", chapter: "Capítulo 4", topic: "Expressões referenciais", kind: "analise-de-texto",
      prompt: "Em “Maya terminou a reportagem. A estudante revisou o título”, a expressão “A estudante” retoma:",
      options: [
        { id: "a", text: "a reportagem", feedback: "“A estudante” designa uma pessoa, não o texto." },
        { id: "b", text: "Maya", feedback: "Correto: é uma expressão referencial que evita repetir o nome." },
        { id: "c", text: "o título", feedback: "O título aparece depois como objeto da revisão." },
      ],
      correctOptionId: "b", correctExplanation: "Expressões referenciais mantêm a continuidade do texto ao retomar ou antecipar referentes.", source: SRC4,
    },
    {
      id: "p28", chapter: "Capítulo 4", topic: "Clareza referencial", kind: "revisao",
      prompt: "Qual frase apresenta referência ambígua?",
      options: [
        { id: "a", text: "Luísa entregou o texto a Paula quando ela chegou.", feedback: "Correto: “ela” pode retomar Luísa ou Paula." },
        { id: "b", text: "Luísa chegou e entregou seu próprio texto.", feedback: "A expressão “seu próprio” reforça a referência ao sujeito Luísa." },
        { id: "c", text: "Ao chegar, Paula recebeu o texto de Luísa.", feedback: "A reorganização torna os papéis claros." },
      ],
      correctOptionId: "a", correctExplanation: "Uma expressão referencial deve permitir identificar seu referente sem dúvida relevante.", source: SRC4,
    },
    {
      id: "p29", chapter: "Capítulo 6", topic: "Carta do leitor", kind: "conexao",
      prompt: "Qual é uma finalidade típica da carta do leitor?",
      options: [
        { id: "a", text: "Comentar, elogiar, criticar ou questionar conteúdo publicado", feedback: "Correto: o leitor se posiciona diante de uma publicação ou tema." },
        { id: "b", text: "Registrar uma lei oficial", feedback: "Esse não é o propósito do gênero." },
        { id: "c", text: "Narrar obrigatoriamente uma história fantástica", feedback: "A carta do leitor é predominantemente opinativa ou argumentativa." },
      ],
      correctOptionId: "a", correctExplanation: "O gênero estabelece diálogo entre público e veículo, frequentemente com posicionamento argumentativo.", source: SRC6,
    },
    {
      id: "p30", chapter: "Capítulo 6", topic: "Características da carta do leitor", kind: "pista",
      prompt: "Qual elemento ajuda a identificar uma carta do leitor?",
      options: [
        { id: "a", text: "Interlocução com o veículo ou responsável pela publicação", feedback: "Correto: vocativos como “Senhor editor” evidenciam o destinatário." },
        { id: "b", text: "Ausência total de opinião", feedback: "O posicionamento do leitor é frequentemente central." },
        { id: "c", text: "Obrigação de apresentar neutralidade jornalística", feedback: "A carta expressa a perspectiva do leitor, não a neutralidade de uma notícia." },
      ],
      correctOptionId: "a", correctExplanation: "Destinatário, referência ao conteúdo publicado, posicionamento e identificação do remetente são marcas comuns.", source: SRC6,
    },
    {
      id: "p31", chapter: "Capítulo 6", topic: "Tema", kind: "analise-de-texto",
      context: LETTER_TEXT,
      prompt: "Qual é o tema principal da carta?",
      options: [
        { id: "a", text: "A ausência da perspectiva dos estudantes na reportagem sobre a biblioteca", feedback: "Correto: todo o posicionamento se organiza em torno desse recorte." },
        { id: "b", text: "A reforma física completa da escola", feedback: "O texto não discute reforma física." },
        { id: "c", text: "A proibição da entrada de adultos na biblioteca", feedback: "A autora não propõe essa proibição." },
      ],
      correctOptionId: "a", correctExplanation: "Tema é o assunto delimitado sobre o qual o texto desenvolve informações ou posicionamento.", source: SRC6,
    },
    {
      id: "p32", chapter: "Capítulo 6", topic: "Tese", kind: "analise-de-texto",
      context: LETTER_TEXT,
      prompt: "Qual tese é defendida por Helena?",
      options: [
        { id: "a", text: "A reportagem não deveria apresentar dado algum", feedback: "Ela reconhece que os dados são importantes." },
        { id: "b", text: "A opinião dos estudantes deveria aparecer em uma próxima edição", feedback: "Correto: essa é a posição central defendida." },
        { id: "c", text: "Somente adultos deveriam usar a biblioteca", feedback: "A carta afirma que os estudantes são os principais usuários." },
      ],
      correctOptionId: "b", correctExplanation: "Tese é a posição que o texto procura sustentar por meio de argumentos.", source: SRC6,
    },
    {
      id: "p33", chapter: "Capítulo 6", topic: "Argumento", kind: "analise-de-texto",
      context: LETTER_TEXT,
      prompt: "Qual argumento sustenta a tese da carta?",
      options: [
        { id: "a", text: "Os estudantes são os principais usuários do espaço", feedback: "Correto: isso justifica por que sua perspectiva é relevante." },
        { id: "b", text: "A autora está no 7º ano", feedback: "A identificação não sustenta, por si só, a tese." },
        { id: "c", text: "A carta começa com “Senhor editor”", feedback: "Isso caracteriza o interlocutor, mas não funciona como razão argumentativa." },
      ],
      correctOptionId: "a", correctExplanation: "Argumento é a razão apresentada para tornar a tese aceitável ou convincente.", source: SRC6,
    },
    {
      id: "p34", chapter: "Capítulo 6", topic: "Fato e opinião", kind: "desafio-mental",
      context: LETTER_TEXT,
      prompt: "Qual trecho expressa claramente uma opinião?",
      options: [
        { id: "a", text: "“Helena, 7º ano”", feedback: "É identificação da remetente." },
        { id: "b", text: "“suas opiniões deveriam aparecer em uma próxima edição”", feedback: "Correto: o verbo “deveriam” explicita avaliação e proposta." },
        { id: "c", text: "“Senhor editor”", feedback: "É o vocativo usado para dirigir-se ao destinatário." },
      ],
      correctOptionId: "b", correctExplanation: "Opinião apresenta julgamento, avaliação, desejo ou posicionamento; fato é verificável.", source: SRC6,
    },
    {
      id: "p35", chapter: "Capítulo 6", topic: "Informação implícita", kind: "analise-de-texto",
      context: LETTER_TEXT,
      prompt: "O que se pode inferir da carta?",
      options: [
        { id: "a", text: "Helena leu a reportagem antes de escrever", feedback: "Correto: ela comenta escolhas específicas do texto publicado." },
        { id: "b", text: "Helena entrevistou todos os adultos citados", feedback: "Nada no texto permite essa conclusão." },
        { id: "c", text: "A biblioteca foi fechada definitivamente", feedback: "O funcionamento da biblioteca não é apresentado dessa forma." },
      ],
      correctOptionId: "a", correctExplanation: "Informação implícita é deduzida de pistas textuais, sem aparecer formulada literalmente.", source: SRC6,
    },
    {
      id: "p36", chapter: "Capítulo 6", topic: "Expressão referencial", kind: "analise-de-texto",
      context: LETTER_TEXT,
      prompt: "A expressão “Essa inclusão” retoma qual ideia?",
      options: [
        { id: "a", text: "A inclusão das opiniões dos estudantes", feedback: "Correto: o demonstrativo resume a proposta da frase anterior." },
        { id: "b", text: "A retirada dos dados importantes", feedback: "Helena não propõe retirar os dados." },
        { id: "c", text: "A identificação de Helena", feedback: "A assinatura aparece depois e não é o referente." },
      ],
      correctOptionId: "a", correctExplanation: "O encapsulamento referencial retoma uma ideia inteira e contribui para a coesão.", source: SRC6,
    },
    {
      id: "p37", chapter: "Concordância nominal", topic: "Regra geral", kind: "revisao",
      prompt: "Qual frase segue a concordância nominal da norma-padrão?",
      options: [
        { id: "a", text: "As duas reportagem completas foram publicadas.", feedback: "Artigo e substantivo devem ir para o plural: “reportagens”." },
        { id: "b", text: "As duas reportagens completas foram publicadas.", feedback: "Correto: artigo, numeral, substantivo e adjetivo estão concordando." },
        { id: "c", text: "A duas reportagens completo foram publicadas.", feedback: "Há desvios no artigo e no adjetivo." },
      ],
      correctOptionId: "b", correctExplanation: "Determinantes e adjetivos concordam em gênero e número com o substantivo a que se referem.", source: SRCN,
    },
    {
      id: "p38", chapter: "Concordância nominal", topic: "Adjetivo e mais de um substantivo", kind: "desafio-mental",
      prompt: "Complete segundo a norma-padrão: “O caderno e a caneta estavam ____.”",
      options: [
        { id: "a", text: "novo", feedback: "O adjetivo posposto refere-se a dois substantivos e deve ir para o plural." },
        { id: "b", text: "novas", feedback: "Como os substantivos têm gêneros diferentes, o plural geral fica no masculino." },
        { id: "c", text: "novos", feedback: "Correto: adjetivo posposto, dois substantivos de gêneros diferentes, masculino plural." },
      ],
      correctOptionId: "c", correctExplanation: "Quando o adjetivo posposto se refere a substantivos de gêneros diferentes, usa-se o masculino plural.", source: SRCN,
    },
    {
      id: "p39", chapter: "Concordância nominal", topic: "Bastante e bastantes", kind: "analise-de-texto",
      prompt: "Qual frase está correta?",
      options: [
        { id: "a", text: "Havia bastantes argumentos no texto.", feedback: "Correto: equivale a “muitos” e concorda com “argumentos”." },
        { id: "b", text: "Os alunos estavam bastantes atentos.", feedback: "Como advérbio de intensidade, deve ficar invariável: “bastante atentos”." },
        { id: "c", text: "A carta tinha bastante opiniões.", feedback: "Equivalendo a “muitas”, deve ir ao plural: “bastantes opiniões”." },
      ],
      correctOptionId: "a", correctExplanation: "“Bastante” varia quando acompanha substantivo; como advérbio de intensidade, permanece invariável.", source: SRCN,
    },
    {
      id: "p40", chapter: "Concordância nominal", topic: "Meio e meia", kind: "revisao",
      prompt: "Qual alternativa completa corretamente: “As estudantes ficaram ____ preocupadas e beberam ____ garrafa de água”?",
      options: [
        { id: "a", text: "meias / meio", feedback: "Os usos foram invertidos." },
        { id: "b", text: "meio / meia", feedback: "Correto: “meio” é advérbio invariável; “meia” é numeral e concorda com garrafa." },
        { id: "c", text: "meias / meias", feedback: "Antes de adjetivo, “meio” significa “um pouco” e não varia." },
      ],
      correctOptionId: "b", correctExplanation: "Como advérbio, “meio” é invariável; como numeral equivalente a metade, concorda com o substantivo.", source: SRCN,
    },
    {
      id: "p41", chapter: "Concordância nominal", topic: "É necessário", kind: "desafio-mental",
      prompt: "Qual par está correto?",
      options: [
        { id: "a", text: "É necessário paciência. / É necessária a paciência.", feedback: "Correto: sem determinante, a expressão fica invariável; com artigo, concorda." },
        { id: "b", text: "É necessária paciência. / É necessário a paciência.", feedback: "As duas concordâncias estão invertidas em relação à construção escolar cobrada." },
        { id: "c", text: "São necessário paciência. / É necessárias a paciência.", feedback: "Há desvios de número e gênero." },
      ],
      correctOptionId: "a", correctExplanation: "Em expressões como “é necessário”, a presença de determinante permite e exige a concordância com o substantivo.", source: SRCN,
    },
    {
      id: "p42", chapter: "Concordância nominal", topic: "É proibido", kind: "revisao",
      prompt: "Complete: “É ____ entrada sem autorização; é ____ a entrada de visitantes.”",
      options: [
        { id: "a", text: "proibida / proibido", feedback: "A concordância está invertida." },
        { id: "b", text: "proibido / proibida", feedback: "Correto: sem artigo, forma invariável; com artigo, concordância com “entrada”." },
        { id: "c", text: "proibidos / proibidas", feedback: "Os núcleos estão no singular." },
      ],
      correctOptionId: "b", correctExplanation: "A mesma lógica de “é necessário” se aplica a “é proibido” nessas construções.", source: SRCN,
    },
    {
      id: "p43", chapter: "Concordância nominal", topic: "Adjetivo e advérbio", kind: "analise-de-texto",
      prompt: "Em qual frase a palavra destacada funciona como advérbio e permanece invariável?",
      options: [
        { id: "a", text: "As vozes estavam baixas.", feedback: "“Baixas” caracteriza o substantivo “vozes” e é adjetivo." },
        { id: "b", text: "As estudantes falaram baixo.", feedback: "Correto: “baixo” modifica o verbo “falaram” e não varia." },
        { id: "c", text: "As notas baixas preocupavam a turma.", feedback: "“Baixas” caracteriza “notas” e é adjetivo." },
      ],
      correctOptionId: "b", correctExplanation: "Adjetivo caracteriza substantivo e varia; advérbio modifica verbo, adjetivo ou advérbio e é invariável.", source: SRCN,
    },
    {
      id: "p44", chapter: "Concordância nominal", topic: "Correção de desvios", kind: "revisao",
      prompt: "Qual é a correção adequada de “As alunas estavam meia cansadas, mas fizeram bastante atividades”?",
      options: [
        { id: "a", text: "As alunas estavam meio cansadas, mas fizeram bastantes atividades.", feedback: "Correto: advérbio “meio” não varia; “bastantes” acompanha o substantivo plural." },
        { id: "b", text: "As alunas estavam meias cansadas, mas fizeram bastante atividades.", feedback: "Mantém os dois desvios." },
        { id: "c", text: "As aluna estava meio cansada, mas fizeram bastantes atividade.", feedback: "Cria novos problemas de concordância." },
      ],
      correctOptionId: "a", correctExplanation: "A correção exige reconhecer a classe e a função de cada palavra no contexto.", source: SRCN,
    },
    {
      id: "p45", chapter: "Concordância nominal", topic: "Adjetivo anteposto", kind: "desafio-mental",
      prompt: "Segundo a concordância mais usual com adjetivo anteposto, complete: “____ dedicação e esforço garantiram o resultado.”",
      options: [
        { id: "a", text: "Necessários", feedback: "O adjetivo anteposto costuma concordar com o substantivo mais próximo, “dedicação”." },
        { id: "b", text: "Necessária", feedback: "Correto: concordância com o substantivo mais próximo, feminino singular." },
        { id: "c", text: "Necessário", feedback: "“Dedicação” é feminino." },
      ],
      correctOptionId: "b", correctExplanation: "Quando anteposto a mais de um substantivo, o adjetivo geralmente concorda com o mais próximo.", source: SRCN,
    },
    {
      id: "p46", chapter: "Concordância verbal", topic: "Sujeito simples", kind: "revisao",
      prompt: "Qual frase apresenta concordância verbal correta?",
      options: [
        { id: "a", text: "O conjunto de reportagens foram revisados.", feedback: "O núcleo do sujeito é “conjunto”, singular: “foi revisado”." },
        { id: "b", text: "O conjunto de reportagens foi revisado.", feedback: "Correto: o verbo concorda com o núcleo singular “conjunto”." },
        { id: "c", text: "O conjunto de reportagens foram revisado.", feedback: "O verbo está indevidamente no plural." },
      ],
      correctOptionId: "b", correctExplanation: "Com sujeito simples, o verbo concorda com o núcleo, não com um termo subordinado a ele.", source: SRCV,
    },
    {
      id: "p47", chapter: "Concordância verbal", topic: "Sujeito composto anteposto", kind: "analise-de-texto",
      prompt: "Complete: “A repórter e o fotógrafo ____ ao local.”",
      options: [
        { id: "a", text: "chegou", feedback: "O sujeito composto aparece antes do verbo e exige plural." },
        { id: "b", text: "chegaram", feedback: "Correto: os dois núcleos formam sujeito composto anteposto." },
        { id: "c", text: "chegaria", feedback: "Além de singular, mudaria o tempo e o sentido da frase." },
      ],
      correctOptionId: "b", correctExplanation: "Sujeito composto anteposto ao verbo leva normalmente o verbo ao plural.", source: SRCV,
    },
    {
      id: "p48", chapter: "Concordância verbal", topic: "Sujeito composto posposto", kind: "desafio-mental",
      prompt: "Com sujeito composto posposto, qual alternativa apresenta duas concordâncias aceitas pela norma-padrão?",
      options: [
        { id: "a", text: "Chegou a repórter e o fotógrafo. / Chegaram a repórter e o fotógrafo.", feedback: "Correto: pode haver concordância com o núcleo mais próximo ou com todos os núcleos." },
        { id: "b", text: "Chegamos a repórter e o fotógrafo. / Chegais a repórter e o fotógrafo.", feedback: "As pessoas verbais não correspondem ao sujeito." },
        { id: "c", text: "Chegara a repórter e o fotógrafo. / Chegarias a repórter e o fotógrafo.", feedback: "As formas não exemplificam as duas concordâncias pedidas." },
      ],
      correctOptionId: "a", correctExplanation: "Com sujeito composto depois do verbo, admite-se plural ou concordância atrativa com o núcleo mais próximo.", source: SRCV,
    },
    {
      id: "p49", chapter: "Concordância verbal", topic: "Substantivo coletivo", kind: "analise-de-texto",
      prompt: "Qual frase está adequada?",
      options: [
        { id: "a", text: "A multidão aplaudiram os autores.", feedback: "O núcleo coletivo “multidão” está no singular." },
        { id: "b", text: "A multidão aplaudiu os autores.", feedback: "Correto: o verbo concorda com o substantivo coletivo singular." },
        { id: "c", text: "A multidão aplaudistes os autores.", feedback: "A forma verbal não corresponde à terceira pessoa do sujeito." },
      ],
      correctOptionId: "b", correctExplanation: "Na regra geral escolar, o verbo concorda com o coletivo que funciona como núcleo do sujeito.", source: SRCV,
    },
    {
      id: "p50", chapter: "Concordância verbal", topic: "Pronome de tratamento", kind: "revisao",
      prompt: "Complete: “Vossa Excelência ____ o regulamento.”",
      options: [
        { id: "a", text: "aprovastes", feedback: "Pronomes de tratamento exigem verbo na terceira pessoa." },
        { id: "b", text: "aprovou", feedback: "Correto: apesar de dirigir-se ao interlocutor, a concordância é feita na terceira pessoa." },
        { id: "c", text: "aprovaste", feedback: "Essa é forma de segunda pessoa." },
      ],
      correctOptionId: "b", correctExplanation: "Pronomes de tratamento fazem concordância verbal e nominal na terceira pessoa.", source: SRCV,
    },
    {
      id: "p51", chapter: "Concordância verbal", topic: "Datas", kind: "desafio-mental",
      prompt: "Qual construção está correta para indicar a data?",
      options: [
        { id: "a", text: "Hoje é dia 15 de agosto.", feedback: "Correto: com a palavra “dia” expressa, o verbo fica no singular." },
        { id: "b", text: "Hoje são dia 15 de agosto.", feedback: "Com o núcleo singular “dia”, o verbo deve ficar no singular." },
        { id: "c", text: "Hoje é dias 15 de agosto.", feedback: "O substantivo “dia” não deve ir ao plural nessa construção." },
      ],
      correctOptionId: "a", correctExplanation: "Diz-se “Hoje é dia 15” ou “Hoje são 15 de agosto”, conforme a estrutura.", source: SRCV,
    },
    {
      id: "p52", chapter: "Concordância verbal", topic: "Verbo haver impessoal", kind: "revisao",
      prompt: "Qual frase está correta na norma-padrão?",
      options: [
        { id: "a", text: "Haviam muitos argumentos na carta.", feedback: "Com sentido de existir, “haver” é impessoal e fica no singular." },
        { id: "b", text: "Havia muitos argumentos na carta.", feedback: "Correto: “muitos argumentos” não é sujeito do verbo haver." },
        { id: "c", text: "Houveram muitos argumentos na carta.", feedback: "No sentido de existir, a forma também deveria permanecer no singular." },
      ],
      correctOptionId: "b", correctExplanation: "O verbo haver, significando existir ou ocorrer, não possui sujeito e fica na terceira pessoa do singular.", source: SRCV,
    },
    {
      id: "p53", chapter: "Concordância verbal", topic: "Verbo fazer impessoal", kind: "revisao",
      prompt: "Complete: “____ dois anos que a revista foi criada.”",
      options: [
        { id: "a", text: "Faz", feedback: "Correto: indicando tempo decorrido, “fazer” é impessoal e fica no singular." },
        { id: "b", text: "Fazem", feedback: "“Dois anos” indica o tempo, mas não funciona como sujeito." },
        { id: "c", text: "Fizeram", feedback: "Essa forma indicaria uma ação realizada por sujeito plural, ausente na frase." },
      ],
      correctOptionId: "a", correctExplanation: "O verbo fazer, quando indica tempo decorrido ou fenômeno meteorológico, é impessoal.", source: SRCV,
    },
    {
      id: "p54", chapter: "Concordância verbal", topic: "Locução com verbo impessoal", kind: "desafio-mental",
      prompt: "Qual correção é adequada para “Devem haver novas edições da reportagem”?",
      options: [
        { id: "a", text: "Deve haver novas edições da reportagem.", feedback: "Correto: a impessoalidade de “haver” mantém o auxiliar no singular." },
        { id: "b", text: "Devem haverem novas edições da reportagem.", feedback: "Além do auxiliar plural, o infinitivo não deve ser flexionado." },
        { id: "c", text: "Deve haverem novas edições da reportagem.", feedback: "O infinitivo da locução permanece “haver”." },
      ],
      correctOptionId: "a", correctExplanation: "Nas locuções, o auxiliar também fica no singular quando o verbo principal é impessoal.", source: SRCV,
    },
  ],
};
