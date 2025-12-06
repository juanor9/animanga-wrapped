# Magic‑link Email Configuration

During development the magic‑link email uses the URL defined in the environment variable `NEXT_PUBLIC_REACT_APP_BASE_URL`. Resend only sends emails that contain a **verified domain**. If the variable points to a production domain that has not been verified yet, the request fails with a 403 error:

```
The animanga-wrapped.com domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

## Local development

For local testing set the variable to the localhost address:

```dotenv
NEXT_PUBLIC_REACT_APP_BASE_URL=http://localhost:3000
```

Restart the dev server after changing the `.env` file. The magic‑link email will contain a link like `http://localhost:3000/auth/verify?token=…` and Resend will send it without requiring domain verification.

## Production

When deploying to production:

1. Verify your domain (`animanga-wrapped.com`) in the Resend dashboard (add the domain and follow the DNS TXT‑record verification steps).
2. Change the variable to the production URL:

```dotenv
NEXT_PUBLIC_REACT_APP_BASE_URL=https://animanga-wrapped.com
```

3. Restart the server.

After verification the magic‑link flow works with the real domain.
