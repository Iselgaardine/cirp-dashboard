import React, { useState } from 'react';
import IncidentForm from '../components/IncidentForm';
import IncidentDetail from '../components/IncidentDetail';
import FilterBar from '../components/FilterBar';
import { Incident, TimelineEvent } from '../types';

type SortField = 'id' | 'title' | 'severity' | 'status' | 'timestamp' | 'assignee';
type SortDirection = 'asc' | 'desc';

const mockIncidents: Incident[] = [
    {
        id: 1,
        title: "Ransomware-Angriff auf Buchhaltungssystem",
        severity: "Critical",
        status: "In Progress",
        timestamp: "2023-10-23 14:30",
        assignee: "Walter Ulbricht",
        description: "Mehrere Rechner in der Buchhaltung melden Verschlüsselungswarnungen. Es besteht der Verdacht auf einen Ransomware-Angriff.",
        incidentType: "ransomware",
        environment: "hybrid",
        affectedSystems: ["Buchhaltung-Server", "Finanz-Datenbank", "3 Client-PCs"],
        playbooks: ["pb-001"]
    },
    {
        id: 2,
        title: "Authentifizierungsprobleme im Cloud-Service",
        severity: "High",
        status: "New",
        timestamp: "2023-10-22 09:15",
        assignee: "Mata Hari",
        description: "Mehrere Benutzer melden, dass sie sich nicht bei unserem Cloud-CRM anmelden können. Der Dienst scheint verfügbar, aber Login-Versuche schlagen fehl.",
        incidentType: "authentication",
        environment: "cloud",
        affectedSystems: ["CRM-System", "Identity-Provider"],
        playbooks: []
    },
    {
        id: 3,
        title: "DDoS-Verdacht auf Webserver",
        severity: "Medium",
        status: "Resolved",
        timestamp: "2023-10-20 17:45",
        assignee: "Heinz Rühmann",
        description: "Ungewöhnlich hoher Traffic auf den Webservern. Die Performance ist stark eingeschränkt. Verdacht auf einen DDoS-Angriff.",
        incidentType: "ddos",
        environment: "hybrid",
        affectedSystems: ["Web-Server", "Load-Balancer"],
        playbooks: []
    },
    {
        id: 4,
        title: "Verdächtige Login-Versuche",
        severity: "Low",
        status: "Pending",
        timestamp: "2023-10-21 11:30",
        assignee: "Liselotte Pulver",
        description: "Mehrere fehlgeschlagene Login-Versuche von unbekannten IP-Adressen. Bisher keine erfolgreichen unautorisierten Zugriffe.",
        incidentType: "unauthorized-access",
        environment: "onprem",
        affectedSystems: ["AD-Server", "VPN-Gateway"],
        playbooks: []
    },
    {
        id: 5,
        title: "AWS S3 Bucket Fehlkonfiguration",
        severity: "High",
        status: "In Progress",
        timestamp: "2023-10-22 15:20",
        assignee: "Sigmund Freud",
        description: "Security-Scan hat öffentlich zugängliche S3 Buckets mit potenziell sensiblen Daten entdeckt.",
        incidentType: "misconfiguration",
        environment: "cloud",
        affectedSystems: ["AWS S3", "Customer-Data-Storage"],
        playbooks: []
    }
];

const getSeverityColor = (severity: Incident['severity']): string => {
    const colors = {
        Critical: 'bg-red-100 text-red-800',
        High: 'bg-orange-100 text-orange-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-blue-100 text-blue-800'
    };
    return colors[severity];
};

const getStatusColor = (status: Incident['status']): string => {
    const colors = {
        New: 'bg-purple-100 text-purple-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Resolved: 'bg-green-100 text-green-800'
    };
    return colors[status];
};

