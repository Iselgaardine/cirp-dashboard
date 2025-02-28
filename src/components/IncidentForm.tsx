import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

interface IncidentFormProps {
  onClose: () => void;
  onSubmit: (incident: any) => void;
}

const IncidentForm = ({ onClose, onSubmit }: IncidentFormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    assignee: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now(),
      status: 'New',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Neuen Vorfall melden</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titel
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schweregrad
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
            >
              <option value="Critical">Kritisch</option>
              <option value="High">Hoch</option>
              <option value="Medium">Mittel</option>
              <option value="Low">Niedrig</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zuweisen an
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.assignee}
              onChange={(e) => setFormData({...formData, assignee: e.target.value})}
              placeholder="Optional"
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
              Vorfall melden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;