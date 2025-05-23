import React from 'react';
import { ChevronRight } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText?: string;
  onClick?: () => void;
}

const InsightCard = ({ title, description, icon, actionText, onClick }: InsightCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          {actionText && (
            <button 
              onClick={onClick}
              className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {actionText}
              <ChevronRight size={14} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;