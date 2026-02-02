// Custom cursor setup
const cursor = document.createElement('img');
cursor.className = 'custom-cursor';
cursor.src = '/images/happy.png';
cursor.alt = 'cursor';
document.body.appendChild(cursor);

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

// Create confetti effect
function createConfetti() {
  const container = document.querySelector('.confetti-container');
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(confetti);
  }
}

// Back button handler
document.querySelector('#back-button').addEventListener('click', () => {
  window.location.href = '/';
});

// Initialize confetti on load
createConfetti();
