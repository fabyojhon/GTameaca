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

        // Add selected class to checked checkbox
        if (checkboxInput.checked) {
            checkboxInput.closest('.checkbox-option').classList.add('selected');
        }
    }

    // Calculate score and update UI
    function calculateRisk() {
        let score = 0;
        let allAxesAnswered = true;

        // Sum up axes scores
        for (let i = 1; i <= 6; i++) {
            const checked = document.querySelector(`input[name="e${i}"]:checked`);
            if (checked) {
                score += parseInt(checked.value, 10);
            } else {
                allAxesAnswered = false;
            }
        }

        // Animate counter
        animateValue(totalScoreEl, parseInt(totalScoreEl.innerText) || 0, score, 300);

        // Update Category and Treatment
        if (!allAxesAnswered && score === 0) {
            resetResultsUI();
        } else {
            updateCategory(score);
        }

        // Update Tags
        updateTags();
        updateSelectedStyles();
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

    function updateCategory(score) {
        riskCategoryEl.className = 'badge'; // Reset classes
        
        if (score >= 0 && score <= 6) {
            riskCategoryEl.innerText = "Fala inadequada";
            riskCategoryEl.classList.add('low');
            treatmentTextEl.innerText = "Orientação, mediação se for com colega.";
        } else if (score >= 7 && score <= 12) {
            riskCategoryEl.innerText = "Baixo potencial lesivo de ameaça";
            riskCategoryEl.classList.add('medium');
            treatmentTextEl.innerText = "Análise de medidas policiais (registro de BO) a cargo da Gepes, orientação PADRÃO de medidas de segurança.";
        } else if (score >= 13 && score <= 18) {
            riskCategoryEl.innerText = "Grave ameaça";
            riskCategoryEl.classList.add('high');
            treatmentTextEl.innerText = "Análise de medidas policiais (registro de BO) a cargo da USI, orientação de medidas de segurança cautelares, realizar procedimento interno de proteção ao funcionário.";
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
