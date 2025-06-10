import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Button,
  Link,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import RegistrationStepper from '../components/registration/RegistrationStepper';
import { RegistrationData } from '../types/user';
import { mockUsers } from '../data/mockData';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRegistrationComplete = (data: RegistrationData) => {
    // In a real app, this would make an API call to create a user account
    console.log('Registration data:', data);
    
    // Redirect to matches page (or in a real app, this might show onboarding screens)
    navigate('/matches');
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Logo size="large" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find your perfect travel companion in just a few steps
          </Typography>
        </Box>
        
        <RegistrationStepper onComplete={handleRegistrationComplete} />
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" fontWeight={600} underline="hover">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;