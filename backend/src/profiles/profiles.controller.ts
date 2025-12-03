import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ForbiddenException } from '@nestjs/common';
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

  @Post('users')
  @UseGuards(SupabaseAuthGuard)
  async createUser(@Body() data: any, @CurrentUser() user: any) {
    const profile = await this.profilesService.getProfile(user.id);
    if (profile?.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.profilesService.createUser(data);
  }

  @Post('profiles')
  async createProfile(@Body() data: { id: string; full_name: string }) {
    return this.profilesService.createProfile(data);
  }

  @Get('profiles')
  @UseGuards(SupabaseAuthGuard)
  async findAll(@CurrentUser() user: any) {
    const profile = await this.profilesService.getProfile(user.id);
    if (profile?.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.profilesService.findAll();
  }

  @Put('profiles/:id')
  @UseGuards(SupabaseAuthGuard)
  async update(@Param('id') id: string, @Body() data: any, @CurrentUser() user: any) {
    const profile = await this.profilesService.getProfile(user.id);
    if (profile?.role !== 'ADMIN' && user.id !== id) {
       throw new ForbiddenException('Unauthorized');
    }
    return this.profilesService.update(id, data);
  }

  @Delete('profiles/:id')
  @UseGuards(SupabaseAuthGuard)
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    const profile = await this.profilesService.getProfile(user.id);
    if (profile?.role !== 'ADMIN') {
      throw new ForbiddenException('Admin only');
    }
    return this.profilesService.delete(id);
  }
}
