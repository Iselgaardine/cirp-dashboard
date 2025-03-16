// src/pages/Settings.tsx
import React, { useState } from 'react';

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

interface UserPreference {
  id: string;
  name: string;
  value: string;
  options: string[];
}

interface IntegrationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  configured: boolean;
  apiKey?: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences' | 'integrations' | 'security'>('notifications');
  
  // Mock-Daten für Benachrichtigungseinstellungen
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-incident',
      name: 'Neue Incidents',
      description: 'Benachrichtigung bei Erstellung neuer Incidents',
      enabled: true,
      channels: {
        email: true,
        sms: true,
        push: false
      }
    },
    {
      id: 'status-change',
      name: 'Status-Änderungen',
      description: 'Benachrichtigung bei Änderung des Incident-Status',
      enabled: true,
      channels: {
        email: true,
        sms: false,
        push: true
      }
    },
    {
      id: 'comments',
      name: 'Neue Kommentare',
      description: 'Benachrichtigung bei neuen Kommentaren zu Incidents',
      enabled: false,
      channels: {
        email: true,
        sms: false,
        push: false
      }
    },
    {
      id: 'escalation',
      name: 'Eskalationen',
      description: 'Benachrichtigung bei Eskalation eines Incidents',
      enabled: true,
      channels: {
        email: true,
        sms: true,
        push: true
      }
    }
  ]);
  
  // Mock-Daten für Benutzereinstellungen
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([
    {
      id: 'theme',
      name: 'Design',
      value: 'system',
      options: ['light', 'dark', 'system']
    },
    {
      id: 'language',
      name: 'Sprache',
      value: 'de',
      options: ['de', 'en', 'fr']
    },
    {
      id: 'timezone',
      name: 'Zeitzone',
      value: 'Europe/Berlin',
      options: ['Europe/Berlin', 'Europe/London', 'America/New_York', 'Asia/Tokyo']
    },
    {
      id: 'dashboard-layout',
      name: 'Dashboard-Layout',
      value: 'compact',
      options: ['compact', 'detailed', 'kanban']
    }
  ]);
  
  // Mock-Daten für Integrationen
  const [integrations, setIntegrations] = useState<IntegrationSetting[]>([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Integration mit Slack für Incident-Benachrichtigungen',
      enabled: true,
      configured: true,
      apiKey: 'xoxb-123456789-abcdefghijklmnopqrstuvwxyz'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Jira-Integration zur Ticket-Erstellung',
      enabled: false,
      configured: false
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Teams-Integration für Benachrichtigungen',
      enabled: true,
      configured: true,
      apiKey: '1234567890abcdefghijklmnopqrstuvwxyz'
    },
    {
      id: 'pagerduty',
      name: 'PagerDuty',
      description: 'PagerDuty-Integration für Bereitschaftsalarmierung',
      enabled: false,
      configured: false
    }
  ]);
  
  // Funktionen für Einstellungsänderungen
  const toggleNotification = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled } 
          : setting
      )
    );
  };
  
  const toggleNotificationChannel = (id: string, channel: keyof NotificationSetting['channels']) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { 
              ...setting, 
              channels: { 
                ...setting.channels, 
                [channel]: !setting.channels[channel] 
              } 
            } 
          : setting
      )
    );
  };
  
  const changePreference = (id: string, value: string) => {
    setUserPreferences(prev => 
      prev.map(pref => 
        pref.id === id 
          ? { ...pref, value } 
          : pref
      )
    );
  };
  
  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled } 
          : integration
      )
    );
  };
  
  // API-Key anzeigen/verbergen
  const [visibleApiKeys, setVisibleApiKeys] = useState<Record<string, boolean>>({});
  
  const toggleApiKeyVisibility = (id: string) => {
    setVisibleApiKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="p-6">
      
      
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('notifications')}
        >
          Benachrichtigungen
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'preferences' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('preferences')}
        >
          Benutzereinstellungen
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'integrations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('integrations')}
        >
          Integrationen
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('security')}
        >
          Sicherheit
        </button>
      </div>
      
      {/* Benachrichtigungen */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Benachrichtigungseinstellungen</h2>
            <p className="text-gray-600 mb-6">Konfigurieren Sie, wann und wie Sie benachrichtigt werden möchten.</p>
            
            <div className="space-y-4">
              {notificationSettings.map(setting => (
                <div key={setting.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{setting.name}</h3>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">
                        {setting.enabled ? 'Aktiviert' : 'Deaktiviert'}
                      </span>
                      <button
                        onClick={() => toggleNotification(setting.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Benachrichtigungskanäle</h4>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.channels.email}
                          onChange={() => toggleNotificationChannel(setting.id, 'email')}
                          disabled={!setting.enabled}
                          className="mr-2"
                        />
                        <span className={!setting.enabled ? 'text-gray-400' : ''}>E-Mail</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.channels.sms}
                          onChange={() => toggleNotificationChannel(setting.id, 'sms')}
                          disabled={!setting.enabled}
                          className="mr-2"
                        />
                        <span className={!setting.enabled ? 'text-gray-400' : ''}>SMS</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.channels.push}
                          onChange={() => toggleNotificationChannel(setting.id, 'push')}
                          disabled={!setting.enabled}
                          className="mr-2"
                        />
                        <span className={!setting.enabled ? 'text-gray-400' : ''}>Push</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Benutzereinstellungen */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Benutzereinstellungen</h2>
            <p className="text-gray-600 mb-6">Personalisieren Sie Ihre Benutzeroberfläche und Erfahrung.</p>
            
            <div className="space-y-6">
              {userPreferences.map(pref => (
                <div key={pref.id} className="flex flex-col">
                  <label className="font-medium mb-1">{pref.name}</label>
                  <select
                    value={pref.value}
                    onChange={(e) => changePreference(pref.id, e.target.value)}
                    className="border rounded p-2 max-w-md"
                  >
                    {pref.options.map(option => (
                      <option key={option} value={option}>
                        {pref.id === 'theme' && option === 'system' ? 'System (automatisch)' : 
                         pref.id === 'theme' && option === 'light' ? 'Hell' :
                         pref.id === 'theme' && option === 'dark' ? 'Dunkel' :
                         pref.id === 'language' && option === 'de' ? 'Deutsch' :
                         pref.id === 'language' && option === 'en' ? 'Englisch' :
                         pref.id === 'language' && option === 'fr' ? 'Französisch' :
                         pref.id === 'dashboard-layout' && option === 'compact' ? 'Kompakt' :
                         pref.id === 'dashboard-layout' && option === 'detailed' ? 'Detailliert' :
                         pref.id === 'dashboard-layout' && option === 'kanban' ? 'Kanban-Board' :
                         option}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-600 mt-1">
                    {pref.id === 'theme' ? 'Wählen Sie Ihr bevorzugtes Farbschema.' :
                     pref.id === 'language' ? 'Wählen Sie Ihre bevorzugte Sprache.' :
                     pref.id === 'timezone' ? 'Setzen Sie Ihre lokale Zeitzone für korrekte Zeitanzeigen.' :
                     pref.id === 'dashboard-layout' ? 'Passen Sie an, wie Ihr Haupt-Dashboard angezeigt wird.' : ''}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Einstellungen speichern
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Integrationen */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Integrationen</h2>
            <p className="text-gray-600 mb-6">Verbinden Sie das CIRP-Dashboard mit anderen Tools und Diensten.</p>
            
            <div className="space-y-6">
              {integrations.map(integration => (
                <div key={integration.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">
                        {integration.enabled ? 'Aktiviert' : 'Deaktiviert'}
                      </span>
                      <button
                        onClick={() => toggleIntegration(integration.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          integration.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        disabled={!integration.configured}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            integration.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {integration.configured ? (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Status:</span>{' '}
                          <span className="text-green-600">Konfiguriert</span>
                        </div>
                        {integration.apiKey && (
                          <div className="flex items-center space-x-2">
                            <div className="text-sm">
                              <span className="font-medium">API-Key:</span>{' '}
                              <span className="font-mono">
                                {visibleApiKeys[integration.id] 
                                  ? integration.apiKey 
                                  : '••••••••••••••••••••••••••'}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleApiKeyVisibility(integration.id)}
                              className="text-blue-600 text-sm hover:underline"
                            >
                              {visibleApiKeys[integration.id] ? 'Verbergen' : 'Anzeigen'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm">
                        <span className="font-medium">Status:</span>{' '}
                        <span className="text-orange-600">Nicht konfiguriert</span>
                      </div>
                      <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Konfigurieren
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Sicherheit */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sicherheitseinstellungen</h2>
            <p className="text-gray-600 mb-6">Verwalten Sie Ihre Sicherheitsoptionen und Zugriffskontrollen.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Passwort ändern</h3>
                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="block text-sm mb-1">Aktuelles Passwort</label>
                    <input 
                      type="password" 
                      className="w-full border rounded p-2" 
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Neues Passwort</label>
                    <input 
                      type="password" 
                      className="w-full border rounded p-2" 
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Passwort bestätigen</label>
                    <input 
                      type="password" 
                      className="w-full border rounded p-2" 
                      placeholder="••••••••••••"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Passwort aktualisieren
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-medium mb-2">Zwei-Faktor-Authentifizierung</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Erhöhen Sie die Sicherheit Ihres Kontos mit 2FA.</p>
                    <p className="text-sm text-red-600 mt-1">Nicht aktiviert</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    2FA einrichten
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-medium mb-2">Sitzungsverwaltung</h3>
                <p className="text-sm text-gray-600 mb-4">Aktive Sitzungen auf all Ihren Geräten.</p>
                
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Aktuelles Gerät (Desktop)</div>
                        <div className="text-sm text-gray-600">Chrome auf Windows • Berlin, DE</div>
                        <div className="text-sm text-gray-600">IP: 192.168.1.1 • Zuletzt aktiv: Jetzt</div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Aktuell
                      </span>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">iPhone 14</div>
                        <div className="text-sm text-gray-600">Safari auf iOS • München, DE</div>
                        <div className="text-sm text-gray-600">IP: 192.168.2.2 • Zuletzt aktiv: Vor 2 Tagen</div>
                      </div>
                      <button className="text-red-600 text-sm hover:underline">
                        Abmelden
                      </button>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Von allen Geräten abmelden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;