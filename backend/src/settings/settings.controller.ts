import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateSettingsDto } from './settings.dto';

@Controller('api/settings')
@UseGuards(SupabaseAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findOne(@CurrentUser() user: any) {
    return this.settingsService.findOne(user.id);
  }

  @Put()
  update(@Body() updateSettingsDto: UpdateSettingsDto, @CurrentUser() user: any) {
    return this.settingsService.update(user.id, updateSettingsDto);
  }
}
