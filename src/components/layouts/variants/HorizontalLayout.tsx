import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, IconButton, Typography, Button, Paper, Tabs, Tab, 
  Badge, Menu, MenuItem, Divider, Avatar, InputBase, alpha, Chip, Tooltip 
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import BaseLayout from './BaseLayout';
import SettingsDrawer from '../../settings/SettingsDrawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../../store/slices/uiSlice';
import { toggleSettingsDrawer } from '../../../store/slices/settingsSlice';

interface HorizontalLayoutProps {
  children: React.ReactNode;
}

export default function HorizontalLayout({ children }: HorizontalLayoutProps) {
  const { layout, navbarPosition } = useSelector((state: RootState) => state.settings);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for tabs
  const [tabValue, setTabValue] = useState(() => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/products') return 1;
    return 0;
  });
  
  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  
  // State for notification menu
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/');
    if (newValue === 1) navigate('/products');
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleOpenSettings = () => {
    dispatch(toggleSettingsDrawer());
  };
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const HorizontalNavbar = () => (
    <AppBar position={navbarPosition} color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 4, display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img" 
            src="/favicon.svg" 
            alt="Logo" 
            sx={{ height: 24, width: 24, mr: 1 }} 
          />
          Retailer Web
        </Typography>
        
        {/* Search bar */}
        <Box 
          sx={{ 
            position: 'relative',
            borderRadius: 1,
            backgroundColor: alpha('#fff', 0.15),
            '&:hover': { backgroundColor: alpha('#fff', 0.25) },
            width: '30%',
            mr: 2
          }}
        >
          <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', pl: 2 }}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search…"
            sx={{ 
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': { pl: 5, py: 1 }
            }}
          />
        </Box>
        
        {/* Navigation tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            flexGrow: 1,
            '& .MuiTabs-indicator': { 
              backgroundColor: '#fff' 
            },
          }}
        >
          <Tab 
            label="Dashboard" 
            icon={<DashboardIcon />} 
            iconPosition="start"
            sx={{ color: '#fff', minHeight: 64 }}
          />
          <Tab 
            label="Products" 
            icon={<InventoryIcon />} 
            iconPosition="start"
            sx={{ color: '#fff', minHeight: 64 }}
          />
        </Tabs>
        
        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={handleNotificationOpen}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: { width: 320, maxHeight: 400 }
            }}
          >
            <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 'bold' }}>
              Notifications
            </Typography>
            <Divider />
            <MenuItem onClick={handleNotificationClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">New Order Received</Typography>
                  <Chip label="New" size="small" color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary">Order #1234 has been placed</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>2 minutes ago</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="body2" fontWeight="bold">Low Stock Alert</Typography>
                <Typography variant="body2" color="text.secondary">Product "Wireless Headphones" is running low</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>1 hour ago</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="body2" fontWeight="bold">System Update</Typography>
                <Typography variant="body2" color="text.secondary">New features have been added</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>1 day ago</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
              <Button size="small">View All Notifications</Button>
            </Box>
          </Menu>
          
          <Tooltip title="Toggle dark mode">
            <IconButton color="inherit" onClick={handleToggleDarkMode} sx={{ mx: 1 }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={handleOpenSettings} sx={{ mr: 1 }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="User account">
            <IconButton 
              onClick={handleUserMenuOpen}
              sx={{ 
                p: 0.5,
                border: '2px solid',
                borderColor: 'rgba(255,255,255,0.5)'
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.dark' }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">Administrator</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleUserMenuClose}>
              <PersonIcon fontSize="small" sx={{ mr: 1 }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
              Account Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleUserMenuClose}>
              <ExitToAppIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );

  return (
    <BaseLayout
      navbar={<HorizontalNavbar />}
      sidebar={null}
      footer={null}
    >
      <Box 
        sx={{ 
          p: layout === 'compact' ? 2 : 3,
          mt: navbarPosition === 'fixed' ? '64px' : 0,
          width: '100%',
          maxWidth: layout === 'wide' ? '100%' : 
                   layout === 'compact' ? '960px' : '1200px',
          mx: 'auto'
        }}
      >
        <Paper 
          elevation={1} 
          sx={{ 
            p: layout === 'compact' ? 2 : 3,
            borderRadius: 2,
            minHeight: '80vh'
          }}
        >
          {children}
        </Paper>
      </Box>
      <SettingsDrawer />
    </BaseLayout>
  );
}
