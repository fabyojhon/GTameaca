# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o Projeto

**G.T. Ameaça** é um sistema web 100% frontend para gestão de denúncias de ameaças dirigidas a funcionários da Gepes (Gestão de Pessoal - Banco Central). Usa `localStorage` para persistência, sem backend ou servidor.

## Como Executar

Sem build ou servidor necessário — abra os arquivos HTML diretamente no navegador:

- `index.html` — ponto de entrada principal (fila de atendimentos)
- `demo.html` — página de testes com criação de dados fictícios

Para desenvolvimento, use o Live Server do VS Code (configurado em `.vscode/launch.json`) ou simplesmente abra os arquivos no navegador.

## Arquitetura

### Fluxo de páginas (em ordem)

```
identificacao.html → matriz.html → manifestacoes.html → index.html (fila)
```

Cada página lê dados da anterior via `localStorage` e salva os próprios dados.

### Estrutura de dados (localStorage)

| Chave | Descrição |
|-------|-----------|
| `atendimento_[ID]` | Dados do relator (nome, matrícula, telefone, unidade, canal) |
| `matrizResultado_[ID]` | Score (0-18), classificação e nível de risco |
| `pareceres_setores` | Pareceres por setor (USI, Gepes Assessoramento, Gepes Especializadas, Superintendências) |
| `atendimentoAtivo` | ID do atendimento em edição (localStorage) |
| `atendimentoId` | ID da sessão atual (sessionStorage) |

O ID de atendimento segue o formato `YYYYMMDDSS` (ano+mês+dia+sequência do dia).

### Lógica de risco (matriz.html)

- **0–6 pts**: Fala inadequada → orientação
- **7–12 pts**: Baixo potencial → análise policial
- **≥ 13 pts**: Grave ameaça → encaminhamento obrigatório para setores (USI, etc.)

### Arquivos principais

| Arquivo | Papel |
|---------|-------|
| `js/script.js` | Utilitários compartilhados (formatação de canal, geração de ID, etc.) |
| `css/style.css` | Estilos globais (sidebar, badges de status, cores do sistema) |
| `index.html` | Fila de atendimentos com atualização automática a cada 30s |
| `identificacao.html` | Formulário de registro inicial |
| `matriz.html` | Avaliação de risco com 6 eixos (E1–E6) e score em tempo real |
| `manifestacoes.html` | Pareceres por setor com dropdown de seleção |
| `demo.html` | Criação de dados de teste com diferentes níveis de risco |

### Padrões de UI

- Sidebar consistente em todas as páginas com item ativo destacado em azul (`#3b82f6`)
- Status badges coloridos: laranja (pendente), verde (concluído), vermelho (sem dados)
- Paleta: azul primário, fundos cinza-claro, texto escuro (`#111827`)
- Fonte sem serifa (Inter/Roboto)

## GitHub e Sincronização Automática

**Repositório:** https://github.com/fabyojhon/GTameaca

O projeto possui um hook `post-commit` em `.git/hooks/post-commit` que faz `git push` automaticamente para `origin` após cada commit. Ou seja, **todo commit é enviado ao GitHub imediatamente**.

Para fazer commit e push de alterações:
```bash
git add <arquivos>
git commit -m "descrição da alteração"
# o push acontece automaticamente via hook
```

Se o push automático falhar (sem conexão, credenciais expiradas), faça manualmente:
```bash
git push origin main
```

## Limpeza de dados para testes

Via console do navegador (F12):
```javascript
localStorage.clear();      // limpa tudo
sessionStorage.clear();
```

Ou use o botão "Limpar Tudo (Reset)" em `demo.html`.
