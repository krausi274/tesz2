const API_BASE_URL = 'http://localhost:3000';

// Types for backend data structures
export interface BackendPerson {
  id: string;
  vorname: string;
  nachname: string;
  geburtstag: string;
  email: string;
  passwort: string;
  geschlecht: string;
  adresse: {
    id: string;
    strasse: string;
    hausnummer: string;
    plz: string;
    stadt: string;
  };
  reiseziel?: {
    id: string;
    citytrip: boolean;
    strandurlaub: boolean;
    kreuzfahrt: boolean;
    berge: boolean;
    ist_mir_egal: boolean;
  };
  verifizierung?: {
    id: string;
    reisepass: string;
    videoauth_bonus: boolean;
  };
  meta_daten?: {
    id: string;
    rauchen: boolean;
    trinken: boolean;
    religioes: boolean;
  };
  interessen_hobby?: {
    id: string;
    sport: boolean;
    brettspiele: boolean;
    kochen: boolean;
    club: boolean;
  };
}

export interface CreatePersonData {
  vorname: string;
  nachname: string;
  geburtstag: string;
  email: string;
  passwort: string;
  geschlecht: string;
  adresse: {
    strasse: string;
    hausnummer: string;
    plz: string;
    stadt: string;
  };
  reiseziel: {
    citytrip: boolean;
    strandurlaub: boolean;
    kreuzfahrt: boolean;
    berge: boolean;
    ist_mir_egal: boolean;
  };
  verifizierung: {
    reisepass: string;
    videoauth_bonus: boolean;
  };
  meta_daten: {
    rauchen: boolean;
    trinken: boolean;
    religioes: boolean;
  };
  interessen_hobby: {
    sport: boolean;
    brettspiele: boolean;
    kochen: boolean;
    club: boolean;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all persons
  async getAllPersons(): Promise<BackendPerson[]> {
    return this.request<BackendPerson[]>('/person');
  }

  // Get person by ID (basic info)
  async getPersonById(id: string): Promise<BackendPerson> {
    return this.request<BackendPerson>(`/person/${id}`);
  }

  // Get person by ID with full details
  async getPersonDetails(id: string): Promise<BackendPerson> {
    return this.request<BackendPerson>(`/person/${id}/details`);
  }

  // Create new person
  async createPerson(personData: CreatePersonData): Promise<BackendPerson> {
    return this.request<BackendPerson>('/person', {
      method: 'POST',
      body: JSON.stringify(personData),
    });
  }

  // Update person
  async updatePerson(id: string, personData: Partial<CreatePersonData>): Promise<BackendPerson> {
    return this.request<BackendPerson>(`/person/${id}`, {
      method: 'PUT',
      body: JSON.stringify(personData),
    });
  }

  // Delete person
  async deletePerson(id: string): Promise<void> {
    return this.request<void>(`/person/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();