const ActiveIncidents = () => {
    const [showForm, setShowForm] = useState(false);
    const [incidents, setIncidents] = useState(mockIncidents);
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

    // States für Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [severityFilter, setSeverityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleNewIncident = (incident: Incident) => {
        setIncidents([incident, ...incidents]);

        // Event für neuen Vorfall erstellen
        const newEvent: TimelineEvent = {

            id: Date.now(),
            incidentId: incident.id,
            type: 'created',
            timestamp: incident.timestamp,
            description: 'Vorfall wurde erstellt',
            user: 'System',
            details: {
                changes: [
                    `Schweregrad: ${incident.severity}`,
                    `Status: ${incident.status}`
                ]
            }
        };

        setTimelineEvents(prev => [...prev, newEvent]);
    };

    const handleUpdate = (updatedIncident: Incident) => {
        const oldIncident = incidents.find(inc => inc.id === updatedIncident.id);

        const newEvent: TimelineEvent = {
            id: Date.now(),
            incidentId: updatedIncident.id,
            type: oldIncident?.status !== updatedIncident.status ? 'status_changed' : 'updated',
            timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
            description: oldIncident?.status !== updatedIncident.status
                ? 'Status wurde geändert'
                : 'Vorfall wurde aktualisiert',
            user: updatedIncident.assignee || 'System',
            details: {
                changes: []
            }
        };

        if (oldIncident) {
            if (oldIncident && oldIncident.status !== updatedIncident.status) {
                newEvent.details = {
                    ...newEvent.details,
                    oldStatus: oldIncident.status,
                    newStatus: updatedIncident.status
                };
            }
            const changes: string[] = [];

            if (oldIncident.severity !== updatedIncident.severity) {
                changes.push(`Schweregrad: ${oldIncident.severity} → ${updatedIncident.severity}`);
            }
            if (oldIncident.assignee !== updatedIncident.assignee) {
                changes.push(`Zugewiesen an: ${oldIncident.assignee || 'Niemand'} → ${updatedIncident.assignee}`);
            }
            if (oldIncident.title !== updatedIncident.title) {
                changes.push('Titel wurde aktualisiert');
            }
            if (oldIncident.description !== updatedIncident.description) {
                changes.push('Beschreibung wurde aktualisiert');
            }

            if (changes.length > 0) {
                newEvent.details = {
                    ...newEvent.details,
                    changes
                };
            }

            // Update Daten
            setTimelineEvents(prev => [...prev, newEvent]);
            setIncidents(incidents.map(inc =>
                inc.id === updatedIncident.id ? updatedIncident : inc
            ));
            setSelectedIncident(updatedIncident);
        };
    }

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Bei der Erstellung eines neuen Incidents können wir Default-Werte für die neuen Felder setzen:
    const handleAddIncident = (newIncident: Incident) => {
        // Sicherstellen, dass die neuen Felder Standardwerte haben
        const completeIncident: Incident = {
            ...newIncident,
            incidentType: newIncident.incidentType || '',
            environment: newIncident.environment || 'hybrid',
            affectedSystems: newIncident.affectedSystems || [],
            playbooks: newIncident.playbooks || []
        };
        setIncidents([completeIncident, ...incidents]);
    }

    // Filtern der Incidents
    const filteredIncidents = incidents.filter(incident => {
        const matchesSearch = searchTerm === '' ||
            incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSeverity = severityFilter === '' || incident.severity === severityFilter;
        const matchesStatus = statusFilter === '' || incident.status === statusFilter;

        return matchesSearch && matchesSeverity && matchesStatus;
    });

    // Sortierung auf gefilterte Incidents anwenden
    const sortedAndFilteredIncidents = [...filteredIncidents].sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-end items-center mb-6">
                
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => setShowForm(true)}
                >
                    + Neuen Vorfall melden
                </button>
            </div>

            <FilterBar
                onSearch={setSearchTerm}
                onSeverityFilter={setSeverityFilter}
                onStatusFilter={setStatusFilter}
                totalIncidents={filteredIncidents.length}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th onClick={() => handleSort('id')}
                                className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('title')}
                                className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                Titel {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('severity')}
                                className="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                Schweregrad {sortField === 'severity' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('status')}
                                className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('timestamp')}
                                className="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                Zeitpunkt {sortField === 'timestamp' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('assignee')}
                                className="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                Zugewiesen an {sortField === 'assignee' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedAndFilteredIncidents.map((incident) => (
                            <tr
                                key={incident.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelectedIncident(incident)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{incident.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div>
                                        <div className="font-medium">{incident.title}</div>
                                        <div className="text-gray-500">{incident.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                                        {incident.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                                        {incident.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.assignee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <IncidentForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleNewIncident}
                />
            )}

            {selectedIncident && (
                <IncidentDetail
                    incident={selectedIncident}
                    onClose={() => setSelectedIncident(null)}
                    onUpdate={handleUpdate}
                    events={timelineEvents}
                />
            )}
        </div>
    );
};

export default ActiveIncidents;