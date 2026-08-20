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

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  const successMessage = contactForm.querySelector('#contactSuccess');
  const fields = Array.from(contactForm.querySelectorAll('input, select, textarea'));

  const setFieldState = (field) => {
    const wrapper = field.closest('.form-field');
    if (!wrapper) return true;

    const isValid = field.checkValidity();
    wrapper.classList.toggle('is-invalid', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));
    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => setFieldState(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        setFieldState(field);
      }
    });
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formIsValid = fields.every(setFieldState);

    if (!formIsValid) {
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      successMessage?.classList.remove('is-visible');
      return;
    }

    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return;
    }

    contactForm.reset();
    fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
    successMessage?.classList.add('is-visible');
    successMessage?.focus();
  });
}
