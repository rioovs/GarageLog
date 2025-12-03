'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/components/ui/exports';
import { ArrowLeft, Edit, Plus, Calendar, DollarSign, Wrench, Loader2 } from 'lucide-react';
import Link from 'next/link';


import { useQuery } from '@tanstack/react-query';
import { vehiclesApi } from '@/lib/api/vehicles';
import { servicesApi } from '@/lib/api/services';
import { taxesApi } from '@/lib/api/taxes';
import { useParams } from 'next/navigation';

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: vehicle, isLoading: vehicleLoading } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehiclesApi.getOne(id),
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesApi.getAll(id),
  });

  const { data: taxes, isLoading: taxesLoading } = useQuery({
    queryKey: ['taxes', id],
    queryFn: () => taxesApi.getAll(id),
  });

  if (vehicleLoading || servicesLoading || taxesLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-8 text-red-500">
        Vehicle not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/app/vehicles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-2xl flex items-center gap-3">
            {vehicle.brand} {vehicle.model}
            <Badge variant="outline" className="text-base font-normal">
              {vehicle.plate_number}
            </Badge>
          </h1>
        </div>
        <Link href={`/app/vehicles/${vehicle.id}/edit`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Service History</TabsTrigger>
          <TabsTrigger value="taxes">Tax Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground">Type</div>
                  <div className="font-medium">{vehicle.type}</div>
                  <div className="text-muted-foreground">Year</div>
                  <div className="font-medium">{vehicle.year}</div>
                  <div className="text-muted-foreground">Color</div>
                  <div className="font-medium">{vehicle.color}</div>
                  <div className="text-muted-foreground">Status</div>
                  <div className="font-medium">
                    <Badge variant={vehicle.ownership_status === 'OWNED' ? 'success' : 'secondary'}>
                      {vehicle.ownership_status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Services</p>
                    <p className="text-2xl font-bold">{services?.length || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Cost (Services)</p>
                    <p className="text-2xl font-bold">
                      ${services?.reduce((acc, s) => acc + (s.total_cost || 0), 0) || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service History</CardTitle>
              <Link href={`/app/vehicles/${vehicle.id}/services/new`}>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Workshop</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Odometer</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No service records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{new Date(service.service_date).toLocaleDateString()}</TableCell>
                        <TableCell>{service.workshop_name || '-'}</TableCell>
                        <TableCell>${service.total_cost}</TableCell>
                        <TableCell>{service.odometer} km</TableCell>
                        <TableCell className="max-w-[200px] truncate">{service.notes || '-'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tax Records</CardTitle>
              <Link href={`/app/vehicles/${vehicle.id}/taxes/new`}>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tax
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxes?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No tax records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    taxes?.map((tax) => (
                      <TableRow key={tax.id}>
                        <TableCell className="font-medium">{tax.tax_type}</TableCell>
                        <TableCell>{new Date(tax.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>${tax.amount}</TableCell>
                        <TableCell>
                          <Badge variant={tax.status === 'PAID' ? 'success' : 'warning'}>
                            {tax.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tax.paid_date ? new Date(tax.paid_date).toLocaleDateString() : '-'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
