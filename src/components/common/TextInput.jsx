import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ ...props }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default TextInput;