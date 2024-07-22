let points = 0;
let timer = 21600; // 6 hours in seconds

const pointsElement = document.getElementById("points");
const timerElement = document.getElementById("timer");
const claimButton = document.getElementById("claim-button");

function updatePoints() {
  pointsElement.textContent = `Points: ${points}`;
}

function updateTimer() {
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  timerElement.textContent = `Next claim in: ${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function handleClaim() {
  if (timer === 0) {
    points += 1000;
    timer = 21600; // Reset timer to 6 hours
    claimButton.disabled = true;
    updatePoints();
    updateTimer();
  }
}

claimButton.addEventListener("click", handleClaim);

setInterval(() => {
  if (timer > 0) {
    timer--;
    updateTimer();
  } else {
    claimButton.disabled = false;
  }
}, 1000);

updatePoints();
updateTimer();
// script.js
document.getElementById("claim-button").addEventListener("click", async () => {
  const userId = "user1"; // Replace with actual user ID
  const response = await fetch("https://your-repl-name.repl.co/claim", {
    // Replace with your backend URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (response.ok) {
    const data = await response.json();
    document.getElementById("points").textContent = `Points: ${data.points}`;
  } else {
    const error = await response.json();
    alert(error.error);
  }
});
