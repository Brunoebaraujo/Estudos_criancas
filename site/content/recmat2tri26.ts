import type { StudyModule } from "./types";

const CH5 = "Conteúdo programático informado — Capítulo 5, pp. 114–129 (exceto pp. 118–119)";
const CH6 = "Conteúdo programático informado — Capítulo 6, pp. 136–155";
const CH7 = "Conteúdo programático informado — Capítulo 7, pp. 160–177";

export const recMat2Tri26: StudyModule = {
  id: "RecMat2Tri26",
  subject: "Matemática",
  subjectId: "matematica",
  collection: "Recuperação · Setembro 2026",
  period: "2º trimestre de 2026",
  title: "Álgebra, Ângulos e Proporcionalidade",
  subtitle: "Revisão de Matemática · 7º ano",
  description: "Expressões e equações, relações entre ângulos, razão, proporção, regra de três e porcentagem.",
  chapterCount: 3,
  reviewFacts: [
    "Em uma expressão, só podemos somar ou subtrair termos semelhantes: eles precisam ter a mesma parte literal.",
    "Resolver uma equação é manter a igualdade equilibrada enquanto isolamos a incógnita.",
    "Um grau tem 60 minutos, e um minuto tem 60 segundos. Portanto, 1° = 3.600″.",
    "Ângulos complementares somam 90°; suplementares somam 180°.",
    "Ângulos opostos pelo vértice são congruentes, isto é, têm a mesma medida.",
    "Em grandezas diretamente proporcionais, as duas variam no mesmo sentido; nas inversamente proporcionais, variam em sentidos opostos.",
    "Antes de calcular uma razão, transforme as grandezas para a mesma unidade.",
    "Porcentagem é uma razão de denominador 100: 25% = 25/100 = 0,25.",
  ],
  questions: [
    {
      id: "m01", chapter: "Capítulo 5", topic: "Expressões algébricas", kind: "conexao",
      prompt: "Uma corrida custa R$ 6 de taxa inicial mais R$ 3 por quilômetro. Qual expressão representa o preço de uma corrida de x quilômetros?",
      options: [
        { id: "a", text: "6x + 3", feedback: "Aqui a taxa fixa foi multiplicada por x. Quem varia com os quilômetros é a parcela de R$ 3." },
        { id: "b", text: "6 + 3x", feedback: "Correto: 6 é a parte fixa e 3x é a parte que depende da distância." },
        { id: "c", text: "9x", feedback: "Não podemos juntar a taxa fixa com o preço por quilômetro como se ambos variassem com x." },
      ],
      correctOptionId: "b", correctExplanation: "Uma expressão algébrica combina números e letras: a letra representa um valor que pode variar.", source: CH5,
    },
    {
      id: "m02", chapter: "Capítulo 5", topic: "Expressões algébricas", kind: "pista",
      prompt: "Na expressão 7y − 4, qual é o coeficiente de y?",
      options: [
        { id: "a", text: "7", feedback: "Correto: o coeficiente é o número que multiplica a letra." },
        { id: "b", text: "−4", feedback: "−4 é o termo constante, pois não está multiplicando y." },
        { id: "c", text: "y", feedback: "y é a parte literal, não o coeficiente." },
      ],
      correctOptionId: "a", correctExplanation: "Em 7y, o número 7 multiplica y e, por isso, é chamado de coeficiente.", source: CH5,
    },
    {
      id: "m03", chapter: "Capítulo 5", topic: "Valor numérico", kind: "calculo",
      prompt: "Qual é o valor de 2x + 5 quando x = 4?",
      options: [
        { id: "a", text: "13", feedback: "Correto: 2 · 4 + 5 = 8 + 5 = 13." },
        { id: "b", text: "18", feedback: "Você provavelmente calculou 2 · (4 + 5). A expressão manda multiplicar 2 por x antes de somar 5." },
        { id: "c", text: "11", feedback: "Substitua x por 4: 2 · 4 vale 8, e 8 + 5 vale 13." },
      ],
      correctOptionId: "a", correctExplanation: "Para achar o valor numérico, substituímos a letra pelo valor dado e respeitamos a ordem das operações.", source: CH5,
    },
    {
      id: "m04", chapter: "Capítulo 5", topic: "Simplificação de expressões", kind: "calculo",
      prompt: "Qual é a forma simplificada de 4x + 3x − 2?",
      options: [
        { id: "a", text: "7x − 2", feedback: "Correto: 4x e 3x são termos semelhantes; −2 permanece separado." },
        { id: "b", text: "5x", feedback: "O termo −2 não pode ser somado ao coeficiente de x, pois não é termo semelhante." },
        { id: "c", text: "7x − 2x", feedback: "O −2 é um termo constante; ele não contém x." },
      ],
      correctOptionId: "a", correctExplanation: "Somamos os coeficientes dos termos semelhantes: 4x + 3x = 7x.", source: CH5,
    },
    {
      id: "m05", chapter: "Capítulo 5", topic: "Simplificação de expressões", kind: "calculo",
      prompt: "Simplifique 5a + 2 − 3a + 7.",
      options: [
        { id: "a", text: "2a + 9", feedback: "Correto: 5a − 3a = 2a e 2 + 7 = 9." },
        { id: "b", text: "2a + 5", feedback: "A parte literal está correta, mas os termos constantes são 2 + 7 = 9." },
        { id: "c", text: "9a", feedback: "Não se pode juntar 2a e 9: um termo tem letra e o outro não." },
      ],
      correctOptionId: "a", correctExplanation: "Agrupamos separadamente os termos com a e os termos constantes.", source: CH5,
    },
    {
      id: "m06", chapter: "Capítulo 5", topic: "Termos semelhantes", kind: "verdadeiro-ou-falso",
      prompt: "Verdadeiro ou falso: 2x + 3 pode ser simplificado para 5x.",
      options: [
        { id: "a", text: "Verdadeiro", feedback: "2x e 3 não são termos semelhantes. O número 3 não possui x." },
        { id: "b", text: "Falso", feedback: "Correto: como apenas um termo contém x, a expressão já está simplificada." },
      ],
      correctOptionId: "b", correctExplanation: "Termos só podem ser reduzidos entre si quando têm a mesma parte literal.", source: CH5,
    },
    {
      id: "m07", chapter: "Capítulo 5", topic: "Equações", kind: "desafio-mental",
      prompt: "Qual frase descreve corretamente uma equação?",
      options: [
        { id: "a", text: "É uma igualdade que contém um valor desconhecido", feedback: "Correto: a incógnita representa o valor que precisamos descobrir." },
        { id: "b", text: "É qualquer conta que tenha sinal de mais", feedback: "Uma equação é definida pela igualdade e pela incógnita, não por uma operação específica." },
        { id: "c", text: "É uma expressão que nunca pode ter solução", feedback: "Muitas equações têm solução; resolvê-las significa encontrar valores que tornam a igualdade verdadeira." },
      ],
      correctOptionId: "a", correctExplanation: "O sinal de igualdade indica que os dois membros têm o mesmo valor.", source: CH5,
    },
    {
      id: "m08", chapter: "Capítulo 5", topic: "Equações de 1º grau", kind: "calculo",
      prompt: "Resolva: x + 7 = 19.",
      options: [
        { id: "a", text: "x = 26", feedback: "Somar 7 novamente afasta x do isolamento. Precisamos retirar 7 dos dois lados." },
        { id: "b", text: "x = 12", feedback: "Correto: 19 − 7 = 12, e 12 + 7 = 19." },
        { id: "c", text: "x = 2", feedback: "19 ÷ 7 não é a operação inversa adequada aqui; o 7 está somando." },
      ],
      correctOptionId: "b", correctExplanation: "Subtraímos 7 dos dois membros para preservar a igualdade e isolar x.", source: CH5,
    },
    {
      id: "m09", chapter: "Capítulo 5", topic: "Resolução de equações", kind: "calculo",
      prompt: "Qual é a solução de 3x = 24?",
      options: [
        { id: "a", text: "x = 21", feedback: "Subtrair 3 não desfaz a multiplicação 3 · x." },
        { id: "b", text: "x = 72", feedback: "Multiplicar por 3 aumenta o desequilíbrio; precisamos dividir os dois lados por 3." },
        { id: "c", text: "x = 8", feedback: "Correto: 24 ÷ 3 = 8." },
      ],
      correctOptionId: "c", correctExplanation: "Como x está multiplicado por 3, dividimos ambos os membros por 3.", source: CH5,
    },
    {
      id: "m10", chapter: "Capítulo 5", topic: "Resolução de equações", kind: "calculo",
      prompt: "Resolva: 2x + 5 = 17.",
      options: [
        { id: "a", text: "x = 6", feedback: "Correto: 2x = 12 e x = 6." },
        { id: "b", text: "x = 11", feedback: "Você retirou 5, mas ainda precisa dividir 12 por 2." },
        { id: "c", text: "x = 4", feedback: "Teste: 2 · 4 + 5 = 13, não 17." },
      ],
      correctOptionId: "a", correctExplanation: "Primeiro subtraímos 5 dos dois lados; depois dividimos os dois membros por 2.", source: CH5,
    },
    {
      id: "m11", chapter: "Capítulo 5", topic: "Incógnita nos dois membros", kind: "calculo",
      prompt: "Resolva: 5x − 7 = 3x + 9.",
      options: [
        { id: "a", text: "x = 1", feedback: "Teste: 5 − 7 = −2, enquanto 3 + 9 = 12. Os membros não ficam iguais." },
        { id: "b", text: "x = 8", feedback: "Correto: 5x − 3x = 9 + 7, então 2x = 16 e x = 8." },
        { id: "c", text: "x = 16", feedback: "16 é o valor de 2x antes da última divisão por 2." },
      ],
      correctOptionId: "b", correctExplanation: "Reunimos os termos com x em um membro e os números no outro, sempre realizando operações equivalentes.", source: CH5,
    },
    {
      id: "m12", chapter: "Capítulo 5", topic: "Resolução de equações", kind: "calculo",
      prompt: "Qual é a solução de x/4 − 2 = 3?",
      options: [
        { id: "a", text: "x = 5", feedback: "5 é o valor de x/4 depois de somarmos 2; ainda falta multiplicar por 4." },
        { id: "b", text: "x = 4", feedback: "Teste: 4/4 − 2 = −1, não 3." },
        { id: "c", text: "x = 20", feedback: "Correto: x/4 = 5 e, portanto, x = 20." },
      ],
      correctOptionId: "c", correctExplanation: "Somamos 2 aos dois membros e depois multiplicamos ambos por 4.", source: CH5,
    },
    {
      id: "m13", chapter: "Capítulo 5", topic: "Equações em problemas", kind: "problema",
      prompt: "Maya tinha algumas figurinhas, ganhou 9 e ficou com 25. Quantas figurinhas ela tinha antes?",
      options: [
        { id: "a", text: "16", feedback: "Correto: x + 9 = 25, então x = 25 − 9 = 16." },
        { id: "b", text: "34", feedback: "34 seria o resultado de somar outra vez; precisamos descobrir a quantidade anterior." },
        { id: "c", text: "14", feedback: "Teste: 14 + 9 = 23, não 25." },
      ],
      correctOptionId: "a", correctExplanation: "Traduzimos o enunciado como x + 9 = 25 e resolvemos a equação.", source: CH5,
    },
    {
      id: "m14", chapter: "Capítulo 5", topic: "Equações em problemas", kind: "problema",
      prompt: "O dobro de um número, somado a 3, é 21. Qual é esse número?",
      options: [
        { id: "a", text: "12", feedback: "Teste: 2 · 12 + 3 = 27." },
        { id: "b", text: "9", feedback: "Correto: 2x + 3 = 21, então 2x = 18 e x = 9." },
        { id: "c", text: "18", feedback: "18 é o valor de 2x, não de x." },
      ],
      correctOptionId: "b", correctExplanation: "A expressão “dobro de um número” vira 2x; depois resolvemos 2x + 3 = 21.", source: CH5,
    },
    {
      id: "m15", chapter: "Capítulo 6", topic: "Ideia de ângulo", kind: "conexao",
      prompt: "O que a medida de um ângulo representa?",
      options: [
        { id: "a", text: "O comprimento de suas semirretas", feedback: "O comprimento desenhado dos lados não determina a abertura do ângulo." },
        { id: "b", text: "A abertura entre duas semirretas de mesma origem", feedback: "Correto: a origem comum é o vértice, e a abertura é medida em graus." },
        { id: "c", text: "A área entre duas retas", feedback: "Ângulo mede abertura, não área." },
      ],
      correctOptionId: "b", correctExplanation: "Duas semirretas com a mesma origem formam um ângulo; a origem é o vértice.", source: CH6,
    },
    {
      id: "m16", chapter: "Capítulo 6", topic: "Minutos e segundos", kind: "desafio-mental",
      prompt: "Qual relação entre grau, minuto e segundo está correta?",
      options: [
        { id: "a", text: "1° = 60′ e 1′ = 60″", feedback: "Correto: por isso 1° corresponde a 3.600″." },
        { id: "b", text: "1° = 100′ e 1′ = 100″", feedback: "Medidas angulares usam base 60, não base 100." },
        { id: "c", text: "1° = 60″", feedback: "Um grau tem 60 minutos, e cada minuto tem 60 segundos." },
      ],
      correctOptionId: "a", correctExplanation: "Minutos e segundos são submúltiplos do grau: 1° = 60′ = 3.600″.", source: CH6,
    },
    {
      id: "m17", chapter: "Capítulo 6", topic: "Conversão de medidas angulares", kind: "calculo",
      prompt: "A quantos minutos correspondem 2°30′?",
      options: [
        { id: "a", text: "90′", feedback: "2° equivalem a 120′; somando 30′, obtemos 150′." },
        { id: "b", text: "150′", feedback: "Correto: 2 · 60′ + 30′ = 150′." },
        { id: "c", text: "230′", feedback: "A escrita 2°30′ não é o número decimal 230; é preciso converter os graus em minutos." },
      ],
      correctOptionId: "b", correctExplanation: "Cada grau vale 60 minutos, então multiplicamos os graus por 60 e somamos os minutos.", source: CH6,
    },
    {
      id: "m18", chapter: "Capítulo 6", topic: "Conversão de medidas angulares", kind: "calculo",
      prompt: "Quantos segundos há em 3′20″?",
      options: [
        { id: "a", text: "200″", feedback: "Correto: 3 · 60″ + 20″ = 200″." },
        { id: "b", text: "180″", feedback: "Isso converte apenas os 3 minutos e esquece os 20 segundos." },
        { id: "c", text: "320″", feedback: "3′20″ não é o número 320; cada minuto contém 60 segundos." },
      ],
      correctOptionId: "a", correctExplanation: "Convertemos os minutos em segundos e adicionamos os segundos restantes.", source: CH6,
    },
    {
      id: "m19", chapter: "Capítulo 6", topic: "Operações com ângulos", kind: "calculo",
      prompt: "Calcule 35°40′ + 28°35′.",
      options: [
        { id: "a", text: "63°75′", feedback: "75′ precisa ser convertido: 60′ formam 1° e sobram 15′." },
        { id: "b", text: "64°15′", feedback: "Correto: 63°75′ = 64°15′." },
        { id: "c", text: "64°75′", feedback: "Ao transformar 60′ em 1°, os minutos restantes são 15′." },
      ],
      correctOptionId: "b", correctExplanation: "Somamos cada unidade e normalizamos: quando os minutos chegam a 60, formam mais 1 grau.", source: CH6,
    },
    {
      id: "m20", chapter: "Capítulo 6", topic: "Operações com ângulos", kind: "calculo",
      prompt: "Calcule 90° − 37°25′.",
      options: [
        { id: "a", text: "53°25′", feedback: "Para subtrair 25′, emprestamos 1°: 90° vira 89°60′." },
        { id: "b", text: "52°35′", feedback: "Correto: 89°60′ − 37°25′ = 52°35′." },
        { id: "c", text: "53°35′", feedback: "Depois do empréstimo, a parte em graus é 89 − 37 = 52." },
      ],
      correctOptionId: "b", correctExplanation: "Reescrevemos 90° como 89°60′ e então subtraímos graus e minutos.", source: CH6,
    },
    {
      id: "m21", chapter: "Capítulo 6", topic: "Ângulos congruentes", kind: "verdadeiro-ou-falso",
      prompt: "Verdadeiro ou falso: dois ângulos congruentes têm a mesma medida, mesmo que estejam em posições diferentes.",
      options: [
        { id: "a", text: "Verdadeiro", feedback: "Correto: congruência de ângulos significa igualdade de medidas." },
        { id: "b", text: "Falso", feedback: "A posição ou orientação do desenho não altera a medida do ângulo." },
      ],
      correctOptionId: "a", correctExplanation: "Ângulos congruentes possuem medidas iguais.", source: CH6,
    },
    {
      id: "m22", chapter: "Capítulo 6", topic: "Ângulos consecutivos e adjacentes", kind: "pista",
      prompt: "Dois ângulos têm o mesmo vértice e um lado comum. O que podemos afirmar com certeza?",
      options: [
        { id: "a", text: "São consecutivos", feedback: "Correto: ângulos consecutivos compartilham vértice e um lado." },
        { id: "b", text: "São sempre opostos pelo vértice", feedback: "Opostos pelo vértice não compartilham um lado." },
        { id: "c", text: "Somam sempre 180°", feedback: "Compartilhar lado e vértice não determina sozinho a soma." },
      ],
      correctOptionId: "a", correctExplanation: "Para serem adjacentes, além de consecutivos, seus interiores não podem ter pontos em comum.", source: CH6,
    },
    {
      id: "m23", chapter: "Capítulo 6", topic: "Ângulos adjacentes", kind: "conexao",
      prompt: "Qual característica diferencia ângulos adjacentes de outros ângulos consecutivos?",
      options: [
        { id: "a", text: "Eles têm medidas obrigatoriamente iguais", feedback: "Ângulos adjacentes podem ter medidas diferentes." },
        { id: "b", text: "Seus interiores não se sobrepõem", feedback: "Correto: são consecutivos e não têm pontos internos em comum." },
        { id: "c", text: "Eles nunca compartilham um lado", feedback: "Eles compartilham exatamente um lado e o mesmo vértice." },
      ],
      correctOptionId: "b", correctExplanation: "Adjacentes são ângulos consecutivos posicionados lado a lado, sem sobreposição interna.", source: CH6,
    },
    {
      id: "m24", chapter: "Capítulo 6", topic: "Bissetriz", kind: "calculo",
      prompt: "A bissetriz divide um ângulo de 68°. Quanto mede cada parte?",
      options: [
        { id: "a", text: "34°", feedback: "Correto: 68° ÷ 2 = 34°." },
        { id: "b", text: "136°", feedback: "A bissetriz divide o ângulo; ela não dobra sua medida." },
        { id: "c", text: "38°", feedback: "As duas partes devem ser iguais e somar 68°." },
      ],
      correctOptionId: "a", correctExplanation: "A bissetriz é a semirreta que separa um ângulo em dois ângulos congruentes.", source: CH6,
    },
    {
      id: "m25", chapter: "Capítulo 6", topic: "Ângulos complementares", kind: "calculo",
      prompt: "Qual é o complemento de um ângulo de 27°?",
      options: [
        { id: "a", text: "153°", feedback: "153° é o suplemento de 27°, pois completa 180°." },
        { id: "b", text: "63°", feedback: "Correto: 90° − 27° = 63°." },
        { id: "c", text: "73°", feedback: "27° + 73° = 100°, não 90°." },
      ],
      correctOptionId: "b", correctExplanation: "Ângulos complementares têm soma igual a 90°.", source: CH6,
    },
    {
      id: "m26", chapter: "Capítulo 6", topic: "Ângulos suplementares", kind: "calculo",
      prompt: "Qual é o suplemento de um ângulo de 125°?",
      options: [
        { id: "a", text: "55°", feedback: "Correto: 180° − 125° = 55°." },
        { id: "b", text: "65°", feedback: "125° + 65° = 190°." },
        { id: "c", text: "35°", feedback: "125° + 35° = 160°, ainda faltam 20°." },
      ],
      correctOptionId: "a", correctExplanation: "Ângulos suplementares formam uma soma de 180°.", source: CH6,
    },
    {
      id: "m27", chapter: "Capítulo 6", topic: "Ângulos opostos pelo vértice", kind: "calculo",
      prompt: "Duas retas se cruzam. Se um dos ângulos mede 112°, quanto mede o ângulo oposto pelo vértice?",
      options: [
        { id: "a", text: "68°", feedback: "68° mede um ângulo adjacente, pois 112° + 68° = 180°." },
        { id: "b", text: "112°", feedback: "Correto: ângulos opostos pelo vértice são congruentes." },
        { id: "c", text: "248°", feedback: "Não se subtrai de 360° para encontrar o ângulo oposto." },
      ],
      correctOptionId: "b", correctExplanation: "Quando duas retas se intersectam, cada par de ângulos opostos pelo vértice tem medidas iguais.", source: CH6,
    },
    {
      id: "m28", chapter: "Capítulo 6", topic: "Paralelas e transversal", kind: "conexao",
      prompt: "Duas retas paralelas são cortadas por uma transversal. Se um ângulo correspondente mede 74°, quanto mede o outro correspondente?",
      options: [
        { id: "a", text: "106°", feedback: "106° é suplementar a 74°; correspondentes em paralelas são congruentes." },
        { id: "b", text: "74°", feedback: "Correto: ângulos correspondentes são congruentes quando as retas são paralelas." },
        { id: "c", text: "37°", feedback: "Não há divisão por 2 nessa relação." },
      ],
      correctOptionId: "b", correctExplanation: "Em paralelas cortadas por uma transversal, ângulos correspondentes têm a mesma medida.", source: CH6,
    },
    {
      id: "m29", chapter: "Capítulo 6", topic: "Paralelas e transversal", kind: "calculo",
      prompt: "Em duas paralelas cortadas por uma transversal, um ângulo interno mede 58°. Quanto mede o alterno interno?",
      options: [
        { id: "a", text: "58°", feedback: "Correto: alternos internos são congruentes." },
        { id: "b", text: "122°", feedback: "122° é o suplemento de 58°, não seu alterno interno." },
        { id: "c", text: "29°", feedback: "Ângulos alternos internos não são obtidos dividindo a medida." },
      ],
      correctOptionId: "a", correctExplanation: "Retas paralelas garantem que cada par de alternos internos tenha medidas iguais.", source: CH6,
    },
    {
      id: "m29s", chapter: "Capítulo 6", topic: "Paralelas e transversal", kind: "calculo",
      prompt: "Duas retas paralelas são cortadas por uma transversal. Se um ângulo colateral interno mede 71°, quanto mede o outro?",
      options: [
        { id: "a", text: "71°", feedback: "Colaterais internos ficam do mesmo lado da transversal e são suplementares, não congruentes." },
        { id: "b", text: "109°", feedback: "Correto: 180° − 71° = 109°." },
        { id: "c", text: "19°", feedback: "A soma procurada é 180°, não 90°." },
      ],
      correctOptionId: "b", correctExplanation: "Em retas paralelas, os ângulos colaterais internos são suplementares.", source: CH6,
    },
    {
      id: "m30", chapter: "Capítulo 7", topic: "Razão", kind: "calculo",
      prompt: "Em uma caixa há 12 lápis azuis e 8 vermelhos. Qual é a razão entre azuis e vermelhos, na forma simplificada?",
      options: [
        { id: "a", text: "2/3", feedback: "Essa é a razão entre vermelhos e azuis; a ordem foi invertida." },
        { id: "b", text: "3/2", feedback: "Correto: 12/8, simplificada por 4, é 3/2." },
        { id: "c", text: "20/8", feedback: "20 é o total de lápis, mas a pergunta compara azuis com vermelhos." },
      ],
      correctOptionId: "b", correctExplanation: "A ordem importa: razão entre A e B é A/B. Depois, simplificamos a fração.", source: CH7,
    },
    {
      id: "m31", chapter: "Capítulo 7", topic: "Razão e unidades", kind: "calculo",
      prompt: "Qual é a razão entre 2 m e 50 cm?",
      options: [
        { id: "a", text: "4", feedback: "Correto: 2 m = 200 cm e 200/50 = 4." },
        { id: "b", text: "2/50", feedback: "Não se pode comparar corretamente sem transformar as medidas para a mesma unidade." },
        { id: "c", text: "0,04", feedback: "Esse resultado vem de dividir 2 por 50 sem converter metros em centímetros." },
      ],
      correctOptionId: "a", correctExplanation: "Razões entre grandezas da mesma espécie exigem unidades iguais antes da divisão.", source: CH7,
    },
    {
      id: "m32", chapter: "Capítulo 7", topic: "Velocidade média", kind: "problema",
      prompt: "Um carro percorre 180 km em 3 horas, mantendo a mesma média. Qual é sua velocidade média?",
      options: [
        { id: "a", text: "540 km/h", feedback: "Velocidade média é distância dividida pelo tempo, não multiplicada." },
        { id: "b", text: "60 km/h", feedback: "Correto: 180 ÷ 3 = 60 km/h." },
        { id: "c", text: "183 km/h", feedback: "Somar distância e tempo não produz uma velocidade." },
      ],
      correctOptionId: "b", correctExplanation: "Velocidade média é a razão entre a distância percorrida e o tempo gasto.", source: CH7,
    },
    {
      id: "m33", chapter: "Capítulo 7", topic: "Escala", kind: "problema",
      prompt: "Em um mapa na escala 1:100.000, uma distância mede 3 cm. Qual é a distância real?",
      options: [
        { id: "a", text: "300.000 cm, ou 3 km", feedback: "Correto: cada centímetro representa 100.000 cm, que equivalem a 1 km." },
        { id: "b", text: "300 m", feedback: "300.000 cm correspondem a 3.000 m, não 300 m." },
        { id: "c", text: "30 km", feedback: "Você acrescentou um fator 10: 3 · 100.000 cm equivalem a 3 km." },
      ],
      correctOptionId: "a", correctExplanation: "Escala 1:100.000 significa que 1 unidade no mapa representa 100.000 unidades reais.", source: CH7,
    },
    {
      id: "m34", chapter: "Capítulo 7", topic: "Densidade demográfica", kind: "problema",
      prompt: "Uma cidade tem 50.000 habitantes e área de 250 km². Qual é sua densidade demográfica?",
      options: [
        { id: "a", text: "12.500.000 hab./km²", feedback: "A densidade é obtida por divisão, não por multiplicação." },
        { id: "b", text: "200 hab./km²", feedback: "Correto: 50.000 ÷ 250 = 200." },
        { id: "c", text: "50.250 hab./km²", feedback: "Somar habitantes e área não forma uma razão com significado." },
      ],
      correctOptionId: "b", correctExplanation: "Densidade demográfica é a razão entre a população e a área ocupada.", source: CH7,
    },
    {
      id: "m35", chapter: "Capítulo 7", topic: "Proporção", kind: "verdadeiro-ou-falso",
      prompt: "Verdadeiro ou falso: 2/3 e 8/12 formam uma proporção.",
      options: [
        { id: "a", text: "Verdadeiro", feedback: "Correto: 2 · 12 = 3 · 8 = 24." },
        { id: "b", text: "Falso", feedback: "Simplificando 8/12 por 4, obtemos 2/3." },
      ],
      correctOptionId: "a", correctExplanation: "Uma proporção é uma igualdade entre duas razões; o produto dos meios é igual ao produto dos extremos.", source: CH7,
    },
    {
      id: "m36", chapter: "Capítulo 7", topic: "Propriedade das proporções", kind: "calculo",
      prompt: "Encontre x na proporção 3/5 = x/20.",
      options: [
        { id: "a", text: "x = 4", feedback: "Se 5 virou 20, foi multiplicado por 4; o numerador 3 também deve ser multiplicado por 4." },
        { id: "b", text: "x = 12", feedback: "Correto: 5x = 60, então x = 12." },
        { id: "c", text: "x = 75", feedback: "No produto cruzado, temos 5x = 3 · 20; ainda é necessário dividir por 5." },
      ],
      correctOptionId: "b", correctExplanation: "Aplicamos a igualdade dos produtos cruzados: 5x = 3 · 20.", source: CH7,
    },
    {
      id: "m37", chapter: "Capítulo 7", topic: "Grandezas diretamente proporcionais", kind: "conexao",
      prompt: "Qual situação apresenta grandezas diretamente proporcionais?",
      options: [
        { id: "a", text: "Quantidade de cadernos iguais e preço total pago", feedback: "Correto: dobrando a quantidade, dobra-se o preço total, se o preço unitário for constante." },
        { id: "b", text: "Número de trabalhadores iguais e tempo para concluir a mesma tarefa", feedback: "Em condições ideais, mais trabalhadores reduzem o tempo: são grandezas inversamente proporcionais." },
        { id: "c", text: "Velocidade e tempo para percorrer uma distância fixa", feedback: "Para distância fixa, maior velocidade significa menor tempo." },
      ],
      correctOptionId: "a", correctExplanation: "Grandezas diretamente proporcionais mantêm uma razão constante e variam no mesmo sentido.", source: CH7,
    },
    {
      id: "m38", chapter: "Capítulo 7", topic: "Proporcionalidade direta", kind: "problema",
      prompt: "Três cadernos iguais custam R$ 21. Quanto custam cinco cadernos?",
      options: [
        { id: "a", text: "R$ 35", feedback: "Correto: cada caderno custa R$ 7; cinco custam 5 · 7 = R$ 35." },
        { id: "b", text: "R$ 23", feedback: "O preço não aumenta apenas R$ 1 por caderno; primeiro descubra o valor unitário." },
        { id: "c", text: "R$ 105", feedback: "Multiplicar 21 por 5 ignora que R$ 21 já correspondem a três unidades." },
      ],
      correctOptionId: "a", correctExplanation: "O preço total é diretamente proporcional à quantidade quando o preço de cada unidade é fixo.", source: CH7,
    },
    {
      id: "m39", chapter: "Capítulo 7", topic: "Grandezas inversamente proporcionais", kind: "conexao",
      prompt: "Qual situação representa grandezas inversamente proporcionais?",
      options: [
        { id: "a", text: "Litros abastecidos e preço pago por litro fixo", feedback: "Essas grandezas são diretamente proporcionais." },
        { id: "b", text: "Velocidade média e tempo de viagem para a mesma distância", feedback: "Correto: aumentando a velocidade, o tempo diminui na mesma proporção ideal." },
        { id: "c", text: "Lado de um quadrado e seu perímetro", feedback: "O perímetro é quatro vezes o lado; são diretamente proporcionais." },
      ],
      correctOptionId: "b", correctExplanation: "Nas grandezas inversamente proporcionais, o produto dos valores correspondentes permanece constante.", source: CH7,
    },
    {
      id: "m40", chapter: "Capítulo 7", topic: "Proporcionalidade inversa", kind: "problema",
      prompt: "Quatro máquinas iguais fazem um serviço em 6 horas. Em condições iguais, oito máquinas fariam o mesmo serviço em quanto tempo?",
      options: [
        { id: "a", text: "12 horas", feedback: "Mais máquinas devem reduzir, e não aumentar, o tempo." },
        { id: "b", text: "3 horas", feedback: "Correto: ao dobrar o número de máquinas, o tempo cai pela metade." },
        { id: "c", text: "2 horas", feedback: "O número de máquinas dobrou, não triplicou." },
      ],
      correctOptionId: "b", correctExplanation: "Como 4 · 6 = 24, fazemos 24 ÷ 8 = 3 horas.", source: CH7,
    },
    {
      id: "m41", chapter: "Capítulo 7", topic: "Regra de três simples", kind: "problema",
      prompt: "Se 4 kg de fruta custam R$ 28, quanto custam 7 kg pelo mesmo preço por quilograma?",
      options: [
        { id: "a", text: "R$ 49", feedback: "Correto: 28 ÷ 4 = 7 reais por kg; 7 · 7 = 49." },
        { id: "b", text: "R$ 31", feedback: "A diferença de 3 kg não significa aumento de apenas R$ 3." },
        { id: "c", text: "R$ 196", feedback: "28 · 7 ignora que os R$ 28 correspondem a 4 kg." },
      ],
      correctOptionId: "a", correctExplanation: "Organizamos grandezas diretamente proporcionais e encontramos primeiro o valor de uma unidade ou usamos produtos cruzados.", source: CH7,
    },
    {
      id: "m42", chapter: "Capítulo 7", topic: "Porcentagem", kind: "calculo",
      prompt: "Quanto é 25% de 80?",
      options: [
        { id: "a", text: "20", feedback: "Correto: 25/100 · 80 = 20; também podemos calcular a quarta parte de 80." },
        { id: "b", text: "25", feedback: "25 é a taxa percentual, não o resultado aplicado sobre 80." },
        { id: "c", text: "55", feedback: "80 − 25 mistura o valor com a taxa; 25% significa 25 a cada 100." },
      ],
      correctOptionId: "a", correctExplanation: "Transformamos 25% em 0,25 ou 1/4 e multiplicamos por 80.", source: CH7,
    },
    {
      id: "m43", chapter: "Capítulo 7", topic: "Cálculo de porcentagem", kind: "calculo",
      prompt: "18 representa quantos por cento de 60?",
      options: [
        { id: "a", text: "18%", feedback: "18 é a parte, mas ainda precisamos compará-la com o total 60." },
        { id: "b", text: "30%", feedback: "Correto: 18/60 = 0,30 = 30%." },
        { id: "c", text: "42%", feedback: "60 − 18 = 42 é a diferença, não a porcentagem." },
      ],
      correctOptionId: "b", correctExplanation: "Dividimos a parte pelo total e multiplicamos o resultado por 100%.", source: CH7,
    },
    {
      id: "m44", chapter: "Capítulo 7", topic: "Desconto percentual", kind: "problema",
      prompt: "Um produto de R$ 200 recebeu desconto de 15%. Qual é o novo preço?",
      options: [
        { id: "a", text: "R$ 185", feedback: "15% de 200 não são R$ 15; são R$ 30." },
        { id: "b", text: "R$ 170", feedback: "Correto: o desconto é 0,15 · 200 = 30; então 200 − 30 = 170." },
        { id: "c", text: "R$ 230", feedback: "Somar R$ 30 produz um acréscimo, não um desconto." },
      ],
      correctOptionId: "b", correctExplanation: "Calculamos o valor do desconto e o subtraímos do preço original.", source: CH7,
    },
    {
      id: "m45", chapter: "Capítulo 7", topic: "Acréscimo percentual", kind: "problema",
      prompt: "Uma mensalidade de R$ 150 teve acréscimo de 10%. Qual é o novo valor?",
      options: [
        { id: "a", text: "R$ 160", feedback: "10% de 150 são R$ 15, não R$ 10." },
        { id: "b", text: "R$ 135", feedback: "Subtrair R$ 15 seria aplicar um desconto." },
        { id: "c", text: "R$ 165", feedback: "Correto: 150 + 0,10 · 150 = 150 + 15 = 165." },
      ],
      correctOptionId: "c", correctExplanation: "No acréscimo, somamos ao valor original a porcentagem calculada sobre ele.", source: CH7,
    },
  ],
};
