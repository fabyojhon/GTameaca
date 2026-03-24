# ⚡ QUICKSTART - Comece em 2 Minutos

## 🚀 Opção 1: Demo Automática (MAIS RÁPIDO)

```
1. Abra: demo.html
2. Clique: "Criar Demo: Risco ALTO (13+ pts)"
3. Pronto! Você está em manifestacoes.html
4. Selecione setor "USI"
5. Preencha parecer
6. Envie e continue com outros setores
7. Volte para index.html para ver na fila
```

**⏱️ Tempo: 2 minutos**

---

## 🎯 Opção 2: Fluxo Completo (APRENDER)

### Passo 1: Abrir Sistema
```
Abra: index.html → Veja fila de atendimentos
```

### Passo 2: Novo Atendimento
```
Clique: "Registrar atendimento"
Abra: identificacao.html
Preencha:
  - Nome do relator
  - Matrícula
  - Telefone
  - Unidade
  - Relato dos fatos
Clique: "MATRIZ DE RISCO"
```

### Passo 3: Avaliar Risco
```
Abra: matriz.html
Preencha: 6 eixos de avaliação
Observe: Score calculate em tempo real
Se score ≥ 13: Sistema ativa setores
Clique: "Acessar Manifestação"
```

### Passo 4: Atribuir Pareceres
```
Abra: manifestacoes.html
Veja: Dados pré-preenchidos
Dropdown: Selecione setor (USI, Gepes, etc)
Preencha:
  - Parecer / Análise
  - Medidas Tomadas
Clique: "Enviar Parecer"
Status: Muda para ✓
Repita: Para todos os setores
```

### Passo 5: Acompanhar na Fila
```
Clique: "Página Inicial"
Abra: index.html
Veja: Atendimento na fila com status
Status muda conforme você preenche
```

**⏱️ Tempo: ~10 minutos**

---

## 📊 Cenários Rápidos

### Teste 1: Criar 3 Atendimentos
```
1. demo.html → "Risco BAIXO"
2. demo.html → "Risco MÉDIO"
3. demo.html → "Risco ALTO"
4. index.html → Veja os 3 na fila
```
**Resultado esperado:** 3 linhas com status diferentes

### Teste 2: Completar um Atendimento
```
1. demo.html → "Risco ALTO"
2. Preencha parecer USI
3. Preencha parecer Gepes Assessor.
4. Preencha parecer Gepes Espec.
5. Preencha parecer Supers
6. index.html → Status "Finalizado"
```
**Resultado esperado:** Todos badges ✓ em verde

### Teste 3: Sincronização
```
1. Abra 2 abas: demo.html + index.html
2. Na primeira: Crie atendimento
3. Na segunda: Refresque
4. Novo atendimento aparece
```
**Resultado esperado:** Sincronização offline

---

## 🎨 Interface

### manifestacoes.html
```
┌─────────────────────────────────────────┐
│ Detalhar Denúncia: AT-xxxxxx            │
├─────────────────────────────────────────┤
│ Dados pré-preenchidos:
│ • Denúncia Nº: AT-xxxxx
│ • Classificação: Ameaça Grave
│ • Prazo: 1 dia
├─────────────────────────────────────────┤
│ Atribuir Parecer a: [USI ▼]
│ Status: 🟡○ USI, 🟡○ Gepes, ...
├─────────────────────────────────────────┤
│ Parecer (textarea):
│ [_________________________________]
│
│ Medidas Tomadas (textarea):
│ [_________________________________]
│
│ [Cancelar] [✓ Enviar Parecer]
└─────────────────────────────────────────┘
```

### index.html
```
┌──────────────────────────────────────────────────────┐
│ FILA DE ATENDIMENTOS                                 │
├──────────────────────────────────────────────────────┤
│ Nº    │ Cliente    │ Data  │ Status          │ Ação  │
│─────────────────────────────────────────────────────  │
│ 0001  │ João Silva │ 23/03 │ 🟢 Finalizado   │  >   │
│ 0002  │ Maria      │ 23/03 │ 🟡 Aguardando   │  >   │
│ 0003  │ Carlos     │ 23/03 │ 🟢 Analisado    │  >   │
└──────────────────────────────────────────────────────┘
```

---

## 🧹 Limpar Tudo

### Se Der Erro
```
Console (F12):
> localStorage.clear()
> sessionStorage.clear()
> location.reload()
```

### Ou Via Demo
```
demo.html → "Limpar Tudo (Reset)"
```

---

## 📚 Links Principais

| Página | Propósito |
|--------|-----------|
| [index.html](index.html) | Fila de atendimentos |
| [identificacao.html](identificacao.html) | Novo atendimento |
| [matriz.html](matriz.html) | Avaliar risco |
| [manifestacoes.html](manifestacoes.html) | Pareceres |
| [demo.html](demo.html) | Teste rápido |
| [index_docs.html](index_docs.html) | Documentação |

---

## ❓ Dúvidas Comuns

**P: Preciso de servidor?**
R: Não! Funciona 100% offline com localStorage.

**P: Onde estão os dados?**
R: Browser → localStorage (F12 → Application)

**P: Perdi os dados!**
R: Se limpou cache, perdeu. Use demo.html para recuperar.

**P: Como testo?**
R: Siga GUIDE_DE_TESTE.md para 8 testes passo-a-passo.

**P: Como customizo?**
R: Abra CSS em cada arquivo for cores/layout.

---

## 🎯 Próximas Ações

Após testar:

1. **Ler documentação:** FLUXO_INTEGRADO.md
2. **Executar testes:** GUIDE_DE_TESTE.md
3. **Explorar código:** Modifique CSS/JS conforme necessário
4. **Reportar bugs:** Note erros encontrados

---

**Pronto? Comece em demo.html!** 🚀
