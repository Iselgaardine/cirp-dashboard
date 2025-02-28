import React from 'react';

const SimplifiedDashboard = () => {
  const incidents = [
    {
      id: 1,
      type: 'Malware Detection',
      severity: 'High',
      status: 'Open',
      timestamp: '2025-02-12 09:23',
      description: 'Ransomware activity detected'
    },
    {
      id: 2,
      type: 'Unauthorized Access',
      severity: 'Medium',
      status: 'In Progress',
      timestamp: '2025-02-12 08:15',
      description: 'Multiple failed login attempts'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CIRP Dashboard</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Notifications
        </button>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong className="font-bold">Critical Alert! </strong>
        <span className="block sm:inline">High-severity incident detected.</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Active Incidents Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Active Incidents</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="text-red-500">⚠️</div>
          </div>
        </div>

        {/* Response Time Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold">15m</p>
            </div>
            <div className="text-blue-500">⏱️</div>
          </div>
        </div>

        {/* Security Score Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Security Score</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
            <div className="text-green-500">🛡️</div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="text-yellow-500">🔔</div>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Active Incidents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {incidents.map(incident => (
                <tr key={incident.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{incident.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{incident.status}</td>
                  <td className="px-6 py-4">{incident.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{incident.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedDashboard;
