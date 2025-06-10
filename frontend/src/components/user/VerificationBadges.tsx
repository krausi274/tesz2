import React from 'react';
import { Box, Typography, Stack, Tooltip } from '@mui/material';
import { Shield, Mail, Phone, Fingerprint, Facebook } from 'lucide-react';
import { UserVerification } from '../../types/user';

interface VerificationBadgesProps {
  verifications: UserVerification;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

const VerificationBadges: React.FC<VerificationBadgesProps> = ({
  verifications,
  size = 'medium',
  showLabels = true,
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: 16,
      spacing: 0.5,
      badgeSize: 32,
      fontSize: 'caption',
    },
    medium: {
      iconSize: 20,
      spacing: 1,
      badgeSize: 40,
      fontSize: 'body2',
    },
    large: {
      iconSize: 24,
      spacing: 1.5,
      badgeSize: 48,
      fontSize: 'body1',
    },
  };

  const config = sizeConfig[size];

  // Verification types and their corresponding icons/labels
  const verificationTypes = [
    {
      key: 'email',
      icon: <Mail size={config.iconSize} />,
      label: 'Email',
      tooltip: 'Email Verified',
      color: '#0460D9', // Primary Blue
    },
    {
      key: 'phone',
      icon: <Phone size={config.iconSize} />,
      label: 'Phone',
      tooltip: 'Phone Verified',
      color: '#0476D9', // Secondary Blue
    },
    {
      key: 'government',
      icon: <Fingerprint size={config.iconSize} />,
      label: 'ID',
      tooltip: 'Government ID Verified',
      color: '#F29C50', // Orange Accent
    },
    {
      key: 'socialMedia',
      icon: <Facebook size={config.iconSize} />,
      label: 'Social',
      tooltip: 'Social Media Verified',
      color: '#5EADF2', // Light Purple
    },
  ];

  // Count how many verifications are completed
  const verifiedCount = Object.values(verifications).filter(Boolean).length;
  const totalCount = verificationTypes.length;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Shield size={config.iconSize} color="#4CAF50" style={{ marginRight: 8 }} />
        <Typography variant={config.fontSize as any} fontWeight={600}>
          {verifiedCount} of {totalCount} Verifications Complete
        </Typography>
      </Box>

      <Stack 
        direction="row" 
        spacing={config.spacing} 
        sx={{ 
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: 1
        }}
      >
        {verificationTypes.map((type) => {
          const isVerified = verifications[type.key as keyof UserVerification];
          
          return (
            <Tooltip key={type.key} title={type.tooltip}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: config.badgeSize,
                    height: config.badgeSize,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isVerified ? type.color : 'grey.200',
                    color: isVerified ? 'white' : 'grey.500',
                  }}
                >
                  {type.icon}
                </Box>
                {showLabels && (
                  <Typography 
                    variant="caption" 
                    color={isVerified ? 'text.primary' : 'text.secondary'}
                    fontWeight={isVerified ? 600 : 400}
                  >
                    {type.label}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

export default VerificationBadges;