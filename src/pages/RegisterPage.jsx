
import React, { useState } from 'react';
import { Typography, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { TextInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      register({ email, password });
      console.log('Registration attempt with:', { email, password });
      navigate('/login');
    }
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextInput
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextInput
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextInput
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default RegisterPage;