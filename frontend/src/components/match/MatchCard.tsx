import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button} from '@mui/material';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import { User } from '../../types/user';
import InterestTag from '../common/InterestTag';

interface MatchCardProps {
  user: User;
  commonInterests: string[];
  compatibilityScore: number;
  onMessageClick: () => void;
  onLikeClick: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  user, 
  commonInterests, 
  compatibilityScore, 
  onMessageClick,
  onLikeClick
}) => {
  return (
    <Card 
      sx={{ 
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={240}
          image={user.profilePicture}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            p: 2,
            pt: 4,
          }}
        >
          <Typography variant="h5" color="white" fontWeight={600} sx={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            {user.firstName}, {user.age}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <MapPin size={16} color="white" />
            <Typography variant="body2" color="white" sx={{ ml: 0.5, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              {user.location}
            </Typography>
          </Box>
        </Box>
        
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'white',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            border: '2px solid',
            borderColor: getScoreColor(compatibilityScore),
          }}
        >
          <Typography variant="subtitle1" fontWeight={700} color={getScoreColor(compatibilityScore)}>
            {compatibilityScore}%
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {user.bio}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Common Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {commonInterests.map((interest, index) => (
              <InterestTag 
                key={index} 
                interest={interest} 
                size="small"
                selected
              />
            ))}
          </Box>
        </Box>
        
        <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Heart size={18} />}
            onClick={onLikeClick}
            sx={{ flex: 1 }}
          >
            Like
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MessageCircle size={18} />}
            onClick={onMessageClick}
            sx={{ flex: 1 }}
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

export default MatchCard;