import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import { useNavigate } from 'react-router-dom';

interface ContentOnlyLayoutProps {
  children: React.ReactNode;
}

const ContentOnlyLayout: React.FC<ContentOnlyLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Toolbar variant="dense"> 
          <Tooltip title="Menu / Back to Home">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Optional: Display current page title or app name */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, 
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContentOnlyLayout;
