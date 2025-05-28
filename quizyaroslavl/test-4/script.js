class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Кто изображён на портрете? Какой вклад он внёс в историю Ярославля?",
                "image": "./source/vopros (1).jpg",
                "answers": [
                    {"text": "Волков Фёдор Григорьевич"},
                    {"text": "Мельгунов Алексей Петрович"},
                    {"text": "Демидов Павел Григорьевич"},
                    {"text": "Вахрамеев Иван Александрович"}
                ],
                "correctIndex": 2,
                "explanation": "Демидов Павел Григорьевич (1738–1821) — учёный-натуралист, меценат и основатель Ярославского училища высших наук (Демидовского лицея)."
            },
            {
                "question": "Отгадайте загадку: Не холст, но расписан узором, Не щит, но оберегал дом. Огнём рождён, водой храним, Кто узнал меня? Говорим!",
                "image": "./source/vopros (2).jpg",
                "answers": [
                    {"text": "Окно"},
                    {"text": "Сосуд"},
                    {"text": "Изразец"},
                    {"text": "Печь"}
                ],
                "correctIndex": 2,
                "explanation": "Изразец — керамическая плитка для облицовки стен и печей, создаваемая обжигом (огнём) и защищаемая глазурью (водой)."
            },
            {
                "question": "Определите, о чём идёт речь: «…» - одна из самых стабильных денежных единиц, впервые появившаяся в 1534 году.",
                "image": "./source/vopros (3).jpg",
                "answers": [
                    {"text": "Грош"},
                    {"text": "Чешуйка"},
                    {"text": "Полушка"},
                    {"text": "Златник"}
                ],
                "correctIndex": 1,
                "explanation": "Чешуйка — древнерусская монета, получившая название из-за формы, похожей на рыбью чешую. Впервые появилась в 1534 году."
            },
            {
                "question": "Что изображено на гербе Ярославля?",
                "image": "",
                "answers": [
                    {"text": "Две золотые сельди"},
                    {"text": "Серебряный олень"},
                    {"text": "Золотая галера"},
                    {"text": "Медведь с секирой"}
                ],
                "correctIndex": 3,
                "explanation": "Медведь с секирой — исторический символ Ярославля, связанный с легендой об основании города."
            },
            {
                "question": "Какой год считается годом основания Ярославля?",
                "image": "./source/vopros (5).jpg",
                "answers": [
                    {"text": "1040"},
                    {"text": "1010"},
                    {"text": "1030"},
                    {"text": "1020"}
                ],
                "correctIndex": 1,
                "explanation": "Ярославль был основан в 1010 году князем Ярославом Мудрым, что стало ключевым событием в истории региона."
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
