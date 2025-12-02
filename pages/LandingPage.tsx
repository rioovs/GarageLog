import React from 'react';
import { Button } from '../components/ui';
import { Car, ShieldCheck, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onLogin();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Car /> GarageLog
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#how-it-works" className="hover:text-primary">How it works</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleStart}>Log in</Button>
          <Button onClick={handleStart}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          The digital garage for <br className="hidden md:block" />
          <span className="text-primary">all your vehicles</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Track maintenance, manage tax deadlines, and keep a complete history of your cars and motorcycles in one simple dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="gap-2" onClick={handleStart}>
            Start for free <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="border-y bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-900">2,000+</div>
            <div className="text-sm text-slate-500 mt-1">Vehicles Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">15,000+</div>
            <div className="text-sm text-slate-500 mt-1">Service Logs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">99.9%</div>
            <div className="text-sm text-slate-500 mt-1">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">$0</div>
            <div className="text-sm text-slate-500 mt-1">To Start</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-slate-500">Powerful features to keep your fleet running smoothly.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Tax Reminders</h3>
            <p className="text-slate-500">Never miss an annual or 5-year tax deadline again. We'll notify you before it's due.</p>
          </div>
          <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Service History</h3>
            <p className="text-slate-500">Log every oil change, repair, and modification. Great for resale value.</p>
          </div>
          <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-User Access</h3>
            <p className="text-slate-500">Perfect for families. Admins can manage users and vehicles in one place.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <Car /> GarageLog
            </div>
            <p className="max-w-xs text-sm">
              Making vehicle management simple for households and enthusiasts.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;