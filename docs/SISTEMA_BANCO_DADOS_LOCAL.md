# 💾 Sistema de Banco de Dados Local - G.T. Ameaça

## 📊 Comparação: localStorage vs IndexedDB

### localStorage (ATUAL)
```
✅ Vantagens:
  • Simples de usar
  • Não requer async
  • Aceita strings JSON
  • Limite: ~5-10MB
  
❌ Desvantagens:
  • Limite de tamanho pequeno
  • Sincronamente bloqueia UI
  • Sem índices ou queries
  • Performance degrada com muitos dados
```

### IndexedDB (RECOMENDADO)
```
✅ Vantagens:
  • Limite: ~50GB+ por domínio
  • Async (não bloqueia UI)
  • Objetos nativos (sem JSON)
  • Índices e queries poderosas
  • Transações atômicas
  • Melhor performance em grande volume
  
⚠️ Desvantagens:
  • Mais complexo de implementar
  • Curva de aprendizado maior
  • Requer promessas/async
```

---

## 🎯 RECOMENDAÇÃO: Sistema Híbrido

**localStorage** para dados recentes/sessão (rápido)  
**IndexedDB** para arquivo histórico/backup (persistência)

---

## 📝 PLANO DE IMPLEMENTAÇÃO

### Fase 1: Melhorias Imediatas (localStorage atual)
- ✅ Auto-save ao vivo de pareceres
- ✅ Validação/backup dos dados
- ✅ Badge visual de prazo na UI
- ✅ Mostrar data limite (risco → dias → data)

### Fase 2: IndexedDB (Futuro)
- [ ] Migração opcional para IndexedDB
- [ ] Sincronização híbrida
- [ ] Backup/restore automático

---

## 🔧 IMPLEMENTAÇÃO - FASE 1

### 1. Criar LocalDatabase.js (Gerenciador de Persistência)

