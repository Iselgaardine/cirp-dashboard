// src/pages/IncidentResponse.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const IncidentResponse: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Incident Response Ressourcen</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Prozeduren und Richtlinien</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">📑</span>
              <Link to="#" className="text-blue-600 hover:underline">Incident Response Plan (Master-Dokument)</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">📑</span>
              <Link to="#" className="text-blue-600 hover:underline">Benachrichtigungsmatrix</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">📑</span>
              <Link to="#" className="text-blue-600 hover:underline">Incident Klassifizierungsrichtlinien</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">📑</span>
              <Link to="#" className="text-blue-600 hover:underline">Lessons Learned Template</Link>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Playbook Bibliothek</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-red-100 text-red-800 p-1 rounded mr-2">🛡️</span>
              <Link to="#" className="text-blue-600 hover:underline">Ransomware Reaktion</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-orange-100 text-orange-800 p-1 rounded mr-2">🛡️</span>
              <Link to="#" className="text-blue-600 hover:underline">Datenleck / Datenverlust</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 p-1 rounded mr-2">🛡️</span>
              <Link to="#" className="text-blue-600 hover:underline">Cloud-Service Ausfall</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">🛡️</span>
              <Link to="#" className="text-blue-600 hover:underline">Unberechtigter Zugriff</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-purple-100 text-purple-800 p-1 rounded mr-2">🛡️</span>
              <Link to="#" className="text-blue-600 hover:underline">Phishing Kampagne</Link>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trainingsmaterialien</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded mr-2">🎓</span>
              <Link to="#" className="text-blue-600 hover:underline">Incident Response Grundlagen</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded mr-2">🎓</span>
              <Link to="#" className="text-blue-600 hover:underline">Cloud-Sicherheit für Mittelstand</Link>
            </li>
            <li className="flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded mr-2">🎓</span>
              <Link to="#" className="text-blue-600 hover:underline">Simulation: Ransomware-Angriff</Link>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Externe Ressourcen</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-gray-100 text-gray-800 p-1 rounded mr-2">🔗</span>
              <a href="https://www.bsi.bund.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BSI - Bundesamt für Sicherheit in der Informationstechnik</a>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-100 text-gray-800 p-1 rounded mr-2">🔗</span>
              <a href="https://www.cert-bund.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CERT-Bund</a>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-100 text-gray-800 p-1 rounded mr-2">🔗</span>
              <a href="https://www.enisa.europa.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ENISA - Europäische Agentur für Cybersicherheit</a>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-100 text-gray-800 p-1 rounded mr-2">🔗</span>
              <a href="https://www.sans.org/reading-room/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SANS Incident Response Ressourcen</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Letzte Incident Response Übungen</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Datum</th>
                <th className="border p-2 text-left">Szenario</th>
                <th className="border p-2 text-left">Teilnehmer</th>
                <th className="border p-2 text-left">Ergebnis</th>
                <th className="border p-2 text-left">Dokumente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">10.02.2023</td>
                <td className="border p-2">Ransomware-Übung</td>
                <td className="border p-2">IT-Team, Management</td>
                <td className="border p-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Verbesserungspotential</span>
                </td>
                <td className="border p-2">
                  <Link to="#" className="text-blue-600 hover:underline">Bericht</Link>
                </td>
              </tr>
              <tr>
                <td className="border p-2">15.05.2023</td>
                <td className="border p-2">Cloud-Service Ausfall</td>
                <td className="border p-2">Cloud-Team, DevOps</td>
                <td className="border p-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Erfolgreich</span>
                </td>
                <td className="border p-2">
                  <Link to="#" className="text-blue-600 hover:underline">Bericht</Link>
                </td>
              </tr>
              <tr>
                <td className="border p-2">22.08.2023</td>
                <td className="border p-2">Datenverlust-Szenario</td>
                <td className="border p-2">IT-Sicherheit, Datenschutz</td>
                <td className="border p-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Erfolgreich</span>
                </td>
                <td className="border p-2">
                  <Link to="#" className="text-blue-600 hover:underline">Bericht</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponse;