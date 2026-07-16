const navToggle = document.querySelector('#navToggle');
const navMenu = document.querySelector('#navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const menuIsOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', menuIsOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
