
"use client"

import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const data = [
  { name: 'Jan', value: 400, value2: 240 },
  { name: 'Feb', value: 300, value2: 139 },
  { name: 'Mar', value: 200, value2: 980 },
  { name: 'Apr', value: 278, value2: 390 },
  { name: 'May', value: 189, value2: 480 },
  { name: 'Jun', value: 239, value2: 380 },
  { name: 'Jul', value: 349, value2: 430 },
]

export function AnalyticsChart() {
  const { t } = useLanguage()

  return (
    <Card className="p-6 border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-bold text-foreground">Activity Analytics</h3>
            <p className="text-sm text-muted-foreground">Vehicle service and tax history</p>
        </div>
        <select className="bg-muted/50 border-none text-sm rounded-md px-3 py-1">
            <option>Last month</option>
            <option>Last year</option>
        </select>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            <Area type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={3} fillOpacity={1} fill="url(#colorValue2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
