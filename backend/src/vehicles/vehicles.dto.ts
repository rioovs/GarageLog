import { IsString, IsInt, IsEnum, IsOptional, IsDateString } from 'class-validator';

enum VehicleType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  OTHER = 'OTHER',
}

enum OwnershipStatus {
  OWNED = 'OWNED',
  SOLD = 'SOLD',
}

export class CreateVehicleDto {
  @IsString()
  plate_number: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsEnum(VehicleType)
  @IsOptional()
  type?: VehicleType;

  @IsInt()
  year: number;

  @IsString()
  color: string;

  @IsString()
  @IsOptional()
  owner_name?: string;

  @IsEnum(OwnershipStatus)
  @IsOptional()
  ownership_status?: OwnershipStatus;

  @IsDateString()
  @IsOptional()
  purchase_date?: string;

  @IsDateString()
  @IsOptional()
  sold_date?: string;
}

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  plate_number?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsEnum(VehicleType)
  @IsOptional()
  type?: VehicleType;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  owner_name?: string;

  @IsEnum(OwnershipStatus)
  @IsOptional()
  ownership_status?: OwnershipStatus;

  @IsDateString()
  @IsOptional()
  purchase_date?: string;

  @IsDateString()
  @IsOptional()
  sold_date?: string;
}
