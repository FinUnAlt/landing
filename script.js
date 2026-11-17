const menu = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav-links');
function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('active', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', () => setMenu(false));
document.addEventListener('click', event => {
    if (!event.target.closest('.navbar')) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('active')) {
        setMenu(false);
        menu.focus();
    }
});
matchMedia('(max-width: 800px)').addEventListener('change', () => setMenu(false));

const dialog = document.querySelector('#courseModal');
document.querySelector('#showGame').addEventListener('click', () => dialog.showModal());
dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
document.querySelectorAll('[data-selection]').forEach(link => {
    link.addEventListener('click', () => {
        if (dialog.open) dialog.close();
        document.querySelector('#selection').textContent = 'Вы выбрали: ' + link.dataset.selection + '. Назовите этот курс при звонке.';
    });
});

const reviews = document.querySelector('.reviews-slider');
const slides = Array.from(reviews.children);
function moveReview(direction) {
    const origin = slides[0].offsetLeft;
    const index = slides.findIndex(slide => slide.offsetLeft - origin >= reviews.scrollLeft - 2);
    const atEnd = reviews.scrollLeft + reviews.clientWidth >= reviews.scrollWidth - 2;
    const target = direction > 0 && atEnd ? 0 : (index + direction + slides.length) % slides.length;
    reviews.scrollTo({left: slides[target].offsetLeft - origin});
}
document.querySelector('.prev-review').addEventListener('click', () => moveReview(-1));
document.querySelector('.next-review').addEventListener('click', () => moveReview(1));
const topLink = document.querySelector('.scroll-to-top');
function updateTopLink() { topLink.hidden = window.scrollY < 450; }
window.addEventListener('scroll', updateTopLink, {passive: true});
updateTopLink();
