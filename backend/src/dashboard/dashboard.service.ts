
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: string) {
    const [
      activeVehiclesCount,
      upcomingTaxesCount,
      upcomingServicesCount, // This might be harder to calculate without specific logic, we'll approximate or query
      recentServices,
      upcomingTasks
    ] = await Promise.all([
      // 1. Active Vehicles
      this.prisma.vehicle.count({
        where: {
          user_id: userId,
          ownership_status: 'OWNED',
        },
      }),

      // 2. Upcoming Taxes (next 30 days)
      this.prisma.vehicleTax.count({
        where: {
          vehicle: { user_id: userId },
          status: 'PENDING',
          due_date: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // 3. Upcoming Services (placeholder logic: vehicles with no service in last 6 months? or just 0 for now)
      // For now, let's just return 0 or implement a basic check if we had "next_service_date"
      Promise.resolve(0),

      // 4. Recent Services (last 5)
      this.prisma.serviceRecord.findMany({
        where: {
          vehicle: { user_id: userId },
        },
        orderBy: {
          service_date: 'desc',
        },
        take: 5,
        include: {
          vehicle: {
            select: {
              brand: true,
              model: true,
              plate_number: true,
            },
          },
          service_items: true, // to get service name/description
        },
      }),

      // 5. Upcoming Tasks List (Taxes due soon)
      this.prisma.vehicleTax.findMany({
        where: {
          vehicle: { user_id: userId },
          status: 'PENDING',
          due_date: {
            gte: new Date(),
          },
        },
        orderBy: {
          due_date: 'asc',
        },
        take: 5,
        include: {
          vehicle: {
            select: {
              brand: true,
              model: true,
            },
          },
        },
      }),
    ]);

    // Format Recent Services
    const formattedRecentServices = recentServices.map(record => ({
      id: record.id,
      vehicle: `${record.vehicle.brand} ${record.vehicle.model}`,
      service: record.service_items[0]?.item_name || 'Service', // Take first item as title
      date: record.service_date.toISOString().split('T')[0],
    }));

    // Format Upcoming Tasks
    const formattedUpcomingTasks = upcomingTasks.map(tax => ({
      id: tax.id,
      vehicle: `${tax.vehicle.brand} ${tax.vehicle.model}`,
      task: `Tax Renewal`,
      date: tax.due_date.toISOString().split('T')[0],
      status: 'upcoming',
    }));

    return {
      stats: [
        { label: "Active Vehicles", value: activeVehiclesCount.toString(), icon: "🚗" },
        { label: "Upcoming Tasks", value: (upcomingTaxesCount).toString(), icon: "📋" }, // + upcomingServicesCount
        { label: "Tax Records", value: upcomingTaxesCount.toString(), icon: "📄" }, // Maybe total tax records? Or pending? Let's use pending for now.
      ],
      upcomingTasks: formattedUpcomingTasks,
      recentServices: formattedRecentServices,
    };
  }
}
