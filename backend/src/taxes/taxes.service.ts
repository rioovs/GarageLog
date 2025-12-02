import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaxDto, UpdateTaxDto } from './taxes.dto';

@Injectable()
export class TaxesService {
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

    return this.prisma.vehicleTax.findMany({
      where: { vehicle_id: vehicleId },
      orderBy: { due_date: 'desc' },
    });
  }

  async findAll(userId: string) {
    return this.prisma.vehicleTax.findMany({
      where: {
        vehicle: {
          user_id: userId,
        },
      },
      include: {
        vehicle: {
          select: {
            id: true,
            brand: true,
            model: true,
            plate_number: true,
          },
        },
      },
      orderBy: { due_date: 'asc' },
    });
  }

  async findOne(id: string, userId: string) {
    const tax = await this.prisma.vehicleTax.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!tax) {
      throw new NotFoundException('Tax entry not found');
    }

    if (tax.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return tax;
  }

  async create(vehicleId: string, createTaxDto: CreateTaxDto, userId: string) {
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

    return this.prisma.vehicleTax.create({
      data: {
        ...createTaxDto,
        vehicle_id: vehicleId,
      },
    });
  }

  async update(id: string, updateTaxDto: UpdateTaxDto, userId: string) {
    const tax = await this.prisma.vehicleTax.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!tax) {
      throw new NotFoundException('Tax entry not found');
    }

    if (tax.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.vehicleTax.update({
      where: { id },
      data: updateTaxDto,
    });
  }

  async remove(id: string, userId: string) {
    const tax = await this.prisma.vehicleTax.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!tax) {
      throw new NotFoundException('Tax entry not found');
    }

    if (tax.vehicle.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.vehicleTax.delete({ where: { id } });
  }
}
