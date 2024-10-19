
import React, { useState, useEffect } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import Layout from '../components/layout/Layout';
import { TextInput, NumberInput, SelectInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [userType, setUserType] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setAge(user.age || '');
      setPreferredName(user.preferredName || '');
      setUserType(user.userType || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ fullName, age, preferredName, userType });
    setOpenSnackbar(true);
  };

  return (
    <Layout>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: 'auto',
        mt: 4
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextInput
            required
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <NumberInput
            required
            id="age"
            label="Age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextInput
            id="preferredName"
            label="Preferred Name"
            name="preferredName"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
          />
          <SelectInput
            label="User Type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'teacher', label: 'Teacher' },
            ]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ProfilePage;