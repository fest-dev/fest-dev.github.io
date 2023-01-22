const openModal = (e) => {
    const { target } = e;
    const modal = target.tagName === 'BUTTON'
        ? target.parentElement.querySelector('[role="dialog"]')
        : target.parentElement.parentElement.querySelector('[role="dialog"]');

    modal.classList.add('animate-visible');
    modal.classList.remove('animate-hidden');
    modal.removeAttribute('aria-hidden');
    document.body.classList.add('no-overflow');
}

const closeModal = (e) => {
    const { target } = e;
    const modal = target.closest('[role="dialog"]');
    console.log(modal);

    modal.classList.add('animate-hidden');
    modal.classList.remove('animate-visible');
    modal.setAttribute('aria-hidden', '');
    document.body.classList.remove('no-overflow');
}

export const activateModal = () => {
    const cardButtons = document.querySelectorAll('[data-card-button]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    cardButtons.forEach((button) => {
        button.addEventListener('click', openModal);
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });
}
