# Mail Relay Service

A simple Node.js Express server to relay emails via Gmail SMTP.

## Features
- POST `/send-email` endpoint to send emails
- Nodemailer for email delivery
- Input validation and error handling
- Optional API key protection via `X-API-KEY` header
- Environment variables managed with dotenv

## Requirements
- Node.js 16+
- Gmail account (with App Password if 2FA enabled)

## Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   # Edit .env with your SMTP_USER, SMTP_PASS, PORT, and (optionally) API_KEY
   ```
4. Start the server:
   ```bash
   node index.js
   # or with nodemon for development
   npx nodemon index.js
   ```

## Usage
Send a POST request to `/send-email` with JSON body:
```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "text": "This is a test email."
}
```
If API key protection is enabled, include the `X-API-KEY` header.

## Deploying

### Railway
1. Create a new Railway project and link your repo.
2. Set environment variables (`SMTP_USER`, `SMTP_PASS`, `PORT`, `API_KEY`) in the Railway dashboard.
3. Deploy!

### Render
1. Create a new Web Service on Render and connect your repo.
2. Set environment variables in the Render dashboard.
3. Deploy!

## Notes
- For Gmail, you may need to use an App Password (see Google Account Security settings).
- This service is for demonstration and should be secured before production use. 