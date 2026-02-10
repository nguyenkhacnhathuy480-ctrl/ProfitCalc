import React from 'react';

interface InputGroupProps {
  label: string;
  value: number | '';
  onChange: (val: number) => void;
  suffix?: string;
  placeholder?: string;
  type?: 'text' | 'number';
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  suffix, 
  placeholder = "0"
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty string to clear input
    if (val === '') {
        // @ts-ignore
        onChange(''); 
        return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col space-y-1 mb-3">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition bg-white text-gray-800 font-medium"
        />
        {suffix && (
          <span className="absolute right-3 top-3 text-gray-400 text-sm font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};