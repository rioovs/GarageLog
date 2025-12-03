import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.vehicle.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async getOptions(userId: string) {
    const brands = await this.prisma.vehicle.findMany({
      where: { user_id: userId },
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    });

    const models = await this.prisma.vehicle.findMany({
      where: { user_id: userId },
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' },
    });

    return {
      brands: brands.map(b => b.brand),
      models: models.map(m => m.model),
    };
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        service_records: {
          orderBy: { service_date: 'desc' },
          take: 10,
        },
        vehicle_taxes: {
          orderBy: { due_date: 'desc' },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return vehicle;
  }

  async create(createVehicleDto: CreateVehicleDto, userId: string) {
    return this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        user_id: userId,
      },
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto, userId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.vehicle.delete({ where: { id } });
  }
}
