// === API Config ===
const QUOTESLATE_URL = 'https://quoteslate.vercel.app/api/quotes/random?count=10';
const MAX_CHARS = 80;

let buffer = [];
const seen = new Set();

// DOM Elements
let inputBox;
let button;

// Truncate to keep one-line fit
const truncate = txt =>
  txt.length <= MAX_CHARS ? txt : txt.slice(0, MAX_CHARS - 3).trim() + '…';

// Fetch a batch of quotes and filter out duplicates
async function fetchBatch() {
  try {
    const res = await fetch(QUOTESLATE_URL);
    if (!res.ok) throw new Error('Fetch failed');
    const data = await res.json();
    data.forEach(q => {
      if (!seen.has(q.quote)) {
        seen.add(q.quote);
        buffer.push(q);
      }
    });
  } catch (e) {
    console.error('Batch fetch error:', e);
  }
}

// Show quote instantly and trigger animation
async function displayQuote() {
  if (buffer.length === 0) return;
  button.disabled = true;

  const { quote, author } = buffer.shift();
  const text = `"${truncate(quote)}"` + (author ? ` — ${author}` : '');

  inputBox.classList.remove('animate');
  void inputBox.offsetWidth;
  inputBox.value = text;
  inputBox.classList.add('animate');

  if (buffer.length < 3) await fetchBatch();
  button.disabled = false;
}

// Initialize all logic once DOM is loaded
window.addEventListener('DOMContentLoaded', async () => {
  inputBox = document.querySelector('.input-box');
  button = document.querySelector('.quote-button');

  button.disabled = true;
  await fetchBatch();
  button.disabled = false;
  button.addEventListener('click', displayQuote);

  // === Background Particle Canvas ===
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 1,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6
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

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
