# escrever-prd

Cria e edita PRDs (Product Requirements Documents) de feature. Funciona no modo draft-first: gera o documento completo imediatamente a partir do que o usuário fornecer, marcando premissas inferidas inline para revisão pontual — sem entrevistas longas. Quando o input cobre múltiplas features, detecta automaticamente e propõe divisão em PRDs separados.

## O que é um PRD nesse fluxo

Um PRD é uma **unidade de raciocínio de produto**: o conjunto de comportamento e regras de negócio cujas decisões se explicam juntas. É documento humano — a fonte de verdade da intenção do produto — e cumpre dois papéis: **spec de feature** (comportamento e regras, usado para implementar) e **controle de estado** (ciclo de vida via campo `status` e grafo de `depends_on`). Contexto técnico (stack, arquitetura) fica fora do PRD e vive no TRD, gerado pela skill `escrever-trd`.

Um PRD com `status: concluido` é imutável — mudanças posteriores de comportamento abrem um novo PRD, não editam o concluído.

## Como funciona

1. **Identificação do modo** — criação (feature nova) ou edição (PRD existente referenciado)
2. **Análise de escopo** — detecta se o input descreve múltiplas features independentes e propõe o split antes de gerar; identifica lacunas realmente bloqueantes (o resto é inferido)
3. **Geração do draft** — preenche todas as seções imediatamente; tudo que foi inferido (rules, edge cases, escopo negativo) é marcado inline como *premissa — confirme ou corrija*
4. **Mapeamento de dependências** — verifica PRDs existentes em `docs/prds/` e preenche `depends_on`
5. **Refinamento pontual** — aplica as correções do usuário até aprovação
6. **Salvamento** — numeração sequencial (`NNN-nome-em-kebab-case.md`) em `docs/prds/`
7. **Continuidade multi-PRD** — se houve split, oferece seguir para o próximo PRD da lista, reaproveitando as decisões já tomadas

Cada User Story recebe um ID estável (US01, US02...), com user story no formato "Como [persona], quero [ação], para [benefício]", pelo menos uma Rule e um Edge case. Milestones agrupam USs em marcos de produto reais (não fatias de execução), sem número mínimo.

## Pré-requisitos e configuração

Nenhum. A skill lê `references/template-prd.md` (incluído) como estrutura canônica e assume `docs/prds/` como diretório padrão — pode ser sobrescrito pelo usuário.

## Skills relacionadas

- **brainstorm** — matura a ideia antes de virar PRD
- **escrever-trd** — cobre stack, arquitetura e decisões técnicas (ADRs); o PRD referencia, não duplica

## Limitações conhecidas

- Não gera SPEC, PLAN ou TASKS de implementação — isso é papel de outra etapa do fluxo
- Não toma decisões de negócio — lacunas bloqueantes voltam como pergunta fechada ao usuário
- Uma decisão arquitetural durável (banco, auth, padrão estrutural) encontrada no input não vira decisão de produto — a skill sinaliza que é candidata a ADR
