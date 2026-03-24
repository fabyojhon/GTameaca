# 🔗 Guia de Canais e Base de Dados - G.T. Ameaça

## 📋 Índice
1. [Sistema de Canais Melhorado](#sistema-de-canais-melhorado)
2. [Base de Dados em TXT](#base-de-dados-em-txt)
3. [Importação de Dados](#importação-de-dados)
4. [Exemplos de Uso](#exemplos-de-uso)
5. [Referência Técnica](#referência-técnica)

---

## 🔗 Sistema de Canais Melhorado

### O que é um Canal?

O **canal de atendimento** especifica o meio pelo qual a ameaça foi comunicada. Agora o sistema oferece seleção clara e rastreamento em todas as páginas.

### Canais Disponíveis

| Canal | Emoji | Descrição | Exemplo |
|-------|-------|-----------|---------|
| **Telefone** | ☎️ | Chamadas telefônicas | Ligações abusivas, xingamentos por telefone |
| **Mensagem** | ✉️ | Email, SMS, WhatsApp, Telegram | Mensagens ameaçadoras, emails com ameaças |
| **Presencial** | 👤 | Atendimento face-a-face | Agressão durante atendimento na agência |
| **Ouvidoria** | 📢 | Reclamações formais | Denúncias com pressão coercitiva na ouvidoria |
| **Outros** | 🔗 | Redes sociais, blogs, fóruns | Posts ofensivos, comentários em redes |

### Seleção de Canal na Identificação

Quando você acessa **Novo Atendimento**, a primeira página oferece um dropdown limpo para selecionar o canal:

```
┌─────────────────────────────────────────────┐
│ Canal de Atendimento                        │
│ ┌───────────────────────────────────────┐   │
│ │ ☎️ Telefone         [Emoji Preview]   │   │
│ └───────────────────────────────────────┘   │
│ (Dropdown com todas as opções)              │
└─────────────────────────────────────────────┘
```

### Canal Persiste em Todo o Fluxo

Após seleção, o canal aparece em:

1. **📝 Identificação** - Exibe o canal selecionado com emoji
2. **📊 Matriz de Risco** - Mostra o canal no topo (referência)
3. **💬 Manifestações** - Exibe no cabeçalho de detalhes "Origem: ☎️ Telefone"
4. **📋 Fila de Atendimentos** - Coluna CANAL mostra emoji correspondente

---

## 💾 Base de Dados em TXT

### Arquivo BASE_DADOS_ATENDIMENTOS.txt

A base de dados contém exemplos pré-formatados para teste e demonstração.

### Estrutura do Arquivo

```
═════════════════════════════════════════════════════════════════════════════
 EXEMPLO 1: RISCO BAIXO - ORIENTAÇÃO
═════════════════════════════════════════════════════════════════════════════

ID: AT-001-BAIXO
Nome Relator: Paulo Santos Silva
Matrícula: 12345
Telefone: (11) 3456-7890
Unidade: Agência Paulista
Canal: Telefone
Data Fato: 23/03/2026 09:15
Classificação: Fala Inadequada

Relato dos Fatos:
[descrição do incident]

Matriz de Risco:
─────────────────
E1 (Contexto): 1 ponto
E2 (Antecedentes): 0 pontos
E3 (Características da Ameaça): 1 ponto
E4 (Vulnerabilidade): 1 ponto
E5 (Acesso): 1 ponto
E6 (Capacidade): 1 ponto

SCORE FINAL: 5 pontos (Fala Inadequada - Orientação)
RISCO: 🟢 BAIXO
AÇÃO: Orientação ao funcionário
```

### Campos Reconhecidos

O sistema reconhece e extrai automaticamente:

- **ID** - Identificador único do atendimento
- **Nome Relator** - Nome da pessoa que registrou
- **Matrícula** - Número funcional do relator
- **Telefone** - Contato do relator
- **Unidade** - Unidade organizacional
- **Canal** - Meio de comunicação da ameaça
- **Data Fato** - Quando ocorreu o incidente
- **Classificação** - Tipo de ameaça
- **SCORE FINAL** - Resultado da avaliação de risco

---

## 📂 Importação de Dados

### 3 Formas de Carregar Dados

#### 1️⃣ Importar Arquivo TXT Completo

1. Acesse **demo.html**
2. Na seção **"Importar Base de Dados"**, clique em **"Importar arquivo TXT"**
3. Selecione o arquivo `BASE_DADOS_ATENDIMENTOS.txt`
4. O sistema extrairá todos os exemplos e populará o localStorage
5. Será redirecionado para a fila de atendimentos

#### 2️⃣ Carregar Exemplo Predefinido

1. Acesse **demo.html**
2. Clique em:
   - **"Carregar: Risco Baixo (Orientação)"** - Exemplo 1
   - **"Carregar: Risco Médio (Análise)"** - Exemplo 2
3. Os dados serão carregados imediatamente
4. Será redirecionado para a fila

#### 3️⃣ Criar Demo Através de Botões

Alternativa rápida na página de demo:

```
📝 Nova Denúncia
├─ Criar Demo: Risco Baixo (≤6 pts)      → Redirecionada para Identificação
├─ Criar Demo: Risco Médio (7-12 pts)    → Redirecionada para Identificação  
└─ Criar Demo: Risco ALTO (13+ pts)      → Redirecionada para Manifestações
```

---

## 📖 Exemplos de Uso

### Cenário 1: Testar Risco Baixo com Canal Telefone

```
1. Aceessar: demo.html
2. Clique: "Criar Demo: Risco Baixo (≤6 pts)"
3. Resultado:
   - ✅ Atendimento criado
   - ✅ Matriz com score 5 pontos
   - ✅ Canal: ☎️ Telefone
   - 🔄 Redirecionado para Identificação
4. Na Fila (index.html):
   - Vê a linha com o novo atendimento
   - Canal exibido como: ☎️
   - Status: "Em Análise"
```

### Cenário 2: Importar Base de Dados Completa

```
1. Abra demo.html
2. Clicar: "Importar arquivo TXT"
3. Selecione: BASE_DADOS_ATENDIMENTOS.txt
4. Sistema processa:
   - ✅ 6 atendimentos importados
   - ✅ Cada um com score próprio
   - ✅ Canais variados (Telefone, Email, Presencial, etc)
5. Visualize em index.html:
   - ☎️ Paulo Santos - Telefone - Fala Inadequada
   - ✉️ Maria Oliveira - Mensagem - Baixo Potencial
   - 👤 Carlos Mendes - Presencial - Ameaça Grave
   - ... mais exemplos
```

### Cenário 3: Selecionar Canal Manualmente

```
1. Acesse: identificacao.html
2. Preencha dados iniciais
3. Em "Canal de Atendimento":
   └─ Clique no dropdown
   └─ Selecione: "✉️ Mensagem / WhatsApp"
4. Observe:
   - Emoji muda para: ✉️
   - Campo é salvo automaticamente
5. Prossiga para Matriz
6. Na Manifestações:
   - Origem mostra: ✉️ Mensagem
7. Na Fila:
   - Coluna CANAL exibe: ✉️
```

---

## 🔧 Referência Técnica

### Estrutura de Dados - localStorage

Cada atendimento é armazenado em JSON:

```javascript
// Exemplo: localStorage.getItem('atendimento_AT-001-BAIXO')
{
  "id": "AT-001-BAIXO",
  "nome": "Paulo Santos Silva",
  "matricula": "12345",
  "telefone": "(11) 3456-7890",
  "unidade": "Agência Paulista",
  "canal": "Telefone",           // ← Armazenado aqui
  "dataFato": "2026-03-23T09:15",
  "dataRegistro": "23/03/2026 09:15"
}
```

### Funções Utilitárias - script.js

```javascript
// Mapa de emojis
const CANAL_EMOJIS = {
    'Telefone': '☎️',
    'Mensagem': '✉️',
    'Presencial': '👤',
    'Ouvidoria': '📢',
    'Outros': '🔗'
};

// Obter canal de um atendimento
function obterCanalAtendimento(atendId) {
    const dados = JSON.parse(localStorage.getItem('atendimento_' + atendId) || '{}');
    return dados.canal || 'Telefone';
}

// Obter emoji de um canal
function obterEmoji(canal) {
    return CANAL_EMOJIS[canal] || '🔗';
}

// Formato display
function formatarCanal(canal) {
    return obterEmoji(canal) + ' ' + canal;
}
```

### Importação em demo.html

```javascript
// Função principal
function importarArquivoTxt(event)
  └─ Lê arquivo fornecido
  └─ Extrai exemplos
  └─ Para cada exemplo:
     └─ criarAtendimentoDoExemplo()
     └─ Salva em localStorage

// Parsing
function extrairExemplos(texto)
  └─ Divide por delimitadores
  └─ Encontra padrões "EXEMPLO N"
  └─ Parseia cada bloco

function parsearExemplo(bloco)
  └─ Regex para cada campo
  └─ Mapeia para formato interno
  └─ Calcula score e classificação
```

### Páginas Atualizadas

| Página | Mudanças | Localização |
|--------|----------|------------|
| **identificacao.html** | Dropdown de seleção de canal | Linhas 608-625 (HTML), 732-766 (JS) |
| **manifestacoes.html** | Exibe emoji + canal | Linha 892 (JS) |
| **index.html** | Emoji na coluna CANAL | Linhas 679-690, 767-770 (JS) |
| **script.js** | Funções utilitárias | Linhas 1-29 (novo) |
| **demo.html** | UI importação + funções | Nova seção + 180+ linhas JS |

---

## 🚀 Dicas de Uso

### Para Demonstração
```
1. Abra demo.html
2. Clique "Importar arquivo TXT"
3. Selecione BASE_DADOS_ATENDIMENTOS.txt
4. Visualize todos os 6 exemplos na fila
5. Clique em cada um para ver detalhes
```

### Para Teste Manual
```
1. Vá para identificacao.html
2. Preencha dados
3. Selecione canal diferente
4. Preencha matriz
5. Se risco alto, atribua pareceres
6. Verifique se canal aparece em todas as páginas
```

### Para Limpeza
```
1. demo.html → "Limpar Tudo (Reset)"
2. Confirme no alert
3. Página recarga vazia
4. localStorage totalmente limpo
```

---

## ✅ Checklist de Funcionalidade

- [x] Sistema de seleção de canal com dropdown
- [x] Emoji display dinâmico
- [x] Persistência em localStorage
- [x] Exibição em todas as páginas (identificacao, matriz, manifestações, fila)
- [x] Base de dados TXT com 6 exemplos
- [x] Importação de arquivo TXT
- [x] Carregamento de dados predefinidos
- [x] Funções utilitárias compartilhadas
- [x] Compatibilidade com fluxo existente

---

## 📞 Suporte

Para problemas com:

- **Canal não aparecendo**: Verifique se localStorage guarda o campo `canal` em `atendimento_[ID]`
- **Importação falhando**: Confirme que arquivo está em formato TXT com delimitadores corretos
- **Emoji não mostrando**: Verifique se browser suporta Unicode (todos modernos suportam)
- **Dados não persistindo**: Limpe cache / localStorage e recarregue

---

**Versão:** 1.1 | **Data:** 23/03/2026 | **Status:** ✅ Completo
