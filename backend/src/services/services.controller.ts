import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateServiceDto, UpdateServiceDto } from './services.dto';

@Controller('api')
@UseGuards(SupabaseAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Get all services for a vehicle
  @Get('vehicles/:vehicleId/services')
  findAllByVehicle(@Param('vehicleId') vehicleId: string, @CurrentUser() user: any) {
    return this.servicesService.findAllByVehicle(vehicleId, user.id);
  }

  // Get single service
  @Get('services/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.servicesService.findOne(id, user.id);
  }

  // Create service for a vehicle
  @Post('vehicles/:vehicleId/services')
  create(
    @Param('vehicleId') vehicleId: string,
    @Body() createServiceDto: CreateServiceDto,
    @CurrentUser() user: any,
  ) {
    return this.servicesService.create(vehicleId, createServiceDto, user.id);
  }

  // Update service
  @Put('services/:id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @CurrentUser() user: any,
  ) {
    return this.servicesService.update(id, updateServiceDto, user.id);
  }

  // Delete service
  @Delete('services/:id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.servicesService.remove(id, user.id);
  }
}
