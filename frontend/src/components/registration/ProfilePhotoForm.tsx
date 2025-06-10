import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Paper, Avatar, IconButton } from '@mui/material';
import { Upload, Camera, Trash2 } from 'lucide-react';

interface ProfilePhotoFormProps {
  photo: File | null;
  onChange: (photo: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProfilePhotoForm: React.FC<ProfilePhotoFormProps> = ({
  photo,
  onChange,
  onNext,
  onBack,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onChange(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="body1" gutterBottom>
        Upload a profile photo to help other travelers recognize you.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {previewUrl ? (
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={previewUrl}
              alt="Profile Preview"
              sx={{
                width: 150,
                height: 150,
                mb: 2,
              }}
            />
            <IconButton
              onClick={handleRemovePhoto}
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
              }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Box>
        ) : (
          <Avatar
            sx={{
              width: 150,
              height: 150,
              mb: 2,
              bgcolor: 'grey.200',
              color: 'grey.500',
            }}
          >
            <Camera size={48} />
          </Avatar>
        )}

        <Typography variant="subtitle1" gutterBottom>
          {previewUrl ? 'Photo uploaded successfully' : 'No photo selected'}
        </Typography>

        <Button
          variant={previewUrl ? "outlined" : "contained"}
          color="primary"
          startIcon={<Upload size={16} />}
          onClick={handleUploadClick}
          sx={{ mt: 2 }}
        >
          {previewUrl ? 'Change Photo' : 'Upload Photo'}
        </Button>

        <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 2 }}>
          For best results, use an image that clearly shows your face. Max file size: 5MB
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhotoForm;