# 📋 FLUXO INTEGRADO - G.T. Ameaça (Gepes Atendimento)

## 🎯 Objetivo Geral
Sistema completo de gestão de denúncias de ameaças com avaliação de risco e encaminhamento automático para setores especializados.

---

## 📊 FLUXO OPERACIONAL

### 1️⃣ **REGISTRO DE ATENDIMENTO** (`identificacao.html`)
- ✏️ Preencher dados do relator (nome, matrícula, telefone, unidade)
- 📅 Data e hora automáticas
- 🎯 Classificação do envolvimento
- 📝 Relato dos fatos
- 🏷️ Canal de contato (Telefone, WhatsApp, Email)

**Dados Salvos:**
```
localStorage.atendimento_[ID] = {
  id: "AT-1234567890",
  nome: "João Silva",
  matricula: "12345",
  telefone: "(11) 98765-4321",
  unidade: "Agência Centro",
  dataFato: "2026-03-23T10:30",
  dataRegistro: "23/03/2026",
  canal: "Telefone"
}
```

**Ação:** Clica em "MATRIZ DE RISCO" → vai para `matriz.html`

---

### 2️⃣ **AVALIAÇÃO DE RISCO** (`matriz.html`)
- 📊 Preenche 6 eixos de avaliação (E1-E6)
- 🔢 Pontuação real-time (0-18 pontos)
- 🎨 Categorização visual:
  - **0-6 pts**: 🟢 Fala inadequada (orientação)
  - **7-12 pts**: 🟡 Baixo potencial (análise policial)
  - **13-18 pts**: 🔴 Grave ameaça (USI + proteção)

**Dados Salvos:**
```
localStorage.matrizResultado_[ID] = {
  pontuacao: 15,
  classificacao: "Ameaça Grave",
  nivel: "high",
  tratamento: "Encaminhar para USI com proteção imediata",
  data: "23/03/2026 10:45"
}
```

**Lógica de Risco:**
- Se score **≥ 13**: Risco **ALTO** → Vai para Manifestações com **setores obrigatórios**
- Se score **7-12**: Risco **MÉDIO** → Análise simplificada
- Se score **≤ 6**: Risco **BAIXO** → Orientação e fechamento

**Ação:** Clica em "Acessar Manifestação" → vai para `manifestacoes.html`

---

### 3️⃣ **ATRIBUIÇÃO DE PARECERES** (`manifestacoes.html`)
#### A. **Histórico Inicial**
Mostra as manifestações iniciais (Gepes Atendimento + Gepes Assessoramento)

#### B. **Seletor de Setores** 🔄
Menu dropdown para selecionar o setor responsável:
- **USI** (Unidade de Segurança Integrada) - 1 dia
- **Gepes Assessoramento** - 3 dias
- **Gepes Especializadas** - 5 dias
- **Superintendências** - 7 dias

#### C. **Formulário de Parecer**
Pre-preenchido com:
- Nº Denúncia
- Classificação
- Data Denúncia
- Prazo em dias

Campos a preencher:
- 📝 **Parecer/Análise** (obrigatório)
- 🛡️ **Medidas Tomadas** (opcional)
- 🔀 **Encaminhar para outro Setor?** (opcional)

**Dados Salvos:**
```
localStorage.pareceres_setores = {
  "usi": {
    respondido: true,
    data: "23/03/2026 11:00",
    texto: "Ameaça avaliada. Risco real identificado.",
    medidas: "Acionamento de segurança interna e polícia",
    redirecionar: "gepes-assessoramento"
  },
  "gepes-assessoramento": {
    respondido: true,
    data: "23/03/2026 11:30",
    texto: "Parecer jurídico analisado.",
    medidas: "Recomendação de afastamento preventivo",
    redirecionar: ""
  }
}
```

#### D. **Status Visual**
Badges em tempo real:
- 🟢 **✓ USI** - Completo
- 🟡 **○ Gepes Assessor.** - Pendente
- 🟡 **○ Gepes Espec.** - Pendente
- 🟡 **○ Supers** - Pendente

**Fluxo de Parecer:**
```
Preencher parecer → Enviar → Marca como ✓
  ↓
Pode redirecionar automaticamente para próximo setor
  ↓
Ou volta ao dropdown para seleção manual
```

---

### 4️⃣ **FILA DE ATENDIMENTOS** (`index.html`)
#### Visualização em Tabela
Mostra todos os atendimentos com:
- Número (últimos 7 dígitos do ID)
- Nome do cliente/relator
- Data do fato
- Canal de contato (☎️ 💬 ✉️)
- Atividade (Ameaça)
- Responsável (matrícula do assessor)
- **Status em tempo real:**

