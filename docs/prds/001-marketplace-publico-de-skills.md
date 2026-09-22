---
prd_number: "001"
status: rascunho
priority: média
created: 2026-09-21
issue: ""
depends_on: []
references:
  - "https://github.com/robertotrevisan/harness-publico"
  - "https://robertotrevisan.github.io/harness-publico/"
  - "docs/trd.md"
---

# PRD 001: Marketplace público de plugins/skills para Claude Code

## 1. Contexto

- **Produto/área**: `harness-publico` — repositório e site públicos que distribuem skills próprias do Claude Code como um marketplace instalável.
- **Estado atual**: antes desta feature, as skills do mantenedor (`brainstorm`, `escrever-prd`, `escrever-trd`, `to-spec`) existiam apenas localmente, sem forma de compartilhar com outras pessoas nem de navegar/descobrir o que estava disponível.
- **Problema**: skills úteis ficavam presas ao ambiente local do autor. Não havia como outra pessoa descobrir, entender o que cada skill faz, ou instalá-la sem copiar arquivos manualmente.

> **Contexto técnico** (Astro, Tailwind, Pagefind, GitHub Actions/Pages) vive no TRD (`docs/trd.md`).

## 2. Solução Proposta

### Visão de produto

- Publicar as skills como um **Claude Code Plugin Marketplace** padrão (`.claude-plugin/marketplace.json`), instalável via `npx skills add`
- Agrupar skills relacionadas em **plugins temáticos** (não uma lista plana) para facilitar a descoberta por domínio
- Oferecer uma **vitrine navegável** (site) com busca, filtro por plugin e página própria por skill — sem exigir que o visitante clone o repositório para entender o que cada skill faz
- Cada página de skill/plugin expõe o **comando de instalação pronto para copiar**, reduzindo o passo de instalação a copiar-e-colar
- O catálogo do site é uma **projeção do repositório**, nunca uma cópia mantida à parte — publicar uma skill nova no repo é suficiente para ela aparecer no site no próximo deploy

### Decisões de produto

1. Skills são agrupadas por **domínio de uso** (ex.: `spec-driven-development`, `uso-geral`), não listadas soltas — reduz a carga cognitiva de navegar um catálogo que pode crescer *(premissa — confirme ou corrija)*
2. Toda skill publicada tem uma **descrição para humanos** (`docs/<skill>.md`) separada do `SKILL.md` (que é a definição consumida pelo Claude Code) — o público do site não precisa ler a definição técnica da skill para entender o que ela faz
3. Skill sem documentação (`docs/<skill>.md` ausente) ainda aparece no catálogo, marcada como "sem documentação" — a skill não some silenciosamente por falta de doc *(premissa — confirme ou corrija)*

### Fora do escopo

- Autenticação, contas de usuário ou controle de acesso — o marketplace é público e somente leitura *(premissa — confirme ou corrija)*
- Avaliações, comentários ou métricas de uso por skill — não há mecanismo de feedback do visitante nesta versão *(premissa — confirme ou corrija)*
- Publicação automatizada de skills de terceiros — o marketplace distribui apenas skills de autoria do mantenedor deste repositório
- Versionamento semântico rigoroso de skills individuais — apenas plugins têm campo `version`, skills não

## 3. Funcionalidades

### US01: Publicar uma skill como parte de um plugin

Como mantenedor do harness, quero agrupar uma skill dentro de um plugin temático e registrá-la no marketplace, para que ela fique disponível para instalação por qualquer pessoa.

**Rules:**
- Uma skill só é reconhecida pelo catálogo se tiver `SKILL.md` em `plugins/<plugin>/skills/<skill>/`
- O nome da skill (usado em URLs e no comando de instalação) vem do campo `name` no frontmatter do `SKILL.md`, com fallback para o nome do diretório *(premissa — confirme ou corrija)*
- Nomes de skill são únicos em todo o marketplace, independente do plugin — evita ambiguidade na URL e no comando `@skill`

