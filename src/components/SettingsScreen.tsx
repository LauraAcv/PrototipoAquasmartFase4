import { useState } from 'react';
import { ArrowLeft, Droplet, Wifi, Save, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsScreen({ onBack, onLogout }: SettingsScreenProps) {
  const [dailyLimit, setDailyLimit] = useState('350');
  const [deviceId, setDeviceId] = useState('AQS-2024-7891');
  const [wifiNetwork, setWifiNetwork] = useState('Casa WiFi 5G');
  const [notifications, setNotifications] = useState(true);
  const [leakAlerts, setLeakAlerts] = useState(true);

  const handleSave = () => {
    // Mock save action
    alert('Configuración guardada correctamente');
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
          <h2>Configuración</h2>
        </div>
      </div>

      <div className="p-4 pt-6 space-y-4">
        {/* Water Consumption Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Droplet className="w-5 h-5 text-blue-600" strokeWidth={2} />
              Límite de consumo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyLimit">Límite diario (litros)</Label>
              <Input
                id="dailyLimit"
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                placeholder="350"
              />
              <p className="text-gray-600">Recomendado: 250-400 litros por persona</p>
            </div>
          </CardContent>
        </Card>

        {/* IoT Device Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Wifi className="w-5 h-5 text-blue-600" strokeWidth={2} />
              Sensor IoT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deviceId">ID del dispositivo</Label>
              <Input
                id="deviceId"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wifiNetwork">Red Wi-Fi conectada</Label>
              <Input
                id="wifiNetwork"
                value={wifiNetwork}
                onChange={(e) => setWifiNetwork(e.target.value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700">Estado del sensor</span>
              </div>
              <span className="text-green-600">Conectado</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-gray-600">Señal Wi-Fi</p>
                <p className="text-blue-600">Excelente</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">Última sync</p>
                <p className="text-blue-600">Hace 2 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-600">Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="notifications">Notificaciones push</Label>
                <p className="text-gray-600">Recibe alertas en tiempo real</p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="leakAlerts">Alertas de fugas</Label>
                <p className="text-gray-600">Detecta fugas automáticamente</p>
              </div>
              <Switch
                id="leakAlerts"
                checked={leakAlerts}
                onCheckedChange={setLeakAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2 text-white" strokeWidth={2} />
          Guardar cambios
        </Button>

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          variant="outline"
          className="w-full border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" strokeWidth={2} />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
