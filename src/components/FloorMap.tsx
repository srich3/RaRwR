import React from 'react';
import { Room } from '../types';
import { Users, Wifi, Monitor, Coffee } from 'lucide-react';

interface FloorMapProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onRoomSelect: (room: Room) => void;
  floorNumber: number;
}

const FloorMap: React.FC<FloorMapProps> = ({ rooms, selectedRoom, onRoomSelect, floorNumber }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-3 h-3" />;
      case 'projector': return <Monitor className="w-3 h-3" />;
      case 'coffee': return <Coffee className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md shadow-sm">
        <span className="text-sm font-medium text-gray-700">Floor {floorNumber}</span>
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 800 500" className="absolute inset-0">
        {/* Floor layout background */}
        <rect x="50" y="50" width="700" height="400" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Hallway */}
        <rect x="350" y="50" width="100" height="400" fill="#e2e8f0" />
        
        {/* Rooms */}
        {rooms.map((room) => (
          <g key={room.id}>
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              fill={selectedRoom?.id === room.id ? '#3b82f6' : room.available ? '#10b981' : '#ef4444'}
              stroke={selectedRoom?.id === room.id ? '#1d4ed8' : '#374151'}
              strokeWidth={selectedRoom?.id === room.id ? 3 : 1}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => onRoomSelect(room)}
            />
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2 - 8}
              textAnchor="middle"
              className="text-xs font-medium fill-white pointer-events-none"
            >
              {room.name}
            </text>
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2 + 8}
              textAnchor="middle"
              className="text-xs fill-white pointer-events-none"
            >
              {room.capacity} people
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorMap;