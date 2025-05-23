import React from 'react';

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financieel Overzicht</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Jaaroverzicht</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hier komt het jaarlijkse financiële overzicht.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Maandoverzicht</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hier komt het maandelijkse financiële overzicht.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;