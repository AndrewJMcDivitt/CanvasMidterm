import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

const Card = ({ title, children, ...props }) => {
  return (
    <MuiCard {...props}>
      <CardContent>
        {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;