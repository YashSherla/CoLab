import { useState, useEffect, useRef } from 'react';

type Contributor = {
  _id: string;
  username: string;
  avatar: string;
  active: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type MultiSelectorProps = {
  options: Contributor[]; // Correct type for options
};

const MultiSelector = ({ options }: MultiSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Contributor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Contributor) => {
    // Check if the option is already selected
    if (selectedOptions.some((item) => item._id === option._id)) {
      setSelectedOptions(selectedOptions.filter((item) => item._id !== option._id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemove = (option: Contributor) => {
    setSelectedOptions(selectedOptions.filter((item) => item._id !== option._id));
  };

  const filteredOptions = options.filter((option) =>
    option.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative w-64">
      {/* Multi-selector input box */}
      <div
        className="flex flex-wrap items-center border border-gray-300 p-2 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <span
              key={option._id}
              className="bg-blue-500 text-white py-1 px-2 m-1 rounded-full flex items-center"
            >
              {option.username}
              <button
                className="ml-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the dropdown from closing
                  handleRemove(option);
                }}
              >
                &times;
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400">Select options...</span>
        )}
      </div>

      {/* Dropdown */}
      {!isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        >
          {/* Search bar */}
          <div className="px-4 py-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option._id}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedOptions.some((item) => item._id === option._id)
                      ? 'bg-blue-100'
                      : ''
                  }`}
                >
                  {option.username}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelector;
