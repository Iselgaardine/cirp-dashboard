// src/pages/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, Users, CheckCircle, ArrowRight, Activity } from 'lucide-react';

// Typdefinitionen
interface Incident {
    id: number;
    title: string;
    description?: string;
    severity: 'high' | 'medium' | 'low';
    status: 'active' | 'investigating' | 'resolved' | 'closed';
    createdAt: string;
    assignedTo?: string;
}

interface DashboardCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

interface StatusItemProps {
    title: string;
    percentage: number;
    color: string;
}

// Simulierte Incidents (ersetze dies durch deine tatsächlichen Daten)
const mockIncidents: Incident[] = [
    {
        id: 1,
        title: 'Netzwerkausfall in Rechenzentrum A',
        description: 'Kompletter Ausfall des Rechenzentrums A aufgrund eines Stromausfalls.',
        severity: 'high',
        status: 'active',
        createdAt: '2023-11-15T09:32:00Z'
    },
    {
        id: 2,
        title: 'Erhöhte Latenz bei API-Endpunkten',
        description: 'Die API-Endpunkte zeigen eine erhöhte Antwortzeit von über 2 Sekunden.',
        severity: 'medium',
        status: 'investigating',
        createdAt: '2023-11-15T10:45:00Z'
    },
    {
        id: 3,
        title: 'Authentifizierungsdienst unzuverlässig',
        description: 'Der Auth-Service zeigt sporadische Ausfälle bei der Token-Validierung.',
        severity: 'medium',
        status: 'active',
        createdAt: '2023-11-14T22:15:00Z'
    }
];

const Dashboard: React.FC = () => {
    // Statistik-Daten
    const stats = {
        activeIncidents: mockIncidents.filter(inc => inc.status !== 'resolved').length,
        pendingTasks: 12,
        teamOnCall: 3,
        resolvedIncidents: mockIncidents.filter(inc => inc.status === 'resolved').length
    };

    // Top-Vorfälle (basierend auf Schweregrad und Zeit)
    const topIncidents = [...mockIncidents]
        .sort((a, b) => {
            // Sortiere nach Schweregrad (hoch > mittel > niedrig) und dann nach Datum (neuer zuerst)
            const severityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
            const severityDiff = (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
            if (severityDiff !== 0) return severityDiff;

            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        .slice(0, 3); // Nur die Top 3 anzeigen

    // Dashboard Card als Inline-Komponente
    const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'start',
            borderLeft: `4px solid ${color}`
        }}>
            <div style={{
                borderRadius: '50%',
                padding: '8px',
                marginRight: '12px',
                backgroundColor: `${color}20` // 20% Transparenz
            }}>
                {icon}
            </div>
            <div>
                <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0'
                }}>{title}</p>
                <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0'
                }}>{value}</p>
            </div>
        </div>
    );

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

    // Schweregrad-Farben
    const getSeverityColor = (severity: string): string => {
        switch (severity) {
            case 'high': return '#ef4444'; // rot
            case 'medium': return '#f59e0b'; // orange
            case 'low': return '#3b82f6'; // blau
            default: return '#6b7280'; // grau
        }
    };

    // Status-Farben und Styles
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
            fontSize: '12px',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor,
            color: textColor
        };
    };

    // Status-Item Komponente
    const StatusItem: React.FC<StatusItemProps> = ({ title, percentage, color }) => (
        <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px'
        }}>
            <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 8px 0'
            }}>{title}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    height: '8px',
                    backgroundColor: color,
                    borderRadius: '4px',
                    flex: 1,
                    marginRight: '8px'
                }}></div>
                <span style={{
                    color: color,
                    fontWeight: '500'
                }}>{percentage}%</span>
            </div>
        </div>
    );

    // Styling für das gesamte Dashboard
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        backgroundColor: '#f0f7ff', // Heller blauer Hintergrund für die ganze Seite
        padding: '16px',
        borderRadius: '8px'
    };

    // Styling für die Karten (blauer Hintergrund)
    const cardStyle: React.CSSProperties = {
        backgroundColor: '#e6f0ff', // Hellblauer Hintergrund
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '24px'
    };

    return (
        <div style={containerStyle}>
            {/* Dashboard-Header mit Datum */}
            <div style={{ marginBottom: '24px' }}>
                <p style={{ color: '#6b7280' }}>
                    {new Date().toLocaleDateString('de-DE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Statistik-Karten */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <DashboardCard
                    title="Aktive Vorfälle"
                    value={stats.activeIncidents}
                    icon={<AlertTriangle size={20} color="#ef4444" />}
                    color="#ef4444"
                />
                <DashboardCard
                    title="Ausstehende Aufgaben"
                    value={stats.pendingTasks}
                    icon={<Clock size={20} color="#f59e0b" />}
                    color="#f59e0b"
                />
                <DashboardCard
                    title="Team im Dienst"
                    value={stats.teamOnCall}
                    icon={<Users size={20} color="#3b82f6" />}
                    color="#3b82f6"
                />
                <DashboardCard
                    title="Gelöste Vorfälle (30d)"
                    value={stats.resolvedIncidents}
                    icon={<CheckCircle size={20} color="#10b981" />}
                    color="#10b981"
                />
            </div>

            {/* Aktuelle Top-Vorfälle */}
            <div style={cardStyle}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151',
                        margin: 0
                    }}>Aktuelle Top-Vorfälle</h3>
                    <Link
                        to="/incidents"
                        style={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Alle anzeigen <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                    </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {topIncidents.map(incident => (
                        <div
                            key={incident.id}
                            style={{
                                borderBottom: '1px solid #e5e7eb',
                                paddingBottom: '16px',
                                marginBottom: '16px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <div style={{
                                    borderRadius: '50%',
                                    padding: '8px',
                                    marginRight: '12px',
                                    backgroundColor: `${getSeverityColor(incident.severity)}20`,
                                    color: getSeverityColor(incident.severity)
                                }}>
                                    <AlertTriangle size={16} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <h4 style={{
                                            fontWeight: '500',
                                            margin: 0
                                        }}>{incident.title}</h4>
                                        <span style={getStatusStyle(incident.status)}>
                                            {incident.status}
                                        </span>
                                    </div>
                                    <p style={{
                                        color: '#6b7280',
                                        fontSize: '14px',
                                        margin: '4px 0'
                                    }}>
                                        {formatDate(incident.createdAt)}
                                    </p>
                                    <p style={{
                                        fontSize: '14px',
                                        marginTop: '8px'
                                    }}>
                                        {incident.description?.substring(0, 100)}...
                                    </p>
                                    <div style={{ marginTop: '8px' }}>
                                        <Link
                                            to={`/incidents/${incident.id}`}
                                            style={{
                                                color: '#3b82f6',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            Details anzeigen <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* System-Status */}
            <div style={cardStyle}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <Activity size={20} style={{ color: '#6b7280', marginRight: '8px' }} />
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151',
                        margin: 0
                    }}>System-Status</h3>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                }}>

                    <StatusItem
                        title="API-Verfügbarkeit"
                        percentage={99.9}
                        color="#10b981" // grün
                    />

                    <StatusItem
                        title="Datenbank-Performance"
                        percentage={87}
                        color="#f59e0b" // gelb
                    />

                    <StatusItem
                        title="Frontend-Verfügbarkeit"
                        percentage={100}
                        color="#10b981" // grün
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;