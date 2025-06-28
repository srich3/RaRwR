import React from 'react';
import { Building } from 'lucide-react';

interface FloorSelectorProps {
  floors: number[];
  selectedFloor: number;
  onFloorSelect: (floor: number) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, selectedFloor, onFloorSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <Building className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Select Floor</h3>
      </div>
      <div className="flex space-x-2">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => onFloorSelect(floor)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFloor === floor
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Floor {floor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;