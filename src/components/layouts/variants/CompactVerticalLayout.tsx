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
  Switch,
  Select,
  FormControl,
  InputLabel,
  Typography as MuiTypography,
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

interface CompactVerticalLayoutProps {
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

export default function CompactVerticalLayout({ children }: CompactVerticalLayoutProps) {
  const navigate = useNavigate();
  const {
    themeMode,
    toggleTheme,
    colorScheme,
    setColorScheme,
    sidebarVariant, // Still used by settings drawer and potentially ListItemText, but not for drawer width
    setSidebarVariant,
    appBarDense,
    setAppBarDense,
  } = useSettings();

  // For CompactVerticalLayout, currentDrawerWidth is always the mini variant width.
  const currentDrawerWidth = 70; // Fixed mini variant width

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
          ml: `${currentDrawerWidth}px`,
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
            <Tooltip title="User Profile">
              <IconButton color="inherit" onClick={handleUserMenuOpen} aria-label="user profile">
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit" onClick={handleSettingsDrawerOpen} aria-label="settings">
                <SettingsIcon />
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
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth, // Fixed mini width
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentDrawerWidth, // Fixed mini width
            boxSizing: 'border-box',
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
            overflowX: 'hidden', // Prevent horizontal scrollbar for mini sidebar
          },
        }}
      >
        <Toolbar /> 
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', pt: 2 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <Tooltip title={item.text} placement="right"> {/* Tooltip always shows text as sidebar is mini */}
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
                    {/* ListItemText is removed as Tooltip provides the text for this always-mini layout */}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          ml: `${currentDrawerWidth}px`,
          width: `calc(100% - ${currentDrawerWidth}px)`,
        }}
      >
        {children}
      </Box>

      <Popper
        open={open}
        anchorEl={popoverAnchorEl}
        placement="right-start"
        transition
        disablePortal
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          { name: 'flip', enabled: false },
          { name: 'preventOverflow', options: { boundary: 'viewport' } },
        ]}
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 2 }}
      >
        {({ TransitionProps }: { TransitionProps?: TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper elevation={3} sx={{ minWidth: 280, p: 2, position: 'relative', overflow: 'visible' }}>
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

      <Drawer
        anchor="right"
        open={isSettingsDrawerOpen}
        onClose={handleSettingsDrawerClose}
        PaperProps={{
          sx: { width: 320, p: 2 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <MuiTypography variant="h6">Settings</MuiTypography>
          <IconButton onClick={handleSettingsDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <MuiTypography variant="subtitle1" gutterBottom>Appearance</MuiTypography>
        <List dense>
          <ListItem disablePadding>
            <ListItemText id="theme-mode-label" primary="Theme Mode" secondary={themeMode === 'light' ? 'Light' : 'Dark'} />
            <Switch
              edge="end"
              onChange={toggleTheme}
              checked={themeMode === 'dark'}
              inputProps={{ 'aria-labelledby': 'theme-mode-label' }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="color-scheme-select-label">Color Scheme</InputLabel>
              <Select
                labelId="color-scheme-select-label"
                id="color-scheme-select"
                value={colorScheme}
                label="Color Scheme"
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

        <MuiTypography variant="subtitle1" gutterBottom>Layout</MuiTypography>
        <List dense>
          <ListItem disablePadding>
            <FormControl fullWidth>
              <InputLabel id="sidebar-variant-select-label">Sidebar Variant</InputLabel>
              <Select
                labelId="sidebar-variant-select-label"
                id="sidebar-variant-select"
                value={sidebarVariant} // This will reflect global context, but won't change this layout's sidebar width
                label="Sidebar Variant"
                onChange={(e) => setSidebarVariant(e.target.value as 'mini' | 'full')}
                size="small"
                // disabled // Optionally disable if this layout is active, to avoid confusion
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
