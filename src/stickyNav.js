const observer = new IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0];
    const nav = document.getElementById('nav');

    if (!isIntersecting) {
        nav.classList.add('nav--sticky');
    } else {
        nav.classList.remove('nav--sticky');
    }
});

observer.observe(document.getElementById('header'));
