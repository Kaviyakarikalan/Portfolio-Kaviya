const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 2;
    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    this.draw();
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  connectParticles();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
// typing effect
document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Web Designer",
    "Full Stack Java Developer",
    "UI / UX Designer"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingElement = document.getElementById("typing");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1200);
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 80 : 120);
  }

  typeEffect();
});

//counting animation
document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".count");
  const section = document.querySelector(".stats-section");
  let started = false;

  const startCount = () => {
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let count = 0;
      const speed = target / 80;

      const update = () => {
        if (count < target) {
          count += speed;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + "+";
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      startCount();
    }
  }, {
    threshold: 0.5
  });

  observer.observe(section);

});