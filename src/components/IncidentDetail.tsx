import React, { useState } from 'react';
import PlaybookViewer from './PlaybookViewer';
import IncidentEditForm from './IncidentEditForm';
import { Incident, TimelineEvent } from '../types';

// Mock-Daten für einen Vorfall mit Playbook-Informationen
const mockIncident: Incident = {
    id: 1,
    title: "Ransomware-Angriff auf Buchhaltungssystem",
    severity: "Critical",
    status: "In Progress",
    timestamp: "2023-10-23 14:30",
    assignee: "Max Mustermann",
    description: "Mehrere Rechner in der Buchhaltung melden Verschlüsselungswarnungen. Es besteht der Verdacht auf einen Ransomware-Angriff.",
    incidentType: "ransomware",
    environment: "hybrid",
    affectedSystems: ["Buchhaltung-Server", "Finanz-Datenbank", "3 Client-PCs"],
    playbooks: ["pb-001"]
};

// Mock Daten für Timeline-Events
const mockTimelineEvents: TimelineEvent[] = [
    {
        id: 1,
        incidentId: 1,
        type: 'created',
        timestamp: '2023-10-23 14:30',
        description: 'Vorfall wurde erstellt',
        user: 'System',
        details: {
            changes: [
                'Schweregrad: Critical',
                'Status: New'
            ]
        }
    },
    {
        id: 2,
        incidentId: 1,
        type: 'status_changed',
        timestamp: '2023-10-23 14:45',
        description: 'Status wurde geändert',
        user: 'Max Mustermann',
        details: {
            oldStatus: 'New',
            newStatus: 'In Progress'
        }
    },
    {
        id: 3,
        incidentId: 1,
        type: 'playbook_executed',
        timestamp: '2023-10-23 14:50',
        description: 'Playbook-Aktion ausgeführt',
        user: 'Max Mustermann',
        details: {
            playbookId: 'pb-001',
            playbookAction: 'Betroffene Systeme isolieren'
        }
    }
];

// Verwendung verschiedener Icons je nach Event-Typ
const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
        case 'created': return '🆕';
        case 'status_changed': return '🔄';
        case 'updated': return '✏️';
        case 'resolved': return '✅';
        case 'playbook_executed': return '📚';
        default: return '📝';
    }
};

// Komponente für Timeline-Events mit Playbook-Aktionen
const TimelineView: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3">
                {events.map((event) => (
                    <div key={event.id} className="mb-6 ml-6">
                        <div className="absolute -left-3 mt-1.5 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                            {getEventIcon(event.type)}
                        </div>
                        <div className="bg-gray-50 p-3 rounded shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className="font-medium">{event.description}</div>
                                <div className="text-sm text-gray-500">{event.timestamp}</div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">von {event.user}</div>

                            {event.details && (
                                <div className="mt-2 text-sm">
                                    {event.details.oldStatus && event.details.newStatus && (
                                        <div>
                                            Status: <span className="line-through">{event.details.oldStatus}</span> → {event.details.newStatus}
                                        </div>
                                    )}

                                    {event.details.changes && event.details.changes.length > 0 && (
                                        <div className="mt-1">
                                            <div>Änderungen:</div>
                                            <ul className="list-disc list-inside">
                                                {event.details.changes.map((change, idx) => (
                                                    <li key={idx}>{change}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {event.details.playbookId && event.details.playbookAction && (
                                        <div className="mt-1 text-blue-700">
                                            Playbook-Aktion: {event.details.playbookAction}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// PlaybookAction Komponente zum Protokollieren von Playbook-Aktionen
const PlaybookAction: React.FC<{
    incidentId: number;
    playbookId: string;
    onActionLogged: (event: TimelineEvent) => void;
}> = ({ incidentId, playbookId, onActionLogged }) => {
    const [action, setAction] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!action.trim()) return;

        const newEvent: TimelineEvent = {
            id: Date.now(),
            incidentId,
            type: 'playbook_executed',
            timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
            description: 'Playbook-Aktion ausgeführt',
            user: 'Aktueller Benutzer', // In einer echten App würde man den angemeldeten Benutzer verwenden
            details: {
                playbookId,
                playbookAction: action
            }
        };

        onActionLogged(newEvent);
        setAction('');
    };

    return (
        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-medium mb-2">Playbook-Aktion protokollieren</h4>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    placeholder="Durchgeführte Aktion eingeben..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Protokollieren
                </button>
            </form>
        </div>
    );
};

// Interface für die Props der IncidentDetail-Komponente
interface IncidentDetailProps {
    incident: Incident;
    onClose?: () => void;
    onUpdate?: (incident: Incident) => void;
    events?: TimelineEvent[];
}

// Die IncidentDetail Komponente mit Playbook-Integration
const IncidentDetail: React.FC<IncidentDetailProps> = ({
    incident,
    onClose,
    onUpdate,
    events = mockTimelineEvents
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'playbook'>('details');
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(events);

    const addTimelineEvent = (event: TimelineEvent) => {
        setTimelineEvents(prev => [...prev, event]);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Incident #{incident.id}: {incident.title}</h2>
                        <p className="text-gray-600 mt-1">Erstellt am {incident.timestamp}</p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded ${incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                            incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                            }`}>
                            {incident.severity}
                        </span>
                        <span className={`px-2 py-1 rounded ${incident.status === 'New' ? 'bg-purple-100 text-purple-800' :
                            incident.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                incident.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                            }`}>
                            {incident.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs für Details und Playbook */}
            <div className="flex border-b">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('details')}
                >
                    Incident Details
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'playbook' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('playbook')}
                >
                    Playbook
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'details' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Allgemeine Informationen</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Zugewiesen an</div>
                                        <div>{incident.assignee || 'Nicht zugewiesen'}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Umgebung</div>
                                        <div className="capitalize">{incident.environment}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Vorfallstyp</div>
                                        <div className="capitalize">{incident.incidentType}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Betroffene Systeme</h3>
                                <div className="flex flex-wrap gap-2">
                                    {incident.affectedSystems && incident.affectedSystems.length > 0 ? (
                                        incident.affectedSystems.map((system, idx) => (
                                            <span key={idx} className="bg-gray-100 px-3 py-1 rounded">
                                                {system}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">Keine Systeme angegeben</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Beschreibung</h3>
                            <div className="bg-gray-50 p-4 rounded border">
                                {incident.description}
                            </div>
                        </div>

                        <TimelineView events={timelineEvents} />

                        {incident.playbooks && incident.playbooks.length > 0 && (
                            <PlaybookAction
                                incidentId={incident.id}
                                playbookId={incident.playbooks[0]}
                                onActionLogged={addTimelineEvent}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'playbook' && incident.environment && incident.incidentType && (
                    <PlaybookViewer
                        incidentType={incident.incidentType}
                        environment={incident.environment}
                    />
                )}
            </div>
        </div>
    );
};

export default IncidentDetail;