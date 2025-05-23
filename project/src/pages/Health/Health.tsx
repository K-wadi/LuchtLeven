import React from 'react';

const Health = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gezondheidskosten</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Gezondheidsuitgaven</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Beheer hier je gezondheid-gerelateerde uitgaven.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Health;