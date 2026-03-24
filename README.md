# 🎯 G.T. Ameaça - Sistema de Gestão de Denúncias

## 📌 Sobre o Projeto

Sistema web completo para gestão de denúncias de ameaçadas dirigidas a funcionários, com avaliação automática de risco e encaminhamento para setores especializados (USI, Gepes, Superintendências).

**Características:**
- ✅ 100% Frontend (sem necessidade de servidor)
- ✅ Persistência em localStorage
- ✅ Offline-first
- ✅ Interface responsiva
- ✅ Fluxo integrado de dados

---

## 🚀 Como Começar

### Opção 1: Demo Rápida (Recomendado)
1. Abra [demo.html](demo.html) no navegador
2. Clique em um dos botões para criar dados de teste
3. Siga o fluxo automático

### Opção 2: Manual Completo
1. Abra [index.html](index.html) para ver a fila de atendimentos
2. Clique em "Registrar atendimento"
3. Preencha os dados e siga o fluxo

---

## 📂 Estrutura do Projeto

```
e:\GTameaça\
├── index.html                 # 📋 Fila de atendimentos
├── identificacao.html         # ✏️ Registro inicial
├── matriz.html               # 📊 Avaliação de risco
├── manifestacoes.html        # 💬 Pareceres por setor
├── demo.html                 # 🧪 Página de teste
├── FLUXO_INTEGRADO.md        # 📖 Documentação completa
├── css/
│   └── style.css
├── js/
│   └── script.js
├── scripts/
│   └── fix_manifestacoes.py
└── assets/
    └── img/
```

---

## 🔄 Fluxo de Operação

### Passo 1️⃣: Registrar Atendimento
```
index.html → Clique "Registrar atendimento" 
  ↓
identificacao.html → Preencha dados do relator
  ↓
Clique "MATRIZ DE RISCO"
```

**Dados Coletados:**
- Nome, matrícula, telefone do relator
- Data/hora do fato
- Canal de contato
- Relato dos fatos

### Passo 2️⃣: Avaliar Risco
```
matriz.html → Preencha 6 eixos (E1-E6)
  ↓
Sistema calcula score (0-18 pts)
  ↓
Classificação automática:
  - 0-6 pts:   Fala inadequada 🟢
  - 7-12 pts:  Baixo potencial 🟡
  - 13-18 pts: Grave ameaça 🔴
```

**Se score ≥ 13:** Clique "💬 Acessar Manifestação"

### Passo 3️⃣: Atribuir Pareceres
```
manifestacoes.html → Dropdown "Atribuir Parecer a:"
  ↓
Selecione um setor:
  - USI (1 dia)
  - Gepes Assessoramento (3 dias)
  - Gepes Especializadas (5 dias)
  - Superintendências (7 dias)
  ↓
Preencha parecer + medidas
  ↓
(Opcional) Redirecionar para outro setor
  ↓
Clique "Enviar Parecer"
  ↓
Status muda para ✓
```

### Passo 4️⃣: Acompanhar na Fila
```
index.html → Visualize atendimento na tabela
  ↓
Status muda conforme progresso:
  - 🟡 Em Análise (inicial)
  - 🟡 Aguardando Parecer (risco alto + pendentes)
  - 🟢 Analisado (risco médio)
  - 🟢 Finalizado (todos setores respondidos)
```

---

## 🎮 Guia de Uso Prático

### Teste 1: Criar uma Denúncia Completa
```
1. Abra demo.html
2. Clique "Criar Demo: Risco ALTO (13+ pts)"
3. Preencha dados adicionais se necessário
4. Na aba de manifestações, selecione "USI"
5. Escreva parecer e envie
6. Volte para index.html
7. Veja o atendimento com status "Aguardando Parecer"
8. Continue preenchendo setores
9. Após todos responderem, status muda para "Finalizado"
```

### Teste 2: Múltiplos Atendimentos
```
1. Abra demo.html
2. Clique em 3-4 diferentes tipos de risco
3. Volte para index.html
4. Veja lista com todos na fila
5. Navegue entre atendimentos
```

### Teste 3: Sincronização
```
1. Abra 2 abas do navegador
2. Em uma, vá para identificacao.html e preencha
3. Na outra, vá para index.html
4. Atualize (F5)
5. Novo atendimento aparece na fila
```

---

## 💾 Dados Armazenados

### Local Storage Structure

