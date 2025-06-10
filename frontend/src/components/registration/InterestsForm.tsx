import React, { useState } from 'react';
import { Box, Typography, Button, Chip, TextField, Grid, Paper } from '@mui/material';
import { interests } from '../../data/mockData';
import InterestTag from '../common/InterestTag';

interface InterestsFormProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const InterestsForm: React.FC<InterestsFormProps> = ({
  selectedInterests,
  onChange,
  onNext,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterests = interests.filter(interest =>
    interest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInterestToggle = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      onChange(selectedInterests.filter(id => id !== interestId));
    } else {
      onChange([...selectedInterests, interestId]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="body1" gutterBottom>
        Select your travel interests to help us find compatible travel companions.
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search interests..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mt: 2, mb: 3 }}
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Selected Interests ({selectedInterests.length})
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            minHeight: '60px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {selectedInterests.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Select at least one interest to continue
            </Typography>
          ) : (
            interests
              .filter(interest => selectedInterests.includes(interest.id))
              .map(interest => (
                <InterestTag
                  key={interest.id}
                  interest={interest.name}
                  iconName={interest.icon}
                  selected
                  onDelete={() => handleInterestToggle(interest.id)}
                />
              ))
          )}
        </Paper>
      </Box>

      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
        Popular Interests
      </Typography>
      <Grid container spacing={2}>
        {filteredInterests.map(interest => (
          <Grid item xs={12} sm={6} md={4} key={interest.id}>
            <InterestTag
              interest={interest.name}
              iconName={interest.icon}
              selected={selectedInterests.includes(interest.id)}
              onClick={() => handleInterestToggle(interest.id)}
              sx={{ 
                width: '100%', 
                justifyContent: 'flex-start',
                py: 1.5
              }}
            />
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
          disabled={selectedInterests.length === 0}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default InterestsForm;