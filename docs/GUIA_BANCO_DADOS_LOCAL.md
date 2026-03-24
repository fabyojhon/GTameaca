🚀 GUIA DE USO - Sistema de Banco de Dados Local Implementado

═══════════════════════════════════════════════════════════════════════════════

✅ O QUE FOI IMPLEMENTADO

1️⃣  Gerenciador de Dados (GerenciadorDados class)
    ├─ Auto-save a cada 30 segundos
    ├─ Backup automático dos dados
    ├─ Funções de salvar/recuperar/restaurar
    ├─ Gestão de múltiplos backups
    └─ Disponível em script.js como var global "db"

2️⃣  Prazo Visual Melhorado
    ├─ Badge colorido: Vermelho (1 dia), Laranja (3 dias), Verde (5+ dias)
    ├─ Mostra data limite (hoje + prazo dias) 
    ├─ Cores consistentes em todas exibições
    └─ Recalculado automaticamente por risco

3️⃣  Auto-Save em Manifestações
    ├─ Salva pareceres ao digitar (blur + change events)
    ├─ Permanece com "respondido: false" até envio final
    ├─ Recuperado ao voltar para manifestações
    └─ Backup criado a cada 30s

4️⃣  Fluxo de Persistência Completo
    └─ Identificação (salva) → Matriz (recupera) → Manifestações (auto-save)
       → Volta para atendimento → Dados intactos → Edit/Send

═══════════════════════════════════════════════════════════════════════════════

📝 COMO USAR - Passo a Passo

### Cenário: Criar atendimento, atribuir parecer e voltar

1. Acesse: identificacao.html
   └─ Preencha dados + selecione canal
   └─ Clique: "MATRIZ DE RISCO"

2. Em matriz.html
   └─ Preencha eixos (E1-E6)
   └─ Clique: Ir para Manifestações

3. Em manifestacoes.html
   ├─ Vê: ✅ Badge de Prazo com COR
   │    └─ "🟢 5 dia(s)" (se risco baixo)
   │    └─ "🟡 3 dia(s)" (se risco médio)
   │    └─ "🔴 1 dia(s)" (se risco alto)
   ├─ Vê: Data Limite (ex: "6 de abril de 2026")
   ├─ Selecione: Um setor no dropdown
   ├─ Digite: Parecer no textarea
   ├─ Observe: 💾 Auto-save no console
   ├─ Clique outro setor: Parecer anterior está salvo
   └─ Volta para Identificação/Matriz: Dados persistem

4. Volte para manifestacoes.html
   ├─ Todos pareceres digitados estão lá
   └─ Pode continuar editando

5. Ao enviar parecer
   ├─ Status muda para "respondido: true"
   ├─ Backup é criado automaticamente
   └─ Index.html mostra "Aguardando Parecer"

═══════════════════════════════════════════════════════════════════════════════

🎨 CORES DE PRAZO

┌───────────────┬──────────────┬─────────────────────────────┐
│ Prazo  │ Cor      │ Uso                             │
├────────┼──────────┼─────────────────────────────────┤
│ 1 dia  │ 🔴 Vermelho  │ USI - Urgente               │
│ 3 dias │ 🟡 Laranja   │ Gepes Assessoramento        │
│ 5 dias │ 🟢 Verde     │ Gepes Especializadas        │
│ 7 dias │ 🟢 Verde     │ Superintendências           │
└────────┴──────────┴─────────────────────────────────┘

Cores automáticas baseadas em risco da matriz!

═══════════════════════════════════════════════════════════════════════════════

💾 ESTRUTURA DE ARMAZENAMENTO

localStorage agora tem:

atendimento_[ID]
└─ { id, nome, canal, ... }

matrizResultado_[ID]
└─ { pontuacao, classificacao, ... }

pareceres_[ID]  ← NOVO COM AUTO-SAVE
└─ { 
    atendimentoId, 
    dados: {
        usi: { respondido, texto, medidas, dataEdicao },
        gepes-assessoramento: { ... },
        ...
    },
    dataUltimoSalvo,
    versao
}

backup_[ID]_[TIMESTAMP]  ← AUTO CRIADOS
└─ { atendimentoId, atendimento, matriz, pareceres, dataCriacao }

═══════════════════════════════════════════════════════════════════════════════

🔧 USAR O GERENCIADOR (console F12)

### Salvar Dados
db.salvarAtendimento(id, dados)
db.salvarMatriz(id, dados)
db.salvarPareceres(id, pareceres)

### Recuperar Dados
const atend = db.obterAtendimento(id)
const matriz = db.obterMatriz(id)
const parecer = db.obterPareceres(id)

### Backup e Restauração
db.criarBackup(id)  // Manual
db.listarBackups(id)  // Ver histórico
db.restaurarBackup(chave)  // Restaurar um

### Estatísticas
const stats = db.obterEstatisticas()
console.table(stats)

### Exportar e Importar
const dados = db.exportarDados()  // Retorna objeto
// ... salvar "dados" em JSON
db.importarDados(arquivo)  // Import arquivo

### Limpar Tudo
db.limparTudo()  // Com confirmação

