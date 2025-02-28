import React from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
  onSearch: (term: string) => void;
  onSeverityFilter: (severity: string) => void;
  onStatusFilter: (status: string) => void;
  totalIncidents: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearch, 
  onSeverityFilter, 
  onStatusFilter, 
  totalIncidents 
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Vorfälle durchsuchen..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            onChange={(e) => onSeverityFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">Alle Schweregrade</option>
            <option value="Critical">Kritisch</option>
            <option value="High">Hoch</option>
            <option value="Medium">Mittel</option>
            <option value="Low">Niedrig</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            onChange={(e) => onStatusFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">Alle Status</option>
            <option value="New">Neu</option>
            <option value="In Progress">In Bearbeitung</option>
            <option value="Pending">Ausstehend</option>
            <option value="Resolved">Gelöst</option>
          </select>

          <span className="text-sm text-gray-600">
            {totalIncidents} Vorfälle gefunden
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;