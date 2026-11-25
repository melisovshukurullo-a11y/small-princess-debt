const express = require("express");
const path = require("path");
const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/submit", async (req, res) => {
  const { choice, note = "" } = req.body || {};
  const allowed = [
    "A bouquet of flowers", "Chocolate or sweets", "A surprise from Korea",
    "A treat of your choice", "A custom idea", "Keep the debt as a joke"
  ];
  if (!allowed.includes(choice) || typeof note !== "string" || note.length > 500) {
    return res.status(400).json({ error: "Invalid selection" });
  }
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ error: "Server is not configured" });

  const message = `👑 SMALL PRINCESS — AUCTION RESULT\n\nChoice: ${choice}\nNote: ${note.trim() || "(none)"}`;
  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const body = await tg.json();
    if (!tg.ok || !body.ok) return res.status(502).json({ error: "Telegram delivery failed" });
    res.json({ ok: true });
  } catch {
    res.status(502).json({ error: "Telegram delivery failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Debt Auction running on ${port}`));
