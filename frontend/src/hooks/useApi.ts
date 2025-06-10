import { useState, useEffect } from 'react';
import { apiService, BackendPerson } from '../services/api';
import { transformBackendPersonToUser } from '../utils/dataTransformers';
import { User } from '../types/user';

// Hook for testing backend connection
export function useBackendConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        const connected = await apiService.testConnection();
        setIsConnected(connected);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return { isConnected, loading };
}

// Hook for fetching all users
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Test connection first
        const isConnected = await apiService.testConnection();
        if (!isConnected) {
          throw new Error('Backend server is not responding. Please ensure the backend is running on http://localhost:3000');
        }

        const backendPersons = await apiService.getAllPersons();
        const transformedUsers = backendPersons.map(transformBackendPersonToUser);
        setUsers(transformedUsers);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
        setError(errorMessage);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const backendPersons = await apiService.getAllPersons();
      const transformedUsers = backendPersons.map(transformBackendPersonToUser);
      setUsers(transformedUsers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, refetch };
}

// Hook for fetching a single user with details
export function useUserDetails(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const backendPerson = await apiService.getPersonDetails(userId);
        const transformedUser = transformBackendPersonToUser(backendPerson);
        setUser(transformedUser);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user details';
        setError(errorMessage);
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { user, loading, error };
}

// Hook for creating a new user
export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiService.createPerson(userData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}