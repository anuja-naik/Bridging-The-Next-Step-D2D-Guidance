// Smooth section scroll and active section toggle
function goToSection(id) {
  var section = document.getElementById(id);
  if (!section) return;

  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  if (id !== 'home') section.classList.add('active');

  var top = section.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('nav a[data-target]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = link.getAttribute('data-target');
      goToSection(target);
      navLinks.forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });

  document.querySelector('nav a[data-target="home"]').classList.add('active-link');

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var college = document.getElementById('college').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !college || !email || !message) {
        alert('Please fill out all fields before submitting.');
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert(`Thank you, ${name}! Your query has been submitted. We will contact you soon.`);
      contactForm.reset();
    });
  }
});

// Highlight active nav link on scroll
window.addEventListener('scroll', function () {
  var fromTop = window.scrollY + 120;
  var sections = document.querySelectorAll('.content-section, header');
  var navLinks = document.querySelectorAll('nav a[data-target]');

  sections.forEach(function (section) {
    var id = section.id;
    if (!id) return;
    var top = section.offsetTop;
    var bottom = top + section.offsetHeight;

    if (fromTop >= top && fromTop < bottom) {
      navLinks.forEach(function (link) {
        link.classList.remove('active-link');
        if (link.getAttribute('data-target') === id) {
          link.classList.add('active-link');
        }
      });
    }
  });
});
