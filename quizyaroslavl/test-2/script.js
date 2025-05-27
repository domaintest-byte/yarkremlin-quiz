class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "В каком веке был основан Спасо-Преображенский монастырь, ставший основой музея-заповедника?",
                "image": "",
                "answers": [
                    {"text": "В X веке"},
                    {"text": "В XIII веке"},
                    {"text": "В XIV веке"},
                    {"text": "В XI веке"}
                ],
                "correctIndex": 1,
                "explanation": "Собор был основан в 1216 году, т.е. в XIII веке князем Ростовским Константином Всеволодовичем."
            },
            {
                "question": "Какое легендарное произведение древнерусской литературы было обнаружено в стенах монастыря?",
                "image": "",
                "answers": [
                    {"text": "Лаврентьевская летопись"},
                    {"text": "Великие Четьи-Минеи"},
                    {"text": "«Слово о полку Игореве»"},
                    {"text": "«Слово о законе и благодати»"}
                ],
                "correctIndex": 2,
                "explanation": "«Слово о полку Игореве» — памятник древнерусской литературы конца XII века. Рукопись была обнаружена в XVIII веке в Спасо-Преображенском монастыре в Ярославле."
            },
            {
                "question": "Кто из героев Смутного времени организовал здесь сбор народного ополчения в 1612 году?",
                "image": "",
                "answers": [
                    {"text": "Василий Голицын и Симеон Бекбулатович"},
                    {"text": "Кузьма Минин и Дмитрий Пожарский"},
                    {"text": "Михаил Скопин-Шуйский и Дмитрий Шуйский"},
                    {"text": "Прокопий Ляпунов, Иван Заруцкий и князь Дмитрий Трубецкой"}
                ],
                "correctIndex": 1,
                "explanation": "В 1612 году Кузьма Минин и Дмитрий Пожарский организовали Второе народное ополчение, освободившее Москву от интервентов."
            },
            {
                "question": "Как называется самая высокая башня на территории музея, с которой открывается панорамный вид на Ярославль?",
                "image": "",
                "answers": [
                    {"text": "Богоявленская башня"},
                    {"text": "Святые ворота"},
                    {"text": "Звонница Спасо-Преображенского монастыря"},
                    {"text": "Богородицкая башня"}
                ],
                "correctIndex": 2,
                "explanation": "Звонница XVI–XIX веков служит смотровой площадкой с видом на историческую часть Ярославля."
            },
            {
                "question": "При каком князе Ростовском был заложен старейший храм Ярославля, находящийся на территории музея-заповедника?",
                "image": "",
                "answers": [
                    {"text": "Всеволод Юрьевич Большое Гнездо"},
                    {"text": "Константин Всеволодович"},
                    {"text": "Василий III Иванович"},
                    {"text": "Владимир Константинович"}
                ],
                "correctIndex": 1,
                "explanation": "Лаврентьевская летопись указывает, что монастырь заложен в 1216 году князем Константином Всеволодовичем."
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
