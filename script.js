document.addEventListener("DOMContentLoaded", () => {
  const claimButton = document.getElementById("claim-button");
  const pointsDisplay = document.getElementById("points");
  const timerDisplay = document.getElementById("timer");
  const inviteButton = document.getElementById("invite-button");
  const inviteLinkDisplay = document.getElementById("invite-link");

  let points = localStorage.getItem("points") || 0;
  let lastClaimTime = localStorage.getItem("lastClaimTime") || 0;
  const CLAIM_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

  function updatePoints() {
    points = localStorage.getItem("points") || 0;
    pointsDisplay.textContent = `Points: ${points}`;
  }

  function updateTimer() {
    const now = Date.now();
    const timeRemaining = CLAIM_INTERVAL - (now - lastClaimTime);
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    timerDisplay.textContent = `Next claim in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeRemaining <= 0) {
      timerDisplay.textContent = "You can claim now!";
    }
  }

  claimButton.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastClaimTime >= CLAIM_INTERVAL) {
      points = Number(points) + 1000;
      localStorage.setItem("points", points);
      localStorage.setItem("lastClaimTime", now);
      updatePoints();
      updateTimer();
    } else {
      alert("You can only claim points every 6 hours.");
    }
  });

  inviteButton.addEventListener("click", () => {
    const currentUrl = window.location.href;
    const inviteLink = `${currentUrl}?ref=${Date.now()}`;
    inviteLinkDisplay.textContent = `Invite link: ${inviteLink}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');

  if (ref && !localStorage.getItem("ref")) {
    localStorage.setItem("points", Number(points) + 1000);
    localStorage.setItem("ref", ref);
    updatePoints();
  }

  updatePoints();
  updateTimer();
  setInterval(updateTimer, 1000); // Update the timer every second
});
