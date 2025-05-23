import React, { useState } from 'react';
import { Plus, CreditCard, Trash2 } from 'lucide-react';
import CurrencyInput from '@/components/forms/CurrencyInput';
import DateInput from '@/components/forms/DateInput';
import CategorySelect from '@/components/forms/CategorySelect';

interface ExpenseEntry {
  id: string;
  amount: string;
  date: string;
  category: string;
  description: string;
}

// Mock categories for MVP
const initialCategories = [
  { id: 'groceries', name: 'Boodschappen', icon: '🛒' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'dining', name: 'Horeca', icon: '🍽️' },
  { id: 'other', name: 'Overig', icon: '📝' },
];

const Expenses = () => {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [categories, setCategories] = useState(initialCategories);
  const [newEntry, setNewEntry] = useState<ExpenseEntry>({
    id: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEntry = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newEntry.amount) {
      newErrors.amount = 'Voer een bedrag in';
    }
    if (!newEntry.category) {
      newErrors.category = 'Selecteer een categorie';
    }
    if (!newEntry.date) {
      newErrors.date = 'Selecteer een datum';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEntry = () => {
    if (!validateEntry()) return;

    setEntries([
      ...entries,
      {
        ...newEntry,
        id: Date.now().toString(),
      },
    ]);

    setNewEntry({
      id: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
    });
    setErrors({});
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleAddCategory = (categoryName: string) => {
    const newCategory = {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      icon: '📝',
    };
    setCategories([...categories, newCategory]);
  };

  const calculateTotal = () => {
    return entries
      .reduce((sum, entry) => {
        const amount = parseFloat(entry.amount.replace(',', '.')) || 0;
        return sum + amount;
      }, 0)
      .toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-blue-500" />
          Uitgaven
        </h1>
        <div className="text-lg font-semibold text-red-600 dark:text-red-400">
          Totaal: € {calculateTotal()}
        </div>
      </div>

      {/* New entry form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Nieuwe uitgave toevoegen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bedrag
            </label>
            <CurrencyInput
              id="amount"
              value={newEntry.amount}
              onChange={(value) => setNewEntry({ ...newEntry, amount: value })}
              error={errors.amount}
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Datum
            </label>
            <DateInput
              id="date"
              value={newEntry.date}
              onChange={(value) => setNewEntry({ ...newEntry, date: value })}
              error={errors.date}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categorie
            </label>
            <CategorySelect
              id="category"
              value={newEntry.category}
              onChange={(value) => setNewEntry({ ...newEntry, category: value })}
              categories={categories}
              onAddCategory={handleAddCategory}
              error={errors.category}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Omschrijving
            </label>
            <input
              type="text"
              id="description"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="Optionele omschrijving"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddEntry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Toevoegen
          </button>
        </div>
      </div>

      {/* Entries list */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Omschrijving</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bedrag</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(entry.date).toLocaleDateString('nl-NL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {categories.find(c => c.id === entry.category)?.name || entry.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                    {entry.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400 font-medium">
                    € {entry.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nog geen uitgaven toegevoegd
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;