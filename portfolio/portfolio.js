// Portfolio Slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => plusSlides(1), 5000);

// Pause on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Resume on mouse leave
document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => plusSlides(1), 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate the position to scroll to (accounting for fixed header)
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      // Smooth scroll animation
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      document.querySelector('.nav-links').classList.remove('active');
      document.querySelector('.hamburger').classList.remove('active');
    }
  });
});

// Highlight active section while scrolling
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector('header').offsetHeight;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 50;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const id = section.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Mobile menu toggle (keep your existing hamburger functionality)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});