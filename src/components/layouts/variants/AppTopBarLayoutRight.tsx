import React, { useState, useMemo } from 'react';
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
  Switch,
  Select,
  FormControl,
  InputLabel,
  // MenuItem is already imported for Menu, ensure it's available for Select too
  Typography as MuiTypography, // Alias to avoid conflict if Typography is used elsewhere
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../../hooks/useSettings';
import LayoutSwitcher from '../../LayoutSwitcher';

import {
  Drawer,
  ListItemButton,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MiscellaneousServices as ServicesIcon, 
  Assessment as ReportsIcon,      
  SupportAgent as SupportIcon,    
} from '@mui/icons-material';

interface AppTopBarLayoutRightProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon />, content: 'dashboard_content' },
  { id: 'services', text: 'Services', icon: <ServicesIcon />, content: 'services_content' },
  { id: 'reports', text: 'Reports', icon: <ReportsIcon />, content: 'reports_content' },
  { id: 'support', text: 'Support', icon: <SupportIcon />, content: 'support_content' },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon />, content: 'settings_content' }, 
  { id: 'logout', text: 'Logout', icon: <ExitToAppIcon />, content: 'logout_content' },   
];

export default function AppTopBarLayoutRight({ children }: AppTopBarLayoutRightProps) {
  const navigate = useNavigate();
  const {
    themeMode,
    toggleTheme,
    colorScheme,
    setColorScheme,
    sidebarVariant,
    setSidebarVariant,
    appBarDense,
    setAppBarDense,
  } = useSettings();

  const currentDrawerWidth = useMemo(() => {
    if (sidebarVariant === 'full') {
      return 240;
    }
    return 70;
  }, [sidebarVariant]);

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState<boolean>(false);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPopoverContent, setSelectedPopoverContent] = useState<string | null>(null);
  const open = Boolean(popoverAnchorEl);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSettingsDrawerOpen = () => {
    setIsSettingsDrawerOpen(true);
  };

  const handleSettingsDrawerClose = () => {
    setIsSettingsDrawerOpen(false);
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
    console.log('Logout clicked');
    handleUserMenuClose();
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    handleUserMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${currentDrawerWidth}px)`,
          mr: `${currentDrawerWidth}px`, // Changed from ml to mr
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <Toolbar variant={appBarDense ? 'dense' : 'regular'}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Home">
              <IconButton color="inherit" onClick={() => navigate('/')} aria-label="home">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: 2 }}>
            <InputBase
              placeholder="Search Transaction..."
              sx={{
                color: 'text.primary',
                backgroundColor: alpha('#000', 0.05),
                borderRadius: 1,
                padding: '2px 10px',
                width: 'clamp(200px, 50%, 400px)',
              }}
            />
          </Box>
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
            <Tooltip title="User Account">
              <IconButton
                edge="end"
                color="inherit"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleUserMenuOpen}
                aria-label="user account"
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="user-menu"
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              MenuListProps={{ 'aria-labelledby': 'user-menu-button' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Tooltip title="Application Settings">
              <IconButton color="inherit" onClick={handleSettingsDrawerOpen} aria-label="application settings">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area - Before Drawer for right-anchored drawer */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', 
          mr: `${currentDrawerWidth}px`, // Changed from ml to mr
          width: `calc(100% - ${currentDrawerWidth}px)`,
          order: 1, // Ensure main content is rendered before the right drawer in flex order
        }}
      >
        {children}
      </Box>

      <Drawer
        variant="permanent"
        anchor="right" // Changed to right
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: currentDrawerWidth,
            boxSizing: 'border-box',
            borderLeft: (theme) => `1px solid ${alpha(theme.palette.divider, 0.12)}`, // Border on the left
            borderRight: 'none',
            backgroundColor: (theme) => theme.palette.background.default,
            overflowX: 'hidden',
          },
          order: 2, // Ensure drawer is rendered after main content for right anchor
        }}
      >
        <Toolbar /> {/* For spacing, to align with AppBar content */}
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', pt: 2 }}>
          <List disablePadding>
            {sidebarItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <Tooltip title={sidebarVariant === 'mini' ? item.text : ''} placement="left">
                  <ListItemButton
                    onClick={(event) => handleSidebarItemClick(event, item.content)}
                    sx={{
                      minHeight: 48,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      px: 2.5,
                      py: 1.5, 
                      mb: 1, 
                      color: (theme) => popoverAnchorEl?.id === item.id + '-button' ? theme.palette.primary.main : theme.palette.text.primary,
                      backgroundColor: (theme) => popoverAnchorEl?.id === item.id + '-button' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                    id={item.id + '-button'}
                  >
                    <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', color: (theme) => theme.palette.primary.main }}>
                      {item.icon}
                    </ListItemIcon>
                    {sidebarVariant === 'full' && (
                      <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'caption', sx: { textAlign: 'center', mt: 0.5, color: (theme) => popoverAnchorEl?.id === item.id + '-button' ? theme.palette.primary.main : theme.palette.text.secondary } }} />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Floating Popover Menu */}
      <Popper
        open={open}
        anchorEl={popoverAnchorEl}
        placement="left-start" // Changed to left-start
        transition
        disablePortal 
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10], 
            },
          },
          {
            name: 'flip',
            enabled: false, 
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ]}
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 2 }}
      >
        {({ TransitionProps }: { TransitionProps?: TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper elevation={3} sx={{ minWidth: 280, p: 2, position: 'relative', overflow: 'visible' }}>
              {/* Arrow Element JSX removed */}
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

      {/* Settings Drawer (remains anchored left for consistency, or could be right too) */}
      <Drawer
        anchor="left" // Settings drawer can remain left, or also be changed to right
        open={isSettingsDrawerOpen}
        onClose={handleSettingsDrawerClose}
        PaperProps={{
          sx: { width: 320, p: 3, backgroundColor: (theme) => theme.palette.background.paper },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <MuiTypography variant="h6">Settings</MuiTypography>
          <IconButton onClick={handleSettingsDrawerClose} aria-label="close settings drawer">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Theme Mode Toggle */}
        <MuiTypography variant="subtitle1" gutterBottom>Theme</MuiTypography>
        <List dense>
          <ListItem disablePadding>
            <ListItemText id="theme-mode-label" primary="Dark Mode" />
            <Switch
              edge="end"
              onChange={toggleTheme}
              checked={themeMode === 'dark'}
              inputProps={{ 'aria-labelledby': 'theme-mode-label' }}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Color Scheme Picker */}
        <MuiTypography variant="subtitle1" gutterBottom>Color Scheme</MuiTypography>
        <List dense>
          <ListItem disablePadding>
            <FormControl fullWidth>
              <InputLabel id="color-scheme-select-label">Scheme</InputLabel>
              <Select
                labelId="color-scheme-select-label"
                id="color-scheme-select"
                value={colorScheme}
                label="Scheme"
                onChange={(e) => setColorScheme(e.target.value as string)}
                size="small"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="purple">Purple</MenuItem>
                <MenuItem value="orange">Orange</MenuItem>
                <MenuItem value="teal">Teal</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Layout Settings */}
        <MuiTypography variant="subtitle1" gutterBottom>Layout</MuiTypography>
        <List dense>
          <ListItem disablePadding>
            <FormControl fullWidth>
              <InputLabel id="sidebar-variant-select-label">Sidebar Variant</InputLabel>
              <Select
                labelId="sidebar-variant-select-label"
                id="sidebar-variant-select"
                value={sidebarVariant}
                label="Sidebar Variant"
                onChange={(e) => setSidebarVariant(e.target.value as 'mini' | 'full')}
                size="small"
              >
                <MenuItem value="mini">Mini</MenuItem>
                <MenuItem value="full">Full</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem disablePadding sx={{ pt: 2 }}>
            <ListItemText id="appbar-dense-label" primary="Dense App Bar" />
            <Switch
              edge="end"
              onChange={(e) => setAppBarDense(e.target.checked)}
              checked={appBarDense}
              inputProps={{ 'aria-labelledby': 'appbar-dense-label' }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ pt: 2, display: 'flex', justifyContent: 'flex-start' }}>
            <LayoutSwitcher />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
