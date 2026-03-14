emailjs.init("j2V8uVV-xfBjX58dh");
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  

    emailjs.sendForm("service_dg253bh", "template_wok4xav", this)
        .then(() => {
            alert("Message sent successfully!");
            this.reset(); 
        })
        .catch((error) => {
            alert("Failed to send message. Check console.");
            console.error("EmailJS error:", error);
        });
});

  // Skills section Animation
 document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skills-category");

  const revealSkills = () => {
    const triggerBottom = window.innerHeight * 0.85;
    skillCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealSkills);
  revealSkills(); // Run once on load
   });

  // Projects section Animation
  document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const revealProjects = () => {
    const triggerBottom = window.innerHeight * 0.85;
    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
    };

  window.addEventListener("scroll", revealProjects);
  revealProjects();
  });



  // Education Section Animation
  document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".timeline-card");
  const dots = document.querySelectorAll(".edu-tl-dot");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = [...cards].indexOf(card);

        // card
        card.classList.add("show");

        // matching circle
        const dot = dots[index];
        if (dot) dot.classList.add("show");

        // stop observing after animation
        observer.unobserve(card);
      }
    });
   }, { threshold: 0.1 });  // triggers as soon as card enters

  cards.forEach(card => observer.observe(card));
  });

 // Achievements section Animation
  document.addEventListener("DOMContentLoaded", () => {
  const achievementCards = document.querySelectorAll(".achievement-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
   }, { threshold: 0.2 });

  achievementCards.forEach(card => observer.observe(card));
  });

 // Certifications section Animation
  document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Prevents re-trigger on scroll
      }
    });
  }, { threshold: 0.2 }); // Trigger when 20% of card is visible

  certCards.forEach(card => observer.observe(card));
  });


  // Education Timeline Overlay
  (() => {
  const section = document.querySelector('#education');
  const overlay = document.querySelector('#edu-tl');
  if (!section || !overlay) return;

  const line = overlay.querySelector('.edu-tl-line');

  function getPageTop(el) {
    const r = el.getBoundingClientRect();
    return r.top + window.scrollY;
  }
  function getPageLeft(el) {
    const r = el.getBoundingClientRect();
    return r.left + window.scrollX;
  }

  function buildOverlay() {
    // clear previous dots
    overlay.querySelectorAll('.edu-tl-dot').forEach(d => d.remove());

    const cards = Array.from(section.querySelectorAll('.timeline-card'));
    if (!cards.length) return;

    // place line slightly left of first card
    const firstCardLeft = getPageLeft(cards[0]);
    const sectionLeft   = getPageLeft(section);
    const lineX = Math.max(0, firstCardLeft - sectionLeft - 20);
    overlay.style.left = lineX + 'px';

    // Y positions of each card center
    const sectionTop = getPageTop(section);
    const tops = cards.map(c => {
  const logo = c.querySelector('.college-logo'); // your logo selector
  if (logo) {
    return (logo.getBoundingClientRect().top + window.scrollY - sectionTop) + (logo.offsetHeight / 2);
  }
  return (c.getBoundingClientRect().top + window.scrollY - sectionTop) + (c.offsetHeight / 2);
  });

    overlay.dataset.tops = JSON.stringify(tops);

    // line starts at first dot
    const startY = tops[0];
    overlay.dataset.start = startY;
    line.style.top = startY + 'px';
    line.style.height = '0px';

    // hollow dots
    tops.forEach(t => {
      const dot = document.createElement('div');
      dot.className = 'edu-tl-dot';
      dot.style.top = (t - 9) + 'px'; // 18px circle
      overlay.appendChild(dot);
    });

    updateProgress();
   }

   function updateProgress() {
    const tops = JSON.parse(overlay.dataset.tops || '[]');
    if (!tops.length) return;

    const sectionTop = getPageTop(section);
    const viewportBottom = window.scrollY + window.innerHeight - 80;

    let maxReached = parseFloat(overlay.dataset.start || 0);
    const dots = overlay.querySelectorAll('.edu-tl-dot');

    tops.forEach((t, i) => {
      const absoluteY = sectionTop + t;
      if (viewportBottom >= absoluteY) {
        maxReached = t;
        dots[i].classList.add('show');   // reveal dot
      }
    });

    // grow line only once (no shrinking back)
    const start = parseFloat(overlay.dataset.start || 0);
    const newHeight = Math.max(0, maxReached - start);
    if (parseFloat(line.style.height) < newHeight) {
      line.style.height = newHeight + 'px';
    }
    }

  window.addEventListener('load', buildOverlay);
  document.addEventListener('DOMContentLoaded', buildOverlay);
  window.addEventListener('resize', buildOverlay);
  window.addEventListener('scroll', updateProgress, { passive: true });
  })();



 // About section Animation
  document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll(".hero-content, .hero-img");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.2 });

  aboutElements.forEach(el => observer.observe(el));
  });




