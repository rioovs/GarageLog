import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('api')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  getMe(@CurrentUser() user: any) {
    return this.profilesService.getProfile(user.id);
  }

  @Post('profiles')
  async createProfile(@Body() data: { id: string; full_name: string }) {
    return this.profilesService.createProfile(data);
  }
}
