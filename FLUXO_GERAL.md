# G.T. Ameaça — Fluxo Geral do Sistema

## Visao Geral

Sistema web 100% frontend para gestao de denuncias de ameacas dirigidas a funcionarios da Gepes (Gestao de Pessoal — Banco Central). Usa `localStorage` para persistencia, sem backend ou servidor.

---

## 1. Fluxo de Atendimento

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FLUXO PRINCIPAL                                  │
│                                                                         │
│   ┌──────────────┐    ┌──────────────┐    ┌────────────────┐           │
│   │ IDENTIFICACAO │───>│    MATRIZ    │───>│ MANIFESTACOES  │           │
│   │  (Registro)   │    │  (Risco)     │    │  (Pareceres)   │           │
│   └──────────────┘    └──────────────┘    └────────────────┘           │
│          │                   │                     │                     │
│          v                   v                     v                     │
│   Dados do relator    Score 0-18 pts       Pareceres por setor          │
│   Nome, matricula     Classificacao        USI, Gepes, Supers           │
│   Canal, relato       Nivel de risco       Encaminhamentos              │
│                                                    │                     │
│                                                    v                     │
│                                            ┌──────────────┐             │
│                                            │  FILA (Index) │             │
│                                            │  Status final  │             │
│                                            └──────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Identificacao (identificacao.html)

**Objetivo:** Registrar os dados iniciais da denuncia.

**Campos coletados:**
- Nome do relator
- Matricula
- Telefone de contato
- Unidade/lotacao
- Data do fato
- Canal de atendimento (telefone, email, presencial, etc.)
- Assessor responsavel
- Relato da situacao
- Tema sensivel (toggle)

**Dados salvos:** `atendimento_[ID]` no localStorage

**Proximo passo:** Matriz de Risco

---

### 1.2 Matriz de Risco (matriz.html)

**Objetivo:** Avaliar a gravidade da ameaca com base em 6 eixos.

**Eixos de avaliacao (0-3 pontos cada, total maximo = 18):**

| Eixo | Fator                  | 0 pts           | 1 pt                | 2 pts                | 3 pts                  |
|------|------------------------|-----------------|----------------------|----------------------|------------------------|
| E1   | Conteudo               | Reclamacao      | Ameaca vaga          | Dano especifico      | Ameaca de morte        |
| E2   | Violencia prometida    | Nenhuma         | Dano moral/financeiro| Violencia verbal     | Violencia fisica/letal |
| E3   | Concretude             | Sem detalhes    | Ideia generica       | Alvo+forma+local     | Alvo+meio+local definidos |
| E4   | Capacidade de acao     | Inverossimil    | Pouco provavel       | Possivel             | Real e viavel          |
| E5   | Proximidade temporal   | Indefinida      | Um dia               | Em breve             | Imediata               |
| E6   | Historico              | Nenhum          | Conflitos verbais    | Ameacas anteriores   | Violencia real         |

**Campos adicionais:**
- Nivel de provas: P0 (nenhuma) a P3 (video/audio)
- BO registrado: sim/nao

**Classificacao resultante:**

| Pontuacao | Classificacao          | Tratamento                              |
|-----------|------------------------|-----------------------------------------|
| 0-6       | Fala Inadequada        | Orientacao e mediacao                   |
| 7-12      | Baixo Potencial Lesivo | Analise Gepes + medidas de seguranca    |
| 13-18     | Grave Ameaca           | Encaminhamento obrigatorio para USI     |

**Dados salvos:** `matrizResultado_[ID]` no localStorage

**Proximo passo:** Manifestacoes/Pareceres

---

### 1.3 Manifestacoes e Pareceres (manifestacoes.html)

**Objetivo:** Coletar pareceres dos setores competentes conforme o nivel de risco.

**Setores envolvidos:**

| Setor                | Quando acionado     | Responsabilidade                          |
|----------------------|---------------------|-------------------------------------------|
| USI                  | Score >= 13         | Analise de seguranca institucional        |
| Gepes Assessoramento | Score >= 7          | Medidas de protecao ao servidor           |
| Gepes Especializadas | Apos Gepes Assess.  | Analise especializada do caso             |
| Superintendencias    | Apos Gepes Espec.   | Revisao e decisao final                   |

**Fluxo de encaminhamento por nivel de risco:**

```
GRAVE AMEACA (13-18 pts):
  USI
   └─> Gepes Assessoramento
        └─> Gepes Especializadas
             └─> Superintendencias
                  └─> Caso Finalizado

BAIXO POTENCIAL (7-12 pts):
  Gepes Assessoramento (pula USI)
   └─> Gepes Especializadas
        └─> Superintendencias
             └─> Caso Finalizado

FALA INADEQUADA (0-6 pts):
  Orientacao direta → Caso Finalizado (sem pareceres)
```

**Cada parecer contem:**
- Texto do parecer
- Medidas recomendadas
- Redirecionamento para proximo setor (quando aplicavel)

**Dados salvos:** `pareceres_[ID]` no localStorage

---

### 1.4 Fila de Atendimentos (index.html)

**Objetivo:** Visao geral de todos os casos com status atualizado.

**Status possiveis:**

| Status              | Cor      | Condicao                                        |
|---------------------|----------|--------------------------------------------------|
| Pendente            | Vermelho | Atendimento criado, sem dados                    |
| Em Analise          | Laranja  | Identificacao preenchida, sem matriz             |
| Analisado           | Verde    | Matriz preenchida (risco baixo, sem pareceres)   |
| Aguardando Parecer  | Amarelo  | Risco alto, pareceres pendentes                  |
| Finalizado          | Verde    | Todos os pareceres obrigatorios respondidos       |

