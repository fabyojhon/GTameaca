// ═════════════════════════════════════════════════════════════════════════════
// FUNÇÕES UTILITÁRIAS COMPARTILHADAS
// ═════════════════════════════════════════════════════════════════════════════

// Mapa de emojis por canal
const CANAL_EMOJIS = {
    'Telefone': '☎️',
    'Mensagem': '✉️',
    'Presencial': '👤',
    'Ouvidoria': '📢',
    'Outros': '🔗'
};

// Obter canal de um atendimento
function obterCanalAtendimento(atendId) {
    try {
        const dados = JSON.parse(localStorage.getItem('atendimento_' + atendId) || '{}');
        return dados.canal || 'Telefone';
    } catch (e) {
        return 'Telefone';
    }
}

// Obter emoji de um canal
function obterEmoji(canal) {
    return CANAL_EMOJIS[canal] || '🔗';
}

// Formatar exibição do canal
function formatarCanal(canal) {
    return obterEmoji(canal) + ' ' + canal;
}

// Gerar ID de atendimento no formato YYYYMMDDSS
// Exemplo: 2025032301 (ano 2025, mês 03, dia 23, sequência 01)
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

// ═════════════════════════════════════════════════════════════════════════════
// LOGIN GLOBAL DE ASSESSOR
// ═════════════════════════════════════════════════════════════════════════════

function solicitarMatriculaAssessor(event) {
    if (event) event.preventDefault();
    let modal = document.getElementById('globalLoginModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'globalLoginModal';
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;">
                <div style="background:#fff;padding:2rem;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);max-width:350px;width:100%;text-align:center;">
                    <h3 style="margin-top:0;color:#1e293b;">Login do Assessor</h3>
                    <p style="font-size:0.9rem;color:#64748b;margin-bottom:1.5rem;">Digite sua matrícula para registrar os atendimentos em seu nome.</p>
                    <input type="text" id="globalLoginInput" placeholder="Ex: F1234567" style="width:100%;padding:0.75rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:1rem;box-sizing:border-box;font-size:1rem;color:#0f172a;" autofocus>
                    <div style="display:flex;gap:1rem;justify-content:center;">
                        <button onclick="document.getElementById('globalLoginModal').style.display='none'" style="flex:1;padding:0.6rem 1rem;border:1px solid #cbd5e1;background:#fff;color:#475569;border-radius:4px;cursor:pointer;font-weight:600;">Cancelar</button>
                        <button onclick="salvarAssessorGlobal()" style="flex:1;padding:0.6rem 1rem;border:none;background:#3b82f6;color:#fff;border-radius:4px;cursor:pointer;font-weight:600;">Acessar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('globalLoginInput').value = localStorage.getItem('assessorLigado') || '';
    modal.style.display = 'block';
}

function salvarAssessorGlobal() {
    const mat = document.getElementById('globalLoginInput').value.trim();
    if (mat) {
        localStorage.setItem('assessorLigado', mat);
        document.getElementById('globalLoginModal').style.display = 'none';
        atualizarSidebarAssessor();
        // Atualizar também na página de manifestações se estiver aberta
        const regAssessor = document.getElementById('reg-assessor');
        if (regAssessor && regAssessor.innerText === 'Fxxxxxxx') {
             regAssessor.innerText = mat;
        }
    } else {
        alert('Por favor, informe a matrícula.');
    }
}

function atualizarSidebarAssessor() {
    const assessor = localStorage.getItem('assessorLigado') || 'Fxxxxxxx';
    const els = document.querySelectorAll('.sidebar-assessor-text');
    els.forEach(el => el.textContent = assessor);
}

document.addEventListener('DOMContentLoaded', atualizarSidebarAssessor);

// ═════════════════════════════════════════════════════════════════════════════
// GERENCIADOR DE BANCO DE DADOS LOCAL
// ═════════════════════════════════════════════════════════════════════════════

class GerenciadorDados {
    constructor() {
        this.chaveAtualAtendimento = 'atendimentoId';
        this.intervaloAutoSave = 30000; // 30 segundos
        this.iniciarAutoSave();
    }

    iniciarAutoSave() {
        setInterval(() => {
            this.criarBackup();
        }, this.intervaloAutoSave);
    }

    salvarAtendimento(id, dados) {
        try {
            localStorage.setItem('atendimento_' + id, JSON.stringify(dados));
            localStorage.setItem(this.chaveAtualAtendimento, id);
            return true;
        } catch(e) {
            console.error('❌ Erro ao salvar atendimento:', e);
            return false;
        }
    }

    obterAtendimento(id) {
        try {
            const dados = localStorage.getItem('atendimento_' + id);
            return dados ? JSON.parse(dados) : null;
        } catch(e) {
            console.error('❌ Erro ao recuperar atendimento:', e);
            return null;
        }
    }

    salvarMatriz(id, dados) {
        try {
            localStorage.setItem('matrizResultado_' + id, JSON.stringify(dados));
            return true;
        } catch(e) {
            console.error('❌ Erro ao salvar matriz:', e);
            return false;
        }
    }

    obterMatriz(id) {
        try {
            const dados = localStorage.getItem('matrizResultado_' + id);
            return dados ? JSON.parse(dados) : null;
        } catch(e) {
            console.error('❌ Erro ao recuperar matriz:', e);
            return null;
        }
    }

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
            console.error('❌ Erro ao salvar pareceres:', e);
            return false;
        }
    }

    obterPareceres(id) {
        try {
            const chave = 'pareceres_' + id;
            const dados = localStorage.getItem(chave);
            if (!dados) return {};
            const parsed = JSON.parse(dados);
            return parsed.dados || {};
        } catch(e) {
            console.error('❌ Erro ao recuperar pareceres:', e);
            return {};
        }
    }

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
            this.limparBackupsAntigos(atendId, 5);

            return true;
        } catch(e) {
            console.error('❌ Erro ao criar backup:', e);
            return false;
        }
    }

    limparBackupsAntigos(atendId, limite = 5) {
        const pattern = new RegExp(`^backup_${atendId}_`);
        const backups = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (pattern.test(chave)) {
                backups.push(chave);
            }
        }

        backups.sort((a, b) => {
            const tsA = parseInt(a.split('_').pop());
            const tsB = parseInt(b.split('_').pop());
            return tsB - tsA;
        });

        for (let i = limite; i < backups.length; i++) {
            localStorage.removeItem(backups[i]);
        }
    }

    restaurarBackup(chaveBackup) {
        try {
            const dados = JSON.parse(localStorage.getItem(chaveBackup));
            if (!dados) return false;

            const { atendimentoId, atendimento, matriz, pareceres } = dados;
            this.salvarAtendimento(atendimentoId, atendimento);
            this.salvarMatriz(atendimentoId, matriz);
            this.salvarPareceres(atendimentoId, pareceres);

            console.log('✅ Dados restaurados!');
            return true;
        } catch(e) {
            console.error('❌ Erro ao restaurar:', e);
            return false;
        }
    }

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

        return backups.sort((a, b) => new Date(b.data) - new Date(a.data));
    }

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

    exportarDados() {
        const dados = {};
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            dados[chave] = JSON.parse(localStorage.getItem(chave) || 'null');
        }
        return dados;
    }

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

    limparTudo() {
        if (confirm('⚠️ Tem certeza? TODOS os dados serão removidos!')) {
            localStorage.clear();
            sessionStorage.clear();
            location.reload();
            return true;
        }
        return false;
    }
}