```javascript
/**
 * Sistema de Persistência Aprimorado
 * Gerencia localStorage + backup + auto-save
 */

class GerenciadorDados {
    constructor() {
        this.chaveAtualAtendimento = 'atendimentoId';
        this.chavePareceres = 'pareceres_setores';
        this.chaveBackup = 'backup_completo';
        this.intervaloAutoSave = 30000; // 30 segundos
        this.iniciarAutoSave();
    }

    /**
     * AUTO-SAVE: Salvar dados periodicamente
     */
    iniciarAutoSave() {
        setInterval(() => {
            this.criarBackup();
        }, this.intervaloAutoSave);
    }

    /**
     * Salvar Atendimento
     */
    salvarAtendimento(id, dados) {
        try {
            localStorage.setItem('atendimento_' + id, JSON.stringify(dados));
            localStorage.setItem(this.chaveAtualAtendimento, id);
            return true;
        } catch(e) {
            console.error('Erro ao salvar atendimento:', e);
            return false;
        }
    }

    /**
     * Recuperar Atendimento
     */
    obterAtendimento(id) {
        try {
            const dados = localStorage.getItem('atendimento_' + id);
            return dados ? JSON.parse(dados) : null;
        } catch(e) {
            console.error('Erro ao recuperar atendimento:', e);
            return null;
        }
    }

    /**
     * Salvar Matriz de Risco
     */
    salvarMatriz(id, dados) {
        try {
            localStorage.setItem('matrizResultado_' + id, JSON.stringify(dados));
            return true;
        } catch(e) {
            console.error('Erro ao salvar matriz:', e);
            return false;
        }
    }

    /**
     * Obter Matriz de Risco
     */
    obterMatriz(id) {
        try {
            const dados = localStorage.getItem('matrizResultado_' + id);
            return dados ? JSON.parse(dados) : null;
        } catch(e) {
            console.error('Erro ao recuperar matriz:', e);
            return null;
        }
    }

    /**
     * Salvar Pareceres de Setores (COM AUTO-SAVE)
     */
    salvarPareceres(id, pareceres) {
        try {
            const chave = 'pareceres_' + id;
            localStorage.setItem(chave, JSON.stringify({
                atendimentoId: id,
                dados: pareceres,
                dataUltimoSalvo: new Date().toISOString(),
                versao: 1
            }));
            console.log('✅ Pareceres salvos: ' + id);
            return true;
        } catch(e) {
            console.error('Erro ao salvar pareceres:', e);
            return false;
        }
    }

    /**
     * Obter Pareceres de Setores
     */
    obterPareceres(id) {
        try {
            const chave = 'pareceres_' + id;
            const dados = localStorage.getItem(chave);
            if (!dados) return {};
            const parsed = JSON.parse(dados);
            return parsed.dados || {};
        } catch(e) {
            console.error('Erro ao recuperar pareceres:', e);
            return {};
        }
    }

    /**
     * Criar BACKUP completo de um atendimento
     */
    criarBackup(id = null) {
        try {
            const atendId = id || localStorage.getItem(this.chaveAtualAtendimento);
            if (!atendId) return false;

            const backup = {
                atendimentoId: atendId,
                atendimento: this.obterAtendimento(atendId),
                matriz: this.obterMatriz(atendId),
                pareceres: this.obterPareceres(atendId),
                dataCriacao: new Date().toISOString(),
                versao: 1
            };

            const chaveBackup = 'backup_' + atendId + '_' + Date.now();
            localStorage.setItem(chaveBackup, JSON.stringify(backup));

            // Manter apenas últimos 5 backups
            this.limparBackupsAntigos(atendId, 5);

            return true;
        } catch(e) {
            console.error('Erro ao criar backup:', e);
            return false;
        }
    }

    /**
     * Limpar backups antigos
     */
    limparBackupsAntigos(atendId, limite = 5) {
        const pattern = new RegExp(`^backup_${atendId}_`);
        const backups = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (pattern.test(chave)) {
                backups.push(chave);
            }
        }

        // Ordenar por timestamp (no nome chave)
        backups.sort((a, b) => {
            const tsA = parseInt(a.split('_').pop());
            const tsB = parseInt(b.split('_').pop());
            return tsB - tsA; // Decrescente (mais recentes primeiro)
        });

        // Remover os mais antigos
        for (let i = limite; i < backups.length; i++) {
            localStorage.removeItem(backups[i]);
            console.log('🗑️ Backup antigo removido: ' + backups[i]);
        }
    }

    /**
     * Restaurar de um BACKUP
     */
    restaurarBackup(chaveBackup) {
        try {
            const dados = JSON.parse(localStorage.getItem(chaveBackup));
            if (!dados) return false;

            const { atendimentoId, atendimento, matriz, pareceres } = dados;

            this.salvarAtendimento(atendimentoId, atendimento);
            this.salvarMatriz(atendimentoId, matriz);
            this.salvarPareceres(atendimentoId, pareceres);

            alert('✅ Dados restaurados com sucesso!');
            return true;
        } catch(e) {
            console.error('Erro ao restaurar backup:', e);
            alert('❌ Erro ao restaurar backup!');
            return false;
        }
    }

    /**
     * Listar todos os backups de um atendimento
     */
    listarBackups(id) {
        const pattern = new RegExp(`^backup_${id}_`);
        const backups = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (pattern.test(chave)) {
                try {
                    const dados = JSON.parse(localStorage.getItem(chave));
                    backups.push({
                        chave: chave,
                        data: dados.dataCriacao,
                        tamanho: localStorage.getItem(chave).length
                    });
                } catch(e) {}
            }
        }

        return backups.sort((a, b) => 
            new Date(b.data) - new Date(a.data)
        );
    }

    /**
     * Obter estatísticas de armazenamento
     */
    obterEstatisticas() {
        let atendimentos = 0;
        let matrizes = 0;
        let pareceres = 0;
        let backups = 0;
        let tamanhoTotal = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);
            const tamanho = valor.length;
            tamanhoTotal += tamanho;

            if (chave.startsWith('atendimento_')) atendimentos++;
            else if (chave.startsWith('matrizResultado_')) matrizes++;
            else if (chave.startsWith('pareceres_')) pareceres++;
            else if (chave.startsWith('backup_')) backups++;
        }

        return {
            atendimentos,
            matrizes,
            pareceres,
            backups,
            tamanhoTotal,
            tamanhoMB: (tamanhoTotal / 1024 / 1024).toFixed(2)
        };
    }

    /**
     * EXPORTAR todos os dados como JSON
     */
    exportarDados() {
        const dados = {};
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            dados[chave] = JSON.parse(localStorage.getItem(chave) || 'null');
        }
        return dados;
    }

    /**
     * IMPORTAR dados de JSON
     */
    importarDados(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const dados = JSON.parse(e.target.result);
                    let contador = 0;
                    for (const chave in dados) {
                        localStorage.setItem(chave, JSON.stringify(dados[chave]));
                        contador++;
                    }
                    console.log(`✅ ${contador} itens importados`);
                    resolve(contador);
                } catch(err) {
                    reject(err);
                }
            };
            reader.readAsText(arquivo);
        });
    }

    /**
     * LIMPAR todos os dados
     */
    limparTudo() {
        if (confirm('⚠️ Tem certeza? TODOS os dados serão removidos!')) {
            localStorage.clear();
            sessionStorage.clear();
            alert('🗑️ Dados completamente limpos!');
            location.reload();
            return true;
        }
        return false;
    }
}

// Instância global
const db = new GerenciadorDados();
```

---

## 🎨 Melhorias na UI - Prazo com Cor

### Em manifestacoes.html - renderizarParecer()

