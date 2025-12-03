
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

const prisma = new PrismaClient();

const testUsers = [
  {
    email: 'user1@example.com',
    password: 'password123',
    full_name: 'Test User 1',
    role: 'USER',
  },
  {
    email: 'user2@example.com',
    password: 'password123',
    full_name: 'Test User 2',
    role: 'USER',
  },
  {
    email: 'admin@example.com',
    password: 'password123',
    full_name: 'Admin User',
    role: 'ADMIN',
  },
];

async function main() {
  console.log('Creating test users...');

  for (const user of testUsers) {
    try {
      // 1. Create user in Supabase Auth
      let userId: string;
      
      // Check if user exists first to avoid error
      const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw listError;
      
      const existingUser = existingUsers.users.find(u => u.email === user.email);

      if (existingUser) {
        console.log(`User ${user.email} already exists in Supabase. ID: ${existingUser.id}`);
        userId = existingUser.id;
        // Update password if needed (optional, skipping for now to avoid complexity)
      } else {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
        });

        if (createError) {
          console.error(`Error creating Supabase user ${user.email}:`, createError.message);
          continue;
        }
        
        if (!newUser.user) {
             console.error(`Error creating Supabase user ${user.email}: No user returned`);
             continue;
        }

        console.log(`Created Supabase user ${user.email}. ID: ${newUser.user.id}`);
        userId = newUser.user.id;
      }

      // 2. Create/Update profile in Prisma
      // Note: role is an enum in Prisma schema, need to cast or ensure it matches
      const role = user.role === 'ADMIN' ? 'ADMIN' : 'USER';

      const profile = await prisma.profile.upsert({
        where: { id: userId },
        update: {
          full_name: user.full_name,
          role: role,
        },
        create: {
          id: userId,
          full_name: user.full_name,
          role: role,
        },
      });

      console.log(`Synced Prisma profile for ${user.email}. Role: ${profile.role}`);

    } catch (error) {
      console.error(`Failed to process user ${user.email}:`, error);
    }
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
