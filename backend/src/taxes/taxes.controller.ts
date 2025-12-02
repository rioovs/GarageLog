import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateTaxDto, UpdateTaxDto } from './taxes.dto';

@Controller('api')
@UseGuards(SupabaseAuthGuard)
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  // Get all taxes for a vehicle
  @Get('vehicles/:vehicleId/taxes')
  findAllByVehicle(@Param('vehicleId') vehicleId: string, @CurrentUser() user: any) {
    return this.taxesService.findAllByVehicle(vehicleId, user.id);
  }

  // Get all taxes for current user
  @Get('taxes')
  findAll(@CurrentUser() user: any) {
    return this.taxesService.findAll(user.id);
  }

  // Get single tax
  @Get('taxes/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.taxesService.findOne(id, user.id);
  }

  // Create tax for a vehicle
  @Post('vehicles/:vehicleId/taxes')
  create(
    @Param('vehicleId') vehicleId: string,
    @Body() createTaxDto: CreateTaxDto,
    @CurrentUser() user: any,
  ) {
    return this.taxesService.create(vehicleId, createTaxDto, user.id);
  }

  // Update tax
  @Put('taxes/:id')
  update(
    @Param('id') id: string,
    @Body() updateTaxDto: UpdateTaxDto,
    @CurrentUser() user: any,
  ) {
    return this.taxesService.update(id, updateTaxDto, user.id);
  }

  // Delete tax
  @Delete('taxes/:id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.taxesService.remove(id, user.id);
  }
}
