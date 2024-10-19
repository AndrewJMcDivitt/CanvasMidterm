
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/layout/Layout';
import { Card } from '../components/common';

const HomePage = () => {
  const [homePages, setHomePages] = useState([]);

  useEffect(() => {
    // Load pages from localStorage
    const storedPages = JSON.parse(localStorage.getItem('pages')) || [];
    // Filter pages with type "HomePage"
    const filteredHomePages = storedPages.filter(page => page.type === 'HomePage');
    setHomePages(filteredHomePages);
  }, []);

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Welcome to CanvasMidterm
      </Typography>
      {homePages.map((page) => (
        <Card 
          key={page.id} 
          title={page.title}
          sx={{ mb: 3 }}
        >
          <Typography variant="body1">{page.content}</Typography>
        </Card>
      ))}
    </Layout>
  );
};

export default HomePage;