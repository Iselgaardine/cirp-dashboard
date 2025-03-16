import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Search, FileText, CheckSquare, FileCheck, ChevronDown, ChevronRight, Download } from 'lucide-react';

// Typdefinitionen
type DocumentCategory = 'sops' | 'checklists' | 'templates';

interface DocumentItem {
  id: number;
  name: string;
  type: string;
  date: string;
}

interface CategoryState {
  sops: boolean;
  checklists: boolean;
  templates: boolean;
}

interface DocumentCollection {
  sops: DocumentItem[];
  checklists: DocumentItem[];
  templates: DocumentItem[];
}

const Documentation = (): JSX.Element => {
  // State für erweiterte Kategorien
  const [expandedCategories, setExpandedCategories] = useState<CategoryState>({
    sops: false,
    checklists: false,
    templates: false
  });
  
  // State für Suchbegriff
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Toggle-Funktion für Kategorien
  const toggleCategory = (category: DocumentCategory): void => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };
  
  // Beispiel-Dokumente
  const documents: DocumentCollection = {
    sops: [
      { id: 1, name: 'Malware-Reaktion SOP', type: 'pdf', date: '15.02.2025' },
      { id: 2, name: 'Datenschutzverletzung SOP', type: 'pdf', date: '10.01.2025' },
      { id: 3, name: 'Ransomware-Reaktion SOP', type: 'pdf', date: '03.03.2025' },
    ],
    checklists: [
      { id: 1, name: 'DDoS-Angriff Checkliste', type: 'pdf', date: '20.01.2025' },
      { id: 2, name: 'Phishing-Vorfall Checkliste', type: 'pdf', date: '05.02.2025' },
      { id: 3, name: 'Zugriffsberechtigungsverletzung', type: 'pdf', date: '28.02.2025' },
    ],
    templates: [
      { id: 1, name: 'Vorfallsbericht-Vorlage', type: 'docx', date: '12.01.2025' },
      { id: 2, name: 'Incident Response Protokoll', type: 'docx', date: '25.02.2025' },
      { id: 3, name: 'Lessons Learned Dokumentation', type: 'pptx', date: '07.03.2025' },
    ]
  };
  
  // Filterfunktion für die Suche
  const filteredDocuments = {
    sops: documents.sops.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())),
    checklists: documents.checklists.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())),
    templates: documents.templates.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
  };
  
  // Hilfsfunktion für Icon-Auswahl basierend auf Dokumenttyp
  const getDocTypeIcon = (type: string): JSX.Element => {
    switch(type) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'docx':
        return <FileText size={16} className="text-blue-500" />;
      case 'pptx':
        return <FileText size={16} className="text-orange-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };
  
  // Hilfsfunktion zum Simulieren eines Dokumentendownloads
  const handleDocumentClick = (doc: DocumentItem): void => {
    alert(`Dokument "${doc.name}" wird heruntergeladen...`);
    // Hier könnte später eine echte Download-Funktionalität implementiert werden
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">

      
      {/* Suchleiste */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Dokumente durchsuchen..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Dokumentenkategorien */}
      <div className="space-y-4">
        {/* SOPs Kategorie */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
            onClick={() => toggleCategory('sops')}
          >
            <div className="flex items-center">
              <FileCheck size={20} className="text-blue-600 mr-2" />
              <span className="font-medium">Standard Operating Procedures (SOPs)</span>
            </div>
            {expandedCategories.sops ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
          
          {expandedCategories.sops && (
            <div className="p-3">
              {filteredDocuments.sops.length > 0 ? (
                <div className="space-y-2">
                  {filteredDocuments.sops.map(doc => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <div className="flex items-center">
                        {getDocTypeIcon(doc.type)}
                        <span className="ml-2">{doc.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{doc.date}</span>
                        <Download size={16} className="text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Keine Dokumente gefunden.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Checklisten Kategorie */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
            onClick={() => toggleCategory('checklists')}
          >
            <div className="flex items-center">
              <CheckSquare size={20} className="text-green-600 mr-2" />
              <span className="font-medium">Checklisten für verschiedene Vorfallsarten</span>
            </div>
            {expandedCategories.checklists ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
          
          {expandedCategories.checklists && (
            <div className="p-3">
              {filteredDocuments.checklists.length > 0 ? (
                <div className="space-y-2">
                  {filteredDocuments.checklists.map(doc => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <div className="flex items-center">
                        {getDocTypeIcon(doc.type)}
                        <span className="ml-2">{doc.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{doc.date}</span>
                        <Download size={16} className="text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Keine Dokumente gefunden.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Vorlagen Kategorie */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
            onClick={() => toggleCategory('templates')}
          >
            <div className="flex items-center">
              <FileText size={20} className="text-purple-600 mr-2" />
              <span className="font-medium">Vorlagen für Berichte und Protokolle</span>
            </div>
            {expandedCategories.templates ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
          
          {expandedCategories.templates && (
            <div className="p-3">
              {filteredDocuments.templates.length > 0 ? (
                <div className="space-y-2">
                  {filteredDocuments.templates.map(doc => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <div className="flex items-center">
                        {getDocTypeIcon(doc.type)}
                        <span className="ml-2">{doc.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{doc.date}</span>
                        <Download size={16} className="text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Keine Dokumente gefunden.</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Kürzlich angesehene Dokumente */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-2">Kürzlich angesehen</h3>
        <div className="border border-gray-200 rounded-md p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center">
                <FileText size={16} className="text-red-500" />
                <span className="ml-2">Ransomware-Reaktion SOP</span>
              </div>
              <span className="text-sm text-gray-500">Heute</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center">
                <FileText size={16} className="text-blue-500" />
                <span className="ml-2">Vorfallsbericht-Vorlage</span>
              </div>
              <span className="text-sm text-gray-500">Gestern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;