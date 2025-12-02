import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.dto';

@Controller('api/vehicles')
@UseGuards(SupabaseAuthGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.vehiclesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.vehiclesService.findOne(id, user.id);
  }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto, @CurrentUser() user: any) {
    return this.vehiclesService.create(createVehicleDto, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @CurrentUser() user: any,
  ) {
    return this.vehiclesService.update(id, updateVehicleDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.vehiclesService.remove(id, user.id);
  }
}
