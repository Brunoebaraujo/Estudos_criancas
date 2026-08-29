# Estudos Crianças

Aplicação móvel de revisões escolares. A interface, o motor de exercícios e o conteúdo ficam separados para permitir novos módulos sem duplicar a aplicação.

- Aplicação: <https://estudos-criancas.bruno-araujo.chatgpt.site>
- Dashboard protegido: <https://estudos-criancas.bruno-araujo.chatgpt.site/dashboard>

O código da versão publicada, incluindo telemetria e dashboard, está em [`site/`](site/). Os arquivos estáticos na raiz são preservados como versão anterior do aplicativo.

## Módulo atual

- `RecHist2Tri26`: Reformas Religiosas e Monarquias Europeias, 7º ano.
- 36 desafios baseados nas páginas do livro e nas anotações do caderno.
- Uma pergunta errada recebe explicação e volta ao fim da fila.
- O módulo só é concluído quando todas as perguntas forem respondidas corretamente.
- O progresso é salvo no navegador e as novas sessões enviam indicadores pedagógicos para o dashboard protegido.

## Estrutura

- `site/app/`: páginas, autenticação e API de telemetria.
- `site/components/study-home.tsx`: navegação e motor da revisão.
- `site/content/types.ts`: contrato de dados reutilizável.
- `site/content/modules.ts`: catálogo exibido no menu inicial.
- `site/content/rechist2tri26.ts`: perguntas e explicações do módulo.
- `site/db/`: esquema das sessões e tentativas.
- `site/public/manifest.webmanifest` e `site/public/sw.js`: instalação e funcionamento básico como PWA.

## Adicionando uma nova matéria

1. Crie um arquivo em `site/content/` seguindo os tipos de `site/content/types.ts`.
2. Cada alternativa deve ter um `feedback` específico, inclusive as incorretas.
3. Cada pergunta deve informar a fonte usada.
4. Registre a matéria em `site/content/registry.ts`; o menu será atualizado automaticamente.
5. Dentro de `site/`, execute `npm run test:content` para verificar IDs, respostas, explicações e fontes.

Nunca inclua uma pergunta sem resposta verificável no material escolar ou em fonte histórica confiável.
