'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'id';

type Translations = {
  [key: string]: string | Translations;
};

const dictionaries: Record<Language, Translations> = {
  en: {
    nav: {
      features: 'Features',
      testimonials: 'Testimonials',
      pricing: 'Pricing',
      login: 'Login',
      signup: 'Sign Up',
    },
    hero: {
      badge: 'Vehicle Management Made Simple',
      title: 'Track Maintenance, Taxes, and Costs in One Place',
      description: 'Never miss a tax deadline or service appointment again. GarageLog helps you organize all your vehicle data effortlessly.',
      getStarted: 'Get Started — It’s FREE',
      viewDashboard: 'View Dashboard',
      free: 'Free for individuals',
      secure: 'Secure data',
    },
    features: {
      badge: 'Features',
      title: 'Smarter reminders that keep you on track.',
      description: 'Stop worrying about when your next oil change is due or if you paid your vehicle tax. We handle the tracking so you can drive with peace of mind.',
      tax: { title: 'Tax Reminders', desc: 'Get notified before your vehicle tax is due. Avoid fines and late fees.' },
      service: { title: 'Service History', desc: 'Keep a digital log of all maintenance. Great for resale value.' },
      cost: { title: 'Cost Tracking', desc: 'See exactly how much you spend on your vehicle each year.' },
      ownership: { title: 'Ownership Status', desc: 'Track active and sold vehicles. Keep historical records organized.' },
    },
    stats: {
      vehicles: 'Vehicles Managed',
      costs: 'Costs Tracked',
      records: 'Service Records',
      missed: 'Missed Deadlines',
    },
    testimonials: {
      title: 'Trusted by Car Owners',
      subtitle: 'See what our users are saying about GarageLog.',
    },
    cta: {
      title: 'Ready to never miss a tax payment again?',
      subtitle: 'Join hundreds of users who trust GarageLog for their vehicle management.',
      button: 'Get Started in 2 Minutes',
    },
    footer: {
      desc: 'The simple way to manage your vehicles, track costs, and stay compliant.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
    }
  },
  id: {
    nav: {
      features: 'Fitur',
      testimonials: 'Testimoni',
      pricing: 'Harga',
      login: 'Masuk',
      signup: 'Daftar',
    },
    hero: {
      badge: 'Manajemen Kendaraan Jadi Mudah',
      title: 'Pantau Perawatan, Pajak, dan Biaya di Satu Tempat',
      description: 'Jangan pernah lewatkan tenggat pajak atau jadwal servis lagi. GarageLog membantu Anda mengatur semua data kendaraan dengan mudah.',
      getStarted: 'Mulai Sekarang — GRATIS',
      viewDashboard: 'Lihat Dashboard',
      free: 'Gratis untuk individu',
      secure: 'Data aman',
    },
    features: {
      badge: 'Fitur',
      title: 'Pengingat pintar yang menjaga Anda tetap teratur.',
      description: 'Berhenti khawatir kapan ganti oli berikutnya atau apakah pajak kendaraan sudah dibayar. Kami menanganinya agar Anda bisa berkendara dengan tenang.',
      tax: { title: 'Pengingat Pajak', desc: 'Dapatkan notifikasi sebelum pajak kendaraan jatuh tempo. Hindari denda.' },
      service: { title: 'Riwayat Servis', desc: 'Simpan catatan digital semua perawatan. Bagus untuk nilai jual kembali.' },
      cost: { title: 'Pelacakan Biaya', desc: 'Lihat dengan tepat berapa banyak pengeluaran kendaraan Anda setiap tahun.' },
      ownership: { title: 'Status Kepemilikan', desc: 'Lacak kendaraan aktif dan yang sudah terjual. Simpan arsip sejarah.' },
    },
    stats: {
      vehicles: 'Kendaraan Dikelola',
      costs: 'Biaya Terlacak',
      records: 'Catatan Servis',
      missed: 'Tenggat Terlewat',
    },
    testimonials: {
      title: 'Dipercaya oleh Pemilik Mobil',
      subtitle: 'Lihat apa kata pengguna kami tentang GarageLog.',
    },
    cta: {
      title: 'Siap untuk tidak pernah melewatkan pembayaran pajak lagi?',
      subtitle: 'Bergabunglah dengan ratusan pengguna yang mempercayai GarageLog.',
      button: 'Mulai dalam 2 Menit',
    },
    footer: {
      desc: 'Cara mudah untuk mengelola kendaraan, melacak biaya, dan tetap patuh.',
      product: 'Produk',
      company: 'Perusahaan',
      support: 'Dukungan',
    }
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = dictionaries[language];
    
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
