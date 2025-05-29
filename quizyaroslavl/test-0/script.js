class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Сияет, как солнце, из чистого злата, В храме хранится, свята и богата. В ней ладан и миро — для службы причастной, В руках у священника — символ прекрасный. Что это?",
                "image": "./source/vopros (1).jpg",
                "answers": [
                    {"text": "Кадило"},
                    {"text": "Дарохранительница"},
                    {"text": "Панагия"},
                    {"text": "Митра"}
                ],
                "correctIndex": 1,
                "explanation": "Дарохранительница — священный сосуд для хранения Святых Даров, традиционно изготавливаемый из драгоценных металлов."
            },
            {
                "question": "Какой материал НЕ использовался в создании экспонатов из коллекции «Сокровища Ярославля»?",
                "image": "./source/vopros (2).jpg",
                "answers": [
                    {"text": "Серебро"},
                    {"text": "Эмаль"},
                    {"text": "Пластик"},
                    {"text": "Драгоценные камни"}
                ],
                "correctIndex": 2,
                "explanation": "В коллекции используются только традиционные материалы: драгоценные металлы, эмаль и камни. Пластик не применялся."
            },
            {
                "question": "💍 + 👑 + ⛪️ = ? (Что объединяет эти предметы в экспозиции?)",
                "image": "",
                "answers": [
                    {"text": "Царские регалии"},
                    {"text": "Церковная утварь"},
                    {"text": "Ювелирные украшения"},
                    {"text": "Археологические находки"}
                ],
                "correctIndex": 1,
                "explanation": "Предметы символизируют церковную утварь: кольцо (💍) — епископское кольцо, корона (👑) — венец на икону, храм (⛪️) — богослужебные предметы."
            },
            {
                "question": "Техника украшения ювелирных изделий цветными стекловидными вставками (5 букв)",
                "image": "./source/vopros (4).jpg",
                "answers": [
                    {"text": "Чеканка"},
                    {"text": "Финифть"},
                    {"text": "Эмаль"},
                    {"text": "Скань"}
                ],
                "correctIndex": 2,
                "explanation": "Эмаль — техника нанесения цветных стекловидных масс на металлическую основу, широко представленная в ярославской коллекции."
            },
            {
                "question": "Ценное вещество, из которого изготовлены оклады икон (7 букв)",
                "image": "",
                "answers": [
                    {"text": "Платина"},
                    {"text": "Серебро"},
                    {"text": "Латунь"},
                    {"text": "Бронза"}
                ],
                "correctIndex": 1,
                "explanation": "Большинство окладов икон в экспозиции выполнены из серебра — традиционного материала для церковного искусства."
            },
            {
                "question": "В экспозиции представлены иконы XVII–XVIII веков",
                "image": "",
                "answers": [
                    {"text": "Верно"},
                    {"text": "Неверно"}
                ],
                "correctIndex": 0,
                "explanation": "Коллекция включает иконы XVII–XVIII веков — период расцвета ярославской иконописной школы."
            },
            {
                "question": "Все предметы выполнены в технике фрески",
                "image": "",
                "answers": [
                    {"text": "Верно"},
                    {"text": "Неверно"}
                ],
                "correctIndex": 1,
                "explanation": "Фреска — техника настенной живописи, в то время как в экспозиции представлены в основном металлические изделия и иконы на дереве."
            },
            {
                "question": "Среди экспонатов есть кресты, оклады, дароносицы",
                "image": "",
                "answers": [
                    {"text": "Верно"},
                    {"text": "Неверно"}
                ],
                "correctIndex": 0,
                "explanation": "Экспозиция включает различные виды церковной утвари: напрестольные кресты, оклады икон, дарохранительницы и дароносицы."
            },
            {
                "question": "Украшения в экспозиции изготовлены на Урале",
                "image": "",
                "answers": [
                    {"text": "Верно"},
                    {"text": "Неверно"}
                ],
                "correctIndex": 1,
                "explanation": "Большинство предметов созданы в ярославских и московских мастерских, а не на Урале."
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
