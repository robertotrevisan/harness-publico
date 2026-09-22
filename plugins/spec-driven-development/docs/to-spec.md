# to-spec

Transforma a conversa atual em uma spec e publica no issue tracker do projeto: sem entrevista, apenas síntese do que já foi discutido. Pensada para o momento em que a maturação de uma ideia (por exemplo via `brainstorm`) já aconteceu e falta só formalizar e registrar.

## Como funciona

1. Explora o repositório para entender o estado atual do código (se ainda não tiver feito), usando o vocabulário de domínio do projeto e respeitando ADRs da área tocada
2. Identifica os pontos (seams) onde a feature será testada, preferindo os já existentes aos novos — quanto menos pontos de teste espalhados pelo código, melhor — e confirma com o usuário se correspondem ao esperado
3. Escreve a spec a partir de um template fixo e publica no issue tracker do projeto, aplicando a label de triagem `ready-for-agent`

## Estrutura da spec gerada

- **Problem Statement** — o problema do ponto de vista do usuário
- **Solution** — a solução do ponto de vista do usuário
- **User Stories** — lista extensa e numerada, no formato "Como [ator], quero [funcionalidade], para [benefício]"
- **Implementation Decisions** — módulos afetados, interfaces, decisões de arquitetura, contratos de API (sem caminhos de arquivo ou trechos de código específicos, que ficam desatualizados rápido — exceção: um trecho de protótipo que capture uma decisão com mais precisão que prosa, como uma máquina de estados ou schema)
- **Testing Decisions** — o que caracteriza um bom teste (comportamento externo, não detalhes de implementação), módulos a testar, precedentes no código
- **Out of Scope**
- **Further Notes**

## Pré-requisitos e configuração

Requer que o issue tracker do projeto e o vocabulário de labels de triagem já estejam configurados na sessão — caso contrário, a skill orienta a rodar a configuração correspondente antes de prosseguir. Não é acionada automaticamente pelo modelo (`disable-model-invocation`); precisa ser chamada explicitamente.

## Skills relacionadas

- **brainstorm** — gera o material de contexto que o `to-spec` sintetiza
- **escrever-prd** — alternativa para quando a saída desejada é um PRD de produto em vez de uma spec de implementação no issue tracker

## Limitações conhecidas

- Não entrevista o usuário — se a conversa não tiver contexto suficiente, a spec sai incompleta em vez de gerar perguntas
- Depende de um issue tracker e vocabulário de labels já configurados na sessão
