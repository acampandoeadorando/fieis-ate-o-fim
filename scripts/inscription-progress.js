// Progress bar

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const inscriptionText = document.getElementById("inscription-text");

const inscription = {
    "color": {
        "0-24":  "bg-info",
        "25-49": "bg-success",
        "50-74": "bg-warning",
        "75-99": "bg-danger",
        "100":   "bg-danger-subtle"
    },
    "text": {
        "0-24":  "As inscrições já estão abertas! Faça já a sua inscrição!",
        "25-49": "Não perca tempo! Faça já a sua inscrição para não ficar de fora!",
        "50-74": "Mais da metade das vagas já foram preenchidas! Inscreva-se e garanta já a sua!",
        "75-99": "Corre! Faça já a sua inscrição antes que acabem as vagas!",
        "100":   "Todas as vagas já foram preenchidas! Se você não conseguiu fazer a sua inscrição, não desanime! Fique ligado nos próximos eventos."
    }
}

// Get inscriptions JSON
async function getInscriptions() {
    const url = "";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error.message);
    }
}

// Load inscriptions info
window.onload = async () => {
    const json = await getInscriptions();
    const inscriptions = Number.parseInt(json["inscriptions"]);

    if (!isNaN(inscriptions)) {
        const maxInscriptions = Number.parseInt(progress.getAttribute("aria-valuemax"));
        let percentage = inscriptions/maxInscriptions*100;
        if (percentage > 100) percentage = 100;

        removePlaceholders();
        if (percentage >= 0 && percentage <= 24) {
            setProgressInfo("0-24");
        } else if (percentage >= 25 && percentage <= 49) {
            setProgressInfo("25-49");
        } else if (percentage >= 50 && percentage <= 74) {
            setProgressInfo("50-74");
            progress.classList.add("progress-warning");
        } else if (percentage >= 75 && percentage <= 99) {
            setProgressInfo("75-99");
            progress.classList.add("progress-danger");
        } else {// percentage >= 100
            setProgressInfo("100");
            [...document.getElementsByClassName("inscription-button")].forEach(btn => {
                btn.classList.add("disabled");
                btn.setAttribute("aria-disabled", true);
                btn.setAttribute("tabindex", -1);
            });
        }
        
        progress.setAttribute("aria-valuenow", inscriptions);
        const barPercentage = `${percentage}%`;
        progressBar.style.width = barPercentage;
        progressBar.innerHTML = barPercentage;
    }
}

function removePlaceholders() {
    progress.classList.remove("placeholder-wave");
    [...progress.getElementsByClassName("placeholder")].forEach(e => e.remove());

    inscriptionText.classList.remove("placeholder-glow");
    inscriptionText.innerHTML = "";
}

function setProgressInfo(percentageRange) {
    progressBar.classList.add(inscription.color[percentageRange]);
    
    const paragraph = document.createElement("p");
    paragraph.innerHTML = inscription.text[percentageRange];
    inscriptionText.innerHTML = "";
    inscriptionText.appendChild(paragraph);
}