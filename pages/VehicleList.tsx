import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Label, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Select } from '../components/ui';
import { MOCK_VEHICLES } from '../services/mockData';
import { OwnershipStatus, Vehicle } from '../types';
import { Plus, Search, Filter } from 'lucide-react';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [filter, setFilter] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Form State
  const initialFormState = {
    plate_number: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    ownership_status: OwnershipStatus.OWNED
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredVehicles = vehicles.filter(v => 
    v.model.toLowerCase().includes(filter.toLowerCase()) || 
    v.plate_number.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = () => {
    if (!formData.brand || !formData.model || !formData.plate_number) {
        alert("Please fill in Brand, Model and Plate Number.");
        return;
    }

    const newVehicle: Vehicle = {
      id: `v${Date.now()}`,
      user_id: 'current-user', // In a real app, get from auth context
      plate_number: formData.plate_number,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      color: formData.color,
      ownership_status: formData.ownership_status as OwnershipStatus,
      purchase_date: new Date().toISOString().split('T')[0]
    };

    setVehicles(prev => [newVehicle, ...prev]);
    setIsAddOpen(false);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
          <p className="text-muted-foreground">Manage your garage inventory.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by model or plate..." 
            className="pl-8" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{vehicle.brand} {vehicle.model}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{vehicle.year} • {vehicle.color}</p>
                </div>
                <Badge variant={vehicle.ownership_status === OwnershipStatus.OWNED ? 'default' : 'secondary'}>
                  {vehicle.ownership_status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Plate Number</p>
                  <p className="font-medium">{vehicle.plate_number}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Purchased</p>
                  <p className="font-medium">{vehicle.purchase_date || '-'}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{vehicle.ownership_status}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="font-medium truncate">{vehicle.id}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">Edit</Button>
                <Button variant="secondary" className="flex-1">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input id="brand" name="brand" placeholder="e.g. Toyota" value={formData.brand} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input id="model" name="model" placeholder="e.g. Camry" value={formData.model} onChange={handleInputChange} />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="plate_number">Plate Number</Label>
                        <Input id="plate_number" name="plate_number" placeholder="ABC-1234" value={formData.plate_number} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" name="color" placeholder="e.g. Silver" value={formData.color} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ownership_status">Ownership Status</Label>
                        <Select id="ownership_status" name="ownership_status" value={formData.ownership_status} onChange={handleInputChange}>
                            <option value={OwnershipStatus.OWNED}>Owned</option>
                            <option value={OwnershipStatus.SOLD}>Sold</option>
                        </Select>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAddVehicle}>Save Vehicle</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleList;