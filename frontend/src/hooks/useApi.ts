import { useState, useEffect } from 'react';
import { apiService, BackendPerson } from '../services/api';
import { transformBackendPersonToUser } from '../utils/dataTransformers';
import { User } from '../types/user';

// Hook for fetching all users
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const backendPersons = await apiService.getAllPersons();
        const transformedUsers = backendPersons.map(transformBackendPersonToUser);
        setUsers(transformedUsers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
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
      const backendPersons = await apiService.getAllPersons();
      const transformedUsers = backendPersons.map(transformBackendPersonToUser);
      setUsers(transformedUsers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
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
        const backendPerson = await apiService.getPersonDetails(userId);
        const transformedUser = transformBackendPersonToUser(backendPerson);
        setUser(transformedUser);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user details');
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