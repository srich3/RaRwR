import { Room, Floor } from '../types';

export const mockFloors: Floor[] = [
  {
    id: 1,
    name: 'First Floor',
    rooms: [
      {
        id: 'room-1-1',
        name: 'Conference A',
        floor: 1,
        capacity: 8,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 70,
        y: 80,
        width: 120,
        height: 80,
        available: true,
      },
      {
        id: 'room-1-2',
        name: 'Meeting Room B',
        floor: 1,
        capacity: 4,
        amenities: ['WiFi'],
        x: 210,
        y: 80,
        width: 100,
        height: 60,
        available: false,
      },
      {
        id: 'room-1-3',
        name: 'Huddle Space C',
        floor: 1,
        capacity: 6,
        amenities: ['WiFi', 'Projector'],
        x: 210,
        y: 160,
        width: 100,
        height: 80,
        available: true,
      },
      {
        id: 'room-1-4',
        name: 'Board Room',
        floor: 1,
        capacity: 12,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 480,
        y: 80,
        width: 140,
        height: 100,
        available: true,
      },
      {
        id: 'room-1-5',
        name: 'Training Room',
        floor: 1,
        capacity: 20,
        amenities: ['Projector', 'WiFi'],
        x: 480,
        y: 200,
        width: 140,
        height: 120,
        available: false,
      },
      {
        id: 'room-1-6',
        name: 'Phone Booth 1',
        floor: 1,
        capacity: 1,
        amenities: ['WiFi'],
        x: 640,
        y: 80,
        width: 60,
        height: 60,
        available: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Second Floor',
    rooms: [
      {
        id: 'room-2-1',
        name: 'Executive Suite',
        floor: 2,
        capacity: 6,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 70,
        y: 80,
        width: 140,
        height: 100,
        available: true,
      },
      {
        id: 'room-2-2',
        name: 'Creative Space',
        floor: 2,
        capacity: 10,
        amenities: ['WiFi', 'Projector'],
        x: 230,
        y: 80,
        width: 120,
        height: 120,
        available: true,
      },
      {
        id: 'room-2-3',
        name: 'Focus Room A',
        floor: 2,
        capacity: 2,
        amenities: ['WiFi'],
        x: 480,
        y: 80,
        width: 80,
        height: 60,
        available: false,
      },
      {
        id: 'room-2-4',
        name: 'Focus Room B',
        floor: 2,
        capacity: 2,
        amenities: ['WiFi'],
        x: 580,
        y: 80,
        width: 80,
        height: 60,
        available: true,
      },
      {
        id: 'room-2-5',
        name: 'Innovation Lab',
        floor: 2,
        capacity: 15,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 480,
        y: 160,
        width: 180,
        height: 140,
        available: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Third Floor',
    rooms: [
      {
        id: 'room-3-1',
        name: 'Sky Lounge',
        floor: 3,
        capacity: 25,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 70,
        y: 80,
        width: 200,
        height: 150,
        available: true,
      },
      {
        id: 'room-3-2',
        name: 'Quiet Zone A',
        floor: 3,
        capacity: 4,
        amenities: ['WiFi'],
        x: 290,
        y: 80,
        width: 100,
        height: 70,
        available: true,
      },
      {
        id: 'room-3-3',
        name: 'Quiet Zone B',
        floor: 3,
        capacity: 4,
        amenities: ['WiFi'],
        x: 290,
        y: 170,
        width: 100,
        height: 70,
        available: false,
      },
      {
        id: 'room-3-4',
        name: 'Presentation Hall',
        floor: 3,
        capacity: 50,
        amenities: ['Projector', 'WiFi', 'Coffee'],
        x: 480,
        y: 80,
        width: 220,
        height: 180,
        available: true,
      },
    ],
  },
];