═══════════════════════════════════════════════════════════════════════════════

⚡ AUTO-SAVE EM AÇÃO

Timeline de um parecer:

T0:00  - User abre manifestacoes.html
T0:05  - Clica em setor, começa a digitar parecer
T0:10  - Blur event → salvarPareceresLocal() → 💾
T0:30  - Timer auto-save → db.criarBackup() → 🔐
T1:00  - User continua editando em outro setor
T1:30  - Timer auto-save → db.criarBackup() → 🔐
T3:00  - User clica "Enviar Parecer"
T3:05  - Parecer respondido=true, backup criado
T3:10  - User volta para identificacao.html
T3:15  - User volta para manifestacoes.html
T3:20  - Pareceres restaurados automaticamente! ✅

═══════════════════════════════════════════════════════════════════════════════

🧪 TESTES DE VERIFICAÇÃO

□ TEST 1: Prazo com Cores
  1. Crie atendimento com score BAIXO (≤6)
  2. Vá para manifestações
  3. Vé badge: 🟢 Verde (5 dias) ✅
  
  1. Crie atendimento com score ALTO (≥13)
  2. Vá para manifestações
  3. Vé badge: 🔴 Vermelho (1 dia) ✅

□ TEST 2: Auto-Save Funcionando
  1. Abra Dev Tools (F12) → Console
  2. Vá para manifestações
  3. Selecione setor
  4. Digite algo no parecer
  5. Clique fora (blur event)
  6. Vé: "💾 Auto-save: usi" no console ✅
  7. Recarregue página (F5)
  8. Parecer ainda está lá! ✅

□ TEST 3: Backup Automático
  1. Abra Console (F12)
  2. Digite: db.obterEstatisticas()
  3. Vé "backups: 1" ou mais ✅

□ TEST 4: Persistência Entre Páginas
  1. Abra identificacao.html → Fillout → Matriz
  2. Em matriz: Fillout eixos → Manifestações
  3. Em manifestações: Fillout parecer → Sair
  4. Volte para manifestacoes.html
  5. Parecer digital AINDA ESTÁ ✅

□ TEST 5: Múltiplos Setores
  1. Selecione setor USI
  2. Digite parecer 1
  3. Blur → Auto-save
  4. Selecione setor Gepes
  5. Digite parecer 2
  6. Blur → Auto-save
  7. Volte para USI
  8. Parecer 1 AINDA ESTÁ ✅
  9. Volte para Gepes
  10. Parecer 2 AINDA ESTÁ ✅

═══════════════════════════════════════════════════════════════════════════════

🚨 TROUBLESHOOTING

❌ Problema: "Prazo não mostra cor"
✅ Solução: Recarregue página (F5) ou limpe cache (Ctrl+Shift+R)

❌ Problema: "Auto-save não aparece no console"
✅ Solução: Abra Console (F12), depois digit parecer, blur do textarea

❌ Problema: "Dados sumiram ao voltar"
✅ Solução: Check localStorage (F12 → Application), deve ter "pareceres_[ID]"

❌ Problema: "localStorage cheio"
✅ Solução: demo.html → "Limpar Tudo", ou  exportar dados antes

═══════════════════════════════════════════════════════════════════════════════

📊 MONITORAR ARMAZENAMENTO

Console F12:
```javascript
// Ver tudo  armazenado
db.obterEstatisticas()

// Exemplo output:
{
  atendimentos: 5,
  matrizes: 5,
  pareceres: 5,
  backups: 3,
  tamanhoTotal: 125432,
  tamanhoMB: "0.12"
}

// Backups de um atendimento
db.listarBackups('AT-001')

// Exportar tudo
const tudo = db.exportarDados()
console.table(tudo)
```

═══════════════════════════════════════════════════════════════════════════════

🎯 INDICADORES DE SUCESSO

✅ Ao editar parecer em manifestações:
   └─ "💾 Auto-save: [setorId]" aparece no console

✅ Ao voltar para page:
   └─ "✅ Pareceres restaurados do banco: [ID]" no console

✅ A cada 30 segundos:
   └─ Um backup é silenciosamente criado

✅ Ao enviar parecer:
   └─ "✓ Parecer enviado com sucesso!" alert

✅ Prazo visual:
   └─ Badges coloridas aparecem ao abrir parecer

═══════════════════════════════════════════════════════════════════════════════

📱 MOBILE / OFFLINE

localStorage funciona perfeitamente em mobile!

Offline:
- Dados salvam normalmente
- Ao online novamente, persistem

Logout/Fecha browser:
- Dados permanecem (localStorage persiste)
- Puxar dados ao revolver

═══════════════════════════════════════════════════════════════════════════════

🔮 FUTURO (Próximas Versões)

[ ] IndexedDB opcional para mais espaço
[ ] Sincronização com servidor
[ ] Compressão de dados
[ ] Criptografia de pareceres
[ ] Exportar PDF com parecer + dados
[ ] Dashboard de estatísticas

═══════════════════════════════════════════════════════════════════════════════

**Status:** ✅ IMPLEMENTADO E FUNCIONANDO
**Data:** 23/03/2026
**Versão:** 2.0
