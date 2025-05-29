class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Тайна старинной иконы: Какое чудо хранится в музее? Представь, что ты ищешь волшебный артефакт с сияющим ликом. Что это?",
                "image": "",
                "answers": [
                    {"text": "Икона Николая Чудотворца с алмазами"},
                    {"text": "Икона Спаса Вседержителя XIII века"},
                    {"text": "Чудотворная икона Фёдоровской Божьей Матери"},
                    {"text": "Икона Троицы Андрея Рублёва"}
                ],
                "correctIndex": 1,
                "explanation": "Икона Спаса Вседержителя сохранила яркость красок за 800 лет, за что её называют «живой»."
            },
            {
                "question": "Загадка монастырской кухни: Что ели воины перед битвой? Если бы ты был богатырём, какое блюдо зарядило бы тебя силой?",
                "image": "",
                "answers": [
                    {"text": "Картофель с селёдкой"},
                    {"text": "Пельмени с мясом мамонта"},
                    {"text": "Бургеры с квасом"},
                    {"text": "Каша с топлёным маслом и мёдом"}
                ],
                "correctIndex": 3,
                "explanation": "Кашу варили в гигантских котлах, чтобы накормить весь отряд."
            },
            {
                "question": "Звериный код: Какое животное украшает герб музея? Разгадай символ: кто охраняет сокровища музея?",
                "image": "",
                "answers": [
                    {"text": "Двуглавый орёл"},
                    {"text": "Золотая рыбка"},
                    {"text": "Волк в короне"},
                    {"text": "Медведь с секирой"}
                ],
                "correctIndex": 3,
                "explanation": "Медведь с секирой — исторический символ Ярославля, изображённый на гербе музея."
            },
            {
                "question": "Что надевал на себя древнерусский воин?",
                "image": "./source/vopros (8).jpg",
                "answers": [
                    {"text": "Костюм космонавта"},
                    {"text": "Меховую жилетку"},
                    {"text": "Шапку и свитер"},
                    {"text": "Кольчугу и шлем"}
                ],
                "correctIndex": 3,
                "explanation": "Такие доспехи защищали воинов во время похода князя Игоря."
            },
            {
                "question": "Что защищали вооруженные стены Ярославля?",
                "image": "",
                "answers": [
                    {"text": "Город от наводнений"},
                    {"text": "Город от пожаров"},
                    {"text": "Город от врагов"},
                    {"text": "Город от разрушений"}
                ],
                "correctIndex": 2,
                "explanation": "Вооруженные стены Ярославля были построены для защиты города от врагов и нападений. Они обеспечивали безопасность жителей."
            },
            {
                "question": "Какой знаменитый медведь живёт в музее-заповеднике?",
                "image": "",
                "answers": [
                    {"text": "Медведица Ксюша"},
                    {"text": "Медведица Соня"},
                    {"text": "Медведица Настя"},
                    {"text": "Медведица Маша"}
                ],
                "correctIndex": 3,
                "explanation": "Медведица Маша — знаменитый живой символ музея-заповедника, содержащийся на его территории."
            }
        ];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizContainer = document.querySelector('.quiz-container');
        this.nextBtn = document.querySelector('.next-btn');
        this.progressElement = document.querySelector('.progress');

        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.loadQuestion();
    }

    loadQuestion() {
        this.quizContainer.innerHTML = '';
        const question = this.questions[this.currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.className = 'question-container';
        questionElement.innerHTML = `
            <img src="${question.image}" class="question-image">
            <div class="question-text">${question.question}</div>
            <div class="answers-container">
                ${question.answers.map((answer, index) => `
                    <div class="answer" data-index="${index}">
                        <div class="answer-text">${answer.text}</div>
                        <div class="feedback"></div>
                    </div>
                `).join('')}
            </div>
        `;

        questionElement.querySelectorAll('.answer').forEach(answer => {
            answer.addEventListener('click', (e) => this.handleAnswerClick(e));
        });

        this.quizContainer.appendChild(questionElement);
        this.updateProgress();
    }

    handleAnswerClick(e) {
        if (document.querySelector('.selected')) return;

        const selectedAnswer = e.currentTarget;
        const correctIndex = this.questions[this.currentQuestionIndex].correctIndex;
        const isCorrect = parseInt(selectedAnswer.dataset.index) === correctIndex;
        const feedback = selectedAnswer.querySelector('.feedback');

        selectedAnswer.classList.add(isCorrect ? 'correct' : 'incorrect', 'selected');

        if (!isCorrect) {
            const correctAnswer = this.questions[this.currentQuestionIndex].answers[correctIndex].text;
            const correctAnswerExplanation = this.questions[this.currentQuestionIndex].explanation;
            feedback.textContent = `Правильный ответ: ${correctAnswer}. ${correctAnswerExplanation}`;
        } else {
            this.score++;
            feedback.textContent = 'Правильно! Отличный ответ!';
        }

        this.nextBtn.style.display = 'block';
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.nextBtn.style.display = 'none';
            this.nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1
                ? 'Завершить тест!'
                : 'Перейти к следующему вопросу  ➡';
        } else {
            this.showResults();
        }
    }

    updateProgress() {
        this.progressElement.textContent = `Вопрос ${this.currentQuestionIndex + 1}/${this.questions.length}`;
    }

    showResults() {
        this.quizContainer.innerHTML = `
            <div class="results-container">
                <h2>Тест завершен! 🎉</h2>
                <p>Ваш результат: ${this.score}/${this.questions.length}</p>
                <p>${this.getFinalMessage()}</p>
                <a href='https://domaintest-byte.github.io/yarkremlin-quiz/quizyaroslavl/main/' style='color: black;'>Вернуться на главную страницу</a>
            </div>
        `;
        this.nextBtn.style.display = 'none';
    }

    getFinalMessage() {
        const percentage = (this.score / this.questions.length) * 100;
        if (percentage === 100) return 'Идеальный результат! Вы настоящий эксперт!';
        if (percentage > 70) return 'Хороший результат! Продолжайте в том же духе!';
        return 'Есть куда стремиться! Попробуйте пройти тест еще раз!';
    }
}

// Инициализация теста
document.addEventListener('DOMContentLoaded', () => new Quiz());
