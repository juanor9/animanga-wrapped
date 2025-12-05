# Security & Database Configuration

## MongoDB Connection Security

Since Vercel uses dynamic IP addresses, the MongoDB Atlas Network Access whitelist must often be set to `0.0.0.0/0` (allow from anywhere) to facilitate deployment. To mitigate this risk, we implement the following security layers:

### 1. Connection Encryption

- The application enforces **TLS/SSL** for all database connections.
- The connection string (`MONGODB_URI`) is protected as a Vercel Environment Variable (encrypted at rest).

### 2. Least Privilege (Recommendations)

To further secure the database, follow these practices in MongoDB Atlas:

- **Create a Dedicated Database User:**
  - Do **not** use the admin user for the application connection.
  - Create a new user (e.g., `animanga_app_user`) with **Read and Write** privileges only on the `animanga-wrapped` database.
  - This limits the blast radius if the connection string were ever compromised; an attacker could not access other databases or modify cluster settings.

### 3. Server-Side Secrecy

- The `MONGODB_URI` environment variable is **never** exposed to the client.
- It is only accessed in `src/app/api/lib/db.js` running in the serverless environment.
- Code audits check to ensure `process.env` is never logged to the console in production.

## Environment Variables

- **Local:** `.env` file (git-ignored, strictly private).
- **Production:** Vercel Environment Variables (secure storage).

> **Warning:** Never commit the `.env` file or share the full `MONGODB_URI` in public channels.
