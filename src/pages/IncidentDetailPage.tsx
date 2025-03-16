// src/pages/IncidentDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IncidentDetail from '../components/IncidentDetail';

// Diese Typdefinition sollte mit der in IncidentDetail.tsx übereinstimmen
interface Incident {
  id: number;
  title: string;
  description?: string;
  severity: string;
  status: string;
  createdAt: string;
  assignedTo?: string;
}

// Mock-Daten für Vorfälle
const mockIncidents = [
  {
    id: 1,
    title: 'Netzwerkausfall in Rechenzentrum A',
    description: 'Kompletter Ausfall des Rechenzentrums A aufgrund eines Stromausfalls.',
    severity: 'high',
    status: 'active',
    createdAt: '2023-11-15T09:32:00Z',
    assignedTo: 'Walter Ulbricht'
  },
  {
    id: 2,
    title: 'Erhöhte Latenz bei API-Endpunkten',
    description: 'Die API-Endpunkte zeigen eine erhöhte Antwortzeit von über 2 Sekunden.',
    severity: 'medium',
    status: 'investigating',
    createdAt: '2023-11-15T10:45:00Z',
    assignedTo: 'Mata Hari'
  },
  {
    id: 3,
    title: 'Authentifizierungsdienst unzuverlässig',
    description: 'Der Auth-Service zeigt sporadische Ausfälle bei der Token-Validierung.',
    severity: 'medium',
    status: 'active',
    createdAt: '2023-11-14T22:15:00Z',
    assignedTo: 'Liselotte Pulver'
  }
];

const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In einer echten Anwendung würdest du hier einen API-Aufruf machen
    // Für jetzt simulieren wir das mit einem Timeout und den Mock-Daten
    setLoading(true);
    
    setTimeout(() => {
      const foundIncident = mockIncidents.find(inc => inc.id === Number(id));
      setIncident(foundIncident || null);
      setLoading(false);
    }, 300); // Kurze Verzögerung für Ladeeffekt
  }, [id]);
  
  if (loading) {
    return (
      <div style={{
        backgroundColor: '#f0f7ff',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '24px'
        }}>
          <p>Lade Vorfallsdetails...</p>
        </div>
      </div>
    );
  }
  
  if (!incident) {
    return (
      <div style={{
        backgroundColor: '#f0f7ff',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '24px'
        }}>
          <h2>Vorfall nicht gefunden</h2>
          <p>Der gesuchte Vorfall existiert nicht oder wurde gelöscht.</p>
          <button 
            onClick={() => navigate('/incidents')}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <IncidentDetail 
      incident={incident} 
      onClose={() => navigate('/incidents')}
    />
  );
};

export default IncidentDetailPage;