import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Stack, 
  Avatar,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Map, Users, Globe, MessageCircle, Shield, Camera } from 'lucide-react';
import { destinations } from '../data/mockData';
import ProfileCard from '../components/user/ProfileCard';
import { useUsers } from '../hooks/useApi';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Fetch real users from backend
  const { users, loading, error } = useUsers();
  
  // Featured users (sample data from backend)
  const featuredUsers = users.slice(0, 3).map(user => ({
    ...user,
    compatibilityScore: Math.floor(Math.random() * 31) + 70, // Random score between 70-100
    commonInterests: user.interests.slice(0, 2).map(i => i.name) // First 2 interests as common
  }));
  
  // Stats data - update with real numbers from backend
  const statsData = [
    { icon: <Users size={40} />, count: `${users.length}+`, label: 'Travelers Connected' },
    { icon: <Globe size={40} />, count: '100+', label: 'Countries Covered' },
    { icon: <MessageCircle size={40} />, count: '1M+', label: 'Messages Exchanged' },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'London, UK',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
      text: 'TravelMate helped me find the perfect travel buddy for my Southeast Asia trip. We had such a great time and are planning our next adventure!',
    },
    {
      name: 'David K.',
      location: 'Toronto, Canada',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      text: 'I was hesitant at first, but this platform made it easy to connect with like-minded travelers. My Europe backpacking experience was elevated by the friendships I made.',
    },
    {
      name: 'Mia C.',
      location: 'Sydney, Australia',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      text: 'From a solo traveler to finding my travel tribe - TravelMate changed the way I explore the world. The matching algorithm is spot on!',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 10, md: 14 },
          bgcolor: 'primary.light',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                fontWeight={700}
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: 'primary.dark',
                }}
              >
                Find Your Perfect
                <br /> 
                Travel Companion
              </Typography>
              <Typography 
                variant="h5" 
                paragraph 
                sx={{ 
                  mb: 4,
                  color: 'text.primary',
                  maxWidth: '500px'
                }}
              >
                Connect with like-minded travelers who share your interests, destinations, and travel style.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  component={RouterLink} 
                  to="/register"
                  variant="contained" 
                  color="primary"
                  size="large"
                  sx={{ fontWeight: 600, px: 4, py: 1.5 }}
                >
                  Get Started
                </Button>
                <Button 
                  component={RouterLink}
                  to="/how-it-works"
                  variant="outlined" 
                  color="primary"
                  size="large"
                  sx={{ fontWeight: 600, px: 4, py: 1.5 }}
                >
                  How It Works
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: 400 }}>
                <Box
                  component="img"
                  src="https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg"
                  alt="People traveling together"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 300,
                    height: 400,
                    borderRadius: 4,
                    objectFit: 'cover',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    zIndex: 2,
                  }}
                />
                <Box
                  component="img"
                  src="https://images.pexels.com/photos/1122409/pexels-photo-1122409.jpeg"
                  alt="Travel friends"
                  sx={{
                    position: 'absolute',
                    top: 60,
                    left: 0,
                    width: 280,
                    height: 320,
                    borderRadius: 4,
                    objectFit: 'cover',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            How TravelMate Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Connect with travelers who match your preferences and travel style in just a few simple steps.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'primary.light', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Shield size={40} color={theme.palette.primary.main} />
                </Box>
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" fontWeight={600} gutterBottom>
                  Create Your Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign up and build your traveler profile with your interests, preferences, and dream destinations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'secondary.light', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={40} color={theme.palette.secondary.main} />
                </Box>
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" fontWeight={600} gutterBottom>
                  Find Companions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our algorithm matches you with compatible travelers based on your shared interests and destinations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'primary.light', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageCircle size={40} color={theme.palette.primary.main} />
                </Box>
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" fontWeight={600} gutterBottom>
                  Connect & Plan
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Message your matches, share travel plans, and coordinate your adventure together.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1, display: 'flex', justifyContent: 'center' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="primary.main">
                    {stat.count}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Featured Users Section */}
      {!loading && !error && featuredUsers.length > 0 && (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Meet Our Travelers
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Connect with real travelers who are looking for companions just like you.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {featuredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <ProfileCard 
                  user={user}
                  commonInterests={user.commonInterests!}
                  compatibilityScore={user.compatibilityScore}
                  onMessageClick={() => {}}
                />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to="/matches"
            >
              View All Matches
            </Button>
          </Box>
        </Container>
      )}

      {/* Loading state for featured users */}
      {loading && (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading travelers...
            </Typography>
          </Box>
        </Container>
      )}

      {/* Error state */}
      {error && (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Alert severity="info">
            Unable to load travelers at the moment. Please try again later.
          </Alert>
        </Container>
      )}
      
      {/* Featured Destinations */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Popular Destinations
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Discover travelers heading to these trending destinations around the world.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {destinations.slice(0, 6).map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <Card 
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={destination.imageUrl}
                    alt={destination.name}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    }}
                  >
                    <Typography variant="h6" fontWeight={600} color="white">
                      {destination.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {destination.country}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="primary"
            size="large"
            component={RouterLink}
            to="/destinations"
          >
            Explore All Destinations
          </Button>
        </Box>
      </Container>
      
      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Traveler Stories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Hear from travelers who found their perfect companions through TravelMate.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.location}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  "{testimonial.text}"
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Ready to Meet Your Travel Companion?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join {users.length > 0 ? `${users.length} travelers` : 'thousands of travelers'} already connecting on TravelMate.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ 
              fontWeight: 600, 
              px: 4, 
              py: 1.5,
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;