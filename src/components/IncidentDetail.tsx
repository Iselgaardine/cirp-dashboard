// src/pages/IncidentDetail.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Typdefinition für einen Vorfall
interface Incident {
  id: number;
  title: string;
  description?: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
  assignedTo?: string;
}

// Interface für Timeline-Events, falls verwendet
interface TimelineEvent {
  id: number;
  incidentId: number;
  type: string;
  timestamp: string;
  description: string;
  user: string;
  details?: any;
}

// Props-Interface für die IncidentDetail-Komponente
interface IncidentDetailProps {
  incident: Incident;
  onClose: () => void;
  onUpdate?: (updatedIncident: Incident) => void;
  events?: TimelineEvent[];
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onClose, onUpdate, events = [] }) => {
  
  // Schweregrad-Farben
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high': return '#ef4444'; // rot
      case 'medium': return '#f59e0b'; // orange
      case 'low': return '#3b82f6'; // blau
      default: return '#6b7280'; // grau
    }
  };
  
  // Status-Styles
  const getStatusStyle = (status: string): React.CSSProperties => {
    let backgroundColor, textColor;
    
    switch (status) {
      case 'active':
        backgroundColor = '#fee2e2';
        textColor = '#b91c1c';
        break;
      case 'investigating':
        backgroundColor = '#fef3c7';
        textColor = '#92400e';
        break;
      default:
        backgroundColor = '#d1fae5';
        textColor = '#047857';
    }
    
    return {
      fontSize: '14px',
      padding: '4px 12px',
      borderRadius: '4px',
      backgroundColor,
      color: textColor,
      display: 'inline-block'
    };
  };
  
  // Datum formatieren
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Container-Styling
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#f0f7ff',
    borderRadius: '8px',
    padding: '24px'
  };
  
  // Card-Styling
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    marginTop: '16px'
  };
  
  // Wenn kein Incident vorhanden ist (sollte nicht passieren, aber als Fallback)
  if (!incident) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2>Vorfall nicht gefunden</h2>
          <p>Der gesuchte Vorfall existiert nicht oder wurde gelöscht.</p>
          <Link 
            to="/incidents" 
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: '16px'
            }}
          >
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Zurück zur Vorfallsübersicht
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div style={containerStyle}>
      {/* Zurück-Link */}
      <Link 
        to="/incidents" 
        style={{
          color: '#3b82f6',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowLeft size={16} style={{ marginRight: '8px' }} />
        Zurück zur Übersicht
      </Link>
      
      {/* Vorfall-Detailkarte */}
      <div style={cardStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <h2 style={{ 
            fontSize: '22px', 
            fontWeight: '600',
            margin: '0 0 8px 0'
          }}>
            {incident.title}
          </h2>
          <span style={getStatusStyle(incident.status)}>
            {incident.status}
          </span>
        </div>
        
        <div style={{ 
          color: '#6b7280',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          Vorfall #{incident.id} • Erstellt am {formatDate(incident.createdAt)}
        </div>
        
        <div style={{
          display: 'inline-block',
          backgroundColor: `${getSeverityColor(incident.severity)}20`,
          color: getSeverityColor(incident.severity),
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '16px'
        }}>
          Schweregrad: {incident.severity.toUpperCase()}
        </div>
        
        <div style={{
          marginTop: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>Beschreibung</h3>
          <p style={{
            lineHeight: '1.6',
            color: '#374151'
          }}>
            {incident.description || 'Keine Beschreibung verfügbar.'}
          </p>
        </div>
        
        {/* Timeline-Events anzeigen, falls vorhanden */}
        {events.length > 0 && (
          <div style={{
            marginTop: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>Timeline</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {events.map(event => (
                <div 
                  key={event.id}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontWeight: '500' }}>{event.description}</span>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{event.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>
                    von {event.user}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentDetail;