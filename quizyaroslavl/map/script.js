document.addEventListener('DOMContentLoaded', () => {
    let currentCategory = 'adults';
    const quizCards = document.querySelectorAll('.quiz-card');
    
    // Инициализация при загрузке
    function init() {
        // Показываем карточки для взрослых сразу
        quizCards.forEach(card => {
            if (card.dataset.category === 'adults') {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
                card.style.display = 'flex';
            }
        });
        
        // Анимация появления основного контента
        const elements = document.querySelectorAll('.hero, .quiz-section');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    function switchCategory(newCategory) {
        if (currentCategory === newCategory) return;
        
        const oldCategory = currentCategory;
        currentCategory = newCategory;
        
        // Анимация исчезновения старых карточек
        document.querySelectorAll(`[data-category="${oldCategory}"]`).forEach(card => {
            card.style.transform = 'translateX(-50px)';
            card.style.opacity = '0';
        });
        
        setTimeout(() => {
            // Скрываем старые карточки
            document.querySelectorAll(`[data-category="${oldCategory}"]`).forEach(card => {
                card.style.display = 'none';
            });
            
            // Показываем новые карточки
            document.querySelectorAll(`[data-category="${newCategory}"]`).forEach(card => {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }, 50);
            });
        }, 300);
    }

    // Обработчики событий
    document.querySelectorAll('.category').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
            button.classList.add('active');
            const category = button.textContent.toLowerCase() === 'взрослым' ? 'adults' : 'kids';
            switchCategory(category);
        });
    });

    document.querySelectorAll('.quiz-card').forEach(card => {
        card.addEventListener('click', () => {
            window.open(card.dataset.url, '_blank');
        });
    });

    // Запуск инициализации
    init();
});