import { IsString, IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateServiceDto {
  @IsDateString()
  service_date: string;

  @IsInt()
  @IsOptional()
  odometer?: number;

  @IsString()
  @IsOptional()
  workshop_name?: string;

  @IsNumber()
  @IsOptional()
  total_cost?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateServiceDto {
  @IsDateString()
  @IsOptional()
  service_date?: string;

  @IsInt()
  @IsOptional()
  odometer?: number;

  @IsString()
  @IsOptional()
  workshop_name?: string;

  @IsNumber()
  @IsOptional()
  total_cost?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
