import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';

enum TaxType {
  ANNUAL = 'ANNUAL',
  FIVE_YEAR = 'FIVE_YEAR',
}

enum TaxStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

export class CreateTaxDto {
  @IsEnum(TaxType)
  tax_type: TaxType;

  @IsDateString  ()
  due_date: string;

  @IsInt()
  @IsOptional()
  reminder_days_before?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsEnum(TaxStatus)
  @IsOptional()
  status?: TaxStatus;

  @IsDateString()
  @IsOptional()
  paid_date?: string;
}

export class UpdateTaxDto {
  @IsEnum(TaxType)
  @IsOptional()
  tax_type?: TaxType;

  @IsDateString()
  @IsOptional()
  due_date?: string;

  @IsInt()
  @IsOptional()
  reminder_days_before?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsEnum(TaxStatus)
  @IsOptional()
  status?: TaxStatus;

  @IsDateString()
  @IsOptional()
  paid_date?: string;
}
