const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
      console.log(`🌐 API Request: ${options?.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error: ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ API Success:`, data);
      return data;
    } catch (error) {
      console.error(`❌ API request failed for ${endpoint}:`, error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Unable to connect to server at ${API_BASE_URL}. Please ensure the backend is running.`);
      }
      
      throw error;
    }
  }

  // Test connection to backend
  async testConnection(): Promise<boolean> {
    try {
      await this.request<{ status: string }>('/health');
      return true;
    } catch (error) {
      console.error('❌ Backend connection test failed:', error);
      return false;
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