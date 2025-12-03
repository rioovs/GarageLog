import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string) {
    let settings = await this.prisma.setting.findUnique({
      where: { user_id: userId },
    });

    if (!settings) {
      settings = await this.prisma.setting.create({
        data: {
          user_id: userId,
        },
      });
    }

    return settings;
  }

  async update(userId: string, data: UpdateSettingsDto) {
    // Ensure settings exist
    await this.findOne(userId);

    return this.prisma.setting.update({
      where: { user_id: userId },
      data,
    });
  }
}
