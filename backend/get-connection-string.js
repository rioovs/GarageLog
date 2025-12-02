// Get Supabase connection strings from dashboard
// This will help user get the correct connection string

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  GET CORRECT CONNECTION STRING FROM SUPABASE DASHBOARD        ║
╚═══════════════════════════════════════════════════════════════╝

STEP 1: Open Supabase Dashboard
   → https://supabase.com/dashboard
   → Select project: vjhtsxyytxzzmpcjsbod

STEP 2: Go to Settings > Database

STEP 3: Scroll to "Connection string" section

STEP 4: You will see 3 Connection Modes:

   ┌─────────────────────────────────────────────────────┐
   │ Session Mode (Port 5432) - For long-running apps   │
   │ Transaction Mode (Port 6543) - For serverless      │
   │ Direct Connection - For migrations & admin tasks   │
   └─────────────────────────────────────────────────────┘

STEP 5: COPY THE EXACT CONNECTION STRING

   For Prisma migrations, try in this order:
   
   1️⃣  Try "Session mode" (Port 5432) FIRST
   2️⃣  If that fails, try "Transaction mode" (Port 6543)
   3️⃣  Last resort: Use "Direct connection"

STEP 6: IMPORTANT! 
   ⚠️  Replace [YOUR-PASSWORD] with: SB24id0c84ZsLt
   ⚠️  Make sure there are NO spaces or extra characters

STEP 7: Paste into backend/.env line 4:
   DATABASE_URL="[the exact string from dashboard]"

═══════════════════════════════════════════════════════════════

Example formats you might see:

Session Mode (try this first):
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres

Transaction Mode:
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

Direct Connection:
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

═══════════════════════════════════════════════════════════════
`);
