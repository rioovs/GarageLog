'use client';

import Link from 'next/link';
import { Button, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/components/ui/exports';
import { Plus, MoreHorizontal, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { vehiclesApi } from '@/lib/api/vehicles';
import { Vehicle } from '@/lib/types';

export default function VehiclesPage() {
  const { data: vehicles, isLoading, error } = useQuery({
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

  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading vehicles. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Vehicles</h1>
        <Link href="/app/vehicles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plate Number</TableHead>
                <TableHead>Brand / Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No vehicles found. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                vehicles?.map((vehicle: Vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.plate_number}</TableCell>
                    <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.ownership_status === 'OWNED' ? 'success' : 'secondary'}>
                        {vehicle.ownership_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/app/vehicles/${vehicle.id}`}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
