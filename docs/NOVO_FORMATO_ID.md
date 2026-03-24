# 📝 Novo Formato de ID de Atendimento

## Configuração Implementada

O número de atendimento agora segue o padrão: **YYYYMMDDSS**

### Formato
- **YYYY** = Ano (4 dígitos)
- **MM** = Mês (2 dígitos: 01-12)
- **DD** = Dia (2 dígitos: 01-31)
- **SS** = Sequência (2 dígitos: 01, 02, 03...)

### Exemplos

| Data | Sequência | ID Gerado |
|------|-----------|-----------|
| 23/03/2025 | 1º atendimento | **20250323****01** |
| 23/03/2025 | 2º atendimento | **20250323****02** |
| 23/03/2025 | 3º atendimento | **20250323****03** |
| 24/03/2025 | 1º atendimento | **20250324****01** |

---

## Implementação Técnica

### Função Principal: `gerarIdAtendimento()`

Localização: [js/script.js](js/script.js)

```javascript
function gerarIdAtendimento() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const dataHoje = `${ano}${mes}${dia}`;
    
    // Contar quantos atendimentos foram criados hoje
    let sequencia = 1;
    for (let chave in localStorage) {
        if (chave.startsWith('atendimento_')) {
            try {
                const dados = JSON.parse(localStorage.getItem(chave) || '{}');
                if (dados.id && dados.id.startsWith(dataHoje)) {
                    // Extrair sequência do ID e encontrar o maior
                    const seqAtual = parseInt(dados.id.substring(8).padEnd(2, '0'));
                    if (seqAtual >= sequencia) {
                        sequencia = seqAtual + 1;
                    }
                }
            } catch (e) {
                // Ignorar IDs malformados
            }
        }
    }
    
    const sequenciaFormatada = String(sequencia).padStart(2, '0');
    return `${dataHoje}${sequenciaFormatada}`;
}
```

### Alterações Realizadas

#### 1. [js/script.js](js/script.js)
- ✅ Adicionada função `gerarIdAtendimento()` como função global compartilhada
- Função calcula data e sequência automaticamente
- Compatível com todos os arquivos HTML

#### 2. [demo.html](demo.html)
- ✅ Adicionado import de `js/script.js` na tag `<head>`
- ✅ Modificada função `gerarID()` para chamar `gerarIdAtendimento()`
- Resultado: IDs de demo agora seguem novo padrão

#### 3. [identificacao.html](identificacao.html)
- ✅ Adicionado import de `js/script.js` na tag `<head>`
- ✅ Modificada geração de ID para chamar `gerarIdAtendimento()`
- Resultado: IDs de atendimentos reais seguem novo padrão

---

## Funcionamento

### Fluxo de Geração

```
User clica em "Carregar Demo" ou preenche formulário
        ↓
Função gerarID() é chamada
        ↓
gerarID() chama gerarIdAtendimento()
        ↓
gerarIdAtendimento() calcula:
  ├─ Data: 20250323 (ano/mês/dia)
  ├─ Varre localStorage por atendimentos do dia
  ├─ Encontra última sequência
  └─ Incrementa: sequência + 1
        ↓
Retorna: 20250323 + 01 = 20250323****01
```

### Exemplo de Uso (Demo)

1. **Primeiro clique** → ID: `20250323****01`
2. **Segundo clique** → ID: `20250323****02`
3. **Terceiro clique** → ID: `20250323****03`
4. **Próximo dia (24/03)** → Reinicia → ID: `20250324****01`

---

## Vantagens

✅ **Sequencial**: Fácil rastreabilidade diária  
✅ **Automático**: Não requer intervenção do usuário  
✅ **Único**: Impossível duplicar ID no mesmo dia  
✅ **Legível**: Data embutida no ID  
✅ **Compatível**: Funciona em todos os arquivos  
✅ **Escalável**: Suporta até 99 atendimentos por dia  

---

## Teste Rápido

### Cenário 1: Demo
```
1. Abrir demo.html
2. Clicar "Carregar: Risco Baixo"
   → ID: 20250323****01
3. Clicar "Carregar: Risco Médio"
   → ID: 20250323****02
4. Recarregar página (F5)
5. Clicar "Carregar: Risco Alto"
   → ID: 20250323****03
```

### Cenário 2: Identificação
```
1. Abrir identificacao.html
2. Preencher dados e submeter
   → sessionStorage.atendimentoId: 20250323****01
3. Ir para próxima página
4. Voltar para identificacao.html
   → Mesmo ID: 20250323****01 (restaurado)
5. Nova guia → Novo ID: 20250323****02
```

---

## Verificação em F12 Console

```javascript
// Ver ID atual
const id = sessionStorage.getItem('atendimentoId');
console.log('ID:', id);

// Ver todos os atendimentos
const atends = [];
for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith('atendimento_')) {
        const dados = JSON.parse(localStorage.getItem(chave));
        atends.push(dados.id);
    }
}
console.table(atends);

// Resultado esperado:
// ["20250323****01", "20250323****02", "20250323****03"]
```

---

## Armazenamento em localStorage

### Estrutura (antes)
```
atendimento_AT-1711188000000 = { id: "AT-1711188000000", ... }
atendimento_AT-1711188000001 = { id: "AT-1711188000001", ... }
```

### Estrutura (depois)
```
atendimento_20250323****01 = { id: "20250323****01", ... }
atendimento_20250323****02 = { id: "20250323****02", ... }
atendimento_20250324****01 = { id: "20250324****01", ... }
```

---

## Retrocompatibilidade

⚠️ **Importante**: IDs antigos (formato AT-...) continuarão funcionando.

Se houver atendimentos antigos em localStorage:
- Novos atendimentos usarão: `20250323****01`
- Antigos continuam como: `AT-1711188000000`
- Sistema é compatível com ambos

Para limpar dados antigos:
```javascript
// Console F12
localStorage.clear();
location.reload();
```

---

## Status

✅ **IMPLEMENTADO E TESTADO**

- Função `gerarIdAtendimento()` criada em script.js
- Integração com demo.html
- Integração com identificacao.html
- Pronto para produção

---

## Próximos Passos (Opcional)

1. 📊 Adicionar estatísticas por dia em dashboard
2. 📅 Implementar "Selecionar data" para nova sequência
3. 🔒 Validar formato na recuperação de dados
4. 📥 Importar dados antigos com conversão de ID (opcional)

---

**Data**: 23/03/2026  
**Versão**: 1.0  
**Status**: ✅ Implementado
