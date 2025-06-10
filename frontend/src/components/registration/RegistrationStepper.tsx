import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Box, Paper, Typography, Alert } from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';
import TravelPreferencesForm from './TravelPreferencesForm';
import InterestsForm from './InterestsForm';
import ProfilePhotoForm from './ProfilePhotoForm';
import BioForm from './BioForm';
import { RegistrationData } from '../../types/user';
import { useCreateUser } from '../../hooks/useApi';
import { transformRegistrationDataToBackend } from '../../utils/dataTransformers';

interface RegistrationStepperProps {
  onComplete: (data: RegistrationData) => void;
}

const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: null,
      gender: '',
      location: '',
    },
    travelPreferences: [],
    interests: [],
    profilePicture: null,
    bio: '',
  });

  const { createUser, loading, error } = useCreateUser();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = async () => {
    try {
      // Transform frontend data to backend format
      const backendData = transformRegistrationDataToBackend(formData);
      
      // Create user via API
      await createUser(backendData);
      
      // Call the completion handler
      onComplete(formData);
    } catch (err) {
      console.error('Registration failed:', err);
      // Error is handled by the useCreateUser hook
    }
  };

  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const steps = [
    {
      label: 'Personal Information',
      description: 'Tell us a bit about yourself',
      component: (
        <PersonalInfoForm
          data={formData.personalInfo}
          onChange={(personalInfo) => updateFormData('personalInfo', personalInfo)}
          onNext={handleNext}
        />
      ),
    },
    {
      label: 'Travel Preferences',
      description: 'How do you like to travel?',
      component: (
        <TravelPreferencesForm
          selectedPreferences={formData.travelPreferences}
          onChange={(preferences) => updateFormData('travelPreferences', preferences)}
          onNext={handleNext}
          onBack={handleBack}
        />
      ),
    },
    {
      label: 'Interests',
      description: 'What do you enjoy when traveling?',
      component: (
        <InterestsForm
          selectedInterests={formData.interests}
          onChange={(interests) => updateFormData('interests', interests)}
          onNext={handleNext}
          onBack={handleBack}
        />
      ),
    },
    {
      label: 'Profile Photo',
      description: 'Upload a photo for your profile',
      component: (
        <ProfilePhotoForm
          photo={formData.profilePicture}
          onChange={(photo) => updateFormData('profilePicture', photo)}
          onNext={handleNext}
          onBack={handleBack}
        />
      ),
    },
    {
      label: 'Bio',
      description: 'Tell others about yourself and your travel style',
      component: (
        <BioForm
          bio={formData.bio}
          onChange={(bio) => updateFormData('bio', bio)}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      ),
    },
  ];

  return (
    <Box>
      {error && (
        <Alert severity="error\" sx={{ mb: 3 }}>
          Registration failed: {error}
        </Alert>
      )}
      
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="h6" fontWeight={600}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {step.description}
              </Typography>
              {step.component}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            All steps completed - you&apos;re ready to find your travel companions!
          </Typography>
          <Button 
            onClick={handleComplete} 
            variant="contained" 
            sx={{ mt: 1, mr: 1 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'View Matches'}
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default RegistrationStepper;