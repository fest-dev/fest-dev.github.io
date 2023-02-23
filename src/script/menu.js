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
        navList.classList.remove('animate-visible');
        navList.classList.add('animate-hidden');
        document.body.classList.remove('no-overflow');
    }

    menuButton.addEventListener('click', () => {
        navList.classList.remove('animate-hidden');
        navList.classList.add('animate-visible');
        document.body.classList.add('no-overflow');
    });

    closeButton.addEventListener('click', handleClose);
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            gtag('event', 'click', {
                'event_category': 'Menu',
                'event_label': 'Open',
                'value': 1
            });
            if(!isDesktop && navList.classList.contains('animate-hidden')) {
                return e.preventDefault();
            }

            const nav = new URL(link.href);
            const loc = new URL(location.href);

            if(nav.origin !== loc.origin) {
                return;
            }

            if(nav.origin === loc.origin && nav.pathname !== loc.pathname) {
                return;
            }

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

