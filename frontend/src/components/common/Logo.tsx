import React from 'react';
import { Box, Typography } from '@mui/material';
import { Map } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', color = 'primary' }) => {
  // Size mapping
  const sizeMap = {
    small: {
      iconSize: 20,
      fontSize: '1.2rem',
      weight: 600,
    },
    medium: {
      iconSize: 28,
      fontSize: '1.5rem',
      weight: 700,
    },
    large: {
      iconSize: 36,
      fontSize: '2rem',
      weight: 700,
    },
  };

  // Color mapping
  const colorMap = {
    primary: {
      icon: 'primary.main',
      text: 'primary.main',
    },
    white: {
      icon: 'white',
      text: 'white',
    },
  };

  const selectedSize = sizeMap[size];
  const selectedColor = colorMap[color];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Map
        size={selectedSize.iconSize}
        color={selectedColor.icon}
        strokeWidth={2}
      />
      <Typography
        variant="h6"
        fontWeight={selectedSize.weight}
        fontSize={selectedSize.fontSize}
        color={selectedColor.text}
        sx={{ letterSpacing: '-0.5px' }}
      >
        TravelMate
      </Typography>
    </Box>
  );
};

export default Logo;