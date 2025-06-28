import React, { useState, useEffect } from 'react';
import { Room, TimeSlot, Reservation } from '../types';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { format, addHours, startOfDay, isSameDay } from 'date-fns';

interface CalendarViewProps {
  room: Room | null;
  onReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ room, onReservation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (room) {
      generateTimeSlots();
    }
  }, [room, selectedDate]);

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const dayStart = startOfDay(selectedDate);
    
    for (let hour = 9; hour < 18; hour++) {
      const start = addHours(dayStart, hour);
      const end = addHours(start, 1);
      
      slots.push({
        start,
        end,
        available: Math.random() > 0.3, // Simulate availability
      });
    }
    
    setTimeSlots(slots);
  };

  const handleReservation = () => {
    if (!room || !selectedTimeSlot || !employeeName || !employeeEmail || !meetingTitle) {
      alert('Please fill in all required fields');
      return;
    }

    const reservation: Omit<Reservation, 'id' | 'createdAt'> = {
      roomId: room.id,
      employeeName,
      employeeEmail,
      startTime: selectedTimeSlot.start,
      endTime: selectedTimeSlot.end,
      title: meetingTitle,
      description: meetingDescription,
    };

    onReservation(reservation);
    
    // Reset form
    setSelectedTimeSlot(null);
    setEmployeeName('');
    setEmployeeEmail('');
    setMeetingTitle('');
    setMeetingDescription('');
    
    alert('Room reserved successfully!');
  };

  if (!room) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Select a room to view availability</p>
          <p className="text-sm mt-2">Click on any room in the floor plan to see its calendar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      {/* Room Info Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          {room.name}
        </h2>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            Capacity: {room.capacity}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {room.available ? 'Available' : 'Occupied'}
          </span>
        </div>
        {room.amenities.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-gray-500">Amenities: {room.amenities.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={format(new Date(), 'yyyy-MM-dd')}
        />
      </div>

      {/* Time Slots */}
      <div className="mb-6 flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => slot.available && setSelectedTimeSlot(slot)}
              disabled={!slot.available}
              className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                selectedTimeSlot === slot
                  ? 'bg-blue-600 text-white border-blue-600'
                  : slot.available
                  ? 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reservation Form */}
      {selectedTimeSlot && (
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Book This Room</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name *</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@company.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title *</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Team standup, Client meeting, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                value={meetingDescription}
                onChange={(e) => setMeetingDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Meeting agenda or additional notes"
              />
            </div>
          </div>

          <button
            onClick={handleReservation}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Reserve Room
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;