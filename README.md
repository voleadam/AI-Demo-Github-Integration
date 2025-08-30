# AI-Demo

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/voleadam/AI-Demo)

## Deployment README

### Environment Variables Setup

For the application to work properly in production, you need to configure Supabase environment variables:

#### Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anonymous key
4. Click **"Clear cache and deploy"** to rebuild with the new environment variables

#### Getting Supabase Credentials

You can find these values in your Supabase project dashboard:
- **Project URL**: Found in Settings → API
- **Anon Key**: Found in Settings → API

For detailed setup instructions, refer to the [Supabase React Quickstart Guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs).

### Local Development

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your actual Supabase credentials
3. The application will gracefully handle missing environment variables by showing a setup message