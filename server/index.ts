import express from 'express';
import cors from 'cors';
import { Room, Reservation, Floor } from '../src/types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with actual database in production)
let rooms: Room[] = [];
let reservations: Reservation[] = [];
let floors: Floor[] = [];

// TimeSlot interface for room availability
interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  reservationId?: string;
}

// Routes

// Get all floors
app.get('/api/floors', (req, res) => {
  res.json(floors);
});

// Get rooms by floor
app.get('/api/floors/:floorId/rooms', (req, res) => {
  const floorId = parseInt(req.params.floorId);
  const floor = floors.find(f => f.id === floorId);
  
  if (!floor) {
    return res.status(404).json({ error: 'Floor not found' });
  }
  
  res.json(floor.rooms);
});

// Get specific room
app.get('/api/rooms/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const room = rooms.find(r => r.id === roomId);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  res.json(room);
});

// Get room availability
app.get('/api/rooms/:roomId/availability', (req, res) => {
  const roomId = req.params.roomId;
  const date = req.query.date as string;
  
  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required' });
  }
  const timeSlots: TimeSlot[] = [];
  const selectedDate = new Date(date);
  const roomReservations = reservations.filter(r => 
    r.roomId === roomId && 
    r.startTime.toDateString() === selectedDate.toDateString()
  );

  for (let hour = 9; hour < 18; hour++) {
    const start = new Date(selectedDate);
    start.setHours(hour, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(hour + 1, 0, 0, 0);

    const isReserved = roomReservations.some(reservation => 
      start >= reservation.startTime && start < reservation.endTime
    );

    timeSlots.push({
      start: start.toISOString(),
      end: end.toISOString(),
      available: !isReserved,
      reservationId: isReserved ? roomReservations.find(r => 
        start >= r.startTime && start < r.endTime
      )?.id : undefined
    });
  }

  res.json(timeSlots);
});

// Create reservation
app.post('/api/reservations', (req, res) => {
  const { roomId, employeeName, employeeEmail, startTime, endTime, title, description } = req.body;
  
  if (!roomId || !employeeName || !employeeEmail || !startTime || !endTime || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if room exists
  const room = rooms.find(r => r.id === roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  // Check for conflicts
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const hasConflict = reservations.some(reservation => 
    reservation.roomId === roomId &&
    ((start >= reservation.startTime && start < reservation.endTime) ||
     (end > reservation.startTime && end <= reservation.endTime) ||
     (start <= reservation.startTime && end >= reservation.endTime))
  );
  
  if (hasConflict) {
    return res.status(409).json({ error: 'Time slot is already booked' });
  }
  
  const newReservation: Reservation = {
    id: `reservation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    roomId,
    employeeName,
    employeeEmail,
    startTime: start,
    endTime: end,
    title,
    description,
    createdAt: new Date()
  };
  
  reservations.push(newReservation);
  
  // Update room availability
  room.available = false;
  
  res.status(201).json(newReservation);
});

// Get reservations
app.get('/api/reservations', (req, res) => {
  const { roomId, date, employeeEmail } = req.query;
  
  let filteredReservations = [...reservations];
  
  if (roomId) {
    filteredReservations = filteredReservations.filter(r => r.roomId === roomId);
  }
  
  if (date) {
    const filterDate = new Date(date as string);
    filteredReservations = filteredReservations.filter(r => 
      r.startTime.toDateString() === filterDate.toDateString()
    );
  }
  
  if (employeeEmail) {
    filteredReservations = filteredReservations.filter(r => 
      r.employeeEmail === employeeEmail
    );
  }
  
  res.json(filteredReservations);
});

// Delete reservation
app.delete('/api/reservations/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  const reservationIndex = reservations.findIndex(r => r.id === reservationId);
  
  if (reservationIndex === -1) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  
  const reservation = reservations[reservationIndex];
  reservations.splice(reservationIndex, 1);
  
  // Update room availability if this was the only reservation
  const room = rooms.find(r => r.id === reservation.roomId);
  if (room) {
    const hasOtherReservations = reservations.some(r => 
      r.roomId === reservation.roomId && 
      r.startTime <= new Date() && 
      r.endTime > new Date()
    );
    room.available = !hasOtherReservations;
  }
  
  res.json({ message: 'Reservation deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

export default app;