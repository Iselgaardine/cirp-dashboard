// src/types/index.ts
export interface Incident {
    id: number;
    title: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'New' | 'In Progress' | 'Pending' | 'Resolved';
    timestamp: string;
    assignee: string;
    description: string;
    // Neue Felder für Playbook-Integration
    incidentType?: string;
    environment?: 'cloud' | 'onprem' | 'hybrid';
    affectedSystems?: string[];
    playbooks?: string[]; // IDs der anwendbaren Playbooks
  }
  
  export interface TimelineEvent {
    id: number;
    incidentId: number;
    type: 'created' | 'status_changed' | 'updated' | 'resolved' | 'playbook_executed';
    timestamp: string;
    description: string;
    user: string;
    details?: {
      oldStatus?: string;
      newStatus?: string;
      changes?: string[];
      playbookId?: string;
      playbookAction?: string;
    };
  }
  
  export interface ChecklistItem {
    id: string;
    text: string;
    isCompleted: boolean;
    priority: 'critical' | 'high' | 'medium' | 'low';
    timeEstimate: string;
  }
  
  export interface EscalationStep {
    level: number;
    condition: string;
    contacts: EmergencyContact[];
    timeframe: string;
  }
  
  export interface DocumentationTemplate {
    id: string;
    title: string;
    sections: {
      title: string;
      description: string;
      required: boolean;
    }[];
    legalRequirement: boolean;
  }
  
  export interface LegalRequirement {
    id: string;
    title: string;
    description: string;
    timeframe: string;
    authority: string;
    contactInfo: string;
    formTemplate?: string;
  }
  
  export interface EmergencyContact {
    id: string;
    role: string;
    name: string;
    contact: {
      phone: string;
      email: string;
      escalationLevel: number;
    };
    availabilityHours: {
      start: string;
      end: string;
      timezone: string;
    };
  }
  
  export interface Playbook {
    id: string;
    title: string;
    description: string;
    applicableEnvironments: ('cloud' | 'onprem' | 'hybrid')[];
    incidentTypes: string[];
    immediateActions: ChecklistItem[];
    escalationProcedure: EscalationStep[];
    documentationRequirements: DocumentationTemplate[];
    legalRequirements: LegalRequirement[];
    environmentSpecifics: {
      cloud?: {
        services: string[];
        providers: string[];
        specificActions: ChecklistItem[];
      };
      onprem?: {
        systems: string[];
        networks: string[];
        specificActions: ChecklistItem[];
      };
    };
  }