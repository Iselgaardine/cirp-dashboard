// src/pages/TeamContacts.tsx
import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  isOnCall: boolean;
  expertise: string[];
  availability: {
    hours: string;
    timezone: string;
  };
}

interface ExternalContact {
  id: number;
  name: string;
  organization: string;
  type: 'vendor' | 'regulator' | 'lawEnforcement' | 'consultant';
  email: string;
  phone: string;
  serviceHours: string;
  contractInfo?: string;
  notes?: string;
}

const TeamContacts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'internal' | 'external' | 'oncall'>('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterExpertise, setFilterExpertise] = useState<string>('all');
  const [filterContactType, setFilterContactType] = useState<string>('all');
  
  // Mock-Daten für das Team
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Walter Ulbricht',
      role: 'IT-Leiter',
      department: 'IT',
      email: 'walter.ulbricht@unternehmen.de',
      phone: '+49 123 456789',
      isOnCall: true,
      expertise: ['Security Management', 'Cloud Infrastructure', 'Incident Response'],
      availability: {
        hours: '08:00-18:00',
        timezone: 'Europe/Berlin'
      }
    },
    {
      id: 2,
      name: 'Liselotte Pulver',
      role: 'CISO',
      department: 'Security',
      email: 'liselotte.pulver@unternehmen.de',
      phone: '+49 123 456781',
      isOnCall: true,
      expertise: ['Risk Management', 'Compliance', 'Security Strategy'],
      availability: {
        hours: '08:00-18:00',
        timezone: 'Europe/Berlin'
      }
    },
    {
      id: 3,
      name: 'Mata Hari',
      role: 'Cloud-Administrator',
      department: 'IT',
      email: 'mata.hari@unternehmen.de',
      phone: '+49 123 456782',
      isOnCall: true,
      expertise: ['AWS', 'Azure', 'Google Cloud', 'Cloud Security'],
      availability: {
        hours: '09:00-17:00',
        timezone: 'Europe/Berlin'
      }
    },
    {
      id: 4,
      name: 'Cleo Patra',
      role: 'Security Analyst',
      department: 'Security',
      email: 'cleo.patra@unternehmen.de',
      phone: '+49 123 456783',
      isOnCall: false,
      expertise: ['SIEM', 'Threat Intelligence', 'Forensics'],
      availability: {
        hours: '08:30-17:30',
        timezone: 'Europe/Berlin'
      }
    },
    {
      id: 5,
      name: 'Tschingis Khan',
      role: 'Netzwerk-Administrator',
      department: 'IT',
      email: 'tschingis.khan@unternehmen.de',
      phone: '+49 123 456784',
      isOnCall: false,
      expertise: ['Networking', 'Firewalls', 'VPN'],
      availability: {
        hours: '08:00-16:00',
        timezone: 'Europe/Berlin'
      }
    },
    {
      id: 6,
      name: 'Nofre Tete',
      role: 'Datenschutzbeauftragte',
      department: 'Legal',
      email: 'nofre.tete@unternehmen.de',
      phone: '+49 123 456785',
      isOnCall: false,
      expertise: ['DSGVO', 'Compliance', 'Data Protection'],
      availability: {
        hours: '09:00-17:00',
        timezone: 'Europe/Berlin'
      }
    }
  ];
  
  // Mock-Daten für externe Kontakte
  const externalContacts: ExternalContact[] = [
    {
      id: 1,
      name: 'Landesdatenschutzbehörde',
      organization: 'Staatliche Behörde',
      type: 'regulator',
      email: 'meldung@datenschutz-land.de',
      phone: '+49 123 987654',
      serviceHours: 'Mo-Fr 9:00-16:00',
      notes: 'Meldungen von Datenschutzvorfällen müssen innerhalb von 72 Stunden erfolgen.'
    },
    {
      id: 2,
      name: 'Sicherheit GmbH',
      organization: 'IT-Forensik Dienstleister',
      type: 'consultant',
      email: 'notfall@sicherheit-gmbh.de',
      phone: '+49 800 123456',
      serviceHours: '24/7',
      contractInfo: 'Vertrag #IR-2023-0456',
      notes: 'Für forensische Untersuchungen und Incident Response Unterstützung'
    },
    {
      id: 3,
      name: 'Cloud Provider Support',
      organization: 'AWS',
      type: 'vendor',
      email: 'enterprise-support@aws.example.com',
      phone: '+1 555 123456',
      serviceHours: '24/7',
      contractInfo: 'Enterprise Support Plan',
      notes: 'TAM: John Smith (john.smith@aws.example.com)'
    },
    {
      id: 4,
      name: 'Polizei - Cybercrime-Abteilung',
      organization: 'Landeskriminalamt',
      type: 'lawEnforcement',
      email: 'cybercrime@lka.land.de',
      phone: '+49 123 110',
      serviceHours: 'Mo-Fr 8:00-16:00 (Notfall: 24/7)',
      notes: 'Bei strafrechtlich relevanten Vorfällen'
    }
  ];
  
  // Filter-Logik für Team
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    
    const matchesExpertise = filterExpertise === 'all' || 
                            member.expertise.some(exp => exp.toLowerCase().includes(filterExpertise.toLowerCase()));
    
    return matchesSearch && matchesDepartment && matchesExpertise;
  });
  
  // Filter für On-Call-Mitglieder
  const onCallMembers = teamMembers.filter(member => member.isOnCall);
  
  // Filter-Logik für externe Kontakte
  const filteredExternalContacts = externalContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterContactType === 'all' || contact.type === filterContactType;
    
    return matchesSearch && matchesType;
  });
  
  // Extraktion der einzigartigen Abteilungen für Filter
  const departments = Array.from(new Set(teamMembers.map(member => member.department)));
  
  // Extraktion der einzigartigen Fachgebiete für Filter
  const allExpertise = teamMembers.flatMap(member => member.expertise);
  const uniqueExpertise = Array.from(new Set(allExpertise));
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team & Kontakte</h1>
      
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'internal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('internal')}
        >
          Internes Team
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'external' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('external')}
        >
          Externe Kontakte
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'oncall' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('oncall')}
        >
          On-Call-Plan
        </button>
      </div>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Suche</label>
            <input
              type="text"
              placeholder="Name, Rolle oder E-Mail..."
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {activeTab === 'internal' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Abteilung</label>
                <select 
                  className="p-2 border rounded"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">Alle Abteilungen</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fachgebiet</label>
                <select 
                  className="p-2 border rounded"
                  value={filterExpertise}
                  onChange={(e) => setFilterExpertise(e.target.value)}
                >
                  <option value="all">Alle Fachgebiete</option>
                  {uniqueExpertise.map((exp, idx) => (
                    <option key={idx} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          {activeTab === 'external' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kontakttyp</label>
              <select 
                className="p-2 border rounded"
                value={filterContactType}
                onChange={(e) => setFilterContactType(e.target.value)}
              >
                <option value="all">Alle Typen</option>
                <option value="vendor">Anbieter</option>
                <option value="regulator">Behörde</option>
                <option value="lawEnforcement">Strafverfolgung</option>
                <option value="consultant">Berater</option>
              </select>
            </div>
          )}
        </div>
      </div>
      
      {activeTab === 'internal' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Rolle</th>
                  <th className="border p-2 text-left">Abteilung</th>
                  <th className="border p-2 text-left">Kontakt</th>
                  <th className="border p-2 text-left">Fachgebiete</th>
                  <th className="border p-2 text-left">Verfügbarkeit</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeamMembers.map(member => (
                  <tr key={member.id}>
                    <td className="border p-2 font-medium">{member.name}</td>
                    <td className="border p-2">{member.role}</td>
                    <td className="border p-2">{member.department}</td>
                    <td className="border p-2">
                      <div>{member.email}</div>
                      <div>{member.phone}</div>
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((exp, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border p-2">
                      {member.availability.hours} ({member.availability.timezone})
                    </td>
                    <td className="border p-2">
                      {member.isOnCall ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          On-Call
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          Normal
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'external' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Organisation</th>
                  <th className="border p-2 text-left">Typ</th>
                  <th className="border p-2 text-left">Kontakt</th>
                  <th className="border p-2 text-left">Servicezeiten</th>
                  <th className="border p-2 text-left">Notizen</th>
                </tr>
              </thead>
              <tbody>
                {filteredExternalContacts.map(contact => (
                  <tr key={contact.id}>
                    <td className="border p-2 font-medium">{contact.name}</td>
                    <td className="border p-2">{contact.organization}</td>
                    <td className="border p-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        contact.type === 'vendor' ? 'bg-blue-100 text-blue-800' :
                        contact.type === 'regulator' ? 'bg-purple-100 text-purple-800' :
                        contact.type === 'lawEnforcement' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {contact.type === 'vendor' ? 'Anbieter' :
                         contact.type === 'regulator' ? 'Behörde' :
                         contact.type === 'lawEnforcement' ? 'Strafverfolgung' :
                         'Berater'}
                      </span>
                    </td>
                    <td className="border p-2">
                      <div>{contact.email}</div>
                      <div>{contact.phone}</div>
                      {contact.contractInfo && <div className="text-xs text-gray-600 mt-1">{contact.contractInfo}</div>}
                    </td>
                    <td className="border p-2">{contact.serviceHours}</td>
                    <td className="border p-2 text-sm">{contact.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'oncall' && (
        <div>
          <div className="bg-white rounded-lg shadow-md mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4">Aktuelle On-Call-Besetzung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onCallMembers.map(member => (
                <div key={member.id} className="border rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <div className="text-sm text-gray-700">{member.role}</div>
                  <div className="text-sm text-gray-700">{member.department}</div>
                  <div className="mt-2 text-sm">
                    <div className="flex items-center">
                      <span className="mr-2">📱</span>
                      {member.phone}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">✉️</span>
                      {member.email}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="flex items-center">
                      <span className="mr-2">🕒</span>
                      {member.availability.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">On-Call-Plan (kommende Wochen)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Zeitraum</th>
                    <th className="border p-2 text-left">Primärer Kontakt</th>
                    <th className="border p-2 text-left">Backup</th>
                    <th className="border p-2 text-left">Manager On-Call</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">26.02. - 04.03.2024</td>
                    <td className="border p-2">Walter Ulbricht (IT)</td>
                    <td className="border p-2">Mata Hari (IT)</td>
                    <td className="border p-2">Liselotte Pulver (Security)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">05.03. - 11.03.2024</td>
                    <td className="border p-2">Mata Hari (IT)</td>
                    <td className="border p-2">Tschingis Khan (IT)</td>
                    <td className="border p-2">Liselotte Pulver (Security)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">12.03. - 18.03.2024</td>
                    <td className="border p-2">Cleo Patra (Security)</td>
                    <td className="border p-2">Walter Ulbricht (IT)</td>
                    <td className="border p-2">Liselotte Pulver (Security)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamContacts;