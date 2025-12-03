'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Car, AlertCircle, Wrench, DollarSign, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { vehiclesApi } from '@/lib/api/vehicles';
import { Vehicle } from '@/lib/types';

export default function DashboardPage() {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehiclesApi.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const activeVehicles = vehicles?.filter(v => v.ownership_status === 'OWNED').length || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Total managed vehicles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Taxes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Feature coming soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Services</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Feature coming soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground">
              Feature coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Your Vehicles</CardTitle>
              <p className="text-sm text-muted-foreground">
                Overview of your current fleet.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicles?.slice(0, 5).map((vehicle: Vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{vehicle.brand} {vehicle.model}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.plate_number}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-xs px-2 py-1 rounded-full ${vehicle.ownership_status === 'OWNED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {vehicle.ownership_status}
                    </div>
                  </div>
                </div>
              ))}
              {(!vehicles || vehicles.length === 0) && (
                <p className="text-sm text-muted-foreground">No vehicles found.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               <p className="text-sm text-muted-foreground">Activity log coming soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
