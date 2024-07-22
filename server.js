const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());

let users = {}; // In-memory user data

app.post("/claim", (req, res) => {
  const userId = req.body.userId;
  if (!users[userId]) {
    users[userId] = { points: 0, lastClaim: Date.now() };
  }
  const now = Date.now();
  if (now - users[userId].lastClaim >= 6 * 60 * 60 * 1000) {
    // 6 hours
    users[userId].points += 1000;
    users[userId].lastClaim = now;
    res.json({ points: users[userId].points });
  } else {
    res.status(400).json({ error: "Claim period has not yet passed." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
