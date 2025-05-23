import React from 'react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  id: string;
}

const CurrencyInput = ({ value, onChange, placeholder = '0,00', error, id }: CurrencyInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^0-9,]/g, '');
    
    // Ensure only one comma
    const commaCount = (input.match(/,/g) || []).length;
    if (commaCount > 1) {
      input = input.replace(/,/g, (match, index, original) => 
        index === original.indexOf(',') ? match : ''
      );
    }
    
    // Format number
    if (input.includes(',')) {
      const [whole, decimal] = input.split(',');
      input = `${whole},${decimal.slice(0, 2)}`;
    }
    
    onChange(input);
  };

  const formatDisplayValue = (value: string) => {
    if (!value) return '';
    return `€ ${value}`;
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        value={formatDisplayValue(value)}
        onChange={handleChange}
        placeholder={`€ ${placeholder}`}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        inputMode="decimal"
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default CurrencyInput;