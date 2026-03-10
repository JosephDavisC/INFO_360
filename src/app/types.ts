export type SpotStatus = 'Open' | 'Busy' | 'Full';

export interface NapSpot {
  id: string;
  name: string;
  location: string;
  library: string;
  walkTime: string;
  status: SpotStatus;
  noiseLevel: 'Very Quiet' | 'Moderate' | 'Low';
  seating: 'Couch' | 'Chair' | 'Floor Cushion';
  amenities: string[];
  imageUrl?: string;
  coords: { x: number; y: number };
}

export const MOCK_SPOTS: NapSpot[] = [
  {
    id: '1',
    name: 'Odegaard 3rd Floor Lounge',
    location: 'Odegaard Library, Floor 3',
    library: 'Odegaard Library',
    walkTime: '2 min',
    status: 'Open',
    noiseLevel: 'Very Quiet',
    seating: 'Couch',
    amenities: ['Outlet', 'Dim Lighting'],
    imageUrl: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=800',
    coords: { x: 115, y: 250 }
  },
  {
    id: '2',
    name: 'Suzzallo Reading Room',
    location: 'Suzzallo Library, Floor 2',
    library: 'Suzzallo Library',
    walkTime: '3 min',
    status: 'Busy',
    noiseLevel: 'Very Quiet',
    seating: 'Chair',
    amenities: ['Table', 'Natural Light'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    coords: { x: 280, y: 365 }
  },
  {
    id: '3',
    name: 'Gerberding Hall Lounge',
    location: 'Gerberding Hall, Floor 2',
    library: 'Gerberding Hall',
    walkTime: '3 min',
    status: 'Open',
    noiseLevel: 'Moderate',
    seating: 'Couch',
    amenities: ['Power', 'Near Cafe'],
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    coords: { x: 200, y: 445 }
  },
  {
    id: '4',
    name: 'Engineering Library Pods',
    location: 'Engineering Library, Floor 1',
    library: 'Engineering Library',
    walkTime: '8 min',
    status: 'Busy',
    noiseLevel: 'Very Quiet',
    seating: 'Chair',
    amenities: ['Private Desk', 'Soundproof'],
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
    coords: { x: 320, y: 180 }
  }
];
