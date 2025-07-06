const quotes = [
  { text: "Be the change that you wish to see in the world." },
  { text: "In the middle of difficulty lies opportunity." },
  { text: "The only thing we have to fear is fear itself." },
  { text: "Do not pray for easy lives, pray to be stronger men." },
  { text: "The future belongs to those who prepare for it today." },
  { text: "Leadership is the capacity to translate vision into reality." },
  { text: "Efforts and courage are not enough without purpose and direction." },
  { text: "You do not find the happy life. You make it." },
  { text: "The time is always right to do what is right." },
  { text: "Success is not in what you have, but who you are." }
];
function newquote() {
  const quoteElement = document.querySelector(".input-box");
  quoteElement.style.opacity = 0;

  setTimeout(() => {
    const randomindex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomindex];
    quoteElement.value = `"${quote.text}"`;
    quoteElement.style.opacity = 1;
  }, 300);
}
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".quote-box").classList.add("fade-slide");
});
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 1,
    dx: Math.random() * 1 - 0.5,
    dy: Math.random() * 1 - 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}

animate();
