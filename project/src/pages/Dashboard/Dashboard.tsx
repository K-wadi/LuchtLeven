import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Target, AlertCircle } from 'lucide-react';
import BalanceChart from '@/components/charts/BalanceChart';
import ExpensePieChart from '@/components/charts/ExpensePieChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import InsightCard from '@/components/dashboard/InsightCard';

// Mock data for MVP
const mockSummary = {
  balance: 3245.67,
  income: 2800,
  expenses: 1650.33,
  savings: 400,
};

const Dashboard = () => {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setPeriod('day')}
            className={`px-3 py-1 text-sm rounded-full ${
              period === 'day'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Dag
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 text-sm rounded-full ${
              period === 'month'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Maand
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 text-sm rounded-full ${
              period === 'year'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Jaar
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Balans</p>
              <p className="text-2xl font-bold mt-1">€{mockSummary.balance.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inkomsten</p>
              <p className="text-2xl font-bold mt-1">€{mockSummary.income.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center">
            <ArrowUpRight size={16} className="mr-1" />
            <span>4.6% meer dan vorige maand</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Uitgaven</p>
              <p className="text-2xl font-bold mt-1">€{mockSummary.expenses.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <ArrowDownRight size={20} />
            </div>
          </div>
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <ArrowDownRight size={16} className="mr-1" />
            <span>2.3% meer dan vorige maand</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Spaardoelen</p>
              <p className="text-2xl font-bold mt-1">€{mockSummary.savings.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Target size={20} />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">45% van je doel bereikt</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Balans Overzicht</h2>
          <div className="h-80">
            <BalanceChart period={period} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Uitgaven per Categorie</h2>
          <div className="h-80">
            <ExpensePieChart />
          </div>
        </div>
      </div>

      {/* Recent transactions and insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Recente Transacties</h2>
          <RecentTransactions />
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Financiële Inzichten</h2>
          <div className="space-y-4">
            <InsightCard 
              title="Uitgavenpatroon" 
              description="Je geeft 30% meer uit aan eten buiten de deur dan vorige maand."
              icon={<AlertCircle size={20} className="text-amber-500" />}
              actionText="Bekijk details"
            />
            <InsightCard 
              title="Bespaartip" 
              description="Je kunt €85 per maand besparen op abonnementen die je nauwelijks gebruikt."
              icon={<Wallet size={20} className="text-green-500" />}
              actionText="Bekijk abonnementen"
            />
            <InsightCard 
              title="Spaaruitdaging" 
              description="Je bent op koers om je vakantiedoel te bereiken binnen 3 maanden."
              icon={<Target size={20} className="text-blue-500" />}
              actionText="Bekijk doelen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;