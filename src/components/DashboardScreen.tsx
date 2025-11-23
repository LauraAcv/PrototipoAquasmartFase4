import { Droplet, History, Bell, Settings, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  // Mock data
  const currentFlow = 12.5; // litros/minuto
  const dailyConsumption = 245; // litros
  const dailyLimit = 350; // litros
  const percentage = (dailyConsumption / dailyLimit) * 100;

  const chartData = [
    { name: 'Usado', value: dailyConsumption, color: '#3b82f6' },
    { name: 'Disponible', value: dailyLimit - dailyConsumption, color: '#e5e7eb' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-cyan-600 text-white p-6 rounded-b-3xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white fill-white" strokeWidth={2} />
            </div>
            <h1>AquaSmart</h1>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="text-white/90">Bienvenido de nuevo</p>
          <p className="text-white/80">Viernes, 24 de octubre 2025</p>
        </div>
      </div>

      <div className="p-4 pt-6 space-y-4">
        {/* Real-time Consumption */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
              Consumo en tiempo real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-blue-600">{currentFlow}</span>
                <span className="text-gray-600">L/min</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Sistema activo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Usage Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-600">Uso diario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-center space-y-2 w-full">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-blue-600">{dailyConsumption}</span>
                  <span className="text-gray-600">/ {dailyLimit} litros</span>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-gray-600">
                  {percentage.toFixed(0)}% del límite diario
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" strokeWidth={2} />
            <div>
              <p className="text-yellow-800">Consumo elevado detectado</p>
              <p className="text-yellow-700">Revisa tus alertas para más detalles</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('history')}
            variant="outline"
            className="h-24 flex flex-col gap-2 border-blue-200 hover:bg-blue-50"
          >
            <History className="w-6 h-6 text-blue-600" strokeWidth={2} />
            <span className="text-blue-600">Historial</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('alerts')}
            variant="outline"
            className="h-24 flex flex-col gap-2 border-green-200 hover:bg-green-50 relative"
          >
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            <Bell className="w-6 h-6 text-green-600" strokeWidth={2} />
            <span className="text-green-600">Alertas</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
