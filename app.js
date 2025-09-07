document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const container = document.getElementById('app-container');
    let score = 0;
    let possibleIssues = [];
    let malocclusionType = 'No identificada';

    startButton.addEventListener('click', () => {
        container.innerHTML = '';
        showQuestion(0);
    });

    const questions = [
        {
            text: "¿Sientes que tus dientes superiores sobresalen mucho?",
            id: 'q1',
            value: 1,
            result: "Posible sobremordida"
        },
        {
            text: "¿Tus dientes están amontonados o torcidos?",
            id: 'q2',
            value: 1,
            result: "Apiñamiento dental"
        },
        {
            text: "¿Tienes espacios grandes entre tus dientes?",
            id: 'q3',
            value: 1,
            result: "Diastemas (espacios)"
        },
        {
            text: "¿Tus dientes de arriba no cubren a los de abajo al morder?",
            id: 'q4',
            value: 1,
            result: "Mordida abierta"
        }
    ];

    const malocclusions = [
        {
            name: "Apiñamiento",
            image: "apiñamiento.png",
            description: "Los dientes están torcidos o amontonados por falta de espacio."
        },
        {
            name: "Mordida Abierta",
            image: "mordida_abierta.jpg",
            description: "Hay un espacio visible entre los dientes superiores e inferiores al morder."
        },
        {
            name: "Sobremordida",
            image: "sobremordida.png",
            description: "Los dientes superiores cubren excesivamente a los inferiores."
        },
        {
            name: "Mordida Cruzada",
            image: "mordida_cruzada.png",
            description: "Algunos dientes superiores muerden por dentro de los inferiores."
        }
    ];

    function showQuestion(index) {
        if (index < questions.length) {
            const question = questions[index];
            container.innerHTML = `
                <h2>${question.text}</h2>
                <button onclick="handleAnswer(${index}, true)">Sí</button>
                <button onclick="handleAnswer(${index}, false)">No</button>
            `;
        } else {
            showMalocclusionComparison();
        }
    }

    window.handleAnswer = (index, answer) => {
        if (answer) {
            score += questions[index].value;
            possibleIssues.push(questions[index].result);
        }
        container.innerHTML = '';
        showQuestion(index + 1);
    };

    function showMalocclusionComparison() {
        let optionsHTML = '';
        malocclusions.forEach((m) => {
            optionsHTML += `
                <div class="malocclusion-option">
                    <h3>${m.name}</h3>
                    <img src="${m.image}" alt="${m.name}" onclick="selectMalocclusion('${m.name}')">
                    <p>${m.description}</p>
                </div>
            `;
        });

        container.innerHTML = `
            <h2>¿Cuál se parece más a tu mordida?</h2>
            <p>Mira las imágenes y elige la que más se asemeje a tu situación.</p>
            <div class="malocclusion-options-list">
                ${optionsHTML}
            </div>
            <button onclick="showFinalResults()">Omitir y ver resultados</button>
        `;
    }

    window.selectMalocclusion = (type) => {
        malocclusionType = type;
        showFinalResults();
    };

    function showFinalResults() {
        let issuesList = possibleIssues.length > 0 ? <ul>${possibleIssues.map(issue => `<li>${issue}</li>).join('')}</ul>` : <p>Basado en tu cuestionario, tu mordida parece estar bien alineada.</p>;

        container.innerHTML = `
            <h2>Resultados de tu Evaluación</h2>
            <div class="analysis-result">
                <h3>Resumen de Cuestionario</h3>
                <p>Tu puntuación es: ${score} de ${questions.length}.</p>
                <p><strong>Posibles problemas detectados:</strong></p>
                ${issuesList}
                <hr>
                <h3>Análisis Visual</h3>
                <p>La maloclusión que seleccionaste fue: <strong>${malocclusionType}</strong></p>
            </div>
            
            <p style="margin-top: 20px;"><strong>Recuerda:</strong> Esta evaluación es solo una guía. La única persona que puede determinar el tratamiento ideal para ti es un ortodoncista certificado.</p>
            
            <a href="https://t.dentalsoft.cl/reserva_online/src/public/index.php?clinica=YmQxMF9zYW5jaGV6eXZhc3F1ZXo=" target="_blank" class="appointment-button">Agendar una cita en nuestra clínica</a>
        `;
    }

});
