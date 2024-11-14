window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-layer');
    const scrollPosition = window.scrollY;
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });
  
