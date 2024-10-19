import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      {...props}
      sx={{
        bgcolor: '#D2B48C',
        '&:hover': { bgcolor: '#C2A478' },
        ...props.sx
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;