```javascript
// Adicionar APÓS o prazoInfo (linha ~1090)

// Calculado: Data limite
const dataAtualizado = new Date();
dataAtualizado.setDate(dataAtualizado.getDate() + setor.prazo);

const dataLimiteInfo = document.createElement('div');
dataLimiteInfo.className = 'parecer-info-item';
const dataLimiteLabel = document.createElement('div');
dataLimiteLabel.className = 'parecer-info-label';
dataLimiteLabel.textContent = 'Data Limite';
const dataLimiteValue = document.createElement('div');
dataLimiteValue.className = 'parecer-info-value parecer-data-limite';
dataLimiteValue.textContent = dataAtualizado.toLocaleDateString('pt-BR');

// Cor baseada em risco
if (setor.prazo === 1) {
    dataLimiteValue.style.color = '#991b1b'; // Vermelho urgente
    dataLimiteValue.style.fontWeight = 'bold';
} else if (setor.prazo === 3) {
    dataLimiteValue.style.color = '#d97706'; // Laranja
} else {
    dataLimiteValue.style.color = '#059669'; // Verde
}

dataLimiteInfo.appendChild(dataLimiteLabel);
dataLimiteInfo.appendChild(dataLimiteValue);
infoDiv.appendChild(dataLimiteInfo);
```

---

## 🚀 AUTO-SAVE EM TEMPO REAL

### Adicionar aos textareas em manifestacoes.html

```javascript
// APÓS criação dos textareas (linha ~1130-1140)

parecerTextarea.addEventListener('change', () => {
    salvarPareceresLocal(setorId);
});

medidasTextarea.addEventListener('change', () => {
    salvarPareceresLocal(setorId);
});

setoresSelect.addEventListener('change', () => {
    salvarPareceresLocal(setorId);
});

// Função de auto-save
function salvarPareceresLocal(setorId) {
    const atendId = sessionStorage.getItem('atendimentoId') || 
                    localStorage.getItem('atendimentoAtivo');
    
    if (!atendId) return;

    const textoElement = document.getElementById('parecer-texto-' + setorId);
    const medidasElement = document.getElementById('medidas-texto-' + setorId);
    
    const parecerData = {
        respondido: false, // Não marca como respondido até envio
        texto: (textoElement && textoElement.value) || '',
        medidas: (medidasElement && medidasElement.value) || '',
        dataEdicao: new Date().toISOString()
    };

    // Usar novo gerenciador
    db.salvarPareceres(atendId, {
        ...pareceres,
        [setorId]: parecerData
    });

    console.log('💾 Auto-save: ' + setorId);
}
```

---

## 📋 Checklist de Persistência

```
☐ Auto-save a cada mudança de campo (30s)
☐ Backup automático criado
☐ Dados recuperáveis se página fecha
☐ Prazo exibido com cores (1 dia = vermelho)
☐ Data limite calculada automaticamente
☐ Histórico de backups mantido (últimos 5)
☐ Função exportar/importar JSON
☐ Estatísticas de armazenamento disponíveis
```

---

## 🔄 Fluxo de Persistência Melhorado

```
┌──────────────────────────────────────┐
│ User digita parecer                  │
└─────────────┬────────────────────────┘
              │ onChange event
              ▼
┌──────────────────────────────────────┐
│ Auto-save para localStorage          │
│ db.salvarPareceres(id, dados)       │
└─────────────┬────────────────────────┘
              │ A cada 30s
              ▼
┌──────────────────────────────────────┐
│ Criar backup completo                │
│ db.criarBackup()                     │
└─────────────┬────────────────────────┘
              │ Se voltarn para identificacao
              ▼
┌──────────────────────────────────────┐
│ Dados recuperados automaticamente     │
│ selecionarSetor() recarrega          │
└──────────────────────────────────────┘
```

---

## 📊 Estrutura de Dados Melhorada

```javascript
// localStorage agora tem:

atendimento_[ID] = {
    id: "AT-001",
    nome: "Paulo",
    canal: "Telefone",
    // ... dados
}

matrizResultado_[ID] = {
    pontuacao: 15,
    classificacao: "Ameaça Grave",
    // ... dados
}

pareceres_[ID] = {
    atendimentoId: "AT-001",
    dados: {
        'usi': {
            respondido: true,
            texto: "...",
            medidas: "...",
            dataEdicao: "2026-03-23T..."
        }
    },
    dataUltimoSalvo: "2026-03-23T...",
    versao: 1
}

backup_[ID]_[TIMESTAMP] = {
    atendimentoId: "AT-001",
    atendimento: { ... },
    matriz: { ... },
    pareceres: { ... },
    dataCriacao: "...",
    versao: 1
}
```

---

## 🎯 Próximos Passos

1. ✅ Implementar GerenciadorDados em script.js
2. ✅ Adicionar auto-save em manifestacoes.html
3. ✅ Adicionar cores e datas limites
4. ✅ Testar persistência entre páginas
5. ⏳ (Futuro) Implementar IndexedDB opcional

---

**Status:** 📝 Pronto para implementação | **Versão:** 2.0
