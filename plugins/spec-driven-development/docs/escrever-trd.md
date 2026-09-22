# escrever-trd

Cria e mantém o TRD (Technical Requirements Document) em `docs/trd.md` — stack, arquitetura, requisitos não-funcionais, dependências externas, padrões e decisões globais do projeto. No Modo Decision, também registra ADRs (Architecture Decision Records) em `docs/adrs/` e atualiza a seção Decisões Globais do TRD.

O TRD é o documento técnico global — único, mantido, consultado por outras skills do fluxo spec-driven. Requisitos de uma feature específica ficam no PRD; detalhes de uma decisão pontual ficam em ADRs.

## Como funciona

A skill detecta o modo automaticamente:

- **Criação** (`docs/trd.md` não existe): analisa o projeto (package.json, tsconfig, lockfiles, estrutura de pastas, `.env.example`, `docker-compose.yml`, configs de lint/teste), enriquece dependências externas identificadas com busca externa (rate limits, comportamento padrão, quotas) e só então entrevista o usuário — limite de ≤5 perguntas, priorizando o que não deu para inferir nem buscar
- **Edição** (`docs/trd.md` já existe): re-analisa o projeto, compara com o TRD atual, classifica divergências (mudança não refletida, entrada que não se verifica mais, área ambígua, seção ausente) e entrevista só o delta — preserva o que já está correto
- **Decision**: acionado por pedido explícito ("registra a decisão de...", "cria um ADR"). Gera o ADR a partir de `references/template-adr.md` em modo draft-first, com numeração sequencial e suporte a supersedência (um ADR novo pode marcar um antigo como `obsoleto` sem apagá-lo)

Um ADR só se justifica para decisão **durável, de blast radius amplo e cara de reverter** — escolha de banco, estratégia de auth, padrão arquitetural, lib estruturante. Decisão local a uma feature não vira ADR.

## Pré-requisitos e configuração

Nenhum. A skill usa `references/template-trd.md` e `references/template-adr.md` (incluídos) como estrutura canônica. Se ferramentas de busca/documentação estiverem disponíveis na sessão, são usadas para enriquecer dependências externas antes de perguntar ao usuário.

## Skills relacionadas

- **brainstorm** — matura decisões técnicas antes de formalizá-las
- **escrever-prd** — cobre comportamento e regra de negócio; referencia o TRD para contexto técnico, sem duplicá-lo

## Limitações conhecidas

- Não cria PRDs — isso é papel da `escrever-prd`
- ADR `aceito` é imutável, exceto o campo `status` quando outro ADR o supersede — revisar uma decisão é criar um ADR novo, nunca editar o antigo
- Não toma decisões de negócio — lacunas voltam ao usuário
