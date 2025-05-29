class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Где, по словам Мусина-Пушкина, был приобретён сборник с «Словом о полку Игореве»?",
                "image": "./source/vopros (1).jpg",
                "answers": [
                    {"text": "В библиотеке Академии наук"},
                    {"text": "В доме книготорговца в Москве"},
                    {"text": "В Спасо-Преображенском монастыре в Ярославле"},
                    {"text": "В Троице-Сергиевой лавре"}
                ],
                "correctIndex": 2,
                "explanation": "Мусин-Пушкин утверждал, что нашёл сборник именно в Спасо-Преображенском монастыре в Ярославле."
            },
            {
                "question": "Что из представленного в экспозиции происходит из коллекции Мусина-Пушкина и имеет особую ценность?",
                "image": "./source/vopros (2).jpg",
                "answers": [
                    {"text": "Копьё князя Игоря"},
                    {"text": "Евангелие начала XVII века"},
                    {"text": "Золотое кольцо"},
                    {"text": "Каменный крест"}
                ],
                "correctIndex": 1,
                "explanation": "Евангелие из усадьбы Иловна — редкий памятник духовной культуры и часть личной коллекции А. И. Мусина-Пушкина."
            },
            {
                "question": "В каких исторических интерьерах находится экспозиция «Слова»?",
                "image": "./source/vopros (3).jpg",
                "answers": [
                    {"text": "В колокольне"},
                    {"text": "В подземельях"},
                    {"text": "В трапезной палате и настоятельских покоях"},
                    {"text": "В новом административном корпусе"}
                ],
                "correctIndex": 2,
                "explanation": "Выставка размещена в подлинных интерьерах XVI века — именно это создаёт ощущение погружения в эпоху."
            },
            {
                "question": "Исходя из общей эрудиции и просмотренных экспонатов, какое женское имя встречается в «Слове»?",
                "image": "./source/vopros (4).jpg",
                "answers": [
                    {"text": "Марфа"},
                    {"text": "Ярославна"},
                    {"text": "Дарья"},
                    {"text": "Ольга"}
                ],
                "correctIndex": 1,
                "explanation": "Ярославна — один из ключевых образов поэмы, отражённый в художественном оформлении экспозиции. Надо сказать, что это не имя, которое не упомянуто в произведении, а отчество персонажа."
            },
            {
                "question": "Какая судьба постигла рукопись после публикации?",
                "image": "./source/vopros (5).jpg",
                "answers": [
                    {"text": "Её сожгли при Золотой Орде"},
                    {"text": "Её отправили в Петербург"},
                    {"text": "Её похитили иностранные агенты"},
                    {"text": "Она погибла в пожаре Москвы 1812 года"}
                ],
                "correctIndex": 3,
                "explanation": "Рукопись хранилась у Мусина-Пушкина и была уничтожена в московском пожаре при нашествии Наполеона."
            },
            {
                "question": "Что можно увидеть в экспозиции как часть военного снаряжения XII века?",
                "image": "./source/vopros (6).jpg",
                "answers": [
                    {"text": "Бронежилет"},
                    {"text": "Гусарские доспехи"},
                    {"text": "Кольчуги и шлема"},
                    {"text": "Стрелковое оружие"}
                ],
                "correctIndex": 2,
                "explanation": "В музее представлены реконструкции настоящей дружинной экипировки времён похода князя Игоря."
            },
            {
                "question": "Кто был главным собирателем русских древностей и нашёл «Слово»?",
                "image": "./source/vopros (7).jpg",
                "answers": [
                    {"text": "Иван Грозный"},
                    {"text": "Александр Пушкин"},
                    {"text": "Алексей Мусин-Пушкин"},
                    {"text": "Владимир Ульянов"}
                ],
                "correctIndex": 2,
                "explanation": "Мусин-Пушкин был коллекционером древностей и нашёл сборник с поэмой."
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
