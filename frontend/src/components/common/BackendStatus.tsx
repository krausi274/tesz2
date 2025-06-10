import React from 'react';
import { Alert, AlertTitle, Button, Box, CircularProgress } from '@mui/material';
import { RefreshCw, Server } from 'lucide-react';
import { useBackendConnection } from '../../hooks/useApi';

interface BackendStatusProps {
  onRetry?: () => void;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ onRetry }) => {
  const { isConnected, loading } = useBackendConnection();

  if (loading) {
    return (
      <Alert severity="info\" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <span>Connecting to backend...</span>
        </Box>
      </Alert>
    );
  }

  if (isConnected === false) {
    return (
      <Alert 
        severity="error" 
        sx={{ mb: 2 }}
        action={
          <Button 
            color="inherit" 
            size="small" 
            onClick={onRetry}
            startIcon={<RefreshCw size={16} />}
          >
            Retry
          </Button>
        }
      >
        <AlertTitle>Backend Connection Failed</AlertTitle>
        Unable to connect to the backend server. Please ensure:
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>The backend server is running on http://localhost:3000</li>
          <li>Run <code>npm run dev -w backend</code> to start the backend</li>
          <li>Check that no firewall is blocking the connection</li>
        </ul>
      </Alert>
    );
  }

  if (isConnected === true) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Server size={16} />
          <span>Backend connected successfully</span>
        </Box>
      </Alert>
    );
  }

  return null;
};

export default BackendStatus;