// Instância global
const db = new GerenciadorDados();

// ═════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('risk-form');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const checkboxInput = document.getElementById('bo-registro');
    const resetBtn = document.getElementById('reset-btn');
    
    const totalScoreEl = document.getElementById('total-score');
    const riskCategoryEl = document.getElementById('risk-category');
    const treatmentTextEl = document.getElementById('treatment-text');
    const proofsTag = document.getElementById('proofs-tag');
    const boTag = document.getElementById('bo-tag');

    // Handle styling for selected parent container
    function updateSelectedStyles() {
        // Clear all selected classes
        document.querySelectorAll('.radio-option, .checkbox-option').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selected class to checked radios
        document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            radio.closest('.radio-option').classList.add('selected');
        });

        // Add selected class to checked checkbox (BO)
        if (checkboxInput.checked) {
            checkboxInput.closest('.checkbox-option').classList.add('selected');
        }

        // Add selected class to checked stalking checkboxes
        document.querySelectorAll('.stalking-input:checked').forEach(input => {
            input.closest('.checkbox-option').classList.add('selected');
        });
    }

    // Calculate score and update UI
    window.calculateRisk = function() {
        let scoreGeral = 0;
        let scoreStalking = 0;
        let allAxesAnswered = true;

        // 1. Cálculo dos Eixos Tradicionais (E1 a E6)
        for (let i = 1; i <= 6; i++) {
            const checked = document.querySelector(`input[name="e${i}"]:checked`);
            if (checked) {
                scoreGeral += parseInt(checked.value, 10);
            } else {
                allAxesAnswered = false;
            }
        }

        // 2. Cálculo do Módulo de Stalking (Checkboxes)
        const stalkingCheckboxes = document.querySelectorAll('.stalking-input:checked');
        stalkingCheckboxes.forEach(cb => {
            scoreStalking += parseInt(cb.value, 10);
        });

        const pontuacaoFinal = scoreGeral + scoreStalking;

        // 3. Lógica de Classificação Híbrida
        let categoria = "Aguardando...";
        let nivel = "neutral";
        let tratamento = "Preencha os eixos ao lado para ver o tratamento recomendado.";

        if (scoreStalking >= 11) {
            // Regra de Ouro: Perseguição Grave (conforme stalking.xlsx)
            categoria = "Grave Ameaça com Perseguição";
            nivel = "high";
            tratamento = "Acionamento IMEDIATO da USI e DIPES. Implementar medidas de ocultação estratégica e proteção funcional.";
        } else if (pontuacaoFinal >= 13) {
            categoria = "Grave Ameaça";
            nivel = "high";
            tratamento = "Análise de medidas policiais (BO) pela USI. Orientação cautelar e procedimento interno de proteção.";
        } else if (pontuacaoFinal >= 7 || scoreStalking >= 6) {
            categoria = "Baixo potencial / Risco Elevado";
            nivel = "medium";
            tratamento = "Análise de medidas pela Gepes. Registro de BO recomendado. Orientação padrão de segurança.";
        } else if (allAxesAnswered) {
            categoria = "Fala inadequada / Baixo Risco";
            nivel = "low";
            tratamento = "Orientação e mediação administrativa. Monitoramento via Gepes Atendimento.";
        }

        // 4. Atualização da UI
        const scoreEl = document.getElementById('total-score');
        const categoryEl = document.getElementById('risk-category');
        const treatmentEl = document.getElementById('treatment-text');

        if (scoreEl) animateValue(scoreEl, parseInt(scoreEl.innerText) || 0, pontuacaoFinal, 300);
        if (categoryEl) {
            categoryEl.innerText = categoria;
            categoryEl.className = 'badge ' + nivel;
        }
        if (treatmentEl) treatmentEl.innerText = tratamento;

        updateSelectedStyles();
        updateTags();
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    function updateCategory(total, scoreStalking) {
        riskCategoryEl.className = 'badge'; // Reset classes

        // Regra de Ouro: Stalking >= 11 ou Total >= 13 = Grave Ameaça
        if (scoreStalking >= 11 || total >= 13) {
            riskCategoryEl.innerText = scoreStalking >= 11 ? "Grave Ameaça com Perseguição" : "Grave Ameaça";
            riskCategoryEl.classList.add('high');
            treatmentTextEl.innerText = scoreStalking >= 11
                ? "Situação de grave risco com padrão de perseguição identificado. Acionar USI imediatamente, registrar BO, aplicar medidas cautelares de proteção e ativar protocolo interno de segurança ao funcionário."
                : "Análise de medidas policiais (registro de BO) a cargo da USI, orientação de medidas de segurança cautelares, realizar procedimento interno de proteção ao funcionário.";
        } else if (total >= 7 || scoreStalking >= 6) {
            riskCategoryEl.innerText = "Risco Elevado / Potencial Lesivo";
            riskCategoryEl.classList.add('medium');
            treatmentTextEl.innerText = "Análise de medidas policiais (registro de BO) a cargo da Gepes, orientação PADRÃO de medidas de segurança.";
        } else {
            riskCategoryEl.innerText = "Baixo Risco / Fala Inadequada";
            riskCategoryEl.classList.add('low');
            treatmentTextEl.innerText = "Orientação, mediação se for com colega.";
        }
    }

    function resetResultsUI() {
        riskCategoryEl.innerText = "Aguardando...";
        riskCategoryEl.className = 'badge';
        treatmentTextEl.innerText = "Preencha os eixos ao lado para ver o tratamento recomendado.";
    }

    function updateTags() {
        const proofChecked = document.querySelector('input[name="provas"]:checked');
        
        if (proofChecked) {
            proofsTag.style.display = 'inline-flex';
            proofsTag.innerText = `Provas: ${proofChecked.value}`;
        } else {
            proofsTag.style.display = 'none';
        }

        if (checkboxInput.checked) {
            boTag.style.display = 'inline-flex';
        } else {
            boTag.style.display = 'none';
        }
    }

    // Event Listeners
    radioInputs.forEach(input => {
        input.addEventListener('change', calculateRisk);
    });

    checkboxInput.addEventListener('change', calculateRisk);

    resetBtn.addEventListener('click', () => {
        form.reset();
        calculateRisk();
        totalScoreEl.innerText = "0";
        proofsTag.style.display = 'none';
        boTag.style.display = 'none';
        document.querySelectorAll('.radio-option, .checkbox-option').forEach(el => {
            el.classList.remove('selected');
        });
    });
});
