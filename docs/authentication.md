# Authentication Module Technical Documentation

## Overview
This document describes the **registration** and **login** flows for the Animanga Wrapped application, which uses a **password‑less magic‑link** authentication system.

---

## 1. Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_REACT_APP_BASE_URL` | Base URL used to generate the magic‑link. In development it should be `http://localhost:3000`. | `http://localhost:3000` |
| `RESEND_API_KEY` | API key for the Resend email service. **Never commit** this value. | `re_********` |
| `EMAIL_FROM` | Sender address used by Resend. | `onboarding@resend.dev` |

> **Note:** The `.env` file is confidential. See `claude.md` and `agents.md` for the policy.

---

## 2. Data Model (`src/app/api/models/User.js`)
```js
const UserSchema = new mongoose.Schema({
  // AniList OAuth data
  anilistId: { type: Number, required: true, unique: true },
  anilistUsername: { type: String, required: true },
  anilistAvatar: { type: String },
  anilistAccessToken: { type: String },
  anilistTokenExpiry: { type: Date },

  // User‑provided data
  email: { type: String, required: true, unique: true, lowercase: true },
  country: { type: String, required: true },
  isAdult: { type: Boolean, required: true },

  // Consent tracking
  consents: {
    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: Date,
    privacyAccepted: { type: Boolean, required: true },
    privacyAcceptedAt: Date,
  },

  // Lists – populated by the front‑end after the user selects which lists to analyse
  lists: { type: Array, default: [] },

  timestamps …
});
```
The `lists` field stores an array of objects, each containing a `year` and optionally `animeList` and/or `mangaList` depending on the user’s selection.

---

## 3. Registration Flow (`/api/users` – `src/app/api/users/route.js`)
1. **Frontend** (`RegistrationForm.jsx`)
   - Collects AniList OAuth data, email, country, age consent, terms/privacy consent, and **selectedLists** (`{ anime: true/false, manga: true/false }`).
   - Builds `userData`:
     ```js
     const userData = {
       ...user, // Redux holds AniList data
       email: email.toLowerCase(),
       country,
       lists: filteredLists, // only the lists the user selected (see code in RegistrationForm)
     };
     ```
   - Dispatches `createUser(userData)`.
2. **Backend** (`src/app/api/users/route.js`)
   - Validates required fields, age, and consents.
   - Checks for existing user by `anilistId` or `email`.
   - Creates a new `User` document, persisting the **filtered `lists`** array.
   - Returns **201** on success.

---

## 4. Login Flow (Magic‑Link) – Two Endpoints
### 4.1 Send Magic‑Link (`POST /api/auth/magic-link/send`)
File: `src/app/api/auth/magic-link/send/route.js`
```js
export async function POST(request) {
  const { email } = await request.json();
  // Validate email format
  // Find user – 404 if not found
  // Generate secure token (32‑byte hex string)
  // Store token in `MagicLink` collection (expires in 15 min)
  // Call `sendMagicLink(email, token)` – **email sending is skipped in development**
  // Return { message: 'Magic link sent to your email' }
}
```
**Development shortcut:** `src/app/api/lib/email.js` contains a guard that returns early when `process.env.NODE_ENV !== 'production'` **or** when `BASE_URL` contains `localhost`. It logs the link instead of contacting Resend.

### 4.2 Verify Magic‑Link (`GET /api/auth/magic-link/verify`)
File: `src/app/api/auth/magic-link/verify/route.js`
1. Extract `token` from query string.
2. Look up the token in `MagicLink` collection, ensure it is not expired.
3. Find the associated user, mark `emailVerified` if needed.
4. Delete the used magic‑link record.
5. Issue **access** and **refresh** JWTs (via `src/app/api/lib/auth.js`).
6. Return the tokens; the front‑end stores them in Redux (`userData` slice) and redirects to the dashboard.

---

## 5. Email Sending (`src/app/api/lib/email.js`)
```js
export async function sendMagicLink(email, token) {
  const magicLink = `${BASE_URL}/auth/verify?token=${token}`;
  // Development guard – skip Resend when not production or localhost
  if (process.env.NODE_ENV !== 'production' || (BASE_URL && BASE_URL.includes('localhost'))) {
    console.log('🔧 Development mode: skipping Resend email send. Magic link would be:', magicLink);
    return;
  }
  // Otherwise call Resend API
  await resend.emails.send({ from: EMAIL_FROM, to: email, subject: 'Login to Animanga Wrapped', html, text });
}
```
The guard prevents the 403 domain‑verification error during local development.

---

## 6. Front‑End Integration
- **Hero** (`Hero.jsx`) renders `<LoginSignup />`.
- **LoginSignup** toggles between `UserRegistration` and `UserLogin`.
- **UserLogin** dispatches `sendMagicLink(email)` and reacts to `magicLinkSent`, `loading`, and `error` from the `userData` slice.
- **UserRegistration** (via `RegistrationForm.jsx`) handles the full registration flow described above.

---

## 7. Testing Notes
- **Axe accessibility** warnings are unrelated to auth; they can be ignored for now.
- Ensure `process.env.NODE_ENV` is set to `production` only in the deployed environment; otherwise the magic‑link will only be logged to the console.

---

## 8. Future Improvements
- Add a UI component that displays the generated magic‑link in development mode for easier testing.
- Implement rate‑limiting on the `/send` endpoint to prevent abuse.
- Store a hash of the magic‑link token instead of the raw token for extra security.

---

*Document created on 2025‑12‑05.*
