import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/VehicleList';
import ServiceLog from './pages/ServiceLog';
import Layout from './components/Layout';
import { UserProfile, UserRole } from './types';
import { MOCK_USER, MOCK_ADMIN, MOCK_TAXES, MOCK_VEHICLES } from './services/mockData';
import { Card, CardContent, CardHeader, CardTitle, Badge } from './components/ui';

// Simple Tax Page (inline for brevity as it follows similar pattern)
const TaxReminders = () => {
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold tracking-tight">Taxes & Reminders</h1>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_TAXES.map((tax: any) => {
                    const vehicle = MOCK_VEHICLES.find((v:any) => v.id === tax.vehicle_id);
                    return (
                        <Card key={tax.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold">{vehicle?.model}</CardTitle>
                                <Badge variant={tax.status === 'OVERDUE' ? 'destructive' : tax.status === 'PAID' ? 'success' : 'warning'}>
                                    {tax.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type:</span>
                                        <span>{tax.tax_type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Due Date:</span>
                                        <span className="font-medium">{tax.due_date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Amount:</span>
                                        <span className="font-bold">${tax.amount}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
             </div>
        </div>
    )
}

const App: React.FC = () => {
  // Simulating Auth State
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = () => {
    // Simulate logging in as a standard user
    setUser(MOCK_USER);
  };
  
  // For demo purposes, quick swap to admin
  const handleAdminLogin = () => {
     setUser(MOCK_ADMIN);
  }

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={
            !user ? (
                <>
                    <LandingPage onLogin={handleLogin} />
                    {/* Demo Control to switch user types easily */}
                    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
                        <button onClick={handleAdminLogin} className="bg-slate-800 text-xs text-white px-3 py-1 rounded shadow">Demo: Login as Admin</button>
                    </div>
                </>
            ) : (
                <Navigate to="/app" replace />
            )
        } />

        {/* Protected App Routes */}
        <Route path="/app" element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="services" element={<ServiceLog />} />
          <Route path="taxes" element={<TaxReminders />} />
          
          {/* Admin Routes */}
          <Route path="admin/users" element={
              user?.role === UserRole.ADMIN ? (
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <Card>
                        <CardContent className="pt-6">
                            <p>Admin Only: User List would go here.</p>
                        </CardContent>
                    </Card>
                </div>
              ) : <Navigate to="/app" />
          } />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;