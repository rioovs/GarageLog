import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAllByVehicle(vehicleId: string, userId: string) {
    // Verify vehicle ownership
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.serviceRecord.findMany({
      where: { vehicle_id: vehicleId },
      orderBy: { service_date: 'desc' },
      include: {
        service_items: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const service = await this.prisma.serviceRecord.findUnique({
      where: { id },
      include: {
        vehicle: true,
        service_items: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service record not found');
    }

    if (service.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return service;
  }

  async create(vehicleId: string, createServiceDto: CreateServiceDto, userId: string) {
    // Verify vehicle ownership
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.serviceRecord.create({
      data: {
        ...createServiceDto,
        vehicle_id: vehicleId,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, userId: string) {
    const service = await this.prisma.serviceRecord.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!service) {
      throw new NotFoundException('Service record not found');
    }

    if (service.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.serviceRecord.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: string, userId: string) {
    const service = await this.prisma.serviceRecord.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!service) {
      throw new NotFoundException('Service record not found');
    }

    if (service.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.serviceRecord.delete({ where: { id } });
  }
}
