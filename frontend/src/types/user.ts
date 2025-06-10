export interface UserInterest {
  id: string;
  name: string;
  icon: string;
}

export interface TravelPreference {
  id: string;
  name: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
}

export interface UserVerification {
  email: boolean;
  phone: boolean;
  government: boolean;
  socialMedia: boolean;
}

export interface TripPhoto {
  id: string;
  url: string;
  location: string;
  date: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  age: number;
  gender: string;
  location: string;
  profilePicture: string;
  interests: UserInterest[];
  travelPreferences: TravelPreference[];
  verifications: UserVerification;
  tripPhotos: TripPhoto[];
  dreamDestinations: Destination[];
  compatibilityScore?: number;
  commonInterests?: UserInterest[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface RegistrationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date | null;
    gender: string;
    location: string;
  };
  travelPreferences: string[];
  interests: string[];
  profilePicture: File | null;
  bio: string;
}