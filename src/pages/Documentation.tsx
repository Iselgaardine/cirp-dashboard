import React from 'react';
import { JSX } from 'react/jsx-runtime';

const Documentation = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Dokumentation</h2>
      <div className="prose">
        <p className="text-gray-600">Hier finden Sie wichtige Dokumente und Anleitungen zum CIRP:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Standard Operating Procedures (SOPs)</li>
          <li>Checklisten für verschiedene Vorfallsarten</li>
          <li>Vorlagen für Berichte und Protokolle</li>
        </ul>
      </div>
    </div>
  );
};

export default Documentation;