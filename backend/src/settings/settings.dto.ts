import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  @IsIn(['en', 'id'])
  language?: string;

  @IsOptional()
  @IsString()
  @IsIn(['light', 'dark', 'system'])
  theme?: string;
}