**Funcionalidades:**
- Atualizacao automatica a cada 30 segundos
- Clique na linha abre o caso na etapa adequada
- Exibe: protocolo, nome, data, canal, risco, status

---

## 2. Estrutura de Dados (localStorage)

```
localStorage
├── atendimento_[ID]          → Dados do relator
│   {id, nome, matricula, telefone, unidade, dataFato, dataRegistro, canal, assessor}
│
├── matrizResultado_[ID]      → Resultado da avaliacao de risco
│   {pontuacao, classificacao, nivel, tratamento, provas, boRegistrado, data}
│
├── pareceres_[ID]            → Pareceres dos setores
│   {atendimentoId, dados: {usi: {...}, gepes-assessoramento: {...}, ...}}
│
├── assessorLigado            → Assessor logado no momento
├── atendimentoAtivo          → ID do ultimo atendimento em edicao
└── backup_[ID]_[timestamp]   → Backups automaticos (mantidos os 5 ultimos)

sessionStorage
└── atendimentoId             → ID da sessao atual
```

**Formato do ID:** `YYYYMMDDSS` (ano + mes + dia + sequencia do dia)
Exemplo: `2026040101` = primeiro atendimento de 01/04/2026

---

## 3. Melhorias Identificadas

### 3.1 Prioridade 1 — Integridade de Dados (Critico)

| #  | Melhoria                                    | Local               | Situacao    |
|----|---------------------------------------------|----------------------|-------------|
| 01 | Adicionar `required` em campos essenciais (matricula, relato, canal, telefone) | identificacao.html | Pendente |
| 02 | Implementar aviso `beforeunload` para dados nao salvos | identificacao.html, matriz.html | Pendente |
| 03 | Unificar fonte de ID — usar localStorage como primario, sessionStorage so para UI | Todas as paginas | Pendente |
| 04 | Envolver leituras de `localStorage` em `try/catch` para evitar crash por JSON invalido | js/script.js | Pendente |
| 05 | Validar consistencia de sessao ao abrir multiplas abas | Todas as paginas | Pendente |

### 3.2 Prioridade 2 — Funcionalidades Incompletas

| #  | Melhoria                                    | Local               | Situacao    |
|----|---------------------------------------------|----------------------|-------------|
| 06 | Implementar busca na fila (por nome, matricula, protocolo) | index.html | Pendente |
| 07 | Implementar filtros de status e nivel de risco | index.html | Pendente |
| 08 | Implementar paginacao real (lotes de 20 registros) | index.html | Pendente |
| 09 | Ativar toggle "Tema Sensivel" com flag no atendimento | identificacao.html | Pendente |
| 10 | Botao voltar funcional no index (hoje `href="#"` sem acao) | index.html | Pendente |

### 3.3 Prioridade 3 — UX e Orientacao ao Usuario

| #  | Melhoria                                    | Local               | Situacao    |
|----|---------------------------------------------|----------------------|-------------|
| 11 | Desabilitar setores que nao se aplicam ao nivel de risco nos pareceres | manifestacoes.html | Pendente |
| 12 | Exibir banner de alerta para casos graves (>=13 pts) com proximos passos | matriz.html | Pendente |
| 13 | Adicionar indicador visual de "ultimo salvamento" (timestamp) | identificacao.html, matriz.html | Pendente |
| 14 | Exibir data/hora de envio em cada parecer | manifestacoes.html | Pendente |
| 15 | Adicionar dialogo de confirmacao antes de enviar parecer | manifestacoes.html | Pendente |
| 16 | Guiar fluxo de pareceres — indicar qual setor deve responder proximo | manifestacoes.html | Pendente |

### 3.4 Prioridade 4 — Robustez e Qualidade

| #  | Melhoria                                    | Local               | Situacao    |
|----|---------------------------------------------|----------------------|-------------|
| 17 | Validar formato da matricula do assessor no login | js/script.js | Pendente |
| 18 | Padronizar paleta de cores de status em todas as paginas | css/style.css | Pendente |
| 19 | Validar compatibilidade canal vs. contato (ex: canal email exige email) | identificacao.html | Pendente |
| 20 | Adicionar dropdown "Encaminhar para" no formulario de parecer | manifestacoes.html | Pendente |

---

## 4. Mapa de Arquivos

```
GTameaca/
├── index.html              → Fila de atendimentos (pagina principal)
├── identificacao.html      → Formulario de registro inicial
├── matriz.html             → Avaliacao de risco (6 eixos)
├── manifestacoes.html      → Pareceres por setor
├── demo.html               → Pagina de testes com dados ficticios
├── js/
│   └── script.js           → Utilitarios compartilhados
├── css/
│   └── style.css           → Estilos globais
├── CLAUDE.md               → Instrucoes para Claude Code
└── FLUXO_GERAL.md          → Este documento
```

---

## 5. Comandos Uteis

```bash
# Executar localmente
# Abrir index.html no navegador ou usar Live Server do VS Code

# Limpar dados de teste (console do navegador)
localStorage.clear();
sessionStorage.clear();

# Commit e push (push automatico via hook post-commit)
git add <arquivos>
git commit -m "descricao"
```

---

*Documento gerado em 01/04/2026 — Atualizar conforme melhorias forem implementadas.*
