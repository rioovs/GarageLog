import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
import { MOCK_VEHICLES, MOCK_SERVICES } from '../services/mockData';
import { Plus, Wrench } from 'lucide-react';

const ServiceLog: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('all');

  const filteredServices = selectedVehicleId === 'all' 
    ? MOCK_SERVICES 
    : MOCK_SERVICES.filter(s => s.vehicle_id === selectedVehicleId);

  // Sort by date desc
  const sortedServices = [...filteredServices].sort((a, b) => 
    new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Log</h1>
          <p className="text-muted-foreground">Track maintenance history.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Log Service
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
            variant={selectedVehicleId === 'all' ? 'default' : 'outline'} 
            onClick={() => setSelectedVehicleId('all')}
        >
            All Vehicles
        </Button>
        {MOCK_VEHICLES.map(v => (
             <Button 
                key={v.id}
                variant={selectedVehicleId === v.id ? 'default' : 'outline'} 
                onClick={() => setSelectedVehicleId(v.id)}
            >
                {v.model}
            </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
                {sortedServices.map((service) => {
                    const vehicle = MOCK_VEHICLES.find(v => v.id === service.vehicle_id);
                    return (
                        <div key={service.id} className="flex flex-col md:flex-row gap-4 border-l-2 border-slate-200 pl-4 relative">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-200 border-2 border-white"></div>
                            <div className="min-w-[150px]">
                                <p className="text-sm font-bold text-slate-900">{service.service_date}</p>
                                <p className="text-xs text-slate-500">{service.odometer.toLocaleString()} km</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-base">{vehicle?.brand} {vehicle?.model}</h4>
                                    <Badge variant="secondary" className="text-xs font-normal">{service.workshop_name}</Badge>
                                </div>
                                <p className="text-sm text-slate-600">{service.notes}</p>
                            </div>
                             <div className="font-bold text-slate-900">
                                ${service.total_cost}
                            </div>
                        </div>
                    )
                })}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceLog;