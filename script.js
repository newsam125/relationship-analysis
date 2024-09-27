let currentQuestion = 0;
const answers = [];

function loadQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById('test-container');
    container.innerHTML = `
        <div class="question">
            <h2>问题 ${currentQuestion + 1} / ${questions.length}</h2>
            <p>${question.text}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <label class="option">
                        <input type="radio" name="q${currentQuestion}" value="${option.score}">
                        ${option.text}
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    if (currentQuestion === questions.length - 1) {
        document.getElementById('submit-btn').style.display = 'block';
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        answers.push(selectedOption.value);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert('请选择一个选项');
    }
}

function showResult() {
    const result = calculateResult();
    const resultUrl = `result.html?D=${result.D}&I=${result.I}&S=${result.S}&C=${result.C}`;
    window.location.href = resultUrl;
}

function calculateResult() {
    const result = { D: 0, I: 0, S: 0, C: 0 };
    answers.forEach(answer => {
        result[answer]++;
    });
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const submitBtn = document.getElementById('submit-btn');
    const testContainer = document.getElementById('test-container');
    const intro = document.getElementById('intro');

    startBtn.addEventListener('click', () => {
        intro.style.display = 'none';
        testContainer.style.display = 'block';
        loadQuestion();
    });

    submitBtn.addEventListener('click', showResult);
    testContainer.addEventListener('click', (e) => {
        if (e.target.type === 'radio') {
            nextQuestion();
        }
    });
});