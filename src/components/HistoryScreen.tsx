import { useState } from 'react';
import { ArrowLeft, Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  // Mock data
  const weeklyData = [
    { day: 'Lun', consumption: 320 },
    { day: 'Mar', consumption: 280 },
    { day: 'Mié', consumption: 310 },
    { day: 'Jue', consumption: 295 },
    { day: 'Vie', consumption: 245 },
    { day: 'Sáb', consumption: 380 },
    { day: 'Dom', consumption: 350 },
  ];

  const monthlyData = [
    { week: 'Sem 1', consumption: 2100 },
    { week: 'Sem 2', consumption: 1950 },
    { week: 'Sem 3', consumption: 2200 },
    { week: 'Sem 4', consumption: 1800 },
  ];

  const data = period === 'week' ? weeklyData : monthlyData;
  const total = data.reduce((sum, item) => sum + item.consumption, 0);
  const average = Math.round(total / data.length);
  const trend = data[data.length - 1].consumption > data[0].consumption ? 'up' : 'down';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-cyan-600 text-white p-6 rounded-b-3xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <h2>Historial de consumo</h2>
        </div>
      </div>

      <div className="p-4 pt-6 space-y-4">
        {/* Period Selector */}
        <Tabs value={period} onValueChange={(v) => setPeriod(v as 'week' | 'month')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger value="week">Semanal</TabsTrigger>
            <TabsTrigger value="month">Mensual</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-gray-600">Total</p>
                <p className="text-blue-600">{total} L</p>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-500" strokeWidth={2} />
                  <span>{period === 'week' ? 'Esta semana' : 'Este mes'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-gray-600">Promedio</p>
                <p className="text-green-600">{average} L</p>
                <div className="flex items-center gap-1">
                  {trend === 'down' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-green-500" strokeWidth={2} />
                      <span className="text-green-500">Mejorando</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 text-red-500" strokeWidth={2} />
                      <span className="text-red-500">Aumentando</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-600">
              Gráfica de consumo {period === 'week' ? 'semanal' : 'mensual'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey={period === 'week' ? 'day' : 'week'} 
                    stroke="#6b7280"
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} L`, 'Consumo']}
                  />
                  <Bar 
                    dataKey="consumption" 
                    fill="#3b82f6" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Filter Button */}
        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" strokeWidth={2} />
          Filtrar por fechas
        </Button>
      </div>
    </div>
  );
}
