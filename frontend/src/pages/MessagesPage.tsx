import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import ChatInterface from '../components/chat/ChatInterface';

const MessagesPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Messages
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chat with your travel matches and plan your next adventure together
          </Typography>
        </Box>
        
        <ChatInterface />
      </Container>
    </Box>
  );
};

export default MessagesPage;