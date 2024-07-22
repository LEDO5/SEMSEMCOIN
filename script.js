const CLAIM_POINTS = 1000;  // Points to claim
const CLAIM_INTERVAL = 6 * 60 * 60 * 1000;  // 6 hours in milliseconds

// Function to format time
function formatTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to update points and countdown
function updateUI() {
  const points = parseInt(localStorage.getItem('points') || '0');
  const lastClaimTime = parseInt(localStorage.getItem('lastClaimTime') || '0');
  
  const now = Date.now();
  const remainingTime = Math.max(0, CLAIM_INTERVAL - (now - lastClaimTime));

  document.getElementById('points').textContent = `Points: ${points}`;
  document.getElementById('timer').textContent = `Next claim in: ${formatTime(remainingTime)}`;

  // Update the timer every second
  setTimeout(updateUI, 1000);
}

// Function to claim points
function claimPoints() {
  const now = Date.now();
  const lastClaimTime = parseInt(localStorage.getItem('lastClaimTime') || '0');
  
  if (now - lastClaimTime >= CLAIM_INTERVAL) {
    let points = parseInt(localStorage.getItem('points') || '0');
    points += CLAIM_POINTS;
    localStorage.setItem('points', points);
    localStorage.setItem('lastClaimTime', now);
    updateUI();
  } else {
    alert('You can only claim points once every 6 hours.');
  }
}

// Event listener for claim button
document.getElementById('claim-button').addEventListener('click', claimPoints);

// Initialize UI
updateUI();
