export const enableMobileMenu = () => {
    const menuButton = document.getElementById('mobile-nav-button');
    const closeButton = document.getElementById('close-button');
    const navList = document.getElementById('nav-list');
    const navLinks = navList.querySelectorAll('a');
    const desktopBreakpoint = window.matchMedia('(min-width: 859px)');
    let isDesktop = desktopBreakpoint.matches;
    
    desktopBreakpoint.addEventListener('change', () => {
        isDesktop = desktopBreakpoint.matches;
    });

    const handleClose = () => {
        navList.classList.remove('nav__list--visible');
        navList.classList.add('nav__list--hidden');
    }
    
    menuButton.addEventListener('click', () => {
        navList.classList.remove('nav__list--hidden');
        navList.classList.add('nav__list--visible');
    });
    
    closeButton.addEventListener('click', handleClose);
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (link.hash) {
                e.preventDefault();
                document.querySelector(link.hash).scrollIntoView({ block: 'start', behavior: 'smooth' });
            }

            if (!isDesktop) {
                handleClose();
            }
        });
    });
}

