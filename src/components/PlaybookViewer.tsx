// src/components/PlaybookViewer.tsx
import React, { useState, useEffect } from 'react';
import { Playbook, ChecklistItem, EscalationStep, DocumentationTemplate, LegalRequirement, EmergencyContact } from '../types';
import { getPlaybookById, updatePlaybook, mockPlaybooks } from '../services/playbookService';

// Props für die PlaybookViewer-Komponente
interface PlaybookViewerProps {
  incidentType?: string;
  environment?: 'cloud' | 'onprem' | 'hybrid';
  onActionComplete?: (playbookId: string, completedActions: ChecklistItem[]) => void;
}

// Komponenten für Playbook-Ansicht
const ImmediateActionsList: React.FC<{
  actions: ChecklistItem[],
  onToggle: (id: string) => void,
  onSave: () => void,
  isSaving: boolean
}> = ({ actions, onToggle, onSave, isSaving }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sofortmaßnahmen</h3>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSaving ? 'Wird gespeichert...' : 'Änderungen speichern'}
        </button>
      </div>
      <div className="space-y-2">
        {actions.map(item => (
          <div key={item.id} className="flex items-start p-3 border rounded">
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => onToggle(item.id)}
              className="mt-1 mr-3"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{item.text}</span>
                <span className={`px-2 py-1 rounded text-xs ${item.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                  }`}>
                  {item.priority}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Zeitschätzung: {item.timeEstimate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EscalationProcedure: React.FC<{ steps: EscalationStep[] }> = ({ steps }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Eskalationsverfahren</h3>
      <div className="space-y-4">
        {steps.map(step => (
          <div key={step.level} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Stufe {step.level}: {step.condition}</h4>
              <span className="text-sm text-gray-600">Zeitrahmen: {step.timeframe}</span>
            </div>
            <div className="space-y-3">
              {step.contacts.map(contact => (
                <div key={contact.id} className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">{contact.role}: {contact.name}</div>
                  <div className="text-sm mt-1">
                    <div>📱 {contact.contact.phone}</div>
                    <div>✉️ {contact.contact.email}</div>
                    <div>🕒 Verfügbar: {contact.availabilityHours.start} - {contact.availabilityHours.end} ({contact.availabilityHours.timezone})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DocumentationRequirements: React.FC<{ requirements: DocumentationTemplate[] }> = ({ requirements }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Erforderliche Dokumentation</h3>
      <div className="space-y-4">
        {requirements.map(doc => (
          <div key={doc.id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{doc.title}</h4>
              {doc.legalRequirement && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Rechtlich erforderlich
                </span>
              )}
            </div>
            <div className="space-y-2 mt-2">
              {doc.sections.map((section, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{section.description}</div>
                  {section.required && (
                    <div className="text-xs text-red-600 mt-1">Pflichtfeld</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LegalRequirementsList: React.FC<{ requirements: LegalRequirement[] }> = ({ requirements }) => {
  if (requirements.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Rechtliche Anforderungen</h3>
      <div className="space-y-4">
        {requirements.map(req => (
          <div key={req.id} className="border rounded p-4 bg-purple-50">
            <h4 className="font-medium">{req.title}</h4>
            <p className="text-sm mt-1">{req.description}</p>
            <div className="mt-3 text-sm">
              <div><span className="font-medium">Zeitrahmen:</span> {req.timeframe}</div>
              <div><span className="font-medium">Behörde:</span> {req.authority}</div>
              <div><span className="font-medium">Kontakt:</span> {req.contactInfo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnvironmentSpecifics: React.FC<{
  specifics: Playbook['environmentSpecifics'],
  environment: 'cloud' | 'onprem' | 'hybrid'
}> = ({ specifics, environment }) => {
  // Bestimme, welche spezifischen Informationen anzuzeigen sind
  const showCloud = environment === 'cloud' || environment === 'hybrid';
  const showOnPrem = environment === 'onprem' || environment === 'hybrid';

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Umgebungsspezifische Informationen</h3>

      {showCloud && specifics.cloud && (
        <div className="border rounded p-4 mb-4">
          <h4 className="font-medium mb-2">Cloud-Umgebung</h4>

          <div className="mb-3">
            <div className="text-sm font-medium">Betroffene Services:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {specifics.cloud.services.map((service, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium">Cloud-Provider:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {specifics.cloud.providers.map((provider, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  {provider}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Spezifische Maßnahmen:</div>
            {specifics.cloud.specificActions.map(action => (
              <div key={action.id} className="bg-gray-50 p-3 rounded mb-2">
                <div className="flex justify-between">
                  <span>{action.text}</span>
                  <span className={`px-2 py-1 rounded text-xs ${action.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      action.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                    }`}>
                    {action.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Zeitschätzung: {action.timeEstimate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showOnPrem && specifics.onprem && (
        <div className="border rounded p-4">
          <h4 className="font-medium mb-2">On-Premise-Umgebung</h4>

          <div className="mb-3">
            <div className="text-sm font-medium">Betroffene Systeme:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {specifics.onprem.systems.map((system, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {system}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium">Netzwerke:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {specifics.onprem.networks.map((network, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  {network}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Spezifische Maßnahmen:</div>
            {specifics.onprem.specificActions.map(action => (
              <div key={action.id} className="bg-gray-50 p-3 rounded mb-2">
                <div className="flex justify-between">
                  <span>{action.text}</span>
                  <span className={`px-2 py-1 rounded text-xs ${action.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      action.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                    }`}>
                    {action.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Zeitschätzung: {action.timeEstimate}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Haupt-PlaybookViewer Komponente
const PlaybookViewer: React.FC<PlaybookViewerProps> = ({
  incidentType = '',
  environment = 'hybrid',
  onActionComplete
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [localChecklist, setLocalChecklist] = useState<ChecklistItem[]>([]);
  const [activeTab, setActiveTab] = useState<'actions' | 'escalation' | 'documentation' | 'legal' | 'environment'>('actions');
  const [successMessage, setSuccessMessage] = useState('');

  // Lade ein passendes Playbook
  useEffect(() => {
    const loadPlaybook = async () => {
      setIsLoading(true);
      try {
        // Finde ein passendes Playbook basierend auf Incident-Typ und Umgebung
        const matchingPlaybook = mockPlaybooks.find((pb: Playbook) =>
          pb.incidentTypes.includes(incidentType) &&
          pb.applicableEnvironments.includes(environment)
        );

        if (matchingPlaybook) {
          setPlaybook(matchingPlaybook);
          setLocalChecklist(matchingPlaybook.immediateActions);
        } else {
          // Fallback auf erstes Playbook, wenn kein passendes gefunden wird
          setPlaybook(mockPlaybooks[0]);
          setLocalChecklist(mockPlaybooks[0].immediateActions);
        }
      } catch (error) {
        console.error('Fehler beim Laden des Playbooks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaybook();
  }, [incidentType, environment]);

  // Toggle für Checklist-Items
  const toggleChecklistItem = (id: string) => {
    setLocalChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );

    // Optional: Zeige Erfolg für kurze Zeit an
    setSuccessMessage('Aktion aktualisiert');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Funktion zum Speichern der aktualisierten Checkliste
  const saveChecklist = async () => {
    if (!playbook) return;

    setIsSaving(true);
    try {
      // Aktualisiere das Playbook mit der lokalen Checkliste
      const updatedPlaybook = {
        ...playbook,
        immediateActions: localChecklist
      };

      // In einer echten Anwendung würde man hier einen API-Call zum Speichern machen
      // await updatePlaybook(playbook.id, { immediateActions: localChecklist });

      setPlaybook(updatedPlaybook);
      setSuccessMessage('Checkliste gespeichert!');

      // Benachrichtige den übergeordneten Komponenten über abgeschlossene Aktionen
      if (onActionComplete) {
        const completedActions = localChecklist.filter(item => item.isCompleted);
        if (completedActions.length > 0) {
          onActionComplete(playbook.id, completedActions);
        }
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Checkliste:', error);
    } finally {
      setIsSaving(false);

      // Verstecke die Erfolgsmeldung nach einiger Zeit
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // Render-Funktion
  if (isLoading) {
    return <div className="p-6 text-center">Playbook wird geladen...</div>;
  }

  if (!playbook) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Kein passendes Playbook für diesen Vorfall gefunden.</p>
        <p className="text-gray-500 mt-2">Erstellen Sie ein neues Playbook oder ändern Sie die Vorfallsdetails.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-xl font-semibold">{playbook.title}</h2>
        <p className="text-gray-600 mt-1">{playbook.description}</p>

        {/* Erfolgsmeldung anzeigen */}
        {successMessage && (
          <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'actions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('actions')}
        >
          Sofortmaßnahmen
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'escalation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('escalation')}
        >
          Eskalation
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'documentation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('documentation')}
        >
          Dokumentation
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'legal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('legal')}
        >
          Rechtliches
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'environment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('environment')}
        >
          Umgebung
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'actions' && (
          <ImmediateActionsList
            actions={localChecklist}
            onToggle={toggleChecklistItem}
            onSave={saveChecklist}
            isSaving={isSaving}
          />
        )}
        {activeTab === 'escalation' && <EscalationProcedure steps={playbook.escalationProcedure} />}
        {activeTab === 'documentation' && <DocumentationRequirements requirements={playbook.documentationRequirements} />}
        {activeTab === 'legal' && <LegalRequirementsList requirements={playbook.legalRequirements} />}
        {activeTab === 'environment' && <EnvironmentSpecifics specifics={playbook.environmentSpecifics} environment={environment} />}
      </div>
    </div>
  );
};

export default PlaybookViewer;