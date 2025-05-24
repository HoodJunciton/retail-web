'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DashboardStats from '../components/dashboard/DashboardStats';

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <Box sx={{ 
      p: 4,
      bgcolor: darkMode ? 'grey.900' : 'grey.100',
      color: darkMode ? 'white' : 'black',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to your retail management dashboard
          </Typography>
        </div>
        <Button variant="contained" color="primary">
          Generate Report
        </Button>
      </Box>
      
      {/* Dashboard Statistics */}
      <DashboardStats />
      
      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Quick Actions
      </Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Inventory Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Track and manage your inventory with ease. Get real-time updates on stock levels.
            </Typography>
            <Button variant="contained" color="primary">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Process Orders
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              View and process pending customer orders. Update order status and track shipments.
            </Typography>
            <Button variant="contained" color="primary">
              View Orders
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Customer Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Manage customer relationships and track purchase history. Add new customers.
            </Typography>
            <Button variant="contained" color="primary">
              Manage Customers
            </Button>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
