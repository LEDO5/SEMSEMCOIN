// invite.js

const inviteButton = document.getElementById("invite-button");
const TELEGRAM_BOT_URL = "https://t.me/semsemcoin_bot"; // Telegram bot URL

inviteButton.addEventListener("click", () => {
  const inviteLink = `${TELEGRAM_BOT_URL}?start=${encodeURIComponent(Date.now())}`;
  navigator.clipboard.writeText(inviteLink).then(() => {
    showCustomMessage("Invite link copied to clipboard! Share it with your friends to earn rewards.");
  }).catch(err => {
    console.error("Failed to copy invite link: ", err);
  });
});
