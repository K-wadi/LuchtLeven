import React from 'react';
import { ShoppingBag, Utensils, Home, Car, Heart, Monitor, Coffee } from 'lucide-react';

// Mock data for MVP
const mockTransactions = [
  {
    id: 1,
    title: 'Albert Heijn',
    category: 'Boodschappen',
    amount: -57.84,
    date: '2025-04-16',
    icon: <ShoppingBag size={16} />
  },
  {
    id: 2,
    title: 'Salarisoverschrijving',
    category: 'Inkomen',
    amount: 2800.00,
    date: '2025-04-15',
    icon: <Monitor size={16} />
  },
  {
    id: 3,
    title: 'Hypotheek',
    category: 'Wonen',
    amount: -985.50,
    date: '2025-04-01',
    icon: <Home size={16} />
  },
  {
    id: 4,
    title: 'Restaurant De Dining',
    category: 'Horeca',
    amount: -64.20,
    date: '2025-03-30',
    icon: <Utensils size={16} />
  },
  {
    id: 5,
    title: 'Tankstation Shell',
    category: 'Auto',
    amount: -78.35,
    date: '2025-03-28',
    icon: <Car size={16} />
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Boodschappen':
      return <ShoppingBag size={16} />;
    case 'Horeca':
      return <Utensils size={16} />;
    case 'Wonen':
      return <Home size={16} />;
    case 'Auto':
      return <Car size={16} />;
    case 'Gezondheid':
      return <Heart size={16} />;
    case 'Inkomen':
      return <Monitor size={16} />;
    default:
      return <Coffee size={16} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Boodschappen':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    case 'Horeca':
      return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
    case 'Wonen':
      return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
    case 'Auto':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Gezondheid':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'Inkomen':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' }).format(date);
};

const RecentTransactions = () => {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transactie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categorie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Datum</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bedrag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{transaction.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                      <span className="mr-1.5">{getCategoryIcon(transaction.category)}</span>
                      {transaction.category}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    €{transaction.amount.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
          Alle transacties bekijken
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;