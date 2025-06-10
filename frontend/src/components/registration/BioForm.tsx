import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface BioFormProps {
  bio: string;
  onChange: (bio: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const validationSchema = yup.object({
  bio: yup
    .string()
    .min(20, 'Bio should be at least 20 characters')
    .max(500, 'Bio should not exceed 500 characters')
    .required('Bio is required'),
});

const BioForm: React.FC<BioFormProps> = ({
  bio,
  onChange,
  onComplete,
  onBack,
}) => {
  const formik = useFormik({
    initialValues: {
      bio: bio,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onChange(values.bio);
      onComplete();
    },
  });

  const remainingChars = 500 - formik.values.bio.length;

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="body1" gutterBottom>
        Tell other travelers about yourself, your travel style, and what kind of travel companions you're looking for.
      </Typography>

      <TextField
        fullWidth
        id="bio"
        name="bio"
        label="Your bio"
        multiline
        rows={6}
        placeholder="Hi there! I'm a passionate traveler who loves exploring new cultures, trying local foods, and finding hidden gems off the beaten path. I'm looking for travel companions who are..."
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bio && Boolean(formik.errors.bio)}
        helperText={
          (formik.touched.bio && formik.errors.bio) || 
          `${remainingChars} characters remaining`
        }
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Complete Registration
        </Button>
      </Box>
    </Box>
  );
};

export default BioForm;