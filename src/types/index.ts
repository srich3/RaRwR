export interface Room {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  amenities: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  available: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  employeeName: string;
  employeeEmail: string;
  startTime: Date;
  endTime: Date;
  title: string;
  description?: string;
  createdAt: Date;
}

export interface Floor {
  id: number;
  name: string;
  rooms: Room[];
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  reservationId?: string;
}