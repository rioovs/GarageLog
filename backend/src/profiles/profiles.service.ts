import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.profile.findUnique({
      where: { id: userId },
    });
  }

  async createProfile(data: { id: string; full_name: string }) {
    return this.prisma.profile.create({
      data: {
        id: data.id,
        full_name: data.full_name,
      },
    });
  }
}
