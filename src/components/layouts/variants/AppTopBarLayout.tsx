import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  alpha,
} from '@mui/material';
import {
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // No longer needed
// import type { RootState } from '../../../store'; // No longer needed

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MiscellaneousServices as ServicesIcon, // Example, find appropriate icon
  Assessment as ReportsIcon,       // Example
  SupportAgent as SupportIcon,     // Example
  // Settings as SettingsIcon, // Already imported
  // ExitToApp as ExitToAppIcon, // Already imported
} from '@mui/icons-material';

interface AppTopBarLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 90; // Width for the collapsed-style sidebar shown in image

const sidebarItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon />, content: 'dashboard_content' },
  { id: 'services', text: 'Services', icon: <ServicesIcon />, content: 'services_content' },
  { id: 'reports', text: 'Reports', icon: <ReportsIcon />, content: 'reports_content' },
  { id: 'support', text: 'Support', icon: <SupportIcon />, content: 'support_content' },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon />, content: 'settings_content' }, // Re-using existing icon
  { id: 'logout', text: 'Logout', icon: <ExitToAppIcon />, content: 'logout_content' },   // Re-using existing icon
];

export default function AppTopBarLayout({ children }: AppTopBarLayoutProps) {
  const navigate = useNavigate();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  // const { navbarPosition } = useSelector((state: RootState) => state.settings); // No longer needed as AppBar is fixed

  // State for sidebar popover
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPopoverContent, setSelectedPopoverContent] = useState<string | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null); // State for the arrow element
  const open = Boolean(popoverAnchorEl);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSidebarItemClick = (event: React.MouseEvent<HTMLElement>, content: string) => {
    if (popoverAnchorEl && popoverAnchorEl === event.currentTarget) {
      setPopoverAnchorEl(null);
      setSelectedPopoverContent(null);
    } else {
      setPopoverAnchorEl(event.currentTarget);
      setSelectedPopoverContent(content);
    }
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setSelectedPopoverContent(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
    handleUserMenuClose();
    // navigate('/login'); // Example redirect after logout
  };

  const handleSettings = () => {
    // Implement settings navigation or action
    console.log('Settings clicked');
    handleUserMenuClose();
    // navigate('/settings'); // Example redirect to settings
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed" // AppBar should be fixed
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`, // Offset by drawer width
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
          backgroundColor: '#fff',
          borderBottom: `1px solid ${alpha('#000', 0.12)}`,
          color: '#D32F2F', // Theme color, adjust as needed
        }}
      >
        <Toolbar>
          {/* Left Section: Home Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Home">
              <IconButton color="inherit" onClick={() => navigate('/')} aria-label="home">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Center Section: Search Bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: 2 }}>
            <InputBase
              placeholder="Search Transaction..."
              sx={{
                color: 'text.primary',
                backgroundColor: alpha('#000', 0.05),
                borderRadius: 1,
                padding: '2px 10px',
                width: 'clamp(200px, 50%, 400px)', // Responsive width
              }}
            />
          </Box>

          {/* Right Section: Info texts, Refresh, User Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
              PREPAID 32371.99
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
              POSTPAID 4152.55
            </Typography>
            <Tooltip title="Refresh Data">
              <IconButton color="inherit" size="small" aria-label="refresh data">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
              IM-R 5649
            </Typography>
            <Tooltip title="User Profile">
              <IconButton color="inherit" onClick={handleUserMenuOpen} aria-label="user profile">
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleUserMenuClose} disabled>
                <Typography variant="subtitle1">User Name</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSettings}>
                <SettingsIcon sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1A2027', // Dark background as per image
            color: '#fff',
          },
        }}
      >
        <Toolbar /> {/* Spacer to align content below AppBar */}
        <Box sx={{ overflow: 'auto', pt: 2 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={(event) => handleSidebarItemClick(event, item.content)}
                  sx={{
                    minHeight: 48,
                    flexDirection: 'column', // Icon above text
                    justifyContent: 'center',
                    px: 2.5,
                    py: 1.5, // Added padding for better spacing
                    mb: 1, // Margin between items
                    color: popoverAnchorEl?.id === item.id + '-button' ? '#D32F2F' : '#fff', // Highlight active
                    backgroundColor: popoverAnchorEl?.id === item.id + '-button' ? alpha('#D32F2F', 0.1) : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha('#D32F2F', 0.2),
                    },
                  }}
                  id={item.id + '-button'} // For anchoring and highlighting
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.75rem', textAlign: 'center' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Height of AppBar
          // ml: `${drawerWidth}px`, // This is handled by the AppBar's margin now
          width: `calc(100% - ${drawerWidth}px)`, // Ensure content doesn't go under drawer
        }}
      >
        {children}
      </Box>

      {/* Floating Popover Menu */}
      <Popper
        open={open}
        anchorEl={popoverAnchorEl}
        placement="right-start"
        transition
        disablePortal // Keep within the layout flow for now
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10], // Adjust offset as needed
            },
          },
          {
            name: 'flip',
            enabled: false, // Disable flip to ensure it always opens to the right
          },
          // Removed extraneous empty modifier object that was causing syntax errors
          {
            name: 'arrow',
            enabled: true,
            options: { element: arrowRef }, // Pass the ref OBJECT to Popper
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ]}
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 2 }} // Above AppBar
      >
        {({ TransitionProps }: { TransitionProps?: TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper elevation={3} sx={{ minWidth: 280, p: 2, position: 'relative', overflow: 'visible' }}>
              {/* Arrow Element */}
              <Box
                ref={setArrowRef}
                component="span"
                sx={{
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  bgcolor: 'background.paper',
                  transform: 'rotate(45deg)',
                  zIndex: 2, // Ensure arrow is above the Paper component
                  // Popper.js will apply its own `transform`, `top`, `left`, `right`, `bottom` inline styles for positioning.
                  // We only control which borders are visible to shape the arrow based on placement.
                  '&[data-popper-placement*="right"]': {
                    // Popover is to the RIGHT of anchor, arrow points LEFT.
                    // Popper will position this element; we just set the borders.
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRight: 'none',
                    borderBottom: 'none',
                  },
                  '&[data-popper-placement*="left"]': {
                    // Popover is to the LEFT of anchor, arrow points RIGHT.
                    // Popper will position this element; we just set the borders.
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  }
                  // Add other placements (e.g., top-start, bottom-start) if needed,
                  // each requiring different border configurations.
                  // Add other placements if necessary, e.g., left-start, top-start, bottom-start
                }}
              />
              <ClickAwayListener onClickAway={handlePopoverClose}>
                <div>
                  {selectedPopoverContent === 'dashboard_content' && (
                    <Box>
                      <Typography variant="h6">Dashboard Popover</Typography>
                      <Typography>User: Portal Retailer</Typography>
                      <Typography>KYC: Approved</Typography>
                      <List dense>
                        <ListItemButton><ListItemText primary="-> Dashboard" /></ListItemButton>
                        <ListItemButton><ListItemText primary="-> Profile" /></ListItemButton>
                        <ListItemButton><ListItemText primary="-> Change Password" /></ListItemButton>
                        <ListItemButton><ListItemText primary="-> Change TPIN" /></ListItemButton>
                      </List>
                    </Box>
                  )}
                  {selectedPopoverContent && selectedPopoverContent !== 'dashboard_content' && (
                     <Typography>Content for: {selectedPopoverContent.replace('_content', '')}</Typography>
                  )}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
