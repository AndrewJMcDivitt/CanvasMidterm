import React from 'react';
import { TextField } from '@mui/material';

const NumberInput = ({ ...props }) => {
  return (
    <TextField
      type="number"
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default NumberInput;