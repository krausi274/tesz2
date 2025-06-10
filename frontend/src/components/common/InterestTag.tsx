import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { Camera, Mountain, Utensils, Landmark, Music, ShoppingBag, Map } from 'lucide-react';

interface InterestTagProps extends Omit<ChipProps, 'icon'> {
  interest: string;
  iconName?: string;
  selected?: boolean;
}

const InterestTag: React.FC<InterestTagProps> = ({ interest, iconName, selected = false, ...chipProps }) => {
  // Map interest names to icons
  const getIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      'photography': <Camera size={16} />,
      'hiking': <Mountain size={16} />,
      'food': <Utensils size={16} />,
      'historical': <Landmark size={16} />,
      'nightlife': <Music size={16} />,
      'shopping': <ShoppingBag size={16} />,
      'default': <Map size={16} />,
    };

    // If iconName is explicitly provided, use that
    if (iconName && iconName in iconMap) {
      return iconMap[iconName];
    }

    // Try to match the interest name to an icon
    const lowerInterest = interest.toLowerCase();
    for (const key of Object.keys(iconMap)) {
      if (lowerInterest.includes(key)) {
        return iconMap[key];
      }
    }

    // Default icon if no match found
    return iconMap['default'];
  };

  return (
    <Chip
      label={interest}
      icon={getIcon()}
      variant={selected ? "filled" : "outlined"}
      color={selected ? "primary" : "default"}
      size="medium"
      sx={{
        fontWeight: 500,
        '& .MuiChip-icon': {
          color: selected ? 'inherit' : 'text.secondary',
        },
        '&:hover': {
          backgroundColor: selected ? 'primary.main' : 'rgba(4, 96, 217, 0.08)',
        },
      }}
      {...chipProps}
    />
  );
};

export default InterestTag;