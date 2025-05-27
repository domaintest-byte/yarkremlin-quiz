class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Чем отличаются природные зоны Ярославской области от соседних регионов? Можно ли это понять по экспонатам?",
                "image": "",
                "answers": [
                    {"text": "Преобладание степных ландшафтов"},
                    {"text": "Больше болот и озер"},
                    {"text": "Наличие субтропической растительности"},
                    {"text": "Расположение в зоне смешанных лесов"}
                ],
                "correctIndex": 3,
                "explanation": "Ярославская область расположена в зоне смешанных лесов, что отличает её от соседних регионов. Экспонаты музея (гербарии, образцы почв) отражают эту особенность."
            },
            {
                "question": "Как изменилась фауна края за 1000 лет? Какие экспонаты подтверждают эти изменения?",
                "image": "https://cs12.pikabu.ru/post_img/2022/03/06/4/1646543211115955008.jpg",
                "answers": [
                    {"text": "Увеличение числа хищников"},
                    {"text": "Исчезновение крупных млекопитающих"},
                    {"text": "Появление экзотических видов"},
                    {"text": "Уменьшение разнообразия птиц"}
                ],
                "correctIndex": 1,
                "explanation": "За 1000 лет исчезли мамонты, шерстистые носороги и другие крупные млекопитающие. Кости этих животных, представленные в музее, служат доказательством."
            },
            {
                "question": "Сторож ночной у зеленого дома.<br> Как только на лес опускается дрема,<br> Он, ухая гулко, на вахту спешит,<br> И смотрит, и слушает: Кто там шуршит?",
                "image": "",
                "answers": [
                    {"text": "Сова"},
                    {"text": "Филин"},
                    {"text": "Сыч"},
                    {"text": "Ворон"}
                ],
                "correctIndex": 1,
                "explanation": "Филин — ночная птица, его уханье и поведение точно соответствуют описанию в загадке."
            },
            {
                "question": "Начну с того, что зовёт нас в бою,<br> Продолжу я нотой, поющей в строю.<br> В конце — «це», как прыжок на сук,<br> Я — ловкая тень, и лес мой друг.<br> Пушистый охотник, в дупле я живу,<br> А шубку мою берегут на веку.",
                "image": "",
                "answers": [
                    {"text": "Куница"},
                    {"text": "Белка"},
                    {"text": "Лиса"},
                    {"text": "Горностай"}
                ],
                "correctIndex": 0,
                "explanation": "Загадка расшифровывается как «куница»: «ку» (как клич), «ми» (нота), «ца» (окончание). Куница живёт в дуплах, а её мех высоко ценится."
            },
            {
                "question": "Кто в лесу зимой оставляет пятиконечные следы, хотя сам никогда не рисует?",
                "image": "https://stihi.ru/pics/2017/01/30/10489.jpg",
                "answers": [
                    {"text": "Ёж"},
                    {"text": "Заяц"},
                    {"text": "Белка"},
                    {"text": "Лось"}
                ],
                "correctIndex": 0,
                "explanation": "Зимой ёж впадает в спячку, но его следы (пять пальцев) можно увидеть до наступления холодов."
            },
            {
                "question": "Почему выхухоль редко встречается, если она обитает в реках Ярославской области?",
                "image": "https://optim.tildacdn.com/tild6134-3733-4363-a431-653232333162/-/resize/744x/-/format/webp/pic-01_1.jpg",
                "answers": [
                    {"text": "Из-за загрязнения воды"},
                    {"text": "Ведёт скрытный ночной образ жизни"},
                    {"text": "Мигрирует в другие регионы"},
                    {"text": "Отсутствие кормовой базы"}
                ],
                "correctIndex": 1,
                "explanation": "Выхухоль активна ночью, обитает в заболоченных местах и крайне осторожна, поэтому её сложно встретить."
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
