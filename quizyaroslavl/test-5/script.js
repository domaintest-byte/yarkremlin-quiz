class Quiz {
    constructor() {
        this.questions = [
            {
                "question": "Вы изучаете иконы и видите изображение белой птицы. В каких двух евангельских сюжетах она встречается наиболее часто, символизируя Святой Дух или душу?",
                "image": "./source/vopros (1).jpg",
                "answers": [
                    {"text": "Рождество Христово и Крещение Господне"},
                    {"text": "Тайная Вечеря и Преображение Господне"},
                    {"text": "Благовещение Пресвятой Богородицы и Сошествие Святого Духа (Пятидесятница)"},
                    {"text": "Чудесный улов рыбы и Исцеление расслабленного у Овчей купели"}
                ],
                "correctIndex": 2,
                "explanation": "Голубь символизирует Святой Дух: при Благовещении он нисходит на Деву Марию (Лк. 1:35), а в Пятидесятницу - на апостолов (Деян. 2:1-4). Это самые характерные сюжеты для этого символа."
            },
            {
                "question": "На многих ярославских иконах Богородица изображена в одеждах синего и красного цветов. Что символизируют эти цвета согласно традиции иконописи?",
                "image": "./source/vopros (2).jpg",
                "answers": [
                    {"text": "Синий - верность, красный - любовь"},
                    {"text": "Синий - воду, красный - огонь"},
                    {"text": "Синий - небесную чистоту и божественную тайну, красный - царское достоинство и земные страдания"},
                    {"text": "Синий - одежды Марфы (заботящейся о земном), красный - одежды Марии (слушающей Слово)"}
                ],
                "correctIndex": 2,
                "explanation": "Синий означает небо, тайну и божественное происхождение Богородицы. Красный символизирует человеческую природу Христа, царственность и страдания, которые предстояло перенести Богоматери."
            },
            {
                "question": "Вам показали три иконы. На одной святой изображен с мечом, на второй - с книгой, на третьей - держит макет храма. Кто эти святые?",
                "image": "./source/vopros (3).jpg",
                "answers": [
                    {"text": "С мечом - святой Георгий Победоносец, с книгой - апостол Иоанн Богослов, с храмом - святой князь-строитель"},
                    {"text": "С мечом - апостол Петр, с книгой - евангелист Лука, с храмом - святой Николай"},
                    {"text": "С мечом - архангел Михаил, с книгой - пророк Илия, с храмом - святой Сергий Радонежский"},
                    {"text": "С мечом - св. Димитрий Солунский, с книгой - св. Василий Великий, с храмом - св. Александр Невский"}
                ],
                "correctIndex": 0,
                "explanation": "Меч - атрибут Георгия Победоносца (воинская доблесть), книга - Иоанна Богослова (авторство Евангелия), макет храма - святых князей-строителей (например, Ярослава Мудрого или Владимира Крестителя)."
            },
            {
                "question": "Почему на некоторых иконах, созданных в Ярославле, в пейзажах или фонах можно узнать элементы местной архитектуры (например, силуэты ярославских церквей)?",
                "image": "",
                "answers": [
                    {"text": "Иконописцы не знали канонических изображений Святой Земли"},
                    {"text": "Просто для украшения фона иконы"},
                    {"text": "Чтобы показать связь священного события с жизнью города, его жителей, подчеркнуть местную идентичность и патриотизм"},
                    {"text": "Это был обетный знак: заказчик иконы обещал построить такой храм, если молитва будет услышана"}
                ],
                "correctIndex": 2,
                "explanation": "Включение местной архитектуры - характерная черта ярославской иконописи. Это делалось для \"освоения\" сакрального пространства, перенесения евангельской истории в контекст родного города и выражения локального патриотизма."
            },
            {
                "question": "Рассматривая две репродукции одной иконы – до и после реставрации – вы видите, что на отреставрированной версии появились утраченные детали: части нимба, фрагменты узоров на одеждах, надписи. Почему эти детали чаще всего исчезают с древних икон?",
                "image": "./source/vopros (5).jpg",
                "answers": [
                    {"text": "Их специально стирали в более поздние времена как устаревшие"},
                    {"text": "Из-за естественного старения материалов (трещины, осыпи краски и левкаса), воздействия среды (влажность, перепады температур), неаккуратного обращения или неумелых поновлений"},
                    {"text": "Потому что реставраторы их добавляют по своему усмотрению"},
                    {"text": "Считалось, что благодать постепенно \"уходит\" из образа, унося с собой частицы священного изображения"}
                ],
                "correctIndex": 1,
                "explanation": "Основные причины утрат - физико-химические процессы старения материалов (дерево, левкас, краска), воздействие влажности, перепадов температур, копоти от свечей, а также неумелые попытки \"обновить\" икону в прошлом."
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
