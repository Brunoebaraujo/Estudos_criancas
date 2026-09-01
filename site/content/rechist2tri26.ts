import type { StudyModule } from "./types";

export const recHist2Tri26: StudyModule = {
  id: "RecHist2Tri26",
  subject: "História",
  subjectId: "historia",
  collection: "Recuperação · Setembro 2026",
  period: "2º trimestre de 2026",
  title: "Reformas Religiosas e Monarquias Europeias",
  subtitle: "Recuperação de História · 2º trimestre de 2026",
  description: "Da crítica às indulgências à concentração do poder real: personagens, ideias, conflitos e consequências.",
  coverImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Martin%20Luther%2C%201529.jpg?width=1200",
  coverAlt: "Retrato de Martinho Lutero pintado por Lucas Cranach, em 1529",
  chapterCount: 2,
  reviewFacts: [
    "Lutero pretendia inicialmente reformar a Igreja, mas o conflito levou ao surgimento do luteranismo.",
    "Calvino defendia a predestinação: para ele, o destino da alma já teria sido determinado por Deus.",
    "A Contrarreforma reuniu medidas de reforma interna e de combate ao avanço protestante.",
    "No absolutismo, o rei concentrava amplos poderes, mas ainda enfrentava limites locais e sociais.",
    "Na Inglaterra, o conflito entre rei e Parlamento resultou em guerra civil e na execução de Carlos I.",
  ],
  questions: [
    {
      id: "r01", chapter: "Capítulo 3", topic: "A Reforma começa", kind: "conexao",
      prompt: "Qual cenário ajuda a explicar o início das Reformas Religiosas no século XVI?",
      options: [
        { id: "a", text: "A circulação de novas ideias e críticas à Igreja em uma Europa em transformação", feedback: "Esta é a conexão correta: Humanismo, imprensa, mudanças políticas e críticas religiosas ampliaram o debate." },
        { id: "b", text: "O desaparecimento das cidades e do comércio europeu", feedback: "Ocorreu o contrário: cidades, comércio e circulação de ideias cresceram em várias partes da Europa." },
        { id: "c", text: "A completa liberdade religiosa já garantida pelos reis", feedback: "Não havia liberdade religiosa ampla. Questionar a religião oficial podia levar a perseguições e condenações." },
      ],
      correctOptionId: "a", correctExplanation: "A Reforma surgiu em meio a transformações culturais, políticas e econômicas e a críticas às práticas da Igreja.", source: "Livro, p. 48"
    },
    {
      id: "r02", chapter: "Capítulo 3", topic: "A Reforma e o Humanismo", kind: "quem-sou-eu",
      prompt: "Quem foi o humanista cristão que traduziu a Bíblia para uma linguagem popular e defendia usar a razão para aperfeiçoar a Igreja?",
      options: [
        { id: "a", text: "Erasmo de Roterdã", feedback: "Correto: Erasmo aplicou o Humanismo ao estudo do cristianismo e criticou práticas religiosas." },
        { id: "b", text: "Carlos V", feedback: "Carlos V era imperador do Sacro Império Romano-Germânico, não um líder do humanismo cristão." },
        { id: "c", text: "Oliver Cromwell", feedback: "Cromwell foi um líder político e militar inglês do século XVII, bem posterior a Erasmo." },
      ],
      correctOptionId: "a", correctExplanation: "Erasmo de Roterdã defendia que o estudo, a razão e o acesso aos textos cristãos poderiam melhorar a vida religiosa.", source: "Livro, p. 49; caderno, exercício 1"
    },
    {
      id: "r03", chapter: "Capítulo 3", topic: "A Reforma e o Humanismo", kind: "pista",
      prompt: "Qual atitude combina com o Humanismo cristão de Erasmo?",
      options: [
        { id: "a", text: "Ler e estudar os textos sagrados para refletir sobre a fé", feedback: "Exato: Erasmo valorizava o conhecimento, a leitura e a reflexão racional sobre o cristianismo." },
        { id: "b", text: "Proibir qualquer pessoa comum de estudar", feedback: "Isso contradiz o interesse humanista pela educação e pelo acesso ao conhecimento." },
        { id: "c", text: "Defender que guerras religiosas eram o principal caminho cristão", feedback: "Erasmo defendia uma vida cristã orientada pelo estudo e pela melhoria moral, não pela guerra." },
      ],
      correctOptionId: "a", correctExplanation: "O Humanismo valorizava o estudo dos textos, a razão e a capacidade humana de aprender e refletir.", source: "Livro, p. 49"
    },
    {
      id: "r04", chapter: "Capítulo 3", topic: "As 95 teses", kind: "linha-do-tempo",
      prompt: "Qual sequência está historicamente correta?",
      options: [
        { id: "a", text: "Venda de indulgências → 95 teses em 1517 → ruptura de Lutero com Roma", feedback: "Correto: a crítica às indulgências veio antes da ruptura definitiva." },
        { id: "b", text: "Ruptura de Lutero com Roma → venda de indulgências → 95 teses", feedback: "A ruptura foi consequência do conflito iniciado pelas críticas, não o primeiro acontecimento." },
        { id: "c", text: "95 teses → nascimento de Lutero → venda de indulgências", feedback: "Lutero obviamente nasceu antes de escrever as teses; a venda de indulgências motivou sua crítica." },
      ],
      correctOptionId: "a", correctExplanation: "Em 1517, Lutero tornou públicas suas críticas; o conflito posterior levou à sua excomunhão e à ruptura.", source: "Livro, pp. 50–52"
    },
    {
      id: "r05", chapter: "Capítulo 3", topic: "As 95 teses", kind: "pista",
      prompt: "O que era uma indulgência na doutrina católica apresentada pelo livro?",
      options: [
        { id: "a", text: "Uma compensação relacionada às penas pelos pecados, que passou a ser vendida como mercadoria", feedback: "Correto: a polêmica estava especialmente na comercialização das indulgências." },
        { id: "b", text: "Um imposto criado pelos camponeses contra os nobres", feedback: "Indulgência era uma prática religiosa, não um imposto camponês." },
        { id: "c", text: "Um cargo político entregue pelos reis aos bispos", feedback: "Isso confunde indulgência com funções políticas ou eclesiásticas." },
      ],
      correctOptionId: "a", correctExplanation: "Lutero considerava profana a ideia de transformar o perdão divino em algo que pudesse ser comprado.", source: "Livro, p. 50"
    },
    {
      id: "r06", chapter: "Capítulo 3", topic: "As 95 teses", kind: "conexao",
      prompt: "Segundo o material, por que a venda de indulgências foi intensificada no início do século XVI?",
      options: [
        { id: "a", text: "Para arrecadar recursos para a reforma da Basílica de São Pedro, em Roma", feedback: "Correto: o livro relaciona a venda autorizada por Leão X à necessidade de recursos para a obra." },
        { id: "b", text: "Para financiar o exército de Oliver Cromwell", feedback: "Cromwell viveu no século XVII e participou de outro contexto: a guerra civil inglesa." },
        { id: "c", text: "Para pagar a construção do Palácio de Versalhes", feedback: "Versalhes pertence ao contexto da monarquia francesa do século XVII, não à origem das 95 teses." },
      ],
      correctOptionId: "a", correctExplanation: "A arrecadação ligada à Basílica de São Pedro tornou a venda de indulgências um alvo central das críticas de Lutero.", source: "Livro, p. 50"
    },
    {
      id: "r07", chapter: "Capítulo 3", topic: "As 95 teses", kind: "verdadeiro-ou-falso",
      prompt: "Verdadeiro ou falso: as 95 teses afirmavam que comprar indulgências garantia automaticamente a salvação.",
      options: [
        { id: "a", text: "Falso", feedback: "Correto: Lutero criticava justamente a ideia de que o perdão ou a salvação pudesse ser comprado." },
        { id: "b", text: "Verdadeiro", feedback: "Essa era a prática criticada, não a posição defendida por Lutero nas teses." },
      ],
      correctOptionId: "a", correctExplanation: "As teses atacavam abusos ligados à venda de indulgências e rejeitavam a comercialização do perdão divino.", source: "Livro, pp. 50–51"
    },
    {
      id: "r08", chapter: "Capítulo 3", topic: "Surgimento do luteranismo", kind: "conexao",
      prompt: "Qual foi a intenção inicial de Martinho Lutero?",
      options: [
        { id: "a", text: "Reformar práticas da Igreja, não criar imediatamente uma nova religião", feedback: "Correto: o próprio nome Reforma está ligado a esse objetivo inicial." },
        { id: "b", text: "Tornar-se imperador do Sacro Império", feedback: "Lutero era monge e teólogo; a disputa imperial envolvia governantes como Carlos V." },
        { id: "c", text: "Fundar a Companhia de Jesus", feedback: "A Companhia de Jesus foi uma ordem católica reconhecida em 1540 e ligada a Inácio de Loyola." },
      ],
      correctOptionId: "a", correctExplanation: "A ruptura aconteceu após anos de disputa e a recusa de Lutero em mudar suas posições.", source: "Livro, p. 52; caderno, exercício 2a"
    },
    {
      id: "r09", chapter: "Capítulo 3", topic: "Surgimento do luteranismo", kind: "pista",
      prompt: "Qual conjunto resume as três ideias luteranas centrais destacadas no livro?",
      options: [
        { id: "a", text: "Salvação pela fé; Bíblia como fonte final; Igreja formada por todos os fiéis", feedback: "Correto: esse é o conjunto apresentado no material." },
        { id: "b", text: "Salvação pela compra; rei como papa; proibição da Bíblia", feedback: "Cada item contradiz as críticas e os princípios luteranos descritos no livro." },
        { id: "c", text: "Predestinação; direito divino; poder absoluto do papa", feedback: "Predestinação está ligada a Calvino; direito divino ao absolutismo; e Lutero contestou a autoridade papal." },
      ],
      correctOptionId: "a", correctExplanation: "Lutero colocou a fé e as Escrituras no centro da vida religiosa e reduziu a exclusividade do clero.", source: "Livro, p. 52"
    },
    {
      id: "r10", chapter: "Capítulo 3", topic: "Camponeses e ideias luteranas", kind: "conexao",
      prompt: "Por que parte dos camponeses alemães se inspirou nas ideias de Lutero?",
      options: [
        { id: "a", text: "Interpretou as críticas como ataque aos privilégios e abusos das classes dominantes", feedback: "Correto: os camponeses relacionaram as ideias religiosas às injustiças que viviam." },
        { id: "b", text: "Queria restaurar a autoridade total do papa", feedback: "Os revoltosos usaram argumentos ligados às críticas de Lutero, não à restauração do poder papal." },
        { id: "c", text: "Pretendia apoiar o aumento dos impostos cobrados pelos nobres", feedback: "O aumento de impostos e a opressão estavam entre as causas do descontentamento." },
      ],
      correctOptionId: "a", correctExplanation: "Entre 1524 e 1525, demandas camponesas foram justificadas com argumentos bíblicos e contra abusos senhoriais.", source: "Livro, pp. 52–53"
    },
    {
      id: "r11", chapter: "Capítulo 3", topic: "Camponeses e ideias luteranas", kind: "verdadeiro-ou-falso",
      prompt: "Verdadeiro ou falso: Lutero apoiou até o fim a revolta dos camponeses contra os nobres.",
      options: [
        { id: "a", text: "Falso", feedback: "Correto: ele simpatizou inicialmente com algumas queixas, mas condenou a violência e apoiou a repressão." },
        { id: "b", text: "Verdadeiro", feedback: "Lutero rompeu com os revoltosos, defendeu a ordem e colocou-se ao lado dos governantes e nobres." },
      ],
      correctOptionId: "a", correctExplanation: "Lutero defendia o poder do Estado e pediu obediência aos governantes durante a revolta.", source: "Livro, p. 53"
    },
    {
      id: "r12", chapter: "Capítulo 3", topic: "Expansão do luteranismo", kind: "conexao",
      prompt: "Por que muitos governantes alemães apoiaram o luteranismo?",
      options: [
        { id: "a", text: "Ganharam autonomia diante do imperador e puderam controlar terras e rendas da Igreja", feedback: "Correto: o apoio tinha dimensões religiosas, econômicas e políticas." },
        { id: "b", text: "Queriam aumentar o controle de Carlos V sobre seus territórios", feedback: "Eles buscavam justamente limitar a influência central do imperador." },
        { id: "c", text: "Pretendiam devolver todas as terras à Igreja Católica", feedback: "Em muitos casos, terras antes católicas foram tomadas e incorporadas pelos governantes." },
      ],
      correctOptionId: "a", correctExplanation: "A adesão fortaleceu governantes locais e ajudou a expandir o protestantismo.", source: "Livro, pp. 56–57"
    },
    {
      id: "r13", chapter: "Capítulo 3", topic: "Disputas políticas", kind: "quem-sou-eu",
      prompt: "Eu governava grande parte da Europa em 1519 e era visto por príncipes alemães como ameaça à autonomia deles. Quem sou?",
      options: [
        { id: "a", text: "Carlos V", feedback: "Correto: Carlos V acumulava as coroas de rei da Espanha e imperador do Sacro Império." },
        { id: "b", text: "João Calvino", feedback: "Calvino era reformador religioso francês, não imperador." },
        { id: "c", text: "Erasmo de Roterdã", feedback: "Erasmo foi humanista e escritor, não governante de territórios europeus." },
      ],
      correctOptionId: "a", correctExplanation: "A oposição ao poder de Carlos V ajudou a aproximar alguns governantes das ideias de Lutero.", source: "Livro, pp. 56–57"
    },
    {
      id: "r14", chapter: "Capítulo 3", topic: "Expansão do luteranismo", kind: "conexao",
      prompt: "Qual foi um efeito político do apoio dos governantes alemães à Reforma?",
      options: [
        { id: "a", text: "Fortalecimento dos governantes protestantes e enfraquecimento local da Igreja Católica", feedback: "Correto: eles ampliaram poder, terras e rendas em seus territórios." },
        { id: "b", text: "Fim imediato de todas as disputas religiosas na Europa", feedback: "A expansão protestante abriu novas disputas; não trouxe paz religiosa imediata." },
        { id: "c", text: "Unificação política imediata de toda a Alemanha", feedback: "Os territórios germânicos continuaram politicamente fragmentados por muito tempo." },
      ],
      correctOptionId: "a", correctExplanation: "A Reforma alterou não apenas crenças, mas também relações de poder e propriedade.", source: "Livro, p. 57"
    },
    {
      id: "r15", chapter: "Capítulo 3", topic: "Calvinismo", kind: "quem-sou-eu",
      prompt: "Nasci na França em 1509, estudei em Paris e desenvolvi outra vertente da Reforma. Quem sou?",
      image: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Portrait%20john%20calvin.jpg?width=700", alt: "Retrato histórico de João Calvino", credit: "Retrato de João Calvino · domínio público · Wikimedia Commons" },
      options: [
        { id: "a", text: "João Calvino", feedback: "Correto: Calvino foi um dos principais reformadores do século XVI." },
        { id: "b", text: "Inácio de Loyola", feedback: "Loyola fundou a Companhia de Jesus, uma ordem católica." },
        { id: "c", text: "Luís XIV", feedback: "Luís XIV foi rei absolutista francês do século XVII." },
      ],
      correctOptionId: "a", correctExplanation: "Calvino aderiu à Reforma e formulou ideias que deram origem ao calvinismo.", source: "Livro, p. 58"
    },
    {
      id: "r16", chapter: "Capítulo 3", topic: "Calvinismo", kind: "pista",
      prompt: "O que significa predestinação no calvinismo apresentado pelo livro?",
      options: [
        { id: "a", text: "Deus já teria decidido antecipadamente o destino das almas", feedback: "Correto: para Calvino, as ações humanas não mudariam esse destino já planejado." },
        { id: "b", text: "Cada pessoa compraria sua salvação por meio de indulgências", feedback: "Calvino, assim como outros reformadores, não defendia a compra da salvação." },
        { id: "c", text: "O Parlamento escolheria quem seria salvo", feedback: "Predestinação é uma doutrina religiosa sobre decisão divina, não parlamentar." },
      ],
      correctOptionId: "a", correctExplanation: "Segundo a doutrina calvinista, o destino da alma seria definido por Deus antes mesmo do nascimento.", source: "Livro, p. 58; caderno, exercício 3"
    },
    {
      id: "r17", chapter: "Capítulo 3", topic: "Calvinismo", kind: "conexao",
      prompt: "Que modo de vida era valorizado pelos calvinistas segundo o material?",
      options: [
        { id: "a", text: "Vida austera, disciplinada e sem gastos considerados supérfluos", feedback: "Correto: o livro associa o calvinismo a disciplina e austeridade." },
        { id: "b", text: "Luxo obrigatório como prova de salvação", feedback: "Isso contradiz a austeridade defendida pelos calvinistas." },
        { id: "c", text: "Ausência de trabalho e de regras morais", feedback: "A doutrina valorizava disciplina, esforço e controle da conduta." },
      ],
      correctOptionId: "a", correctExplanation: "A disciplina cotidiana foi uma característica marcante das comunidades calvinistas.", source: "Livro, p. 58"
    },
    {
      id: "r18", chapter: "Capítulo 3", topic: "Calvinismo", kind: "pista",
      prompt: "Quais grupos são citados como divisões ligadas ao calvinismo?",
      options: [
        { id: "a", text: "Puritanos e presbiterianos", feedback: "Correto: o livro destaca especialmente essas duas divisões." },
        { id: "b", text: "Jesuítas e franciscanos", feedback: "Esses são grupos católicos, não divisões do calvinismo." },
        { id: "c", text: "Anglicanos e papas", feedback: "Anglicanismo é outra vertente cristã e papa é um cargo da Igreja Católica." },
      ],
      correctOptionId: "a", correctExplanation: "O calvinismo assumiu diferentes formas em regiões diversas, incluindo puritanos e presbiterianos.", source: "Livro, p. 58"
    },
    {
      id: "r19", chapter: "Capítulo 3", topic: "Contrarreforma", kind: "conexao",
      prompt: "O que foi a Contrarreforma?",
      options: [
        { id: "a", text: "Conjunto de reformas e ações católicas para corrigir problemas e enfrentar o avanço protestante", feedback: "Correto: ela envolveu mudanças internas e combate às novas igrejas." },
        { id: "b", text: "Movimento que encerrou a Igreja Católica", feedback: "A Contrarreforma buscou fortalecer e reorganizar a Igreja Católica." },
        { id: "c", text: "Revolução inglesa contra Carlos I", feedback: "A guerra civil inglesa pertence ao capítulo das monarquias e do conflito rei-Parlamento." },
      ],
      correctOptionId: "a", correctExplanation: "A Igreja Católica respondeu às críticas, reformou instituições e procurou recuperar influência.", source: "Livro, p. 60; caderno, exercício 5"
    },
    {
      id: "r20", chapter: "Capítulo 3", topic: "Contrarreforma", kind: "pista",
      prompt: "Qual instituição católica foi reformulada para perseguir pessoas consideradas desviantes da doutrina?",
      options: [
        { id: "a", text: "Tribunal do Santo Ofício, ligado à Inquisição", feedback: "Correto: a Inquisição foi usada para vigiar e julgar desvios doutrinários." },
        { id: "b", text: "New Model Army", feedback: "Esse foi o exército parlamentar organizado na guerra civil inglesa." },
        { id: "c", text: "Parlamento inglês", feedback: "O Parlamento era uma instituição política inglesa, não um tribunal religioso católico." },
      ],
      correctOptionId: "a", correctExplanation: "A Inquisição ganhou força como instrumento de controle religioso durante a Contrarreforma.", source: "Livro, p. 60"
    },
    {
      id: "r21", chapter: "Capítulo 3", topic: "Concílio de Trento", kind: "linha-do-tempo",
      prompt: "Quando aconteceu o Concílio de Trento?",
      options: [
        { id: "a", text: "Iniciado em 1545 e realizado, com intervalos, ao longo de dezoito anos", feedback: "Correto: suas sessões se estenderam até 1563." },
        { id: "b", text: "Iniciado em 1517 e encerrado no mesmo dia das 95 teses", feedback: "1517 marca as 95 teses; o Concílio começou décadas depois." },
        { id: "c", text: "Realizado depois da execução de Carlos I, em 1649", feedback: "O Concílio de Trento pertence ao século XVI, antes da guerra civil inglesa." },
      ],
      correctOptionId: "a", correctExplanation: "O concílio reuniu bispos católicos para discutir doutrina, fé e costumes em resposta à crise religiosa.", source: "Livro, p. 62"
    },
    {
      id: "r22", chapter: "Capítulo 3", topic: "Concílio de Trento", kind: "pista",
      prompt: "Qual decisão pertence ao Concílio de Trento?",
      options: [
        { id: "a", text: "Reafirmação da autoridade papal, dos sacramentos e da interpretação das Escrituras pelo clero", feedback: "Correto: o concílio reafirmou elementos centrais da doutrina católica." },
        { id: "b", text: "Aceitação da venda obrigatória da salvação", feedback: "O concílio combateu abusos e não definiu a salvação como mercadoria." },
        { id: "c", text: "Entrega do governo da Igreja ao Parlamento inglês", feedback: "O Parlamento inglês não dirigia a Igreja Católica em Roma." },
      ],
      correctOptionId: "a", correctExplanation: "Trento reafirmou doutrinas católicas e também disciplinou práticas e formação religiosa.", source: "Livro, p. 62"
    },
    {
      id: "r23", chapter: "Capítulo 3", topic: "Contrarreforma", kind: "conexao",
      prompt: "Para que servia o Index?",
      options: [
        { id: "a", text: "Listar livros proibidos por conter ideias consideradas contrárias à doutrina católica", feedback: "Correto: o Index buscava controlar a circulação de certas ideias impressas." },
        { id: "b", text: "Registrar impostos cobrados pelo Parlamento inglês", feedback: "O Index era um instrumento de controle religioso de livros, não um registro fiscal inglês." },
        { id: "c", text: "Organizar os soldados do exército de Cromwell", feedback: "O exército de Cromwell era o New Model Army; não tinha relação com o Index." },
      ],
      correctOptionId: "a", correctExplanation: "Com a expansão da imprensa, a Igreja procurou controlar livros e textos julgados perigosos para a fé.", source: "Livro, p. 62"
    },
    {
      id: "r24", chapter: "Capítulo 3", topic: "Companhia de Jesus", kind: "quem-sou-eu",
      prompt: "Qual ordem religiosa, reconhecida pelo papa em 1540, atuou na educação, catequização e conversão?",
      options: [
        { id: "a", text: "Companhia de Jesus", feedback: "Correto: os jesuítas tiveram papel importante na expansão e defesa do catolicismo." },
        { id: "b", text: "Puritanos", feedback: "Puritanos eram protestantes influenciados pelo calvinismo." },
        { id: "c", text: "New Model Army", feedback: "Esse era um exército parlamentar inglês, não uma ordem religiosa." },
      ],
      correctOptionId: "a", correctExplanation: "Fundada por Inácio de Loyola e outros religiosos, a Companhia de Jesus tornou-se um instrumento central da Contrarreforma.", source: "Livro, p. 62; caderno, exercício 6"
    },
    {
      id: "m01", chapter: "Capítulo 4", topic: "Absolutismo", kind: "pista",
      prompt: "O que caracteriza o absolutismo?",
      options: [
        { id: "a", text: "Concentração de amplos poderes políticos, jurídicos e legislativos nas mãos do rei", feedback: "Correto: o poder real se tornou o centro do governo." },
        { id: "b", text: "Ausência completa de reis e governos", feedback: "O absolutismo fortaleceu a monarquia, não eliminou o governo." },
        { id: "c", text: "Governo controlado apenas por assembleias camponesas", feedback: "A característica central era a concentração monárquica, não o governo camponês." },
      ],
      correctOptionId: "a", correctExplanation: "No Estado absolutista, o rei concentrava funções que hoje costumam ser separadas entre diferentes poderes.", source: "Caderno, exercício 1"
    },
    {
      id: "m02", chapter: "Capítulo 4", topic: "Direito divino dos reis", kind: "conexao",
      prompt: "Segundo a teoria do direito divino, de onde viria a autoridade do rei?",
      options: [
        { id: "a", text: "De Deus; desobedecer ao rei poderia ser apresentado como desobedecer à vontade divina", feedback: "Correto: a religião era usada para legitimar o poder monárquico." },
        { id: "b", text: "Exclusivamente de eleições anuais feitas por camponeses", feedback: "O direito divino não dependia de eleição popular; afirmava origem sagrada do poder." },
        { id: "c", text: "Do papa, que escolhia obrigatoriamente todos os reis europeus", feedback: "A teoria afirmava que Deus legitimava o rei; não que o papa nomeava todo monarca." },
      ],
      correctOptionId: "a", correctExplanation: "O direito divino dava uma justificativa religiosa para a obediência ao monarca.", source: "Caderno, exercício 2"
    },
    {
      id: "m03", chapter: "Capítulo 4", topic: "Estado Moderno Absolutista", kind: "conexao",
      prompt: "Qual conjunto ajudou os reis a formar Estados mais centralizados?",
      options: [
        { id: "a", text: "Exércitos permanentes, cobrança de impostos, leis e administração ligadas ao rei", feedback: "Correto: esses instrumentos aumentaram a capacidade de governar territórios maiores." },
        { id: "b", text: "Fim de todos os impostos, exércitos e funcionários", feedback: "Sem recursos, força militar e administração, a centralização seria enfraquecida." },
        { id: "c", text: "Cada cidade com moeda, lei e exército totalmente independentes", feedback: "A fragmentação local era justamente um obstáculo à centralização do Estado." },
      ],
      correctOptionId: "a", correctExplanation: "A formação do Estado Moderno envolveu instituições permanentes sob autoridade central.", source: "Caderno, exercício 5; livro, p. 82"
    },
    {
      id: "m04", chapter: "Capítulo 4", topic: "Estado Moderno Absolutista", kind: "conexao",
      prompt: "Como nobres e burgueses podiam colaborar com o fortalecimento dos reis?",
      options: [
        { id: "a", text: "Nobres ocupavam cargos e a burguesia se beneficiava de regras, mercados e moedas mais unificados", feedback: "Correto: grupos diferentes podiam apoiar a centralização por interesses próprios." },
        { id: "b", text: "Ambos deixavam obrigatoriamente de participar da vida política e econômica", feedback: "Eles continuaram atuando e podiam obter cargos, proteção ou vantagens econômicas." },
        { id: "c", text: "Os dois grupos eram formados somente por camponeses sem propriedade", feedback: "Nobreza e burguesia eram grupos sociais distintos dos camponeses." },
      ],
      correctOptionId: "a", correctExplanation: "A centralização não foi obra isolada do rei: ela envolveu alianças, funcionários e interesses sociais.", source: "Caderno, exercício 5"
    },
    {
      id: "m05", chapter: "Capítulo 4", topic: "Revoltas na Inglaterra", kind: "linha-do-tempo",
      prompt: "Qual sequência da crise inglesa está correta?",
      options: [
        { id: "a", text: "Jaime I assume em 1603 → conflito cresce com Carlos I → guerra civil em 1642 → execução em 1649", feedback: "Correto: essa sequência mostra o agravamento do conflito entre Coroa e Parlamento." },
        { id: "b", text: "Execução de Carlos I → Jaime I assume → guerra civil", feedback: "A execução foi o resultado do conflito e aconteceu depois dos reinados de Jaime I e Carlos I." },
        { id: "c", text: "Guerra civil → nascimento de Jaime I → Parlamento é criado", feedback: "O Parlamento já existia, e Jaime I viveu antes da guerra civil." },
      ],
      correctOptionId: "a", correctExplanation: "A crise atravessou os reinados dos primeiros Stuart e culminou na guerra e na execução de Carlos I.", source: "Livro, pp. 80–81"
    },
    {
      id: "m06", chapter: "Capítulo 4", topic: "Revoltas na Inglaterra", kind: "quem-sou-eu",
      prompt: "Assumi o trono inglês em 1603 e defendia que havia recebido meu poder diretamente de Deus. Quem sou?",
      options: [
        { id: "a", text: "Jaime I", feedback: "Correto: Jaime I, da dinastia Stuart, defendia o direito divino dos reis." },
        { id: "b", text: "Carlos V", feedback: "Carlos V governou o Sacro Império e a Espanha no contexto da Reforma." },
        { id: "c", text: "João Calvino", feedback: "Calvino foi reformador religioso, não rei da Inglaterra." },
      ],
      correctOptionId: "a", correctExplanation: "A defesa do direito divino por Jaime I reforçou tensões com o Parlamento.", source: "Livro, p. 80"
    },
    {
      id: "m07", chapter: "Capítulo 4", topic: "Revoltas na Inglaterra", kind: "conexao",
      prompt: "Por que os puritanos entraram em conflito com a monarquia inglesa?",
      options: [
        { id: "a", text: "Influenciados por Calvino, rejeitavam o papel do rei na defesa de uma Igreja Anglicana com elementos católicos", feedback: "Correto: havia uma disputa religiosa junto da disputa política." },
        { id: "b", text: "Queriam reforçar a autoridade do papa sobre a Inglaterra", feedback: "Puritanos eram protestantes e desejavam afastar ainda mais práticas católicas." },
        { id: "c", text: "Defendiam a venda de indulgências por Jaime I", feedback: "A questão puritana inglesa não se concentrava em vender indulgências pelo rei." },
      ],
      correctOptionId: "a", correctExplanation: "O conflito inglês misturou disputas sobre poder político, impostos e religião.", source: "Livro, p. 80"
    },
    {
      id: "m08", chapter: "Capítulo 4", topic: "Revoltas na Inglaterra", kind: "pista",
      prompt: "O que o Parlamento decidiu em 1628?",
      options: [
        { id: "a", text: "Proibiu a criação de impostos sem o consentimento do Legislativo", feedback: "Correto: a medida limitava a capacidade fiscal do rei Carlos I." },
        { id: "b", text: "Entregou ao rei poder ilimitado para criar qualquer imposto", feedback: "A decisão foi justamente uma tentativa de limitar esse poder." },
        { id: "c", text: "Aboliu definitivamente a monarquia naquele ano", feedback: "A monarquia ainda continuou; a guerra civil começaria em 1642." },
      ],
      correctOptionId: "a", correctExplanation: "A disputa sobre tributação sem aprovação parlamentar foi um ponto central da crise.", source: "Livro, p. 81"
    },
    {
      id: "m09", chapter: "Capítulo 4", topic: "Guerra Civil Inglesa", kind: "conexao",
      prompt: "Quem enfrentou quem na guerra civil iniciada em 1642?",
      options: [
        { id: "a", text: "Apoiadores do rei contra apoiadores do Parlamento", feedback: "Correto: a disputa política se transformou em conflito armado." },
        { id: "b", text: "Jesuítas contra o Concílio de Trento", feedback: "Os jesuítas foram parte da renovação católica ligada à Contrarreforma." },
        { id: "c", text: "Lutero contra Calvino em batalha militar", feedback: "Lutero e Calvino foram reformadores de gerações e contextos diferentes; não travaram essa guerra." },
      ],
      correctOptionId: "a", correctExplanation: "A guerra civil decidiu se o rei governaria acima do Parlamento ou seria limitado por ele.", source: "Livro, pp. 80–81"
    },
    {
      id: "m10", chapter: "Capítulo 4", topic: "Guerra Civil Inglesa", kind: "quem-sou-eu",
      prompt: "Organizei o New Model Army, derrotei o exército do rei e me tornei líder do Parlamento. Quem sou?",
      options: [
        { id: "a", text: "Oliver Cromwell", feedback: "Correto: Cromwell comandou forças parlamentares decisivas na guerra civil." },
        { id: "b", text: "Papa Leão X", feedback: "Leão X pertence ao contexto das indulgências e da Reforma, no início do século XVI." },
        { id: "c", text: "Luís XIV", feedback: "Luís XIV foi rei da França e símbolo do absolutismo francês." },
      ],
      correctOptionId: "a", correctExplanation: "O exército parlamentar liderado por Cromwell venceu; Carlos I foi executado em janeiro de 1649.", source: "Livro, p. 81"
    },
    {
      id: "m11", chapter: "Capítulo 4", topic: "Concentração do poder real", kind: "conexao",
      prompt: "Como o Palácio de Versalhes ajudava a concentração do poder na França?",
      image: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Louis%20XIV%20of%20France.jpg?width=700", alt: "Retrato de Luís XIV da França", credit: "Luís XIV, por Hyacinthe Rigaud · domínio público · Wikimedia Commons" },
      options: [
        { id: "a", text: "Era residência real, sede de parte da administração e centro da vida da corte", feedback: "Correto: Versalhes reunia governo, nobreza e a imagem de poder do monarca." },
        { id: "b", text: "Funcionava como sede do Parlamento inglês", feedback: "Versalhes ficava na França e estava ligado à monarquia francesa." },
        { id: "c", text: "Era um mosteiro criado por Martinho Lutero", feedback: "Versalhes era um palácio real francês, não uma instituição luterana." },
      ],
      correctOptionId: "a", correctExplanation: "Ao atrair nobres para a corte e concentrar funções, Versalhes ajudava o rei a controlar a política e exibir autoridade.", source: "Livro, p. 82"
    },
    {
      id: "m12", chapter: "Capítulo 4", topic: "Limites e custos do absolutismo", kind: "pista",
      prompt: "Qual afirmação mostra que o poder absolutista não era literalmente ilimitado no cotidiano?",
      options: [
        { id: "a", text: "Nobres, burocracias locais e conselhos urbanos ainda influenciavam decisões distantes da corte", feedback: "Correto: o rei concentrava muito poder, mas dependia de redes locais para governar." },
        { id: "b", text: "O rei conseguia controlar pessoalmente cada vila e cada decisão sem intermediários", feedback: "Isso seria impraticável; a administração dependia de funcionários e autoridades locais." },
        { id: "c", text: "Não existiam impostos, funcionários nem conflitos sociais", feedback: "Esses elementos existiam e os altos custos da corte e da guerra podiam aumentar tensões." },
      ],
      correctOptionId: "a", correctExplanation: "O absolutismo concentrava a autoridade, mas não eliminava distâncias, interesses locais nem limites administrativos.", source: "Livro, p. 82"
    },
  ],
};
