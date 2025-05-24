'use client';

import React from 'react';
import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  progress?: number;
  color?: string;
};

const StatCard = ({ title, value, subtitle, progress, color = '#0ea5e9' }: StatCardProps) => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        height: '100%',
        borderTop: `4px solid ${color}`,
        bgcolor: darkMode ? 'grey.800' : 'white'
      }}
    >
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        {subtitle}
      </Typography>
      {progress !== undefined && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: darkMode ? 'grey.700' : 'grey.200',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            }
          }} 
        />
      )}
    </Paper>
  );
};

export default function DashboardStats() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} component="div">
        <StatCard 
          title="TOTAL SALES" 
          value="$24,780" 
          subtitle="↑ 8% from last month"
          progress={75}
          color="#0ea5e9"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} component="div">
        <StatCard 
          title="NEW CUSTOMERS" 
          value="385" 
          subtitle="↑ 12% from last month"
          progress={68}
          color="#f59e0b"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} component="div">
        <StatCard 
          title="INVENTORY ITEMS" 
          value="2,490" 
          subtitle="↓ 2% from last month"
          progress={45}
          color="#10b981"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} component="div">
        <StatCard 
          title="PENDING ORDERS" 
          value="48" 
          subtitle="↑ 5% from last month"
          progress={30}
          color="#ef4444"
        />
      </Grid>
    </Grid>
  );
}
