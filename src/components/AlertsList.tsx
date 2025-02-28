import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface Alert {
  id: number;
  severity: 'high' | 'medium' | 'low';
  title: string;
  timestamp: string;
  description: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    severity: 'high',
    title: 'Ungewöhnliche Login-Aktivität',
    timestamp: '2025-02-19 10:30',
    description: 'Mehrere fehlgeschlagene Login-Versuche aus unbekannter IP-Adresse'
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Systemaktualisierung erforderlich',
    timestamp: '2025-02-19 09:15',
    description: 'Kritische Sicherheitsupdates verfügbar'
  },
  {
    id: 3,
    severity: 'low',
    title: 'Backup-Überprüfung',
    timestamp: '2025-02-19 08:45',
    description: 'Routineüberprüfung der Backup-Systeme empfohlen'
  }
];

const getSeverityColor = (severity: Alert['severity']): string => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const AlertsList = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Aktuelle Warnungen</h2>
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm font-medium mb-2 ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
                <h3 className="font-semibold">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
              </div>
              <span className="text-sm text-gray-500">{alert.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;