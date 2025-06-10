import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Home } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 10,
      }}
    >
      <Container maxWidth="sm">
        <Typography 
          variant="h1" 
          color="primary" 
          fontWeight={700} 
          sx={{ 
            fontSize: { xs: '6rem', md: '8rem' },
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/"
          startIcon={<Home size={18} />}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;