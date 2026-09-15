# Yushan Sadeepa — Portfolio (Full Stack)

A two-part portfolio project:

- `frontend/` — React + Vite + Tailwind CSS + Framer Motion + Lucide Icons
- `backend/` — Node.js + Express + Nodemailer contact-form API

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your real Gmail credentials:

```
PORT=5000
EMAIL_USER=yourgmailaddress@gmail.com
EMAIL_PASS=your16digitapppassword
```

**Important:** `EMAIL_PASS` must be a Gmail **App Password**, not your normal
login password. Generate one at:
Google Account → Security → 2-Step Verification (must be enabled) → App Passwords.

Run the backend:

```bash
npm run dev
```

You should see: `Server running on http://localhost:5000`

Test it's alive: open `http://localhost:5000/api/health` in your browser —
it should return `{"status":"ok"}`.

## 2. Frontend setup

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 3. Using it

- Fill in the contact form and submit — it POSTs to
  `http://localhost:5000/api/contact`, and on success Nodemailer sends the
  message to `yushanaththanayake@gmail.com`.
- The button/status text will read "Sending...", then show a success or
  error message inline.
- Click the email or phone rows in the Contact section to copy them —
  a checkmark confirms the copy.
- Use the pill buttons above the Projects grid to filter by category, and
  the tabs above Skills to switch skill groups.

## Project structure

```
portfolio-project/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .gitignore
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── index.css
```

## Adding your profile photo

The hero section shows a circular profile photo with a gradient ring.
Drop your image into `frontend/public/` and name it `profile.jpg`
(or edit the `src="/profile.jpg"` in `src/App.jsx` to match a different
filename/extension). A square image, at least 400x400px, crops best.
If no image is found, it automatically falls back to a "YS" initials
avatar, so the layout never breaks.

## Project cover images, demos & tech logos

Each project card now shows:
- A **cover image** at the top of the card (falls back to a neutral
  placeholder icon if the file is missing).
- A **"Watch Demo" button** (only appears if the project has a `demo`
  field) that opens a modal playing a video, GIF, or embedded iframe.
- **Real brand logos** next to each tech-stack tag (via `react-icons/si`),
  instead of plain text.

To add your own media, drop files into `frontend/public/projects/` using
the filenames referenced in the `PROJECTS` array in `src/App.jsx` — see
`frontend/public/projects/README.txt` for the exact expected names, or
edit the `cover` / `demo` fields in `App.jsx` to point at whatever
filenames you use.

To add a tech-stack logo for a tool not already mapped, import its icon
from `react-icons/si` (browse available icons at
https://react-icons.github.io/react-icons/icons/si/) and add an entry to
`TECH_ICON_MAP` in `src/App.jsx`:

```js
import { SiTailwindcss } from "react-icons/si";
// ...
const TECH_ICON_MAP = {
  // ...existing entries
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
};
```

Then just add `"Tailwind CSS"` to that project's `tech` array.

## Notes before deploying

- CORS in `backend/server.js` is currently locked to
  `http://localhost:5173`. Update the `origin` value to your production
  frontend URL before going live.
- Swap the placeholder GitHub/LinkedIn URLs in `frontend/src/App.jsx`
  (`SOCIALS` array) for your real profile links.
- The "Download CV" button is a placeholder (`href="#"`) — drop your actual
  CV file into `frontend/public/` and point the link at it, e.g.
  `href="/Yushan_Sadeepa_CV.pdf"` with the `onClick` handler removed.
- Gmail's SMTP can be flaky for bulk sending; for higher-volume production
  use consider a transactional email service (Resend, SendGrid, Postmark)
  as a drop-in replacement for the Nodemailer transporter.
