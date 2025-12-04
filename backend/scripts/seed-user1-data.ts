
import { PrismaClient, VehicleType, OwnershipStatus, ServiceItemType, TaxType, TaxStatus } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const TARGET_EMAIL = 'user1@example.com';
const TARGET_USER_ID = 'ae53a42d-9447-481e-ab2d-33f2fe3418a4'; // From TEST_USERS.md

const BRANDS = ['Toyota', 'Honda', 'Mitsubishi', 'Suzuki', 'Daihatsu', 'Hyundai', 'Wuling', 'Kia', 'Mazda', 'Nissan'];
const MODELS = ['Avanza', 'Innova', 'Xpander', 'Ertiga', 'Sigra', 'Stargazer', 'Confero', 'Sonet', 'CX-5', 'Livina'];
const COLORS = ['Hitam', 'Putih', 'Silver', 'Abu-abu', 'Merah', 'Biru', 'Coklat'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log(`Seeding data for ${TARGET_EMAIL} (${TARGET_USER_ID})...`);

  // 1. Delete existing data for this user
  console.log('Deleting existing data...');
  
  // Delete taxes
  await prisma.vehicleTax.deleteMany({
    where: {
      vehicle: {
        user_id: TARGET_USER_ID
      }
    }
  });

  // Delete service items and records
  // Need to find service records first to delete items
  const userVehicles = await prisma.vehicle.findMany({
    where: { user_id: TARGET_USER_ID },
    select: { id: true }
  });
  
  const vehicleIds = userVehicles.map(v => v.id);
  
  const serviceRecords = await prisma.serviceRecord.findMany({
    where: { vehicle_id: { in: vehicleIds } },
    select: { id: true }
  });
  
  const serviceRecordIds = serviceRecords.map(s => s.id);

  await prisma.serviceItem.deleteMany({
    where: { service_record_id: { in: serviceRecordIds } }
  });

  await prisma.serviceRecord.deleteMany({
    where: { vehicle_id: { in: vehicleIds } }
  });

  // Delete vehicles
  await prisma.vehicle.deleteMany({
    where: { user_id: TARGET_USER_ID }
  });

  console.log('Existing data deleted.');

  // 2. Generate 50 Vehicles
  console.log('Generating 50 new vehicles...');
  
  for (let i = 0; i < 50; i++) {
    const brand = randomElement(BRANDS);
    const model = randomElement(MODELS);
    const type = Math.random() > 0.2 ? VehicleType.CAR : VehicleType.MOTORCYCLE;
    const year = 2015 + Math.floor(Math.random() * 10);
    
    // Indonesian Plate Number Format: B 1234 XYZ
    const plate = `${randomElement(['B', 'D', 'F', 'AB', 'AD'])} ${Math.floor(1000 + Math.random() * 9000)} ${randomElement(['XY', 'AB', 'CD', 'EF', 'GH'])}`;
    
    const vehicle = await prisma.vehicle.create({
      data: {
        user_id: TARGET_USER_ID,
        plate_number: plate,
        brand,
        model,
        type,
        year,
        color: randomElement(COLORS),
        ownership_status: OwnershipStatus.OWNED,
        purchase_date: randomDate(new Date(2020, 0, 1), new Date()),
      }
    });

    // 3. Generate Service Records (0-5 per vehicle)
    const numServices = Math.floor(Math.random() * 6);
    for (let j = 0; j < numServices; j++) {
      // Costs in IDR (e.g., 500,000 to 5,000,000)
      const serviceCost = (500 + Math.floor(Math.random() * 4500)) * 1000; 
      
      await prisma.serviceRecord.create({
        data: {
          vehicle_id: vehicle.id,
          service_date: randomDate(new Date(2023, 0, 1), new Date()),
          odometer: 10000 + Math.floor(Math.random() * 50000),
          workshop_name: 'Bengkel Maju Jaya',
          total_cost: serviceCost,
          notes: 'Servis Rutin',
          service_items: {
            create: [
              {
                item_type: ServiceItemType.OIL,
                item_name: 'Ganti Oli Mesin',
                quantity: 1,
                unit_price: serviceCost,
                subtotal: serviceCost
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
      // Tax amount in IDR (e.g., 1,500,000 to 8,000,000)
      const taxAmount = (1500 + Math.floor(Math.random() * 6500)) * 1000;
      
      await prisma.vehicleTax.create({
        data: {
          vehicle_id: vehicle.id,
          tax_type: TaxType.ANNUAL,
          due_date: dueDate,
          amount: taxAmount,
          status: isPaid ? TaxStatus.PAID : (dueDate < new Date() ? TaxStatus.OVERDUE : TaxStatus.PENDING),
          paid_date: isPaid ? randomDate(new Date(2024, 0, 1), dueDate) : null,
        }
      });
    }
    
    if (i % 10 === 0) process.stdout.write('.');
  }

  console.log('\nSuccessfully generated 50 vehicles with records for user1.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
