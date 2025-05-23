import React from 'react';

const Goals = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for goals content - this ensures the page has a basic structure */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Set New Goal</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create and track your financial goals here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Goals;