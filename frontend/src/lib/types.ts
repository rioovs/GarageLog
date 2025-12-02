// Enums
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum OwnershipStatus {
  OWNED = 'OWNED',
  SOLD = 'SOLD'
}

export enum VehicleType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  OTHER = 'OTHER'
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

// Interfaces
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
}

export interface Vehicle {
  id: string;
  user_id: string;
  plate_number: string;
  brand: string;
  model: string;
  type?: VehicleType;
  year: number;
  color: string;
  owner_name?: string;
  ownership_status: OwnershipStatus;
  purchase_date?: string;
  sold_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceRecord {
  id: string;
  vehicle_id: string;
  service_date: string;
  odometer?: number;
  workshop_name?: string;
  total_cost?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaxEntry {
  id: string;
  vehicle_id: string;
  tax_type: TaxType;
  due_date: string;
  reminder_days_before?: number;
  amount?: number;
  status: TaxStatus;
  paid_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
