# ⚡ Início Rápido - Canais e Base de Dados

## ✅ Tudo Pronto!

Seu sistema agora tem:
- ✅ **Seletor de Canal Funcional** com dropdown
- ✅ **Rastreamento de Canal** em todas as páginas
- ✅ **Base de Dados em TXT** com 6 exemplos
- ✅ **Importação Automática** de dados

---

## 🎯 Começar em 30 Segundos

### 📝 Opção 1: Usar Exemplos Predefinidos (Recomendado)

```
1. Abra: demo.html
2. Clique: "Carregar: Risco Baixo (Orientação)"
   └─ ✅ Atendimento criado instant.
3. Você é redirecionado para: index.html
4. Veja: ☎️ Paulo Santos | Fala Inadequada | Em Análise
```

### 🔗 Opção 2: Importar Base Completa

```
1. demo.html
2. "Importar arquivo TXT"
3. Selecione: BASE_DADOS_ATENDIMENTOS.txt
4. ✅ 6 atendimentos carregados
5. Vê todos na fila com canais diferentes
```

### ✍️ Opção 3: Criar Manualmente

```
1. demo.html → "Criar Demo: Risco Baixo/Médio/Alto"
   OU ir direto para: identificacao.html
2. Preencha dados
3. Dropdown "Canal de Atendimento": ☎️ ou ✉️ ou 👤
4. Continue fluxo normal
5. Canal aparece automát. em todas páginas
```

---

## 🔍 Verificar que Tudo Funciona

### Test 1: Canal Persiste
```
1. Identificação: Seleciona "✉️ Mensagem"
2. Matriz: Vê "Mensagem" em algum lugar
3. Manifestações: Vê "✉️ Mensagem" 
4. Fila: Vê "✉️"
✅ SUCESSO: Canal passou por toda a jornada
```

### Test 2: Importação
```
1. demo.html → "Importar arquivo TXT"
2. Selecione BASE_DADOS_ATENDIMENTOS.txt
3. Alert: "✅ 6 atendimento(s) importado(s)"
4. index.html mostra 6 linhas, cadauma comcanal
✅ SUCESSO: Dados carregados de TXT
```

### Test 3: Fila Exibe Canais
```
1. index.html
2. Coluna "CANAL":
   - ☎️ (Telefone)
   - ✉️ (Mensagem) 
   - 👤 (Presencial)
   - etc
✅ SUCESSO: Emojis aparecem corretamente
```

---

## 📁 Arquivos Novos/Modificados

### 📄 Novo
- `/BASE_DADOS_ATENDIMENTOS.txt` - Base com 6 exemplos
- `/GUIA_CANAIS_DATABASE.md` - Documentação completa

### ✏️ Modificado
- `identificacao.html` - Dropdown de canal + funções
- `manifestacoes.html` - Exibe canal com emoji
- `index.html` - Emoji na tabela + funções utilitárias
- `script.js` - Funções compartilhadas de canal
- `demo.html` - UI importação + parser TXT

---

## 🎨 Mapa Visual - Como Canal Aparece

```
┌─────────────────────────────────────────────────────────┐
│ Identificação                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Canal de Atendimento                                │ │
│ │ ▼ ✉️ Mensagem / WhatsApp                            │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ⬇
┌─────────────────────────────────────────────────────────┐
│ Matriz de Risco                                         │
│ Origem: ✉️ Mensagem (referência)                       │
└─────────────────────────────────────────────────────────┘
                         ⬇
┌─────────────────────────────────────────────────────────┐
│ Manifestações                                           │
│ Origem: ✉️ Mensagem                                    │
│ [Setores: USI, Gepes, etc]                             │
└─────────────────────────────────────────────────────────┘
                         ⬇
┌─────────────────────────────────────────────────────────┐
│ Fila (index.html)                                       │
│ ┌────────────────────────────────────────────────────┐  │
│ │ ID    │ Nome    │ Data  │CANAL│ Tipo  │ Status    │  │
│ ├────────────────────────────────────────────────────┤  │
│ │ 001   │ Maria   │ 23/03 │ ✉️ │ Ameaça│ Em Análise│  │
│ └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Base de Dados - Quick Reference

Arquivo: `BASE_DADOS_ATENDIMENTOS.txt`

| Exemplo | ID | Canal | Score | Risco | Ação |
|---------|----|----- -|-------|-------|------|
| 1 | AT-001-BAIXO | ☎️ Telefone | 5 | 🟢 Baixo | Orientação |
| 2 | AT-002-MEDIO | ✉️ Mensagem | 10 | 🟡 Médio | Gepes |
| 3 | AT-003-ALTO | 👤 Presencial | 15 | 🔴 Alto | USI + Setores |
| 4 | AT-004-ALTO-EMAIL | ✉️ Email | 16 | 🔴 Crítico | Máxima Proteção |
| 5 | AT-005-MEDIO-OUVIDORIA | 📢 Ouvidoria | 11 | 🟡 Médio-Alto | Gepes + Supers |
| 6 | AT-006-ALTO-REDES | 🔗 Redes Sociais | 15 | 🔴 Alto | Polícia Federal |

---

## 🔧 Troubleshooting

### ❌ Canal não aparece na Manifestações
**Solução:** Verifica se localStorage tem `canal` salvo
```javascript
// No console (F12):
JSON.parse(localStorage.getItem('atendimento_' + ATEND_ID))
// Deve mostrar: { ..., canal: "Telefone", ... }
```

### ❌ Importação de TXT não funciona
**Solução:** Certifique que arquivo é UTF-8
- Abra em Notepad++
- Encodificação → UTF-8 sem BOM
- Salve

### ❌ Emoji não aparece
**Solução:** Força atualizar página (Ctrl+Shift+R)
- Limpa cache do browser
- Recarrega arquivos

### ❌ Dados desaparecem
**Solução:** localStorage foi limpo
```javascript
// Restaurar:
1. demo.html → "Importar arquivo TXT"
2. Ou "Carregar: risco baixo/médio"
```

---

## 💡 Dicas Avançadas

### Adicionar Novo Canal Customizado
```javascript
// Em script.js, adicione à CANAL_EMOJIS:
const CANAL_EMOJIS = {
    ...
    'Seu Canal': '🎯'  // ← Novo
};
```

### Exportar Dados para Análise
```javascript
// Console (F12):
console.table(
    Object.keys(localStorage)
        .filter(k => k.startsWith('atendimento_'))
        .map(k => JSON.parse(localStorage[k]))
)
```

### Criar Backup
```javascript
// Console (F12):
const backup = {};
for(let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i);
    backup[key] = localStorage[key];
}
copy(JSON.stringify(backup, null, 2))
// Cole em arquivo.json para backup
```

---

## 📞 Próximos Passos

1. ✅ **Agora:** Teste os exemplos (demo.html)
2. ✅ **Depois:** Importa a base de dados (BASE_DADOS_ATENDIMENTOS.txt)
3. ✅ **Então:** Crie seu primeiro atendimento manual
4. ✅ **Pronto:** Use em demonstração real!

---

**Status:** ✅ Sistema 100% Funcional | **Data:** 23/03/2026
