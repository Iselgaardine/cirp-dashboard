// src/services/playbookService.ts
import { Playbook, ChecklistItem, EmergencyContact } from '../types';

// Mock-Playbooks
export const mockPlaybooks: Playbook[] = [
  {
    id: 'pb-001',
    title: 'Ransomware-Reaktionsplan',
    description: 'Vorgehen bei Verdacht auf einen Ransomware-Angriff ',
    applicableEnvironments: ['cloud', 'onprem', 'hybrid'],
    incidentTypes: ['ransomware', 'malware', 'encryption'],
    immediateActions: [
      {
        id: 'action-1',
        text: 'Betroffene Systeme isolieren/vom Netzwerk trennen ',
        isCompleted: false,
        priority: 'critical',
        timeEstimate: '15min'
      },
      {
        id: 'action-2',
        text: 'Incident Response Team informieren ',
        isCompleted: false,
        priority: 'critical',
        timeEstimate: '5min'
      },
      {
        id: 'action-3',
        text: 'Logs sichern für Forensik ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '30min'
      },
      {
        id: 'action-4',
        text: 'Überprüfen, ob Backups intakt und nicht infiziert sind ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '1h'
      }
    ],
    escalationProcedure: [
      {
        level: 1,
        condition: 'Initial - Bei Verdacht',
        contacts: [
          {
            id: 'contact-1',
            role: 'IT-Leiter',
            name: 'Walter Ulbricht',
            contact: {
              phone: '+49 123 456789',
              email: 'it-leiter@unternehmen.de',
              escalationLevel: 1
            },
            availabilityHours: {
              start: '08:00',
              end: '18:00',
              timezone: 'Europe/Berlin'
            }
          }
        ],
        timeframe: 'Sofort'
      },
      {
        level: 2,
        condition: 'Bestätigter Ransomware-Fall',
        contacts: [
          {
            id: 'contact-2',
            role: 'Geschäftsführer',
            name: 'Mata Hari',
            contact: {
              phone: '+49 123 456780',
              email: 'gf@unternehmen.de',
              escalationLevel: 2
            },
            availabilityHours: {
              start: '08:00',
              end: '18:00',
              timezone: 'Europe/Berlin'
            }
          },
          {
            id: 'contact-3',
            role: 'Externe IT-Forensik',
            name: 'Sicherheit GmbH',
            contact: {
              phone: '+49 800 123456',
              email: 'notfall@sicherheit-gmbh.de',
              escalationLevel: 2
            },
            availabilityHours: {
              start: '00:00',
              end: '24:00',
              timezone: 'Europe/Berlin'
            }
          }
        ],
        timeframe: 'Innerhalb von 1 Stunde'
      }
    ],
    documentationRequirements: [
      {
        id: 'doc-1',
        title: 'Ersteinschätzung',
        sections: [
          {
            title: 'Betroffene Systeme',
            description: 'Auflisten aller betroffenen und isolierten Systeme',
            required: true
          },
          {
            title: 'Erste Anzeichen',
            description: 'Wann und wie wurde der Vorfall entdeckt?',
            required: true
          }
        ],
        legalRequirement: false
      },
      {
        id: 'doc-2',
        title: 'DSGVO-Meldeformular',
        sections: [
          {
            title: 'Art der Daten',
            description: 'Welche personenbezogenen Daten sind betroffen?',
            required: true
          },
          {
            title: 'Umfang',
            description: 'Anzahl der betroffenen Datensätze und Personen',
            required: true
          }
        ],
        legalRequirement: true
      }
    ],
    legalRequirements: [
      {
        id: 'legal-1',
        title: 'DSGVO Meldepflicht',
        description: 'Bei Verdacht auf Kompromittierung personenbezogener Daten muss eine Meldung erfolgen',
        timeframe: '72 Stunden nach Kenntnisnahme',
        authority: 'Landesdatenschutzbehörde',
        contactInfo: 'meldung@datenschutz-land.de'
      }
    ],
    environmentSpecifics: {
      cloud: {
        services: ['EC2', 'S3', 'RDS'],
        providers: ['AWS', 'Azure', 'GCP'],
        specificActions: [
          {
            id: 'cloud-1',
            text: 'Cloud-Instance isolieren (Security Groups anpassen) ',
            isCompleted: false,
            priority: 'critical',
            timeEstimate: '10min'
          },
          {
            id: 'cloud-2',
            text: 'Snapshot der betroffenen Instanzen erstellen ',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '15min'
          }
        ]
      },
      onprem: {
        systems: ['Windows Server', 'Linux Server', 'NAS'],
        networks: ['LAN', 'WLAN', 'VPN'],
        specificActions: [
          {
            id: 'onprem-1',
            text: 'Physischen Netzwerkzugang trennen ',
            isCompleted: false,
            priority: 'critical',
            timeEstimate: '5min'
          },
          {
            id: 'onprem-2',
            text: 'Lokale Snapshots/Images erstellen ',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '30min'
          }
        ]
      }
    }
  },
  {
    id: 'pb-002',
    title: 'Cloud-Service-Ausfall',
    description: 'Vorgehen bei Ausfall kritischer Cloud-Dienste ',
    applicableEnvironments: ['cloud', 'hybrid'],
    incidentTypes: ['service-outage', 'availability', 'cloud-failure'],
    immediateActions: [
      {
        id: 'action-1',
        text: 'Status-Seite des Cloud-Providers prüfen ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '5min'
      },
      {
        id: 'action-2',
        text: 'Support-Ticket beim Provider eröffnen ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '10min'
      },
      {
        id: 'action-3',
        text: 'Betroffene Services identifizieren ',
        isCompleted: false,
        priority: 'critical',
        timeEstimate: '15min'
      },
      {
        id: 'action-4',
        text: 'Failover zu alternativen Diensten/Regionen prüfen ',
        isCompleted: false,
        priority: 'critical',
        timeEstimate: '20min'
      }
    ],
    escalationProcedure: [
      {
        level: 1,
        condition: 'Initial - Ausfall festgestellt',
        contacts: [
          {
            id: 'contact-1',
            role: 'Cloud-Administrator',
            name: 'Heinz Rühmann',
            contact: {
              phone: '+49 123 456789',
              email: 'cloud-admin@unternehmen.de',
              escalationLevel: 1
            },
            availabilityHours: {
              start: '08:00',
              end: '18:00',
              timezone: 'Europe/Berlin'
            }
          }
        ],
        timeframe: 'Sofort'
      },
      {
        level: 2,
        condition: 'Ausfall > 30 Minuten',
        contacts: [
          {
            id: 'contact-2',
            role: 'IT-Leiter',
            name: 'Walter Ulbricht',
            contact: {
              phone: '+49 123 456780',
              email: 'it-leiter@unternehmen.de',
              escalationLevel: 2
            },
            availabilityHours: {
              start: '08:00',
              end: '18:00',
              timezone: 'Europe/Berlin'
            }
          }
        ],
        timeframe: 'Nach 30 Minuten ohne Lösung'
      }
    ],
    documentationRequirements: [
      {
        id: 'doc-1',
        title: 'Ausfallprotokoll',
        sections: [
          {
            title: 'Betroffene Dienste',
            description: 'Welche Cloud-Services sind ausgefallen?',
            required: true
          },
          {
            title: 'Zeitlicher Verlauf',
            description: 'Wann begann der Ausfall, welche Maßnahmen wurden ergriffen?',
            required: true
          }
        ],
        legalRequirement: false
      }
    ],
    legalRequirements: [],
    environmentSpecifics: {
      cloud: {
        services: ['EC2', 'S3', 'Lambda', 'RDS', 'Azure VMs', 'Blob Storage'],
        providers: ['AWS', 'Azure', 'GCP'],
        specificActions: [
          {
            id: 'cloud-1',
            text: 'Multi-Region-Failover aktivieren ',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '20min'
          },
          {
            id: 'cloud-2',
            text: 'Traffic zu alternativen Services umleiten ',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '15min'
          }
        ]
      }
    }
  },
  {
    id: 'pb-003',
    title: 'Nicht-autorisierter Zugriffsversuch',
    description: 'Vorgehen bei Verdacht auf unerlaubten Zugriff auf Unternehmenssysteme ',
    applicableEnvironments: ['cloud', 'onprem', 'hybrid'],
    incidentTypes: ['unauthorized-access', 'credential-theft', 'intrusion'],
    immediateActions: [
      {
        id: 'action-1',
        text: 'Betroffene Benutzerkonten sperren ',
        isCompleted: false,
        priority: 'critical',
        timeEstimate: '10min'
      },
      {
        id: 'action-2',
        text: 'Login-Logs und Zugriffsprotokolle sichern ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '20min'
      },
      {
        id: 'action-3',
        text: 'Verdächtige IP-Adressen blockieren ',
        isCompleted: false,
        priority: 'high',
        timeEstimate: '15min'
      }
    ],
    escalationProcedure: [
      {
        level: 1,
        condition: 'Initial - Verdacht auf unerlaubten Zugriff',
        contacts: [
          {
            id: 'contact-1',
            role: 'Security-Beauftragter',
            name: 'Liselotte Pulver',
            contact: {
              phone: '+49 123 456789',
              email: 'security@unternehmen.de',
              escalationLevel: 1
            },
            availabilityHours: {
              start: '08:00',
              end: '18:00',
              timezone: 'Europe/Berlin'
            }
          }
        ],
        timeframe: 'Sofort'
      }
    ],
    documentationRequirements: [
      {
        id: 'doc-1',
        title: 'Sicherheitsvorfall-Dokumentation',
        sections: [
          {
            title: 'Zugriffsdetails',
            description: 'Wann, wie und von wo wurde der Zugriff versucht?',
            required: true
          },
          {
            title: 'Betroffene Systeme',
            description: 'Welche Systeme waren betroffen?',
            required: true
          }
        ],
        legalRequirement: false
      }
    ],
    legalRequirements: [
      {
        id: 'legal-1',
        title: 'DSGVO Meldepflicht',
        description: 'Bei Verdacht auf Kompromittierung personenbezogener Daten muss eine Meldung erfolgen',
        timeframe: '72 Stunden nach Kenntnisnahme',
        authority: 'Landesdatenschutzbehörde',
        contactInfo: 'meldung@datenschutz-land.de'
      }
    ],
    environmentSpecifics: {
      cloud: {
        services: ['IAM', 'Active Directory', 'SSO'],
        providers: ['AWS', 'Azure', 'GCP', 'Okta'],
        specificActions: [
          {
            id: 'cloud-1',
            text: 'Cloud-IAM Einstellungen prüfen',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '30min'
          }
        ]
      },
      onprem: {
        systems: ['Active Directory', 'VPN-Gateway', 'Firewalls'],
        networks: ['LAN', 'WLAN', 'VPN'],
        specificActions: [
          {
            id: 'onprem-1',
            text: 'Firewall-Logs prüfen ',
            isCompleted: false,
            priority: 'high',
            timeEstimate: '30min'
          }
        ]
      }
    }
  }
];

