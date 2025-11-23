import { ArrowLeft, AlertTriangle, Droplets, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AlertsScreenProps {
  onBack: () => void;
}

interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  title: string;
  description: string;
  time: string;
  icon: 'leak' | 'excessive' | 'normal';
}

export function AlertsScreen({ onBack }: AlertsScreenProps) {
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'critical',
      title: 'Posible fuga detectada',
      description: 'Se detectó un flujo constante de 3.2 L/min durante 4 horas sin actividad registrada.',
      time: 'Hace 2 horas',
      icon: 'leak',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Consumo excesivo',
      description: 'Has superado el 85% de tu límite diario recomendado de agua.',
      time: 'Hace 5 horas',
      icon: 'excessive',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Pico de consumo inusual',
      description: 'Se registró un pico de 45 L/min a las 14:30. Verifica que todo esté en orden.',
      time: 'Ayer',
      icon: 'excessive',
    },
    {
      id: 4,
      type: 'info',
      title: 'Consumo normal',
      description: 'Tu consumo de ayer estuvo dentro del rango recomendado. ¡Buen trabajo!',
      time: 'Ayer',
      icon: 'normal',
    },
  ];

  const getAlertIcon = (icon: Alert['icon']) => {
    switch (icon) {
      case 'leak':
        return <Droplets className="w-5 h-5" strokeWidth={2} />;
      case 'excessive':
        return <TrendingUp className="w-5 h-5" strokeWidth={2} />;
      case 'normal':
        return <CheckCircle className="w-5 h-5" strokeWidth={2} />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          iconText: 'text-red-600',
          badge: 'bg-red-500',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconText: 'text-yellow-600',
          badge: 'bg-yellow-500',
        };
      case 'info':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconText: 'text-green-600',
          badge: 'bg-green-500',
        };
    }
  };

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
          <h2>Alertas y notificaciones</h2>
        </div>
        <p className="text-white/90">
          {alerts.filter(a => a.type !== 'info').length} alertas activas
        </p>
      </div>

      <div className="p-4 pt-6 space-y-3">
        {alerts.map((alert) => {
          const colors = getAlertColor(alert.type);
          return (
            <Card 
              key={alert.id} 
              className={`${colors.bg} ${colors.border} border-l-4 shadow-md`}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className={`${colors.iconBg} ${colors.iconText} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {getAlertIcon(alert.icon)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-gray-900">{alert.title}</h3>
                      {alert.type !== 'info' && (
                        <Badge className={`${colors.badge} text-white`}>
                          Nueva
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700">{alert.description}</p>
                    
                    <p className="text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
