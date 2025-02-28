import React from 'react';

interface TimelineEvent {
  id: number;
  incidentId: number;
  type: 'created' | 'status_changed' | 'updated' | 'resolved';
  timestamp: string;
  description: string;
  user: string;
  details?: {
    oldStatus?: string;
    newStatus?: string;
    changes?: string[];
  };
}

interface TimelineProps {
  events: TimelineEvent[];
}

const getEventColor = (type: TimelineEvent['type']): string => {
  const colors = {
    created: 'bg-blue-500',
    status_changed: 'bg-yellow-500',
    updated: 'bg-purple-500',
    resolved: 'bg-green-500'
  };
  return colors[type];
};

const getEventIcon = (type: TimelineEvent['type']): string => {
  const icons = {
    created: '🔔',
    status_changed: '🔄',
    updated: '📝',
    resolved: '✅'
  };
  return icons[type];
};

const TimelineView: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getEventColor(event.type)}`}
                  >
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-800">
                      {event.description}
                      {event.details?.changes && (
                        <ul className="mt-1 text-xs text-gray-500 list-disc list-inside">
                          {event.details.changes.map((change, idx) => (
                            <li key={idx}>{change}</li>
                          ))}
                        </ul>
                      )}
                      {event.details?.oldStatus && event.details?.newStatus && (
                        <span className="text-xs text-gray-500">
                          Status: {event.details.oldStatus} → {event.details.newStatus}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.timestamp}>
                      {new Date(event.timestamp).toLocaleString('de-DE')}
                    </time>
                    <div className="text-xs">{event.user}</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineView;