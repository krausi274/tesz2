import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  useMediaQuery,
  IconButton,
  Drawer,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search, Filter, X, RefreshCw } from 'lucide-react';
import MatchCard from '../components/match/MatchCard';
import { useUsers } from '../hooks/useApi';

const MatchesPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [filterOpen, setFilterOpen] = useState(false);
  const [ageRange, setAgeRange] = useState<number[]>([18, 65]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('compatibility');
  
  // Fetch users from backend
  const { users, loading, error, refetch } = useUsers();
  
  // Generate matching scores and random common interests for demo
  const matches = users.map(user => ({
    ...user,
    compatibilityScore: Math.floor(Math.random() * 31) + 70, // Random score between 70-100
    commonInterests: user.interests.slice(0, Math.floor(Math.random() * 3) + 1).map(i => i.name) // Random number of common interests
  })).sort((a, b) => b.compatibilityScore! - a.compatibilityScore!);
  
  // Create a list of all interests from users
  const allInterests = Array.from(
    new Set(
      users.flatMap(user => user.interests.map(interest => interest.name))
    )
  );
  
  // Filter matches based on filters
  const filteredMatches = matches.filter(match => {
    // Filter by age
    if (match.age < ageRange[0] || match.age > ageRange[1]) {
      return false;
    }
    
    // Filter by search query (name or location)
    if (searchQuery) {
      const fullName = `${match.firstName} ${match.lastName}`.toLowerCase();
      const location = match.location.toLowerCase();
      const query = searchQuery.toLowerCase();
      if (!fullName.includes(query) && !location.includes(query)) {
        return false;
      }
    }
    
    // Filter by selected interests
    if (selectedInterests.length > 0) {
      const matchInterests = match.interests.map(i => i.name);
      const hasMatchingInterest = selectedInterests.some(interest => 
        matchInterests.includes(interest)
      );
      if (!hasMatchingInterest) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortOrder === 'compatibility') {
      return b.compatibilityScore! - a.compatibilityScore!;
    } else if (sortOrder === 'age-asc') {
      return a.age - b.age;
    } else if (sortOrder === 'age-desc') {
      return b.age - a.age;
    } else {
      return 0;
    }
  });
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const handleMessageClick = (userId: string) => {
    console.log(`Message clicked for user ${userId}`);
    // In a real app, this would navigate to the messages page
    // or open a chat modal/drawer
  };
  
  const handleLikeClick = (userId: string) => {
    console.log(`Like clicked for user ${userId}`);
    // In a real app, this would send a like notification
  };
  
  const handleResetFilters = () => {
    setAgeRange([18, 65]);
    setSearchQuery('');
    setSelectedInterests([]);
    setSortOrder('compatibility');
  };
  
  const toggleFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };
  
  const FiltersComponent = () => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        height: '100%',
        borderRadius: isMobile ? 0 : 2,
        bgcolor: isMobile ? 'background.paper' : 'grey.50',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleFilterDrawer}>
            <X size={20} />
          </IconButton>
        )}
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Age Range: {ageRange[0]} - {ageRange[1]}
        </Typography>
        <Slider
          value={ageRange}
          onChange={(_, newValue) => setAgeRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={18}
          max={80}
          sx={{ mt: 1 }}
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOrder}
            label="Sort by"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="compatibility">Compatibility</MenuItem>
            <MenuItem value="age-asc">Age (Youngest first)</MenuItem>
            <MenuItem value="age-desc">Age (Oldest first)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {allInterests.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {allInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                onClick={() => handleInterestToggle(interest)}
                color={selectedInterests.includes(interest) ? 'primary' : 'default'}
                variant={selectedInterests.includes(interest) ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}
      
      <Divider sx={{ my: 2 }} />
      
      <Button
        fullWidth
        variant="outlined"
        onClick={handleResetFilters}
        startIcon={<RefreshCw size={16} />}
      >
        Reset Filters
      </Button>
    </Paper>
  );
  
  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Alert 
            severity="error" 
            action={
              <Button color="inherit\" size="small\" onClick={refetch}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Your Matches
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We've found {users.length} travelers who share your interests and travel style.
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4 
          }}
        >
          <Button
            startIcon={<RefreshCw size={20} />}
            onClick={refetch}
            disabled={loading}
          >
            Refresh
          </Button>
          
          {isMobile && (
            <Button 
              startIcon={<Filter size={20} />}
              onClick={toggleFilterDrawer}
              sx={{ ml: 1, whiteSpace: 'nowrap' }}
            >
              Filters
            </Button>
          )}
        </Box>
        
        <Grid container spacing={3}>
          {/* Desktop filters sidebar */}
          {!isMobile && (
            <Grid item md={3}>
              <FiltersComponent />
            </Grid>
          )}
          
          {/* Matches grid */}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            {sortedMatches.length === 0 ? (
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No matches found
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Try adjusting your filters or check back later for new members.
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={handleResetFilters} 
                  sx={{ mt: 2 }}
                >
                  Reset Filters
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {sortedMatches.map(match => (
                  <Grid item xs={12} sm={6} md={4} key={match.id}>
                    <MatchCard
                      user={match}
                      commonInterests={match.commonInterests!}
                      compatibilityScore={match.compatibilityScore!}
                      onMessageClick={() => handleMessageClick(match.id)}
                      onLikeClick={() => handleLikeClick(match.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
      
      {/* Mobile filters drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={toggleFilterDrawer}
        PaperProps={{
          sx: { width: '85%', maxWidth: 320 }
        }}
      >
        <FiltersComponent />
      </Drawer>
    </Box>
  );
};

export default MatchesPage;