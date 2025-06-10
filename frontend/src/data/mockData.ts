import { User, UserInterest, TravelPreference, Destination } from '../types/user';

// Travel preferences with icons
export const travelPreferences: TravelPreference[] = [
  { id: '3', name: 'Adventure', icon: 'mountain' },
  { id: '4', name: 'Relaxation', icon: 'palm-tree' },
  { id: '5', name: 'Citytrip', icon: 'hotel' },
  { id: '11', name: 'Kreuzfahrt', icon: 'ship' },
  { id: '12', name: 'Ist mir egal', icon: 'fileQuestion' },
];

// User interests with icons
export const interests: UserInterest[] = [
  { id: '2', name: 'Hiking', icon: 'mountain' },
  { id: '5', name: 'Food', icon: 'utensils' },
  { id: '6', name: 'Historical', icon: 'landmark' },
  { id: '8', name: 'Nightlife', icon: 'music' },
  { id: '9', name: 'Shopping', icon: 'shopping-bag' },
];

// Destinations
export const destinations: Destination[] = [
  { id: '1', name: 'Paris', country: 'France', imageUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg' },
  { id: '2', name: 'Tokyo', country: 'Japan', imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg' },
  { id: '3', name: 'Bali', country: 'Indonesia', imageUrl: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg' },
  { id: '4', name: 'New York', country: 'USA', imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg' },
  { id: '5', name: 'Barcelona', country: 'Spain', imageUrl: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg' },
  { id: '6', name: 'Santorini', country: 'Greece', imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg' },
  { id: '7', name: 'Cape Town', country: 'South Africa', imageUrl: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg' },
  { id: '8', name: 'Sydney', country: 'Australia', imageUrl: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg' },
  { id: '9', name: 'Rio de Janeiro', country: 'Brazil', imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg' },
  { id: '10', name: 'Kyoto', country: 'Japan', imageUrl: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg' },
];

// Mock users with random interests and preferences
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.j@example.com',
    bio: 'Adventure enthusiast and photographer who loves exploring new cultures and trying local foods!',
    age: 28,
    gender: 'Female',
    location: 'San Francisco, CA',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    interests: [interests[0], interests[2], interests[1]], // Hiking, Historical, Food
    travelPreferences: [travelPreferences[0], travelPreferences[2], travelPreferences[4]], // Adventure, Citytrip, Ist mir egal
    verifications: {
      email: true,
      phone: true,
      government: false,
      socialMedia: true
    },
    tripPhotos: [
      { id: '1', url: 'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg', location: 'Bali, Indonesia', date: '2023-05-10' },
      { id: '2', url: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg', location: 'Paris, France', date: '2022-11-15' }
    ],
    dreamDestinations: [destinations[2], destinations[0], destinations[5]],
  },
  {
    id: '2',
    firstName: 'Alex',
    lastName: 'Williams',
    email: 'alex.w@example.com',
    bio: 'Aspiring digital nomad with a passion for urban exploration and coffee shops. Always looking for hidden gems!',
    age: 31,
    gender: 'Male',
    location: 'New York, NY',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    interests: [interests[3], interests[4], interests[1]], // Nightlife, Shopping, Food
    travelPreferences: [travelPreferences[2], travelPreferences[1]], // Citytrip, Relaxation
    verifications: {
      email: true,
      phone: true,
      government: true,
      socialMedia: true
    },
    tripPhotos: [
      { id: '1', url: 'https://images.pexels.com/photos/2179603/pexels-photo-2179603.jpeg', location: 'Tokyo, Japan', date: '2023-08-21' },
      { id: '2', url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg', location: 'Barcelona, Spain', date: '2023-03-05' }
    ],
    dreamDestinations: [destinations[1], destinations[4], destinations[9]],
  },
  {
    id: '3',
    firstName: 'Sofia',
    lastName: 'Rodriguez',
    email: 'sofia.r@example.com',
    bio: 'Nature lover and hiking enthusiast. I enjoy finding peaceful getaways and photographing landscapes.',
    age: 26,
    gender: 'Female',
    location: 'Denver, CO',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    interests: [interests[0], interests[2], interests[1]], // Hiking, Historical, Food
    travelPreferences: [travelPreferences[0], travelPreferences[1], travelPreferences[4]], // Adventure, Relaxation, Ist mir egal
    verifications: {
      email: true,
      phone: true,
      government: false,
      socialMedia: false
    },
    tripPhotos: [
      { id: '1', url: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg', location: 'Banff, Canada', date: '2023-07-12' },
      { id: '2', url: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg', location: 'Yosemite, USA', date: '2022-09-25' }
    ],
    dreamDestinations: [destinations[6], destinations[7], destinations[2]],
  }
];