**Edge cases:**
- Duas skills com o mesmo nome em plugins diferentes → build falha com erro explícito, para não publicar catálogo ambíguo
- Plugin listado em `marketplace.json` mas sem pasta `plugins/<plugin>/` correspondente → build falha *(premissa — confirme ou corrija)*

### US02: Navegar o catálogo de skills pela vitrine

Como visitante do site, quero ver a lista completa de skills disponíveis com uma descrição curta de cada uma, para entender rapidamente o que está disponível antes de instalar qualquer coisa.

**Rules:**
- A página inicial lista todas as skills de todos os plugins, ordenadas alfabeticamente
- Cada item mostra: nome da skill, plugin ao qual pertence, e um resumo curto extraído da documentação
- É possível filtrar a lista por plugin

**Edge cases:**
- Skill sem `docs/<skill>.md` → aparece na lista com aviso "sem documentação" em vez do resumo, e sem quebrar a listagem
- Marketplace com um único plugin → filtro por plugin continua funcional, apenas com uma opção além de "Todas"

### US03: Buscar uma skill por palavra-chave

Como visitante do site, quero buscar por um termo, para achar uma skill relevante sem precisar conhecer o nome exato ou navegar pelo catálogo inteiro.

**Rules:**
- A busca indexa o conteúdo das páginas de skill (nome, plugin, corpo da documentação)
- Busca funciona sem exigir um serviço externo — o índice é gerado estaticamente no build *(inferido da stack — ver TRD)*

**Edge cases:**
- Termo sem resultado → interface indica claramente "nenhum resultado", sem erro *(premissa — confirme ou corrija)*
- Skill sem documentação → não aparece no índice de busca por conteúdo, já que não há corpo de texto para indexar

### US04: Instalar uma skill ou plugin a partir da página

Como desenvolvedor visitante, quero copiar o comando de instalação pronto na página da skill ou do plugin, para instalar sem montar o comando manualmente.

**Rules:**
- A página de uma skill individual mostra o comando para instalar **só aquela skill**
- A página de um plugin mostra o comando para instalar **todas as skills daquele plugin**
- A página inicial mostra o comando para instalar **o marketplace inteiro**
- O botão de copiar usa a área de transferência do navegador e confirma visualmente que copiou

**Edge cases:**
- Navegador sem permissão/suporte a clipboard → falha silenciosa não é aceitável; botão deve indicar que a cópia não ocorreu *(premissa — confirme ou corrija, comportamento atual não testado nesse cenário)*

### US05: Ver o catálogo atualizado sem trabalho manual

Como mantenedor, quero que publicar ou editar uma skill no repositório seja suficiente para atualizar o site publicado, para não precisar sincronizar manualmente um catálogo separado.

**Rules:**
- Qualquer push na branch principal republica o site automaticamente
- O site é gerado a partir dos mesmos arquivos que o Claude Code consome (`marketplace.json`, `SKILL.md`) — não existe uma segunda fonte de verdade a manter sincronizada

**Edge cases:**
- Push que quebra o build (ex.: JSON malformado) → deploy anterior permanece no ar; o site não fica fora do ar por causa de um push ruim *(premissa — confirme ou corrija; depende do comportamento do GitHub Pages em falha de build, ver TRD)*

## 4. Fluxo de Negócio

Não incluído — a ramificação de regra desta feature (skill com/sem doc, build válido/inválido) já fica clara nos Edge cases de cada US, sem necessidade de diagrama de processo.

## 5. Critérios de Aceite

### 5a. Critérios de aceite da feature

| Critério | Razão de negócio | Como verificar (observável) |
|----------|------------------|-----------------------------|
| A página inicial lista todas as skills registradas no marketplace, sem omissão | Catálogo incompleto quebra a confiança de quem navega | Contar skills em `plugins/*/skills/*/SKILL.md` e comparar com os cards renderizados |
| Toda skill tem uma página própria acessível a partir da listagem | Visitante precisa entender a skill antes de instalar | Clicar em cada card e confirmar que a página carrega com nome e conteúdo |
| O comando de instalação exibido em cada página é executável sem edição | Fricção de instalação é a principal barreira de adoção *(premissa — confirme ou corrija)* | Copiar o comando exibido e rodar `npx skills add ...` em um diretório de teste |
| Um push em `main` reflete no site publicado sem intervenção manual | Mantenedor não deve gastar tempo publicando manualmente | Fazer um push trivial e observar o site atualizar |

