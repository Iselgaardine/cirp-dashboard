import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const DashboardCard = ({ title, value, icon, color }: DashboardCardProps): JSX.Element => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;