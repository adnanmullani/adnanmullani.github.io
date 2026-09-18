// Nav gets a background once the page scrolls
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Subtle tilt on the hero photo, following the cursor (desktop only)
const scene = document.getElementById('scene');
if (scene && window.matchMedia('(pointer:fine)').matches) {
  scene.addEventListener('mousemove', (e) => {
    const r = scene.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    scene.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${py * -6}deg)`;
  });
  scene.addEventListener('mouseleave', () => {
    scene.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  });
}
