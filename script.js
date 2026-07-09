document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.demo-card');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach((card) => {
                const isMatch = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !isMatch);
            });
        });
    });
});
