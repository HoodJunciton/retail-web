'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProductList from '../../components/products/ProductList';

export default function ProductsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Management
        </Typography>
        <Button variant="contained" color="primary">
          Add New Product
        </Button>
      </Box>
      
      <ProductList />
    </Box>
  );
}