```json
// Atendimento
{
  "atendimento_AT-1234567890": {
    "id": "AT-1234567890",
    "nome": "João Silva",
    "matricula": "12345",
    "telefone": "(11) 98765-4321",
    "unidade": "Agência Centro",
    "dataFato": "2026-03-23T10:30",
    "dataRegistro": "23/03/2026 10:30",
    "canal": "Telefone"
  }
}

// Resultado Matriz
{
  "matrizResultado_AT-1234567890": {
    "pontuacao": 15,
    "classificacao": "Ameaça Grave",
    "nivel": "high",
    "tratamento": "Encaminhar para USI com proteção imediata",
    "data": "23/03/2026 10:45"
  }
}

// Pareceres dos Setores
{
  "pareceres_setores": {
    "usi": {
      "respondido": true,
      "data": "23/03/2026 11:00",
      "texto": "Ameaça avaliada. Risco real identificado.",
      "medidas": "Acionamento de segurança",
      "redirecionar": "gepes-assessoramento"
    },
    "gepes-assessoramento": {
      "respondido": false,
      ...
    }
  }
}
```

---

## ⚙️ Funcionalidades Avançadas

### Pré-preenchimento Automático
Todas as páginas herdam dados da anterior:
- matriz.html lê dados de identificacao.html
- manifestacoes.html lê dados de identificacao.html + matriz.html
- index.html lê todos os dados

### Status Calculado em Tempo Real
```javascript
// Lógica em index.html:
- Se atendimento_* existe → "Em Análise"
- Se matrizResultado_* >= 13 pts → "Aguardando Parecer" ou "Finalizado"
- Se matrizResultado_* < 13 pts → "Analisado"
- Se todos setores respondidos → "Finalizado"
```

### Sincronização Automática
- index.html atualiza a cada 30 segundos
- Novo atendimento aparece imediatamente na fila
- Status muda em tempo real conforme preenchem pareceres

### Redirecionamento Automático
- Após finalizar parecer, pode redirecionar para próximo setor
- Ou voltar ao dropdown para seleção manual

---

## 🧹 Limpeza de Dados

### Limpar Específico

**No Console (F12):**
```javascript
// Limpar um atendimento
localStorage.removeItem('atendimento_AT-1234567890');

// Limpar uma matriz
localStorage.removeItem('matrizResultado_AT-1234567890');

// Limpar pareceres
localStorage.removeItem('pareceres_setores');
```

### Limpar Tudo

**Via Demo Page:**
- Clique em "Limpar Tudo (Reset)"

**Manual:**
```javascript
localStorage.clear();
sessionStorage.clear();
```

---

## 🐛 Troubleshooting

### Problema: Atendimento não aparece na fila
**Solução:**
1. Abra Console (F12)
2. Digite: `localStorage.getItem('atendimento_AT-...')`
3. Se retornar `null`, dados não foram salvos
4. Reabra identificacao.html e preencha novamente

### Problema: Status não atualiza
**Solução:**
1. Refresque a página (F5)
2. Ou aguarde 30 segundos (atualização automática)
3. Verifique se localStorage tem os dados

### Problema: Dados desaparecem
**Possíveis Causas:**
- Navegador em modo privado (localStorage temporário)
- Cookie/Cache limpo automaticamente
- localStorage cheio (muito dados)

**Solução:**
- Use navegador normal (não privado)
- Limpe dados regularmente
- Use demo.html para testes rápidos

---

## 🔐 Segurança

⚠️ **IMPORTANTE:** Este é um protótipo de demonstração.

Para produção:
- ✅ Implementar backend seguro (Node.js/Python)
- ✅ Autenticação com JWT/OAuth
- ✅ Banco de dados criptografado
- ✅ Auditoria de ações
- ✅ HTTPS obrigatório
- ✅ Validação server-side

---

## 📖 Documentação Completa

Veja [FLUXO_INTEGRADO.md](FLUXO_INTEGRADO.md) para:
- Arquitetura detalhada
- Estrutura de dados  
- Casos de teste
- Roadmap futuro

---

## 🚀 Próximos Passos

### Curto Prazo
- [ ] Exportar relatório em PDF
- [ ] Impressão de denúncia
- [ ] Histórico de alterações
- [ ] Busca e filtros avançados

### Médio Prazo
- [ ] Backend em Node.js
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação de usuários
- [ ] Sistema de notificações

### Longo Prazo
- [ ] Mobile app (React Native)
- [ ] Integração com sistemas externos
- [ ] Dashboard de analytics
- [ ] Relatórios automáticos

---

## 👥 Suporte

**Versão:** 1.0
**Última atualização:** 23/03/2026
**Desenvolvido para:** Gepes - Gestão de Pessoal

---

## 📄 Licença

Uso interno - Gepes Banco Central
