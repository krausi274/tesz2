import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Typography, 
  Chip, 
  Stack, 
  Button,
  Avatar,
  Badge 
} from '@mui/material';
import { MessageCircle, MapPin, Check, Shield } from 'lucide-react';
import { User } from '../../types/user';
import InterestTag from '../common/InterestTag';

interface ProfileCardProps {
  user: User;
  commonInterests?: string[];
  compatibilityScore?: number;
  isMatch?: boolean;
  onMessageClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  user, 
  commonInterests, 
  compatibilityScore,
  isMatch = false,
  onMessageClick 
}) => {
  const { firstName, lastName, age, location, bio, interests, verifications } = user;

  // Calculate the number of verifications
  const verificationCount = Object.values(verifications).filter(Boolean).length;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={user.profilePicture}
          alt={`${firstName} ${lastName}`}
          sx={{ objectFit: 'cover' }}
        />
        
        {compatibilityScore && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'white',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '2px solid',
              borderColor: getScoreColor(compatibilityScore),
            }}
          >
            <Typography 
              variant="subtitle1" 
              fontWeight={700}
              color={getScoreColor(compatibilityScore)}
            >
              {compatibilityScore}%
            </Typography>
          </Box>
        )}

        {verificationCount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: verificationCount >= 3 ? 'success.main' : 'warning.main',
              borderRadius: 4,
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Shield size={16} color="white" />
            <Typography variant="caption" fontWeight={600} color="white">
              {verificationCount >= 3 ? 'Verified' : 'Partially Verified'}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h5" component="div" fontWeight={600}>
            {firstName}, {age}
          </Typography>
          
          {isMatch && (
            <Chip 
              label="Match" 
              size="small" 
              color="primary"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MapPin size={16} style={{ marginRight: 4 }} color="#666" />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {bio}
        </Typography>

        {commonInterests && commonInterests.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Common Interests
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {commonInterests.map(interest => (
                <InterestTag 
                  key={interest}
                  interest={interest}
                  selected
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}

        {interests && interests.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Interests
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {interests.slice(0, 3).map(interest => (
                <InterestTag 
                  key={interest.id}
                  interest={interest.name}
                  iconName={interest.icon}
                  size="small"
                />
              ))}
              {interests.length > 3 && (
                <Chip 
                  label={`+${interests.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              )}
            </Stack>
          </Box>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<MessageCircle size={18} />}
            onClick={onMessageClick}
          >
            Message
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Helper function to determine color based on compatibility score
const getScoreColor = (score: number) => {
  if (score >= 80) return 'success.main';
  if (score >= 60) return 'primary.main';
  if (score >= 40) return 'warning.main';
  return 'error.main';
};

export default ProfileCard;