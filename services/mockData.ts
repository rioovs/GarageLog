import { UserProfile, UserRole, Vehicle, OwnershipStatus, ServiceRecord, TaxEntry, TaxType, TaxStatus } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  full_name: 'Alex Driver',
  email: 'alex@garagelog.demo',
  role: UserRole.USER
};

export const MOCK_ADMIN: UserProfile = {
  id: 'a1',
  full_name: 'Admin Controller',
  email: 'admin@garagelog.demo',
  role: UserRole.ADMIN
};

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    user_id: 'u1',
    plate_number: 'ABC-1234',
    brand: 'Toyota',
    model: 'Camry Hybrid',
    year: 2020,
    color: 'Silver',
    ownership_status: OwnershipStatus.OWNED,
    purchase_date: '2020-05-15'
  },
  {
    id: 'v2',
    user_id: 'u1',
    plate_number: 'XYZ-9876',
    brand: 'Honda',
    model: 'CR-V',
    year: 2018,
    color: 'White',
    ownership_status: OwnershipStatus.OWNED,
    purchase_date: '2019-01-10'
  },
  {
    id: 'v3',
    user_id: 'u1',
    plate_number: 'MOTO-55',
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2021,
    color: 'Blue',
    ownership_status: OwnershipStatus.SOLD,
    purchase_date: '2021-03-20',
    sold_date: '2023-11-01'
  }
];

export const MOCK_SERVICES: ServiceRecord[] = [
  {
    id: 's1',
    vehicle_id: 'v1',
    service_date: '2023-12-10',
    odometer: 45000,
    workshop_name: 'Official Toyota Center',
    total_cost: 250,
    notes: 'Regular oil change and brake inspection.'
  },
  {
    id: 's2',
    vehicle_id: 'v1',
    service_date: '2023-06-05',
    odometer: 35000,
    workshop_name: 'QuickFix Garage',
    total_cost: 120,
    notes: 'Tire rotation.'
  },
  {
    id: 's3',
    vehicle_id: 'v2',
    service_date: '2024-01-15',
    odometer: 62000,
    workshop_name: 'Honda Pro Services',
    total_cost: 450,
    notes: 'Major service, spark plugs replaced.'
  }
];

export const MOCK_TAXES: TaxEntry[] = [
  {
    id: 't1',
    vehicle_id: 'v1',
    tax_type: TaxType.ANNUAL,
    due_date: '2024-05-15',
    amount: 150,
    status: TaxStatus.PENDING
  },
  {
    id: 't2',
    vehicle_id: 'v2',
    tax_type: TaxType.ANNUAL,
    due_date: '2024-02-01',
    amount: 180,
    status: TaxStatus.OVERDUE
  },
  {
    id: 't3',
    vehicle_id: 'v1',
    tax_type: TaxType.ANNUAL,
    due_date: '2023-05-15',
    amount: 145,
    status: TaxStatus.PAID,
    paid_date: '2023-05-10'
  }
];