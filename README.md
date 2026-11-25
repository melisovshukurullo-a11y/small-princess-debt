# SMALL PRINCESS — Debt Auction

## What's included
- `public/index.html`: the invitation and choice page
- `server.js`: private server endpoint that sends the choice to Telegram
- `package.json`: Node.js dependencies

## Before deployment
1. Keep your BotFather token private. If a token was ever pasted into a chat, revoke it in @BotFather and use a fresh one.
2. Open your bot in Telegram and press **Start** from the account that should receive the result.
3. Deploy this project to a Node.js host (for example, Render) as a Web Service.
4. Set these environment variables in the hosting dashboard (never in the source files):
   - `BOT_TOKEN` = your fresh BotFather token
   - `CHAT_ID` = your Telegram numeric user ID
5. Build command: `npm install`
6. Start command: `npm start`
7. After deployment, open the public HTTPS URL and test the form yourself.

The form sends only the selected option and optional note to the Telegram chat ID configured on the server.
