import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

interface Incident {
  id: number;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Pending' | 'Resolved';
  timestamp: string;
  assignee: string;
  description: string;
}

interface IncidentEditFormProps {
  incident: Incident;
  onClose: () => void;
  onUpdate: (updatedIncident: Incident) => void;
}

const IncidentEditForm = ({ incident, onClose, onUpdate }: IncidentEditFormProps): JSX.Element => {
  const [formData, setFormData] = useState<Incident>({ ...incident });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Vorfall #{incident.id} bearbeiten</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schweregrad</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as Incident['severity'] })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Critical">Kritisch</option>
                <option value="High">Hoch</option>
                <option value="Medium">Mittel</option>
                <option value="Low">Niedrig</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Incident['status'] })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="New">Neu</option>
                <option value="In Progress">In Bearbeitung</option>
                <option value="Pending">Ausstehend</option>
                <option value="Resolved">Gelöst</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zugewiesen an</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Name des Bearbeiters"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Änderungen speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentEditForm;