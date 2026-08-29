# Estudos Crianças

Aplicação móvel de revisões escolares. A interface, o motor de exercícios e o conteúdo ficam separados para permitir novos módulos sem duplicar a aplicação.

## Módulo atual

- `RecHist2Tri26`: Reformas Religiosas e Monarquias Europeias, 7º ano.
- 36 desafios baseados nas páginas do livro e nas anotações do caderno.
- Uma pergunta errada recebe explicação e volta ao fim da fila.
- O módulo só é concluído quando todas as perguntas forem respondidas corretamente.
- O progresso continua salvo no aparelho para permitir retomada e uso resiliente.
- A ordem das alternativas é embaralhada a cada apresentação.

## Acompanhamento responsável

- `/dashboard`: painel protegido por login para o responsável.
- D1 armazena sessões e tentativas de forma centralizada.
- Indicadores: último acesso, acertos diretos, tentativas, conclusões, duração e perguntas com maior dificuldade.
- O aplicativo registra apenas dados pedagógicos do perfil `maya`; não coleta localização, contatos ou conteúdo externo.
- Progresso anterior pode ser importado como totais agregados. Horários e respostas que não existiam no aparelho não são inventados.

## Estrutura

- `app/`: entrada, metadados e estilo global.
- `components/study-home.tsx`: navegação e motor da revisão.
- `app/api/telemetry/route.ts`: valida e registra sessões e respostas.
- `app/dashboard/page.tsx`: painel protegido do responsável.
- `db/schema.ts`: sessões e tentativas persistentes.
- `content/types.ts`: contrato de dados reutilizável.
- `content/modules.ts`: catálogo exibido no menu inicial.
- `content/rechist2tri26.ts`: perguntas e explicações do módulo.
- `public/manifest.webmanifest` e `public/sw.js`: instalação e funcionamento básico como PWA.

## Adicionando uma nova matéria

1. Crie um arquivo em `content/` seguindo os tipos de `content/types.ts`.
2. Cada alternativa deve ter um `feedback` específico, inclusive as incorretas.
3. Cada pergunta deve informar a fonte usada.
4. Registre a matéria em `content/registry.ts`; o menu será atualizado automaticamente.
5. Execute `npm run test:content` para verificar IDs, respostas, explicações e fontes.

Nunca inclua uma pergunta sem resposta verificável no material escolar ou em fonte histórica confiável.
