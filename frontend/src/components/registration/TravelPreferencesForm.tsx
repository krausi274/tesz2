import React from 'react';
import { Box, Typography, Button, Grid, Paper, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { Ship, Hotel, Mountain, Palmtree as PalmTree, Utensils, Camera, FileQuestion, CreditCard, ChevronsUp, User, Car, Baby } from 'lucide-react';
import { travelPreferences } from '../../data/mockData';

interface TravelPreferenceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface TravelPreferencesFormProps {
  selectedPreferences: string[];
  onChange: (preferences: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const preferencesOptions: TravelPreferenceOption[] = [
  { id: '3', label: 'Berge', icon: <Mountain />, description: 'Thrilling and exciting activities' },
  { id: '4', label: 'Strand', icon: <PalmTree />, description: 'Peaceful and rejuvenating experiences' },
  { id: '5', label: 'Citytrip', icon: <Hotel />, description: 'Immersing in local customs and traditions' },
  { id: '11', label: 'Kreuzfahrt', icon: <Ship />, description: 'Exploring destinations via flights' },
  { id: '12', label: 'Ist mir egal', icon: <FileQuestion />, description: 'Activities suitable for all ages' },
];

const TravelPreferencesForm: React.FC<TravelPreferencesFormProps> = ({
  selectedPreferences,
  onChange,
  onNext,
  onBack,
}) => {
  const handlePreferenceToggle = (id: string) => {
    if (selectedPreferences.includes(id)) {
      onChange(selectedPreferences.filter(prefId => prefId !== id));
    } else {
      onChange([...selectedPreferences, id]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="body1" gutterBottom>
        Select your travel preferences to help us match you with compatible travel companions.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {preferencesOptions.map((preference) => (
          <Grid item xs={12} sm={6} key={preference.id}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                border: '1px solid',
                borderColor: selectedPreferences.includes(preference.id) 
                  ? 'primary.main' 
                  : 'divider',
                borderRadius: 2,
                backgroundColor: selectedPreferences.includes(preference.id) 
                  ? 'primary.light' 
                  : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: selectedPreferences.includes(preference.id) 
                    ? 'primary.light' 
                    : 'action.hover',
                },
              }}
              onClick={() => handlePreferenceToggle(preference.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={selectedPreferences.includes(preference.id)}
                  onChange={() => handlePreferenceToggle(preference.id)}
                  sx={{ 
                    ml: -1, 
                    color: selectedPreferences.includes(preference.id) 
                      ? 'primary.dark' 
                      : 'action.active'
                  }}
                />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box 
                      sx={{ 
                        mr: 1,
                        color: selectedPreferences.includes(preference.id) 
                          ? 'primary.dark' 
                          : 'text.secondary'
                      }}
                    >
                      {preference.icon}
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={600}
                      color={selectedPreferences.includes(preference.id) 
                        ? 'primary.dark' 
                        : 'text.primary'
                      }
                    >
                      {preference.label}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2"
                    color={selectedPreferences.includes(preference.id) 
                      ? 'primary.dark' 
                      : 'text.secondary'
                    }
                  >
                    {preference.description}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={selectedPreferences.length === 0}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default TravelPreferencesForm;