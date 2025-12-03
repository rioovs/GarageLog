
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const TARGET_EMAIL = 'user1@example.com';

async function main() {
  console.log(`Verifying data for ${TARGET_EMAIL}...`);

  // 1. Find the user ID from Supabase
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  const user = users.users.find(u => u.email === TARGET_EMAIL);
  
  if (!user) {
    console.error(`User ${TARGET_EMAIL} not found in Supabase.`);
    process.exit(1);
  }

  const userId = user.id;
  console.log(`User ID: ${userId}`);

  // 2. Check Prisma Profile
  const profile = await prisma.profile.findUnique({ where: { id: userId } });
  if (!profile) {
    console.error('Profile NOT found in Prisma.');
  } else {
    console.log('Profile found.');
  }

  // 3. Count Vehicles
  const vehicleCount = await prisma.vehicle.count({ where: { user_id: userId } });
  console.log(`Vehicle Count: ${vehicleCount}`);

  // 4. Count Service Records
  const serviceCount = await prisma.serviceRecord.count({ 
    where: { vehicle: { user_id: userId } } 
  });
  console.log(`Service Record Count: ${serviceCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
