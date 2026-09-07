# Database Setup Instructions

## Status
- ✅ Prisma 5.20.0 installed
- ✅ Prisma Client generated
- ✅ Environment variables created (.env)
- ⏳ Neon PostgreSQL connection needed
- ⏳ Database migrations pending
- ⏳ Database seeding pending

## How to Connect Neon PostgreSQL (Recommended)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Click "Sign Up" (free tier available)
3. Sign up with GitHub, Google, or email

### Step 2: Create a New Project
1. After logging in, click "Create a project"
2. Choose a name (e.g., "dealora")
3. Select a region closest to you
4. Click "Create Project"

### Step 3: Get Connection String
1. Neon will show you a connection string like:
   ```
   postgresql://username:password@ep-cool-name.us-east-2.aws.neon.tech/dealora?sslmode=require
   ```
2. Copy this connection string

### Step 4: Update .env File
Replace the DATABASE_URL in your `.env` file with your Neon connection string:
```env
DATABASE_URL="postgresql://username:password@ep-cool-name.us-east-2.aws.neon.tech/dealora?sslmode=require"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

### Step 5: Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### Step 6: Seed the Database
```bash
npx prisma db seed
```

This will populate the database with:
- Admin user (email: admin@dealora.com, password: admin123)
- 12 product categories
- Sample products

## Alternative: Local PostgreSQL

If you prefer to run PostgreSQL locally:
1. Download and install PostgreSQL from https://www.postgresql.org/download/windows/
2. Start the PostgreSQL service
3. Create database: `createdb dealora`
4. Update `.env` with your local credentials
