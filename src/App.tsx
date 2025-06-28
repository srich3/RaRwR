import { useState } from 'react';
import FloorMap from './components/FloorMap';
import CalendarView from './components/CalendarView';
import FloorSelector from './components/FloorSelector';
import { Room, Reservation } from './types';
import { mockFloors } from './data/mockData';
import { Building2, Calendar } from 'lucide-react';

function App() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const currentFloor = mockFloors.find(floor => floor.id === selectedFloor);
  const availableFloors = mockFloors.map(floor => floor.id);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `reservation-${Date.now()}`,
      createdAt: new Date(),
    };
    
    setReservations(prev => [...prev, newReservation]);
    
    // Update room availability (in a real app, this would be handled by the backend)
    if (currentFloor) {
      const roomIndex = currentFloor.rooms.findIndex(r => r.id === reservation.roomId);
      if (roomIndex !== -1) {
        currentFloor.rooms[roomIndex].available = false;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Room Reservation System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{reservations.length}</span> reservations today
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Floor Map */}
          <div className="lg:col-span-2 space-y-6">
            <FloorSelector
              floors={availableFloors}
              selectedFloor={selectedFloor}
              onFloorSelect={setSelectedFloor}
            />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Building2 className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentFloor?.name} Layout
                </h2>
              </div>
              
              {currentFloor && (
                <FloorMap
                  rooms={currentFloor.rooms}
                  selectedRoom={selectedRoom}
                  onRoomSelect={handleRoomSelect}
                  floorNumber={selectedFloor}
                />
              )}
            </div>
          </div>

          {/* Right Section - Calendar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Book a Room
                </h2>
              </div>
              
              <CalendarView
                room={selectedRoom}
                onReservation={handleReservation}
              />
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        {reservations.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reservations</h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {reservations.slice(-5).reverse().map((reservation) => {
                  const room = mockFloors
                    .flatMap(floor => floor.rooms)
                    .find(r => r.id === reservation.roomId);
                  
                  return (
                    <div key={reservation.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{reservation.title}</h4>
                          <p className="text-sm text-gray-600">
                            {room?.name} • {reservation.employeeName}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.startTime.toLocaleDateString()} {reservation.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;