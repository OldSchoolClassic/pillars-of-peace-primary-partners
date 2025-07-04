document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navTrigger = document.querySelector('.navTrigger');
  const mainNav = document.querySelector('.secondary-header .main-nav');
  if (navTrigger && mainNav) {
    navTrigger.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      navTrigger.classList.toggle('active');
    });
  }

  // Hide/show top bar on scroll
  let lastScroll = 0;
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        topBar.style.transform = 'translateY(0)';
        lastScroll = 0;
        return;
      }
      if (currentScroll > lastScroll && currentScroll > topBar.offsetHeight) {
        // Scrolling down
        topBar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        topBar.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  }

  // Smooth scroll for internal links
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Simple landing slide carousel (if multiple slides)
  const slides = document.querySelectorAll('.landing-slide');
  let slideIndex = 0;
  if (slides.length > 1) {
    slides.forEach(s => s.style.display = 'none');
    const showSlides = () => {
      slides.forEach(s => s.style.display = 'none');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].style.display = 'block';
      setTimeout(showSlides, 5000);
    };
    // Initialize first slide
    slides[0].style.display = 'block';
    setTimeout(showSlides, 5000);
  }
});
