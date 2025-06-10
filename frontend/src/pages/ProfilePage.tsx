import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Tabs,
  Tab,
  Divider,
  Stack,
  Card,
  CardMedia,
  IconButton,
  Chip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit, Settings, MapPin, Calendar, ChevronRight, Plus } from 'lucide-react';
import VerificationBadges from '../components/user/VerificationBadges';
import InterestTag from '../components/common/InterestTag';
import ProfileCard from '../components/user/ProfileCard';
import { mockUsers } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = useState(0);
  
  // Sample data for the current user profile
  const currentUser = {
    id: 'current-user',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    bio: 'Travel enthusiast and photographer based in California. Always looking for new places to explore and capture. Love hiking, street food, and making new friends along the way. Planning a backpacking trip through Southeast Asia next summer.',
    age: 29,
    gender: 'Male',
    location: 'San Francisco, CA',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    interests: [
      { id: '1', name: 'Photography', icon: 'camera' },
      { id: '3', name: 'Hiking', icon: 'mountain' },
      { id: '5', name: 'Food Tourism', icon: 'utensils' },
      { id: '7', name: 'Cultural Experiences', icon: 'landmark' },
      { id: '9', name: 'Beach Getaways', icon: 'palm-tree' },
    ],
    travelPreferences: [
      { id: '1', name: 'Budget Travel', icon: 'wallet' },
      { id: '3', name: 'Adventure', icon: 'mountain' },
      { id: '5', name: 'Cultural Experiences', icon: 'landmark' },
    ],
    verifications: {
      email: true,
      phone: true,
      government: false,
      socialMedia: true,
    },
    tripPhotos: [
      { id: '1', url: 'https://images.pexels.com/photos/2440079/pexels-photo-2440079.jpeg', location: 'Bali, Indonesia', date: '2023-04-15' },
      { id: '2', url: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg', location: 'Grand Canyon, USA', date: '2022-09-20' },
      { id: '3', url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg', location: 'Tokyo, Japan', date: '2022-06-10' },
      { id: '4', url: 'https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg', location: 'Barcelona, Spain', date: '2021-07-12' },
    ],
    dreamDestinations: [
      { id: '1', name: 'Kyoto', country: 'Japan', imageUrl: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg' },
      { id: '3', name: 'Santorini', country: 'Greece', imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg' },
      { id: '5', name: 'Peru', country: 'Machu Picchu', imageUrl: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg' },
    ],
  };
  
  // Sample matches for the "My Matches" tab
  const userMatches = mockUsers.map(user => ({
    ...user,
    compatibilityScore: Math.floor(Math.random() * 21) + 80, // Random score between 80-100
    commonInterests: user.interests.slice(0, 2).map(i => i.name), // First 2 interests as common
  })).sort((a, b) => b.compatibilityScore! - a.compatibilityScore!);
  
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Profile header */}
        <Paper 
          elevation={2}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Cover photo */}
          <Box
            sx={{
              height: 200,
              bgcolor: 'primary.light',
              backgroundImage: 'url(https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit size={16} />}
              size="small"
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}
            >
              Edit Cover
            </Button>
          </Box>
          
          <Box sx={{ p: 3, position: 'relative' }}>
            {/* Profile photo */}
            <Avatar
              src={currentUser.profilePicture}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                position: { xs: 'relative', md: 'absolute' },
                top: { md: -60 },
                left: { md: 24 },
                mx: { xs: 'auto', md: 0 },
                mb: { xs: 2, md: 0 },
              }}
            />
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' }, pl: { md: 20 } }}>
                <Typography variant="h4" fontWeight={700}>
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 1 }}>
                  <MapPin size={18} color="#666" />
                  <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                    {currentUser.location}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Settings size={18} />}
                >
                  Settings
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit size={18} />}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              borderTop: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minWidth: 80,
                py: 2,
              }
            }}
          >
            <Tab label="Profile" />
            <Tab label="Trips" />
            <Tab label="Matches" />
            <Tab label="Reviews" />
          </Tabs>
        </Paper>
        
        {/* Profile content based on active tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* About section */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {currentUser.bio}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Verifications
                    </Typography>
                    <VerificationBadges verifications={currentUser.verifications} />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Profile Info
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} style={{ marginRight: 8 }} color="#666" />
                        <Typography variant="body2" color="text.secondary">
                          Age: {currentUser.age}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MapPin size={16} style={{ marginRight: 8 }} color="#666" />
                        <Typography variant="body2" color="text.secondary">
                          Location: {currentUser.location}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
                
                {/* Interests section */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Interests
                    </Typography>
                    <Button 
                      size="small" 
                      endIcon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentUser.interests.map((interest) => (
                      <InterestTag
                        key={interest.id}
                        interest={interest.name}
                        iconName={interest.icon}
                      />
                    ))}
                  </Box>
                </Paper>
                
                {/* Travel Preferences section */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Travel Preferences
                    </Typography>
                    <Button 
                      size="small" 
                      endIcon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentUser.travelPreferences.map((pref) => (
                      <InterestTag
                        key={pref.id}
                        interest={pref.name}
                        iconName={pref.icon}
                      />
                    ))}
                  </Box>
                </Paper>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={8}>
              {/* Dream Destinations */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Dream Destinations
                  </Typography>
                  <Button 
                    size="small" 
                    endIcon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {currentUser.dreamDestinations.map((destination) => (
                    <Grid item xs={12} sm={4} key={destination.id}>
                      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={destination.imageUrl}
                          alt={destination.name}
                        />
                        <Box sx={{ p: 1.5 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {destination.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {destination.country}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={4}>
                    <Card 
                      sx={{ 
                        borderRadius: 2, 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed',
                        borderColor: 'divider',
                        p: 2,
                        minHeight: 193,
                      }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <IconButton 
                          sx={{ 
                            bgcolor: 'grey.100', 
                            mb: 1,
                            '&:hover': {
                              bgcolor: 'grey.200',
                            }
                          }}
                        >
                          <Plus size={24} />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                          Add Destination
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
              
              {/* Trip Photos */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Trip Photos
                  </Typography>
                  <Button 
                    variant="outlined"
                    color="primary"
                    startIcon={<Plus size={16} />}
                  >
                    Add Photos
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {currentUser.tripPhotos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={photo.url}
                          alt={photo.location}
                        />
                        <Box sx={{ p: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {photo.location}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(photo.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
        
        {activeTab === 1 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No trips added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start documenting your travel experiences and share them with the community.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Plus size={18} />}
            >
              Add New Trip
            </Button>
          </Paper>
        )}
        
        {activeTab === 2 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Your Matches
              </Typography>
              <Button 
                variant="outlined"
                color="primary"
                endIcon={<ChevronRight size={18} />}
                component={RouterLink}
                to="/matches"
              >
                See All Matches
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {userMatches.slice(0, 3).map((match) => (
                <Grid item xs={12} sm={6} md={4} key={match.id}>
                  <ProfileCard 
                    user={match}
                    commonInterests={match.commonInterests!}
                    compatibilityScore={match.compatibilityScore}
                    isMatch={true}
                    onMessageClick={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {activeTab === 3 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No reviews yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Travel with companions and receive reviews from your travel buddies.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;