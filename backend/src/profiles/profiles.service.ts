import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ProfilesService {
  private supabase;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

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

  async createUser(data: { email: string; password: string; full_name: string; role: 'USER' | 'ADMIN' }) {
    const { data: authData, error: authError } = await this.supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user');
    }

    // Create profile
    return this.prisma.profile.create({
      data: {
        id: authData.user.id,
        full_name: data.full_name,
        role: data.role,
        is_active: true,
      },
    });
  }

  async findAll() {
    return this.prisma.profile.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Delete from Supabase Auth first
    const { error } = await this.supabase.auth.admin.deleteUser(id);
    if (error) {
      console.error('Failed to delete user from Supabase Auth:', error);
      // Continue to delete from DB anyway to maintain consistency if possible, 
      // or throw error. For now, we'll log and proceed as Prisma cascade might handle it 
      // or we just delete the profile.
    }

    return this.prisma.profile.delete({
      where: { id },
    });
  }
}
