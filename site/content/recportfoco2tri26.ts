import type { StudyModule } from "./types";

const SRC3 = "PDF da recuperação de Língua Portuguesa — Capítulo 3, transitividade verbal";
const SRC4 = "PDF da recuperação de Língua Portuguesa — Capítulo 4, coordenação e formas de citação";
const SRC6 = "PDF da recuperação de Língua Portuguesa — Capítulo 6, fato, opinião e informações implícitas";
const SRCN = "PDF da recuperação de Língua Portuguesa — concordância nominal";
const SRCV = "PDF da recuperação de Língua Portuguesa — concordância verbal";

const FAIR_TEXT = "Texto-base criado para o reforço: Na sexta-feira, a escola abriu uma hora mais cedo para receber as famílias. Segundo a direção, 186 pessoas visitaram a mostra. Ana, do 7º ano, afirmou: “A exposição ficou muito interessante.” Ao final, as luzes de duas salas ainda estavam acesas; por isso, o zelador voltou ao corredor.";

export const recPortFoco2Tri26: StudyModule = {
  id: "RecPortFoco2Tri26",
  subject: "Língua Portuguesa",
  subjectId: "portugues",
  collection: "Reforço · Setembro 2026",
  navigationLabel: "Português — Reforço",
  period: "2º trimestre de 2026",
  title: "Reforço direcionado de Português",
  subtitle: "Revisão focada após a primeira rodada · 7º ano",
  description: "24 desafios novos concentrados nos assuntos que exigiram mais tentativas na revisão completa.",
  chapterCount: 5,
  reviewFacts: [
    "Haver com sentido de existir é impessoal: havia dúvidas, houve problemas, deve haver respostas.",
    "Existir não é impessoal: existe uma solução, existem várias soluções.",
    "A transitividade depende do uso do verbo na frase. O mesmo verbo pode ter classificações diferentes.",
    "Bastante varia quando equivale a muitos ou muitas; como advérbio de intensidade, fica invariável.",
    "Fato pode ser verificado; opinião apresenta avaliação, julgamento ou posicionamento.",
    "Citação direta reproduz as palavras; citação indireta reformula a fala e exige ajustes gramaticais.",
    "Orações coordenadas assindéticas não têm conjunção; nas sindéticas, a conjunção explicita a relação de sentido.",
  ],
  questions: [
    {
      id: "f01", chapter: "Concordância verbal", topic: "Verbo haver impessoal", kind: "revisao",
      prompt: "Complete segundo a norma-padrão: “Ontem ____ muitas dúvidas durante a atividade.”",
      options: [
        { id: "a", text: "houveram", feedback: "Com sentido de existir ou ocorrer, haver não vai ao plural." },
        { id: "b", text: "houve", feedback: "Correto: “houve” permanece no singular, embora “muitas dúvidas” esteja no plural." },
        { id: "c", text: "houverão", feedback: "Além de plural, essa forma está no futuro; a frase pede passado." },
      ],
      correctOptionId: "b", correctExplanation: "Haver no sentido de existir é impessoal e fica na terceira pessoa do singular.", source: SRCV,
    },
    {
      id: "f02", chapter: "Concordância verbal", topic: "Locução com haver impessoal", kind: "desafio-mental",
      prompt: "Qual frase está correta?",
      options: [
        { id: "a", text: "Podem haver novas perguntas na prova.", feedback: "A impessoalidade de “haver” também mantém o auxiliar no singular." },
        { id: "b", text: "Pode haver novas perguntas na prova.", feedback: "Correto: toda a locução permanece no singular." },
        { id: "c", text: "Pode haverem novas perguntas na prova.", feedback: "O infinitivo da locução não deve ser flexionado." },
      ],
      correctOptionId: "b", correctExplanation: "Em locuções verbais, o auxiliar fica no singular quando o verbo principal é haver impessoal.", source: SRCV,
    },
    {
      id: "f03", chapter: "Concordância verbal", topic: "Haver e existir", kind: "analise-de-texto",
      prompt: "Qual par apresenta as duas frases corretas?",
      options: [
        { id: "a", text: "Havia bons argumentos. / Existiam bons argumentos.", feedback: "Correto: haver é impessoal; existir concorda com o sujeito plural." },
        { id: "b", text: "Haviam bons argumentos. / Existia bons argumentos.", feedback: "As concordâncias foram invertidas." },
        { id: "c", text: "Houveram bons argumentos. / Existiu bons argumentos.", feedback: "No sentido pretendido, haver fica no singular e existir concorda no plural." },
      ],
      correctOptionId: "a", correctExplanation: "Haver com sentido de existir fica no singular; existir possui sujeito e concorda com ele.", source: SRCV,
    },
    {
      id: "f04", chapter: "Concordância verbal", topic: "Haver impessoal no futuro", kind: "revisao",
      prompt: "Complete: “Amanhã ____ duas reuniões na escola.”",
      options: [
        { id: "a", text: "haverá", feedback: "Correto: mesmo no futuro, haver impessoal permanece no singular." },
        { id: "b", text: "haverão", feedback: "“Duas reuniões” não é sujeito do verbo haver nesse sentido." },
        { id: "c", text: "houveram", feedback: "Essa forma está no passado e indevidamente no plural." },
      ],
      correctOptionId: "a", correctExplanation: "Tempo verbal não muda a regra: haverá uma reunião e haverá duas reuniões.", source: SRCV,
    },
    {
      id: "f05", chapter: "Capítulo 3", topic: "Verbo intransitivo", kind: "analise-de-texto",
      prompt: "Em “Os convidados chegaram cedo”, como se classifica “chegaram” nesse uso?",
      options: [
        { id: "a", text: "Verbo intransitivo", feedback: "Correto: “cedo” apenas indica tempo; não é objeto." },
        { id: "b", text: "Verbo transitivo direto", feedback: "Não há complemento sem preposição que funcione como objeto direto." },
        { id: "c", text: "Verbo transitivo indireto", feedback: "“Cedo” é advérbio e não objeto indireto." },
      ],
      correctOptionId: "a", correctExplanation: "O verbo apresenta sentido completo e recebe apenas uma circunstância de tempo.", source: SRC3,
    },
    {
      id: "f06", chapter: "Capítulo 3", topic: "Verbo transitivo direto", kind: "revisao",
      prompt: "Em “A estudante revisou o parágrafo”, qual análise está correta?",
      options: [
        { id: "a", text: "“revisou” é VTI; “o parágrafo” é OI", feedback: "Não há preposição exigida antes do complemento." },
        { id: "b", text: "“revisou” é VI; “o parágrafo” é circunstância", feedback: "“O parágrafo” completa o sentido de revisar." },
        { id: "c", text: "“revisou” é VTD; “o parágrafo” é OD", feedback: "Correto: quem revisa, revisa algo, sem preposição obrigatória." },
      ],
      correctOptionId: "c", correctExplanation: "O objeto direto liga-se ao verbo sem preposição exigida.", source: SRC3,
    },
    {
      id: "f07", chapter: "Capítulo 3", topic: "Verbo transitivo indireto", kind: "analise-de-texto",
      prompt: "Em “A turma obedeceu às orientações”, qual é a análise correta?",
      options: [
        { id: "a", text: "“obedeceu” é VTI; “às orientações” é OI", feedback: "Correto: obedecer exige a preposição “a”." },
        { id: "b", text: "“obedeceu” é VTD; “as orientações” é OD", feedback: "O acento grave registra a união da preposição “a” com o artigo “as”." },
        { id: "c", text: "“obedeceu” é VI", feedback: "A frase informa a que a turma obedeceu; esse termo completa o verbo." },
      ],
      correctOptionId: "a", correctExplanation: "Quem obedece, obedece a algo ou a alguém; o complemento é objeto indireto.", source: SRC3,
    },
    {
      id: "f08", chapter: "Capítulo 3", topic: "Verbo transitivo direto e indireto", kind: "desafio-mental",
      prompt: "Em “Maya entregou o resumo à professora”, quais são os complementos?",
      options: [
        { id: "a", text: "“o resumo” é OD; “à professora” é OI", feedback: "Correto: entrega-se algo a alguém." },
        { id: "b", text: "Os dois são objetos diretos", feedback: "“À professora” contém preposição exigida pelo verbo." },
        { id: "c", text: "“o resumo” é sujeito; “à professora” é OD", feedback: "O sujeito é Maya; “o resumo” é aquilo que foi entregue." },
      ],
      correctOptionId: "a", correctExplanation: "O verbo é transitivo direto e indireto: recebe um objeto sem preposição e outro preposicionado.", source: SRC3,
    },
    {
      id: "f09", chapter: "Capítulo 3", topic: "Objeto direto e objeto indireto", kind: "revisao",
      prompt: "Na frase “O leitor discordou da opinião”, qual termo é objeto indireto?",
      options: [
        { id: "a", text: "O leitor", feedback: "Esse é o sujeito da oração." },
        { id: "b", text: "discordou", feedback: "Esse é o verbo." },
        { id: "c", text: "da opinião", feedback: "Correto: discordar exige a preposição “de”." },
      ],
      correctOptionId: "c", correctExplanation: "O objeto indireto completa um verbo por meio da preposição que ele exige.", source: SRC3,
    },
    {
      id: "f10", chapter: "Capítulo 3", topic: "Transitividade no contexto", kind: "analise-de-texto",
      prompt: "Compare: “O sino tocou” e “A funcionária tocou o sino”. O que muda?",
      options: [
        { id: "a", text: "Na primeira, “tocou” é VI; na segunda, é VTD", feedback: "Correto: a classificação depende da construção em que o verbo aparece." },
        { id: "b", text: "O verbo é VTI nas duas frases", feedback: "Nenhuma das duas construções apresenta objeto indireto." },
        { id: "c", text: "O verbo é sempre intransitivo, independentemente da frase", feedback: "A segunda frase possui o objeto direto “o sino”." },
      ],
      correctOptionId: "a", correctExplanation: "A transitividade não é uma etiqueta fixa: deve ser analisada no contexto.", source: SRC3,
    },
    {
      id: "f11", chapter: "Concordância nominal", topic: "Bastante e bastantes", kind: "revisao",
      prompt: "Complete: “A reportagem apresentou ____ dados e argumentos ____ claros.”",
      options: [
        { id: "a", text: "bastante / bastantes", feedback: "Antes de “dados”, a palavra equivale a muitos e deve variar; antes de “claros”, intensifica o adjetivo e não varia." },
        { id: "b", text: "bastantes / bastante", feedback: "Correto: “bastantes dados” e “bastante claros”." },
        { id: "c", text: "bastantes / bastantes", feedback: "No segundo espaço, “bastante” é advérbio de intensidade e fica invariável." },
      ],
      correctOptionId: "b", correctExplanation: "Equivalendo a muitos, bastante varia; modificando um adjetivo, é advérbio invariável.", source: SRCN,
    },
    {
      id: "f12", chapter: "Concordância nominal", topic: "Bastante como advérbio", kind: "analise-de-texto",
      prompt: "Qual frase está correta?",
      options: [
        { id: "a", text: "As questões estavam bastantes difíceis.", feedback: "Modificando o adjetivo “difíceis”, bastante é advérbio e não varia." },
        { id: "b", text: "As questões estavam bastante difíceis.", feedback: "Correto: significa “muito difíceis”." },
        { id: "c", text: "As questão estavam bastante difícil.", feedback: "Substantivo e adjetivo também precisam concordar no plural." },
      ],
      correctOptionId: "b", correctExplanation: "Advérbios são invariáveis; por isso, dizemos bastante difícil e bastante difíceis.", source: SRCN,
    },
    {
      id: "f13", chapter: "Concordância nominal", topic: "É necessário", kind: "desafio-mental",
      prompt: "Qual par segue a regra trabalhada na revisão?",
      options: [
        { id: "a", text: "É necessário atenção. / É necessária a atenção.", feedback: "Correto: sem determinante, a expressão fica invariável; com artigo, concorda com o substantivo." },
        { id: "b", text: "É necessária atenção. / É necessário a atenção.", feedback: "As concordâncias estão invertidas." },
        { id: "c", text: "São necessárias atenção. / São necessário a atenção.", feedback: "O verbo e o predicativo não seguem a construção adequada." },
      ],
      correctOptionId: "a", correctExplanation: "A presença do artigo determina a concordância em “é necessária a atenção”.", source: SRCN,
    },
    {
      id: "f14", chapter: "Concordância nominal", topic: "É proibido", kind: "revisao",
      prompt: "Complete: “É ____ entrada sem crachá; é ____ a entrada após o sinal.”",
      options: [
        { id: "a", text: "proibida / proibido", feedback: "A concordância está invertida." },
        { id: "b", text: "proibido / proibida", feedback: "Correto: sem artigo, forma invariável; com artigo, concordância com “entrada”." },
        { id: "c", text: "proibidas / proibidos", feedback: "As duas construções têm núcleo no singular." },
      ],
      correctOptionId: "b", correctExplanation: "Com substantivo determinado por artigo, o predicativo concorda: é proibida a entrada.", source: SRCN,
    },
    {
      id: "f15", chapter: "Concordância nominal", topic: "Adjetivo anteposto", kind: "analise-de-texto",
      prompt: "Complete pela concordância mais usual: “____ organização e planejamento ajudaram a equipe.”",
      options: [
        { id: "a", text: "Boa", feedback: "Correto: o adjetivo anteposto concorda com o substantivo mais próximo, “organização”." },
        { id: "b", text: "Bom", feedback: "O substantivo mais próximo é feminino." },
        { id: "c", text: "Bons", feedback: "Na construção anteposta cobrada, faz-se a concordância com o núcleo mais próximo." },
      ],
      correctOptionId: "a", correctExplanation: "Anteposto a substantivos de gêneros diferentes, o adjetivo costuma concordar com o mais próximo.", source: SRCN,
    },
    {
      id: "f16", chapter: "Capítulo 6", topic: "Fato e opinião", kind: "analise-de-texto", context: FAIR_TEXT,
      prompt: "Qual trecho expressa uma opinião?",
      options: [
        { id: "a", text: "“186 pessoas visitaram a mostra”", feedback: "É uma informação objetiva atribuída à direção e passível de verificação." },
        { id: "b", text: "“A exposição ficou muito interessante”", feedback: "Correto: “interessante” expressa uma avaliação de Ana." },
        { id: "c", text: "“a escola abriu uma hora mais cedo”", feedback: "É um acontecimento verificável." },
      ],
      correctOptionId: "b", correctExplanation: "Opinião contém avaliação ou julgamento; fato pode ser confirmado por evidências.", source: SRC6,
    },
    {
      id: "f17", chapter: "Capítulo 6", topic: "Informação implícita", kind: "analise-de-texto", context: FAIR_TEXT,
      prompt: "O que se pode inferir do final do texto?",
      options: [
        { id: "a", text: "O zelador percebeu que havia algo a verificar ou apagar nas salas", feedback: "Correto: as luzes acesas explicam por que ele voltou ao corredor." },
        { id: "b", text: "A mostra foi cancelada antes de começar", feedback: "O texto informa que houve visitantes e avaliação da exposição." },
        { id: "c", text: "Nenhuma família compareceu à escola", feedback: "O número de visitantes contradiz essa conclusão." },
      ],
      correctOptionId: "a", correctExplanation: "A inferência nasce da ligação entre pistas explícitas, mesmo quando a conclusão não é escrita diretamente.", source: SRC6,
    },
    {
      id: "f18", chapter: "Capítulo 4", topic: "Citação direta", kind: "analise-de-texto", context: FAIR_TEXT,
      prompt: "Qual recurso marca a reprodução exata das palavras de Ana?",
      options: [
        { id: "a", text: "As aspas", feedback: "Correto: elas delimitam a fala reproduzida diretamente." },
        { id: "b", text: "O número 186", feedback: "O número pertence a outra informação do texto." },
        { id: "c", text: "A expressão “ao final”", feedback: "Essa expressão organiza o tempo, mas não marca a fala." },
      ],
      correctOptionId: "a", correctExplanation: "A citação direta preserva as palavras do enunciador e pode ser marcada por aspas ou travessão.", source: SRC4,
    },
    {
      id: "f19", chapter: "Capítulo 4", topic: "Citação indireta", kind: "revisao",
      prompt: "Qual alternativa transforma corretamente a fala de Ana em citação indireta?",
      options: [
        { id: "a", text: "Ana afirmou: “A exposição ficou muito interessante.”", feedback: "Essa continua sendo uma citação direta." },
        { id: "b", text: "Ana afirmou que a exposição tinha ficado muito interessante.", feedback: "Correto: a fala foi integrada ao período e sofreu ajuste verbal." },
        { id: "c", text: "Ana afirmou que: “A exposição ficou muito interessante.”", feedback: "A construção mistura indevidamente as duas formas de citação." },
      ],
      correctOptionId: "b", correctExplanation: "Na citação indireta, o narrador reformula a fala e ajusta pronomes e tempos verbais quando necessário.", source: SRC4,
    },
    {
      id: "f20", chapter: "Capítulo 4", topic: "Oração coordenada assindética", kind: "analise-de-texto",
      prompt: "Em qual alternativa as orações são coordenadas assindéticas?",
      options: [
        { id: "a", text: "A campainha tocou, os estudantes entraram, a aula começou.", feedback: "Correto: as orações estão justapostas, sem conjunção." },
        { id: "b", text: "A campainha tocou e os estudantes entraram.", feedback: "A conjunção “e” torna a segunda oração sindética aditiva." },
        { id: "c", text: "Os estudantes entraram porque a campainha tocou.", feedback: "Há uma conjunção ligando as orações." },
      ],
      correctOptionId: "a", correctExplanation: "Assindética significa sem síndeto, isto é, sem conjunção coordenativa.", source: SRC4,
    },
    {
      id: "f21", chapter: "Capítulo 4", topic: "Coordenação adversativa e conclusiva", kind: "desafio-mental",
      prompt: "Complete: “Ela estudou bastante, ____ ainda estava insegura; revisou novamente, ____ sentiu-se preparada.”",
      options: [
        { id: "a", text: "portanto / mas", feedback: "As relações foram invertidas: primeiro há contraste; depois, conclusão." },
        { id: "b", text: "mas / portanto", feedback: "Correto: “mas” introduz oposição e “portanto” apresenta conclusão." },
        { id: "c", text: "ou / porque", feedback: "A frase não expressa alternativa seguida de explicação." },
      ],
      correctOptionId: "b", correctExplanation: "A escolha da conjunção depende da relação lógica entre as ideias.", source: SRC4,
    },
    {
      id: "f22", chapter: "Capítulo 4", topic: "Coordenação explicativa", kind: "revisao",
      prompt: "Em “Feche a janela, porque começou a chover”, a segunda oração é:",
      options: [
        { id: "a", text: "Coordenada sindética explicativa", feedback: "Correto: ela explica ou justifica a ordem dada." },
        { id: "b", text: "Coordenada sindética alternativa", feedback: "Não há escolha entre possibilidades." },
        { id: "c", text: "Coordenada assindética", feedback: "A conjunção “porque” está expressa." },
      ],
      correctOptionId: "a", correctExplanation: "Após uma ordem ou pedido, “porque” pode introduzir a justificativa, formando coordenação explicativa.", source: SRC4,
    },
    {
      id: "f23", chapter: "Concordância verbal", topic: "Sujeito simples", kind: "analise-de-texto",
      prompt: "Qual frase está correta?",
      options: [
        { id: "a", text: "O grupo de estudantes apresentaram o trabalho.", feedback: "O núcleo do sujeito é “grupo”, no singular." },
        { id: "b", text: "O grupo de estudantes apresentou o trabalho.", feedback: "Correto: o verbo concorda com o núcleo singular “grupo”." },
        { id: "c", text: "O grupo de estudantes apresentastes o trabalho.", feedback: "A forma verbal está na segunda pessoa e não concorda com o sujeito." },
      ],
      correctOptionId: "b", correctExplanation: "Com sujeito simples, a concordância é feita com seu núcleo, não com o termo plural que o acompanha.", source: SRCV,
    },
    {
      id: "f24", chapter: "Concordância verbal", topic: "Verbo fazer impessoal", kind: "revisao",
      prompt: "Complete: “____ três semanas que a turma iniciou o projeto.”",
      options: [
        { id: "a", text: "Faz", feedback: "Correto: indicando tempo decorrido, fazer é impessoal e fica no singular." },
        { id: "b", text: "Fazem", feedback: "“Três semanas” indica duração, mas não é sujeito." },
        { id: "c", text: "Fizeram", feedback: "Essa forma exigiria um sujeito plural praticando uma ação." },
      ],
      correctOptionId: "a", correctExplanation: "Fazer, quando indica tempo decorrido, permanece na terceira pessoa do singular.", source: SRCV,
    },
  ],
};
