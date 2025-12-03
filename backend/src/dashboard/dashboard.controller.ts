
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(SupabaseAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboardData(@Request() req) {
    console.log('Dashboard request for user:', req.user.id);
    return this.dashboardService.getStats(req.user.id);
  }
}
