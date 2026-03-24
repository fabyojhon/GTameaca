# 🧪 Guia de Teste - G.T. Ameaça

## Teste 1: Fluxo Completo com Risco Alto

### Pré-requisitos
- Browser moderno (Chrome, Firefox, Edge)
- Cache/cookies habilitados
- JavaScript habilitado

### Step-by-Step

#### 1. Iniciar a Demo
```
1. Abra: https://seu-dominio/demo.html
2. Clique em: "Criar Demo: Risco ALTO (13+ pts)"
3. Verifique: Alert aparece com "Demo criada" + ID
4. Resultado: Redirecionado para manifestacoes.html
```

**Verificações:**
- ✓ Dropdown "Atribuir Parecer a:" visível
- ✓ Status badges no topo (🟡○, 🟡○, 🟡○, 🟡○)
- ✓ Dados pré-preenchidos:
  - Denúncia Nº (AT-xxxxx)
  - Classificação: "Ameaça Grave"
  - Data: hoje
  - Prazo: 1 dia (USI)

#### 2. Selecionar Primeiro Setor (USI)
```
1. Clique no dropdown
2. Selecione "USI (Unidade de Segurança Integrada)"
3. Formulário aparece com campos:
   - Parecer (textarea)
   - Medidas Tomadas (textarea)
   - Redirecionar para outro setor (opcional)
```

**Verificações:**
- ✓ Campos vazios e prontos para preenchimento
- ✓ Botões: "Cancelar" e "Enviar Parecer"
- ✓ Prazo mostra "1 dia"

#### 3. Preencher Parecer da USI
```
1. Parecer:
   "Ameaça confirmada. Risco real identificado."
2. Medidas:
   "Acionamento de segurança, contato com polícia"
3. Redirecionar: "Gepes Assessoramento"
4. Clique "Enviar Parecer"
```

**Verificações:**
- ✓ Alert: "✓ Parecer enviado com sucesso!"
- ✓ Dropdown redefine para "-- Selecione um Setor --"
- ✓ Status badges atualizam:
  - 🟢✓ USI (novo)
  - Outros ainda 🟡○

#### 4. Continuar com Gepes Assessoramento
```
1. Dropdown seleciona automaticamente "Gepes Assessoramento"
2. OU você seleciona manualmente
3. Preencha parecer + medidas
4. NÃO redirecione (deixe vazio)
5. Clique "Enviar Parecer"
```

**Verificações:**
- ✓ Status muda:
  - 🟢✓ USI
  - 🟢✓ Gepes Assessor.
  - 🟡○ Gepes Espec.
  - 🟡○ Supers

#### 5. Finalizar com Último Setor
```
1. Selecione "Gepes Especializadas"
2. Preencha parecer
3. Redirecione para "Superintendências"
4. Envie
5. Preencha Sobreconscrição
6. Clique "Enviar Parecer" (SEM redirecionar)
```

**Verificações:**
- ✓ Todos badges viram 🟢✓
- ✓ Todos os 4 setores marchados como completos

#### 6. Voltar para Index
```
1. Clique na aba de navegação "Página Inicial"
2. OU clique em "Voltar para Atendimento" no header
```

**Verificações:**
- ✓ Atendimento aparece na tabela
- ✓ Status: "Finalizado" (🟢 verde)
- ✓ Data, canal, responsável corretos
- ✓ Mais recente no topo da lista

---

## Teste 2: Risco Médio (Sem Setores)

### Step-by-Step
```
1. demo.html → "Criar Demo: Risco MÉDIO (7-12 pts)"
2. Preencha identificacao.html (se necessário)
3. Na matriz, confirme score 10 pts
4. Clique "Acessar Manifestação"
```

**Verificações:**
- ✓ Manifestações carregam, MAS SEM dropdown de setores
- ✓ Apenas histórico de manifestações iniciais
- ✓ Pode visualizar mas não pode adicionar pareceres setoriais

### Voltar para Index
```
1. Clique em "Página Inicial"
2. Procure o atendimento
```

**Verificações:**
- ✓ Status: "Analisado" (🟢 verde)
- ✓ Sem dropdown de setores (diferença com risco alto)

---

## Teste 3: Risco Baixo (Orientação)

### Step-by-Step
```
1. demo.html → "Criar Demo: Risco BAIXO (≤6 pts)"
2. Na matriz, confirme score 5 pts
3. Clique "Acessar Manifestação"
```

**Verificações:**
- ✓ Manifestações mostram orientação
- ✓ Status: "Analisado" (🟢 verde)
- ✓ Sem necessidade de setores

---

## Teste 4: Múltiplos Atendimentos

