# Vercel Deployment Guide

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub (already done)
2. **Vercel Account**: Create an account at [vercel.com](https://vercel.com)
3. **PostgreSQL Database**: You need a production PostgreSQL database (recommended: Neon, Supabase, or Vercel Postgres)

## Deployment Steps

### 1. Connect Your GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository (`dealora`)
4. Vercel will automatically detect it as a Next.js project

### 2. Configure Environment Variables

In Vercel project settings, add these environment variables:

**Required Variables:**
```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate-a-secure-random-string
```

**Optional Variables:**
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 3. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

### 4. Database Setup

**Option A: Vercel Postgres (Recommended)**
1. In Vercel dashboard, go to Storage → Create Database
2. Select Postgres
3. Copy the connection string to `DATABASE_URL`

**Option B: Neon Database**
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

**Option C: Supabase**
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

### 5. Run Database Migrations

After deployment, you need to set up your database schema:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run Prisma migrations
vercel env pull .env.local
npx prisma db push
```

Or use the Vercel Postgres dashboard to run migrations.

### 6. Deploy

Click "Deploy" in Vercel. The build process will:
1. Install dependencies
2. Generate Prisma client
3. Build the Next.js application
4. Deploy to Vercel's edge network

## Troubleshooting

### "DEPLOYMENT_NOT_FOUND" Error

This error occurs when:
- The deployment failed during build
- Environment variables are missing
- Database connection failed

**Solutions:**
1. Check Vercel deployment logs for specific errors
2. Ensure all required environment variables are set
3. Verify `DATABASE_URL` is correct and accessible
4. Make sure Prisma client is generated during build

### Build Failures

**Prisma Generation Issues:**
```bash
# The build script now includes: prisma generate && next build
# This ensures Prisma client is generated before building
```

**TypeScript Errors:**
- Run `npm run build` locally to catch errors before deploying
- Check for any TypeScript errors in the codebase

### Database Connection Issues

1. Verify your database allows connections from Vercel's IP addresses
2. Check if the database URL format is correct
3. Ensure the database schema exists

## Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Database schema migrated
- [ ] Test user registration/login
- [ ] Test product browsing
- [ ] Test checkout process
- [ ] Verify admin panel works
- [ ] Test API endpoints

## Monitoring

- Check Vercel Analytics for performance
- Monitor Vercel Logs for errors
- Set up database monitoring through your provider

## Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXTAUTH_URL` to your custom domain