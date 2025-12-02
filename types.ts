export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum OwnershipStatus {
  OWNED = 'OWNED',
  SOLD = 'SOLD'
}

export enum TaxType {
  ANNUAL = 'ANNUAL',
  FIVE_YEAR = 'FIVE_YEAR'
}

export enum TaxStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
}

export interface Vehicle {
  id: string;
  user_id: string;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  ownership_status: OwnershipStatus;
  purchase_date?: string;
  sold_date?: string;
}

export interface ServiceRecord {
  id: string;
  vehicle_id: string;
  service_date: string;
  odometer: number;
  workshop_name: string;
  total_cost: number;
  notes: string;
}

export interface TaxEntry {
  id: string;
  vehicle_id: string;
  tax_type: TaxType;
  due_date: string;
  amount: number;
  status: TaxStatus;
  paid_date?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}