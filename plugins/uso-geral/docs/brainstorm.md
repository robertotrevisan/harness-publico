# brainstorm

Modo de maturação de ideias: pesquisa, analisa criticamente, aponta trade-offs e sugere melhorias — sem criar, editar ou executar nada até o usuário solicitar explicitamente. Use antes de implementar qualquer ideia de produto, feature, sistema, skill ou fluxo que ainda não está especificada o suficiente. O valor está em questionar premissas, não em validar o que você já pensa.

## Como funciona

O fluxo segue cinco fases: **Entendimento** (investiga o contexto existente e faz no máximo 3 perguntas por turno, só sobre o que não dá para deduzir), **Análise crítica** (reframing, trade-offs, riscos, oportunidades e uma direção sugerida — que pode divergir do que foi proposto), **Iteração** (incorpora ajustes sem repetir o que já foi discutido), **Consolidação** (um portão explícito: apresenta decisões, inferências e pendências numa tabela e aguarda validação antes de sair do modo) e, opcionalmente, **Documentação** (só quando pedida, preserva o raciocínio em markdown).

Todo item levantado carrega um estado — **Decidido**, **Inferido**, **Verificado** ou **Em aberto** — para que nada fique implícito por omissão. Fatos externos voláteis (versão de biblioteca, se uma ferramenta ainda é mantida) nunca nascem como inferência: ou viram Verificado com fonte e data, ou viram pergunta.

## Área especializada

Tem uma lente própria para **especificação de projeto de desenvolvimento**: levanta requisitos de negócio e arquitetura sem descer à implementação. A skill infere quando essa lente se aplica e confirma junto com o primeiro lote de perguntas — sem gastar um turno só nisso.

## Retomar um brainstorm salvo

Quando você documenta um brainstorm (Fase 5), o arquivo guarda o estado da sessão: o que foi decidido, o que é inferência, o que ficou em aberto e o que foi verificado e quando. Apontar esse arquivo numa sessão nova retoma de onde parou, sem repetir perguntas já respondidas — e sinaliza o que envelheceu desde a última consulta.

## Pré-requisitos e configuração

Nenhum. Funciona sem configuração prévia.

## Dependências externas

Nenhuma para o modo generalista. Na lente de especificação de projeto, ferramentas de busca/documentação (quando disponíveis na sessão) são usadas para verificar versões e stack — sem elas, esses itens viram pergunta em vez de fato verificado.

## Skills relacionadas

- **escrever-prd** — formaliza a ideia madura em um PRD estruturado
- **escrever-trd** — formaliza decisões técnicas e arquiteturais em TRD/ADR

## Exemplos de uso

```
Quero criar um sistema de automação de posts no LinkedIn

Tenho uma ideia de app de finanças pessoais com IA, pensa comigo

Entra em modo brainstorm — quero criar uma skill para gerar relatórios de projetos

Quero especificar um projeto novo antes de começar a codar: um sistema de agendamento para clínicas

Continua o brainstorm de ontem — docs/brainstorm-sistema-agendamento.md
```

## Limitações conhecidas

- Nenhum arquivo é criado, editado ou executado durante o brainstorm — é um modo puramente conversacional, exceto pelo documento opcional da Fase 5
- Só sai do modo com frases explícitas como "pode criar", "implementa", "vai em frente"
- A lente de especificação não produz estimativa, cronograma, código, endpoints nem modelagem de tabela
- O documento gerado é base para escrever a spec, não a spec final
