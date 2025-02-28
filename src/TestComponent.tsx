// src/TestComponent.tsx
import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Tailwind Test</h1>
      <p className="mt-2 text-gray-700">Diese Komponente testet, ob Tailwind funktioniert.</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Test-Button
      </button>
    </div>
  );
};

export default TestComponent;