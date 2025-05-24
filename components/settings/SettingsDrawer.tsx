'use client';

import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Button,
  Grid,
  Switch
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  setLayout, 
  setColorScheme, 
  setNavbarPosition, 
  setSidebarStyle,
  toggleSettingsDrawer,
  closeSettingsDrawer,
  LayoutType,
  ColorScheme,
  NavbarPosition,
  SidebarStyle
} from '../../store/slices/settingsSlice';
import { toggleDarkMode } from '../../store/slices/uiSlice';

// Color scheme option component
const ColorOption = ({ 
  color, 
  selected, 
  onClick 
}: { 
  color: string; 
  selected: boolean; 
  onClick: () => void 
}) => {
  const colorMap: Record<string, string> = {
    blue: '#0ea5e9',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b',
    teal: '#14b8a6'
  };

  return (
    <Box 
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        bgcolor: colorMap[color] || color,
        border: selected ? '3px solid #fff' : '3px solid transparent',
        boxShadow: selected ? '0 0 0 2px #000' : 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }}
      onClick={onClick}
    />
  );
};

export default function SettingsDrawer() {
  const dispatch = useDispatch();
  const { 
    layout, 
    colorScheme, 
    navbarPosition, 
    sidebarStyle, 
    isSettingsOpen 
  } = useSelector((state: RootState) => state.settings);
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLayout(event.target.value as LayoutType));
  };

  const handleColorSchemeChange = (color: ColorScheme) => {
    dispatch(setColorScheme(color));
  };

  const handleNavbarPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNavbarPosition(event.target.value as NavbarPosition));
  };

  const handleSidebarStyleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSidebarStyle(event.target.value as SidebarStyle));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleClose = () => {
    dispatch(closeSettingsDrawer());
  };

  return (
    <Drawer
      anchor="right"
      open={isSettingsOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 300, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Customize</Typography>
          <IconButton onClick={handleClose}>✖</IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Color Scheme */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Color Scheme
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {['blue', 'green', 'purple', 'orange', 'teal'].map((color) => (
              <Grid item key={color}>
                <ColorOption 
                  color={color} 
                  selected={colorScheme === color} 
                  onClick={() => handleColorSchemeChange(color as ColorScheme)} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Theme Mode */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Theme Mode
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Dark Mode</Typography>
            <Switch 
              checked={darkMode} 
              onChange={handleDarkModeToggle} 
              color="primary" 
            />
          </Box>
        </Box>

        {/* Layout Options */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Layout Options
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>Layout Width</FormLabel>
            <RadioGroup row value={layout} onChange={handleLayoutChange}>
              <FormControlLabel value="compact" control={<Radio size="small" />} label="Compact" />
              <FormControlLabel value="default" control={<Radio size="small" />} label="Default" />
              <FormControlLabel value="wide" control={<Radio size="small" />} label="Wide" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>Sidebar Style</FormLabel>
            <RadioGroup row value={sidebarStyle} onChange={handleSidebarStyleChange}>
              <FormControlLabel value="full" control={<Radio size="small" />} label="Full" />
              <FormControlLabel value="compact" control={<Radio size="small" />} label="Compact" />
              <FormControlLabel value="closed" control={<Radio size="small" />} label="None" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>Navbar Position</FormLabel>
            <RadioGroup row value={navbarPosition} onChange={handleNavbarPositionChange}>
              <FormControlLabel value="fixed" control={<Radio size="small" />} label="Fixed" />
              <FormControlLabel value="static" control={<Radio size="small" />} label="Static" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleClose}
        >
          Apply Changes
        </Button>
      </Box>
    </Drawer>
  );
}