// Service-Funktionen

// Hole alle Playbooks
export const getAllPlaybooks = (): Promise<Playbook[]> => {
  return Promise.resolve(mockPlaybooks);
};

// Hole ein Playbook anhand seiner ID
export const getPlaybookById = (id: string): Promise<Playbook | undefined> => {
  const playbook = mockPlaybooks.find(p => p.id === id);
  return Promise.resolve(playbook);
};

// Hole Playbooks nach Incident-Typ
export const getPlaybooksByIncidentType = (incidentType: string): Promise<Playbook[]> => {
  const filteredPlaybooks = mockPlaybooks.filter(p => 
    p.incidentTypes.some(type => type.toLowerCase().includes(incidentType.toLowerCase()))
  );
  return Promise.resolve(filteredPlaybooks);
};

// Hole Playbooks nach Umgebung
export const getPlaybooksByEnvironment = (environment: 'cloud' | 'onprem' | 'hybrid'): Promise<Playbook[]> => {
  const filteredPlaybooks = mockPlaybooks.filter(p => 
    p.applicableEnvironments.includes(environment)
  );
  return Promise.resolve(filteredPlaybooks);
};

// Erstelle ein neues Playbook
export const createPlaybook = (playbook: Omit<Playbook, 'id'>): Promise<Playbook> => {
  const newPlaybook: Playbook = {
    ...playbook,
    id: `pb-${Date.now().toString().slice(-3)}` // Generiere eine einfache ID
  };
  
  // In einer echten Anwendung würde hier ein API-Call stattfinden
  // Für diese Mock-Implementierung fügen wir es lokal hinzu
  mockPlaybooks.push(newPlaybook);
  
  return Promise.resolve(newPlaybook);
};

// Aktualisiere ein bestehendes Playbook
export const updatePlaybook = (id: string, playbook: Partial<Playbook>): Promise<Playbook | undefined> => {
  const index = mockPlaybooks.findIndex(p => p.id === id);
  
  if (index === -1) {
    return Promise.resolve(undefined);
  }
  
  // Update das Playbook
  mockPlaybooks[index] = {
    ...mockPlaybooks[index],
    ...playbook
  };
  
  return Promise.resolve(mockPlaybooks[index]);
};

// Lösche ein Playbook
export const deletePlaybook = (id: string): Promise<boolean> => {
  const index = mockPlaybooks.findIndex(p => p.id === id);
  
  if (index === -1) {
    return Promise.resolve(false);
  }
  
  mockPlaybooks.splice(index, 1);
  return Promise.resolve(true);
};