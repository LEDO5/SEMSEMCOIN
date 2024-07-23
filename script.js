document.addEventListener("DOMContentLoaded", () => {
  const claimButton = document.getElementById("claim-button");
  const pointsDisplay = document.getElementById("points");
  const timerDisplay = document.getElementById("timer");
  const inviteButton = document.getElementById("invite-button");
  const inviteLinkDisplay = document.getElementById("invite-link");

  let points = parseInt(localStorage.getItem("points")) || 0;
  let lastClaimTime = parseInt(localStorage.getItem("lastClaimTime")) || 0;
  const CLAIM_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const REFERRAL_REWARD = 2500; // Points rewarded for successful referral
  const TELEGRAM_BOT_URL = "https://t.me/semsemcoin_bot"; // Telegram bot URL

  function updatePoints() {
    points = parseInt(localStorage.getItem("points")) || 0;
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
      points += 1000;
      localStorage.setItem("points", points);
      localStorage.setItem("lastClaimTime", now);
      updatePoints();
      updateTimer();
      location.reload(); // Refresh the page immediately after claiming points
    } else {
      alert("You can only claim points every 6 hours.");
    }
  });

  inviteButton.addEventListener("click", () => {
    const currentUrl = window.location.href;
    const inviteLink = `${TELEGRAM_BOT_URL}?start=${Date.now()}`;
    inviteLinkDisplay.textContent = `Invite link: ${inviteLink}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');

  if (ref && !localStorage.getItem("ref")) {
    localStorage.setItem("points", points + REFERRAL_REWARD);
    localStorage.setItem("ref", ref);
    updatePoints();

    // Notify the referrer and reward them
    const referrerId = localStorage.getItem("referrerId");
    if (referrerId) {
      // Reward the referrer
      const referrerPoints = parseInt(localStorage.getItem(`points_${referrerId}`)) || 0;
      localStorage.setItem(`points_${referrerId}`, referrerPoints + REFERRAL_REWARD);
      alert(`You successfully invited a friend. Here is your reward of ${REFERRAL_REWARD} points!`);

      // Redirect to Telegram bot
      window.location.href = TELEGRAM_BOT_URL;
    }
  }

  updatePoints();
  updateTimer();
  setInterval(updateTimer, 1000); // Update the timer every second
});