### Step-by-Step
```
1. demo.html
2. Crie 3 atendimentos diferente (alto, médio, baixo)
3. Clique em index.html
4. Veja os 3 na fila
5. Ordene por data (mais recentes primeiro)
```

**Verificações:**
- ✓ 3 linhas na tabela
- ✓ Estatísticas no demo.html:
  - Atendimentos: 3
  - Matrizes: 3
- ✓ Status diferentes para cada tipo de risco

---

## Teste 5: Sincronização em Tempo Real

### Setup
```
1. Abra 2 abas do navegador:
   - Aba 1: index.html
   - Aba 2: demo.html
```

### Step-by-Step
```
1. Na Aba 2: Clique "Criar Demo: Risco ALTO"
2. Preencha parecer da USI
3. Volta para Aba 1
4. Refresque (F5)
5. Veja atendimento com status "Aguardando Parecer"
6. Preenc outros setores na Aba 2
7. Na Aba 1: Refresque
8. Status muda para "Finalizado"
```

**Verificações:**
- ✓ Dados sincronizam entre abas
- ✓ Status atualiza em tempo real
- ✓ Sem necessidade de fechar e reabrir

---

## Teste 6: Edição de Parecer

### Step-by-Step
```
1. Preencha um parecer para USI
2. Envie
3. Status muda para ✓
4. Clique "Editar Parecer"
5. Modifique o texto
6. Envie novamente
```

**Verificações:**
- ✓ Parecer anterior desaparece
- ✓ Novo parecer é salvo
- ✓ Data atualiza
- ✓ Status permanece ✓

---

## Teste 7: Limpeza de Dados

### Step-by-Step
```
1. demo.html
2. Clique "Limpar Tudo (Reset)"
3. Confirme no popup
```

**Verificações:**
- ✓ localStorage vazio
- ✓ Página recarrega
- ✓ Stats voltam a 0
- ✓ index.html vazio

---

## Teste 8: Console Debug

### Ver Dados Armazenados
```
1. Abra Console (F12)
2. Digite: localStorage
3. Expanda e veja todos os items
```

**Deverá ver:**
```
atendimento_AT-1234567890: {...}
matrizResultado_AT-1234567890: {...}
pareceres_setores: {...}
atendimentoAtivo: "AT-1234567890"
```

### Verificar Integridade
```
1. Console: JSON.parse(localStorage.getItem('atendimento_...'))
2. Veja todos os campos corretamente preenchidos
```

---

## ✅ Checklist Final

### UI/UX
- [ ] Sidebar navegação funciona
- [ ] Botões redirecionam corretamente
- [ ] Campos obrigatórios validam
- [ ] Alerts aparecem nos momentos corretos
- [ ] Cores indicam status corretamente

### Dados
- [ ] Atendimento salvo em localStorage
- [ ] Matriz salva e calculada corretamente
- [ ] Pareceres persistem corretamente
- [ ] Pre-preenchimento funciona
- [ ] Dados não são perdidos ao navegar

### Fluxo
- [ ] Risco alto → setores aparecem
- [ ] Risco médio/baixo → sem setores
- [ ] Redirecionamento automático funciona
- [ ] Status atualiza em tempo real
- [ ] Fila ordena por data

### Performance
- [ ] Página carrega rápido
- [ ] Sem travamentos
- [ ] localStorage sob controle
- [ ] Sem memory leaks

---

## 🐛 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Dados não salvam | Cookies/localStorage habilitados? |
| Alertas não aparecem | Bloquear alertas? Ativar JS popup |
| Dropdown vazio | localStorage.getItem('pareceres_setores') deve existir |
| Status não atualiza | Refresque F5 ou aguarde 30s |
| Atendimento não aparece na fila | Verifique se foi salvo: F12 → localStorage |

---

## 💡 Dicas de Teste

1. **Teste com dados reais** - Use nomes/matrículas reais quando possível
2. **Teste em múltiplos navegadores** - Chrome, Firefox, Edge, Safari
3. **Teste em Mobile** - Responsive design importante
4. **Teste com dados antigos** - localStorage acumula dados com tempo
5. **Teste limpeza** - Certifique de limpar após testes massivos

---

## 📊 Relatório de Teste

Template:
```
Data do Teste: ___/___/______
Navegador: Chrome / Firefox / Edge / Safari
Sistema: Windows / Mac / Linux

✓ Teste 1: Fluxo Completo
  - Status: PASSOU / FALHOU
  - Observações: _______________

✓ Teste 2: Risco Médio
  - Status: PASSOU / FALHOU
  - Observações: _______________

[...]

Resultado Final: APROVADO / REPROVADO
Observações Gerais: _______________
```

---

**Última Atualização:** 23/03/2026
**Versão do Sistema:** 1.0
