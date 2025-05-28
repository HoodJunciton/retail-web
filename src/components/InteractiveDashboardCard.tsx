import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// TODO: Define card shapes, effects, and content based on USER requirements
// This file was created in src/components/ due to issues creating src/components/dashboard/
// Please move it to src/components/dashboard/InteractiveDashboardCard.tsx after creating the 'dashboard' directory.

interface InteractiveDashboardCardProps {
  title: string;
  // content: React.ReactNode; 
  // icon?: React.ReactNode;
  // shape?: 'circle' | 'custom'; 
  // onClick?: () => void;
}

const CardWrapper = styled(Paper)<{ shape?: string }>(({ theme, shape }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: shape === 'circle' ? '50%' : theme.shape.borderRadius,
  width: shape === 'circle' ? 150 : 'auto', 
  height: shape === 'circle' ? 150 : 'auto',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

const InteractiveDashboardCard: React.FC<InteractiveDashboardCardProps> = ({ title }) => {
  return (
    <CardWrapper /* shape="circle" */ >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">More details here...</Typography>
    </CardWrapper>
  );
};

export default InteractiveDashboardCard;