| Status | Condição | Cor |
|--------|----------|-----|
| 🟡 **Em Análise** | Só tem atendimento inicial | Laranja |
| 🟡 **Aguardando Parecer** | Matriz ≥ 13 pts + setores pendentes | Laranja |
| 🟢 **Analisado** | Matriz 7-12 pts | Verde |
| 🟢 **Finalizado** | Matriz ≥ 13 pts + todos setores respondidos | Verde |
| 🔴 **Pendente** | Sem dados | Vermelho |

#### Sincronização
- Atualiza **a cada 30 segundos** automaticamente
- Ordenação: **Mais recentes em primeiro**
- Clique na linha: Abre atendimento no ponto correto (identificação ou manifestações)

---

## 🔗 INTEGRAÇÃO DE DADOS

### localStorage - Estrutura

```
atendimento_AT-1234567890 = {
  id, nome, matricula, telefone, unidade,
  dataFato, dataRegistro, canal,
  matrizResultado: {...}
}

matrizResultado_AT-1234567890 = {
  pontuacao, classificacao, nivel,
  tratamento, provas, boRegistrado, data
}

pareceres_setores = {
  usi: {respondido, data, texto, medidas, redirecionar},
  gepes-assessoramento: {...},
  gepes-especializadas: {...},
  supers: {...}
}

atendimentoAtivo = "AT-1234567890" // sessão atual
atendimentoId (sessionStorage) = "AT-1234567890" // guarda entre páginas
```

### Fluxo de Dados

```
identificacao.html
    ↓ salva → atendimento_*
    ↓
matriz.html
    ↓ lê atendimento_*
    ↓ calcula score
    ↓ salva → matrizResultado_*
    ↓
manifestacoes.html
    ↓ lê atendimento_* + matrizResultado_*
    ↓ pré-preenche parecer
    ↓ salva → pareceres_setores
    ↓
index.html
    ↓ lê tudo acima
    ↓ calcula status
    ↓ exibe na fila
```

---

## 📌 FUNCIONALIDADES CHAVE

### ✅ Pré-preenchimento Automático
- Dados do atendimento em todas as páginas subsequentes
- Parecer mostra: Denúncia, Data, Classificação, Prazo
- Histórico de manifestações anteriores

### ✅ Cálculo Dinâmico
- Prazo baseado em score da matriz (1/3/5/7 dias)
- Status calculado em tempo real
- Ordenação automática por data (mais recentes primeiro)

### ✅ Flexibilidade de Setores
- Ordem não-linear (conforme necessidade/risco)
- Pode retornar para setores já respondidos
- Redirecionamento automático opcional
- Visualização de todos os setores sempre (mesmo respondidos)

### ✅ Persistência Offline
- Tudo salvo em localStorage
- Funciona 100% sem servidor
- Sincronização entre abas automática
- Dados preservados mesmo fechando browser

### ✅ Interface Responsiva
- Sidebar consistente em todas as páginas
- Status badges coloridos e intuitivos
- Hlistórico de pareceres em cards claros
- Validação de campos obrigatórios

---

## 🧪 TESTING

### Cenário 1: Risco Alto (≥13 pts)
```
1. Preencher atendimento completo
2. Na matriz, selecionar opções e atingir ≥13 pts
3. Sistema redireciona para manifestações
4. Dropdown de setores deve aparecer
5. Preencher parecer para USI
6. Encaminhar para Gepes Assessoramento
7. Preencher e finalizar
8. Voltar para index → Status muda para "Aguardando Parecer" → "Finalizado"
```

### Cenário 2: Risco Baixo/Médio
```
1. Preencher atendimento
2. Na matriz, atingir <13 pts
3. Sistema mostra status "Analisado"
4. Em index, status aparece como "Analisado" (verde)
```

### Cenário 3: Navegação
```
1. Abrir index.html
2. Clicar em "Registrar atendimento" → vai para identificacao.html
3. Preenc her e clicar "MATRIZ DE RISCO" → vai para matriz.html
4. Clicar "Acessar Manifestação" → vai para manifestacoes.html
5. Voltar para index → atendimento deve aparecer na fila
```

---

## 🚀 OTIMIZAÇÕES POSSÍVEIS (Futuro)

1. **Backend em Node.js/Express**
   - Substituir localStorage por banco de dados
   - Autenticação de usuários
   - Auditoria de ações

2. **Sistema de Notificações**
   - Email quando parecer completo
   - Push quando atribuído novo setor
   - Alertas de prazos vencidos

3. **Relatórios e Dashboards**
   - Gráficos de risco por tipo
   - Tempo médio de atendimento
   - Distribuição por setor

4. **Integração com APIs**
   - Consultar banco de dados de funcionários
   - Registrar em sistema de segurança
   - Enviar para fila de impressão

5. **Mobile App**
   - React Native / Flutter
   - Notificações push
   - Acesso offline

---

## 📞 CONTATO / SUPORTE

Sistema desenvolvido para **Gepes - Gestão de Pessoal**
Versão: 1.0 | Data: 23/03/2026
