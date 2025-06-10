import { BackendPerson } from '../services/api';
import { User, UserInterest, TravelPreference } from '../types/user';

// Transform backend person data to frontend User type
export function transformBackendPersonToUser(backendPerson: BackendPerson): User {
  // Calculate age from birthday
  const birthDate = new Date(backendPerson.geburtstag);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Transform interests from backend boolean structure to frontend array
  const interests: UserInterest[] = [];
  if (backendPerson.interessen_hobby) {
    const hobbies = backendPerson.interessen_hobby;
    if (hobbies.sport) interests.push({ id: 'sport', name: 'Sport', icon: 'mountain' });
    if (hobbies.brettspiele) interests.push({ id: 'brettspiele', name: 'Brettspiele', icon: 'gamepad' });
    if (hobbies.kochen) interests.push({ id: 'kochen', name: 'Kochen', icon: 'utensils' });
    if (hobbies.club) interests.push({ id: 'club', name: 'Club', icon: 'music' });
  }

  // Transform travel preferences
  const travelPreferences: TravelPreference[] = [];
  if (backendPerson.reiseziel) {
    const ziele = backendPerson.reiseziel;
    if (ziele.citytrip) travelPreferences.push({ id: 'citytrip', name: 'Citytrip', icon: 'building' });
    if (ziele.strandurlaub) travelPreferences.push({ id: 'strandurlaub', name: 'Strandurlaub', icon: 'palm-tree' });
    if (ziele.kreuzfahrt) travelPreferences.push({ id: 'kreuzfahrt', name: 'Kreuzfahrt', icon: 'ship' });
    if (ziele.berge) travelPreferences.push({ id: 'berge', name: 'Berge', icon: 'mountain' });
    if (ziele.ist_mir_egal) travelPreferences.push({ id: 'ist_mir_egal', name: 'Ist mir egal', icon: 'help-circle' });
  }

  // Create location string
  const location = `${backendPerson.adresse.stadt}, ${backendPerson.adresse.plz}`;

  // Generate a placeholder profile picture (in a real app, this would come from the backend)
  const profilePicture = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1`;

  return {
    id: backendPerson.id,
    firstName: backendPerson.vorname,
    lastName: backendPerson.nachname,
    email: backendPerson.email,
    bio: `Hallo! Ich bin ${backendPerson.vorname} und liebe es zu reisen. Ich freue mich darauf, neue Reisepartner kennenzulernen!`,
    age,
    gender: backendPerson.geschlecht === 'männlich' ? 'Male' : backendPerson.geschlecht === 'weiblich' ? 'Female' : 'Other',
    location,
    profilePicture,
    interests,
    travelPreferences,
    verifications: {
      email: true, // Assume email is verified if they're in the system
      phone: false,
      government: backendPerson.verifizierung?.reisepass ? true : false,
      socialMedia: backendPerson.verifizierung?.videoauth_bonus || false,
    },
    tripPhotos: [], // Empty for now, can be populated later
    dreamDestinations: [], // Empty for now, can be populated later
  };
}

// Transform frontend registration data to backend format
export function transformRegistrationDataToBackend(registrationData: any) {
  const birthDate = registrationData.personalInfo.birthDate;
  const formattedBirthDate = birthDate ? birthDate.toISOString().split('T')[0] : '';

  return {
    vorname: registrationData.personalInfo.firstName,
    nachname: registrationData.personalInfo.lastName,
    geburtstag: formattedBirthDate,
    email: registrationData.personalInfo.email,
    passwort: registrationData.personalInfo.password, // In a real app, this should be hashed
    geschlecht: registrationData.personalInfo.gender === 'male' ? 'männlich' : 
                registrationData.personalInfo.gender === 'female' ? 'weiblich' : 'andere',
    adresse: {
      strasse: 'Musterstraße', // Default values - in a real app, collect this in registration
      hausnummer: '1',
      plz: '12345',
      stadt: registrationData.personalInfo.location.split(',')[0] || 'Unbekannt',
    },
    reiseziel: {
      citytrip: registrationData.travelPreferences.includes('5'),
      strandurlaub: registrationData.travelPreferences.includes('4'),
      kreuzfahrt: registrationData.travelPreferences.includes('11'),
      berge: registrationData.travelPreferences.includes('3'),
      ist_mir_egal: registrationData.travelPreferences.includes('12'),
    },
    verifizierung: {
      reisepass: 'PENDING',
      videoauth_bonus: false,
    },
    meta_daten: {
      rauchen: false,
      trinken: false,
      religioes: false,
    },
    interessen_hobby: {
      sport: registrationData.interests.includes('2'),
      brettspiele: false,
      kochen: registrationData.interests.includes('5'),
      club: registrationData.interests.includes('8'),
    },
  };
}