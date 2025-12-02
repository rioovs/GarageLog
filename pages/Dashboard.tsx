import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';
import { MOCK_VEHICLES, MOCK_SERVICES, MOCK_TAXES } from '../services/mockData';
import { OwnershipStatus, TaxStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle2, DollarSign, Car as CarIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const activeVehicles = MOCK_VEHICLES.filter(v => v.ownership_status === OwnershipStatus.OWNED);
  const pendingTaxes = MOCK_TAXES.filter(t => t.status !== TaxStatus.PAID);
  const overdueTaxes = pendingTaxes.filter(t => t.status === TaxStatus.OVERDUE);
  
  const totalServiceCost = MOCK_SERVICES.reduce((acc, curr) => acc + curr.total_cost, 0);

  // Prepare data for the chart (Service cost by Vehicle)
  const chartData = activeVehicles.map(vehicle => {
    const cost = MOCK_SERVICES
      .filter(s => s.vehicle_id === vehicle.id)
      .reduce((sum, s) => sum + s.total_cost, 0);
    return {
      name: vehicle.model,
      cost: cost
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <CarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVehicles.length}</div>
            <p className="text-xs text-muted-foreground">Currently in garage</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Taxes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTaxes.length}</div>
            <p className="text-xs text-red-500 font-medium">
              {overdueTaxes.length > 0 ? `${overdueTaxes.length} Overdue!` : 'All upcoming'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Service Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalServiceCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime across active vehicles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Health</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">Last service 30 days ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Maintenance Cost by Vehicle</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="cost" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming & Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTaxes.length === 0 && <p className="text-sm text-muted-foreground">No pending taxes.</p>}
              {pendingTaxes.map(tax => {
                const vehicle = MOCK_VEHICLES.find(v => v.id === tax.vehicle_id);
                return (
                  <div key={tax.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{vehicle?.model} ({vehicle?.plate_number})</p>
                      <p className="text-xs text-muted-foreground">{tax.tax_type} Tax</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-bold">${tax.amount}</span>
                        <Badge variant={tax.status === TaxStatus.OVERDUE ? 'destructive' : 'warning'}>
                            {tax.status === TaxStatus.OVERDUE ? 'Overdue' : `Due ${tax.due_date}`}
                        </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;