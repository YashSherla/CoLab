import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const MultiSelectWithChips: React.FC = () => {
  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const toggleOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(prev => prev.filter(option => option !== value));
    } else {
      setSelectedOptions(prev => [...prev, value]);
    }
    setInputValue('');
  };

  const removeOption = (value: string) => {
    setSelectedOptions(prev => prev.filter(option => option !== value));
  };

  return (
    <div className="flex flex-wrap items-center border border-gray-300 rounded-md shadow-sm p-2">
      {selectedOptions.map(option => (
        <span
          key={option}
          className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-white bg-blue-500 rounded-full"
        >
          {option}
          <button
            className="ml-1 text-white"
            onClick={() => removeOption(option)}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputValue) {
            const option = options.find(opt => opt.label.toLowerCase() === inputValue.toLowerCase());
            if (option) {
              toggleOption(option.value);
            }
            e.preventDefault();
          }
        }}
        placeholder="Type and press Enter"
        className="flex-1 border-none focus:outline-none"
      />
      <div className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        {options
          .filter(opt => !selectedOptions.includes(opt.value))
          .map(option => (
            <div
              key={option.value}
              className="cursor-pointer hover:bg-gray-200 p-2"
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultiSelectWithChips;