### 5b. Métricas de sucesso

| Métrica | Baseline (fonte) | Meta | Prazo | Mín. aceitável | Responsável |
|---------|-------------------|------|-------|-----------------|-------------|
| Skills publicadas no marketplace | 4 (lançamento) | A levantar | A levantar | — | Mantenedor |
| Instalações via `npx skills add` | A levantar — sem telemetria própria no momento | A levantar | A levantar | — | Mantenedor |

**Regras:**
- Não há telemetria de instalação hoje (o comando roda no ambiente do usuário, fora do controle do repositório) — métrica de instalações fica "A levantar" até que uma fonte de dado exista.

## 6. Milestones

### Milestone 1: Lançar o marketplace público navegável

**Por que é um marco:** primeira vez que uma skill do mantenedor fica disponível para qualquer pessoa descobrir e instalar sem contato direto — sai do "só existe no meu ambiente" para "existe publicamente".

**Funcionalidades:** US01, US02, US03, US04

**Checklist de aceite** (marcado pelo Aprovador após a implementação):
- [ ] Página inicial lista todas as skills registradas no marketplace, sem omissão
- [ ] Toda skill tem uma página própria acessível a partir da listagem
- [ ] O comando de instalação exibido em cada página é executável sem edição

**Aprovador:** Roberto Trevisan (mantenedor)

### Milestone 2: Garantir atualização contínua sem trabalho manual

**Por que é um marco:** o catálogo deixa de depender de um passo manual de publicação — uma skill nova ou atualizada aparece no site pelo simples fato de existir no repositório.

**Funcionalidades:** US05

**Checklist de aceite** (marcado pelo Aprovador após a implementação):
- [ ] Um push em `main` reflete no site publicado sem intervenção manual

**Aprovador:** Roberto Trevisan (mantenedor)

## 7. Riscos e Dependências

| Risco | Impacto | Mitigação | Status |
|-------|---------|-----------|--------|
| Baixa adoção — ninguém instala as skills além do próprio mantenedor | Baixo (projeto pessoal, não há meta comercial) | Divulgar o link em canais relevantes; manter poucas skills, mas de qualidade | Pendente |
| Skill publicada sem revisão de conteúdo sensível (dados internos, credenciais) | Alto — vazamento de informação | Revisão manual do conteúdo antes de cada push que adiciona skill nova *(premissa — confirme ou corrija)* | Pendente |

**Dependências:**

| Dependência | Tipo | Status | Impacto se bloqueado |
|-------------|------|--------|----------------------|
| Nenhuma dependência de negócio identificada | — | — | — |

## 8. Referências

- [Repositório](https://github.com/robertotrevisan/harness-publico) — fonte de verdade do marketplace
- [Site publicado](https://robertotrevisan.github.io/harness-publico/) — vitrine navegável
- [TRD do projeto](../trd.md) — stack, arquitetura e requisitos técnicos
- [npx skills](https://github.com/vercel-labs/skills) — ferramenta de instalação usada pelos comandos exibidos no site

## 9. Registro de Decisões

- **2026-09-21:** Agrupar as 4 skills em 2 plugins temáticos (`spec-driven-development`, `uso-geral`) em vez de um único plugin ou skills soltas. Motivo: replica o padrão do marketplace de referência (`fabricioveronez/harness-publico`) e facilita a navegação por domínio à medida que o catálogo crescer.
- **2026-09-21:** PRD criado retroativamente — a feature já foi implementada e publicada na mesma sessão em que este documento foi escrito. Motivo: registrar a intenção de produto para orientar atualizações futuras, mesmo sem ter passado pelo fluxo draft-first→implementação nesta primeira rodada.
