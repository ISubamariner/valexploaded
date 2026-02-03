// Dodging button
const dodgeButton = document.querySelector('#dodge-button');
const growButton = document.querySelector('#grow-button');
let dodgeCount = 0;
let buttonScale = 1;
let isFirstDodge = true;

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

function getRandomPosition() {
  // Get button dimensions
  const rect = dodgeButton.getBoundingClientRect();
  const buttonWidth = rect.width || 100;
  const buttonHeight = rect.height || 40;
  
  // Add padding from edges
  const padding = 20;
  
  // Calculate safe boundaries
  const maxX = window.innerWidth - buttonWidth - padding;
  const maxY = window.innerHeight - buttonHeight - padding;
  
  // Ensure minimum position
  const minX = padding;
  const minY = padding;
  
  // Generate random position within safe boundaries
  const x = Math.max(minX, Math.random() * maxX);
  const y = Math.max(minY, Math.random() * maxY);
  
  return { x, y };
}

function growTheButton() {
  dodgeCount++;
  buttonScale += 0.1;
  growButton.style.transform = `scale(${buttonScale})`;
  growButton.textContent = `I Grow! (${dodgeCount} dodges)`;
}

dodgeButton.addEventListener('mouseenter', () => {
  dodgeButton.classList.add('dodging');
  const { x, y } = getRandomPosition();
  dodgeButton.style.left = `${x}px`;
  dodgeButton.style.top = `${y}px`;
  
  // Don't grow on first dodge
  if (!isFirstDodge) {
    growTheButton();
  } else {
    isFirstDodge = false;
  }
  
  // Change cursor to angry momentarily
  cursor.src = '/images/angry.png';
  setTimeout(() => {
    cursor.src = '/images/happy.png';
  }, 500);
});

// Touch support for mobile
let touchStartTime = 0;
dodgeButton.addEventListener('touchstart', (e) => {
  touchStartTime = Date.now();
  // Prevent the button from dodging immediately on first touch
  if (!dodgeButton.classList.contains('dodging')) {
    return;
  }
  
  e.preventDefault();
  dodgeButton.classList.add('dodging');
  const { x, y } = getRandomPosition();
  dodgeButton.style.left = `${x}px`;
  dodgeButton.style.top = `${y}px`;
  
  // Don't grow on first dodge
  if (!isFirstDodge) {
    growTheButton();
  } else {
    isFirstDodge = false;
  }
}, { passive: false });

// Allow clicking after dodge starts
dodgeButton.addEventListener('touchend', (e) => {
  const touchDuration = Date.now() - touchStartTime;
  if (!dodgeButton.classList.contains('dodging')) {
    // First touch - start the game
    dodgeButton.classList.add('dodging');
    const { x, y } = getRandomPosition();
    dodgeButton.style.left = `${x}px`;
    dodgeButton.style.top = `${y}px`;
    
    // Don't grow on first dodge
    if (!isFirstDodge) {
      growTheButton();
    } else {
      isFirstDodge = false;
    }
  }
}, { passive: false });

dodgeButton.addEventListener('click', () => {
  alert('You caught me! 🎉');
  const { x, y } = getRandomPosition();
  dodgeButton.style.left = `${x}px`;
  dodgeButton.style.top = `${y}px`;
});

growButton.addEventListener('click', () => {
  window.location.href = '/celebration.html';
});

console.log('Vite is running!');
