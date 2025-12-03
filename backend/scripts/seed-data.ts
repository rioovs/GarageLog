
import { PrismaClient, VehicleType, OwnershipStatus, ServiceItemType, TaxType, TaxStatus } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { createClient } from '@supabase/supabase-js';

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

const BRANDS = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Tesla', 'Hyundai', 'Kia', 'Mazda', 'Nissan'];
const MODELS = ['Camry', 'Civic', 'F-150', '3 Series', 'C-Class', 'Model 3', 'Elantra', 'Sportage', 'CX-5', 'Altima'];
const COLORS = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Grey', 'Green'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log(`Seeding data for ${TARGET_EMAIL}...`);

  // 1. Find the user ID from Supabase
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  const user = users.users.find(u => u.email === TARGET_EMAIL);
  
  if (!user) {
    console.error(`User ${TARGET_EMAIL} not found in Supabase. Please run create-test-users.ts first.`);
    process.exit(1);
  }

  const userId = user.id;
  console.log(`Found user ID for ${TARGET_EMAIL}: ${userId}`);

  // Verify profile exists in Prisma
  const profile = await prisma.profile.findUnique({ where: { id: userId } });
  if (!profile) {
      console.error(`Profile for user ID ${userId} not found in local DB. Syncing now...`);
      // Create profile if missing
      await prisma.profile.create({
        data: {
          id: userId,
          full_name: 'Test User 1',
          role: 'USER',
        }
      });
      console.log('Created missing profile.');
  } else {
      console.log(`Found profile: ${profile.full_name} (${profile.id})`);
  }

  // 2. Generate 100 Vehicles
  for (let i = 0; i < 100; i++) {
    const brand = randomElement(BRANDS);
    const model = randomElement(MODELS);
    const type = Math.random() > 0.3 ? VehicleType.CAR : VehicleType.MOTORCYCLE;
    const year = 2010 + Math.floor(Math.random() * 15);
    
    const vehicle = await prisma.vehicle.create({
      data: {
        user_id: userId,
        plate_number: `${randomElement(['B', 'D', 'F'])} ${Math.floor(1000 + Math.random() * 9000)} ${randomElement(['XY', 'AB', 'CD'])}`,
        brand,
        model,
        type,
        year,
        color: randomElement(COLORS),
        ownership_status: OwnershipStatus.OWNED,
        purchase_date: randomDate(new Date(2020, 0, 1), new Date()),
      }
    });

    // 3. Generate Service Records (0-3 per vehicle)
    const numServices = Math.floor(Math.random() * 4);
    for (let j = 0; j < numServices; j++) {
      await prisma.serviceRecord.create({
        data: {
          vehicle_id: vehicle.id,
          service_date: randomDate(new Date(2023, 0, 1), new Date()),
          odometer: 10000 + Math.floor(Math.random() * 50000),
          workshop_name: 'AutoFix Garage',
          total_cost: 50 + Math.floor(Math.random() * 500),
          notes: 'Routine maintenance',
          service_items: {
            create: [
              {
                item_type: ServiceItemType.OIL,
                item_name: 'Engine Oil',
                quantity: 1,
                unit_price: 50,
                subtotal: 50
              }
            ]
          }
        }
      });
    }

    // 4. Generate Tax Records (1-2 per vehicle)
    const numTaxes = 1 + Math.floor(Math.random() * 2);
    for (let k = 0; k < numTaxes; k++) {
      const isPaid = Math.random() > 0.3;
      const dueDate = randomDate(new Date(2024, 0, 1), new Date(2026, 0, 1));
      
      await prisma.vehicleTax.create({
        data: {
          vehicle_id: vehicle.id,
          tax_type: TaxType.ANNUAL,
          due_date: dueDate,
          amount: 100 + Math.floor(Math.random() * 200),
          status: isPaid ? TaxStatus.PAID : (dueDate < new Date() ? TaxStatus.OVERDUE : TaxStatus.PENDING),
          paid_date: isPaid ? randomDate(new Date(2024, 0, 1), dueDate) : null,
        }
      });
    }
    
    if (i % 10 === 0) process.stdout.write('.');
  }

  console.log('\nSuccessfully generated 100 vehicles with records.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
