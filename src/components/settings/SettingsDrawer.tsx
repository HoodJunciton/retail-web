import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Button,
  Switch,
  Tabs,
  Tab
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { 
  setLayout, 
  setColorScheme, 
  setNavbarPosition, 
  setSidebarStyle,
  setLayoutVariant,
  setThemeOption,
  closeSettingsDrawer
} from '../../store/slices/settingsSlice';
import type {
  LayoutType,
  ColorScheme,
  NavbarPosition,
  SidebarStyle,
  LayoutVariant,
  ThemeOption
} from '../../store/slices/settingsSlice';
import { toggleDarkMode } from '../../store/slices/uiSlice';
import ThemePreview from './ThemePreview';
import { useState } from 'react';

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
  const isSettingsOpen = useSelector((state: RootState) => state.settings.isSettingsOpen);
  const { layout, colorScheme, navbarPosition, sidebarStyle, layoutVariant, themeOption } = useSelector((state: RootState) => state.settings);
  const { darkMode } = useSelector((state: RootState) => state.ui);
  
  // State for settings tabs
  const [activeTab, setActiveTab] = useState(0);

  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLayout(event.target.value as LayoutType));
  };

  const handleColorSchemeChange = (color: ColorScheme) => {
    dispatch(setColorScheme(color));
  };
  
  const handleThemeOptionChange = (theme: ThemeOption) => {
    dispatch(setThemeOption(theme));
  };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNavbarPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNavbarPosition(event.target.value as NavbarPosition));
  };

  const handleSidebarStyleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSidebarStyle(event.target.value as SidebarStyle));
  };

  const handleLayoutVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLayoutVariant(event.target.value as LayoutVariant));
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
      <Box sx={{ width: 340, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Customize</Typography>
          <IconButton onClick={handleClose}>✖</IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />
        
        {/* Settings Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 3 }}
        >
          <Tab label="Themes" />
          <Tab label="Layout" />
        </Tabs>
        
        {/* Theme Settings Tab */}
        {activeTab === 0 && (
          <>
            {/* Theme Presets */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Theme Presets
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Choose a complete theme with coordinated colors
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 2, 
                mt: 2 
              }}>
                {['default', 'corporate', 'creative', 'elegant', 'playful', 'minimal', 'dark'].map((theme) => (
                  <Box key={theme}>
                    <ThemePreview 
                      themeKey={theme as ThemeOption} 
                      selected={themeOption === theme} 
                      onClick={() => handleThemeOptionChange(theme as ThemeOption)}
                      darkMode={darkMode}
                    />
                  </Box>
                ))}
              </Box>
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
            
            {/* Color Accents */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Color Accents
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Fine-tune your theme with accent colors
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {['blue', 'green', 'purple', 'orange', 'teal'].map((color) => (
                  <ColorOption 
                    key={color}
                    color={color} 
                    selected={colorScheme === color} 
                    onClick={() => handleColorSchemeChange(color as ColorScheme)} 
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
        
        {/* Layout Settings Tab */}
        {activeTab === 1 && (
          <>
            {/* Layout Width */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Layout Width
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup row value={layout} onChange={handleLayoutChange}>
                  <FormControlLabel value="compact" control={<Radio size="small" />} label="Compact" />
                  <FormControlLabel value="default" control={<Radio size="small" />} label="Default" />
                  <FormControlLabel value="wide" control={<Radio size="small" />} label="Wide" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            {/* Layout Variant */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Layout Variant
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="layout-variant"
                  name="layout-variant"
                  value={layoutVariant}
                  onChange={handleLayoutVariantChange}
                >
                  <FormControlLabel value="standard" control={<Radio />} label="Standard" />
                  <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                  <FormControlLabel value="minimal" control={<Radio />} label="Minimal" />
                  <FormControlLabel value="footer" control={<Radio />} label="With Footer" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            {/* Sidebar Style */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Sidebar Style
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="sidebar-style"
                  name="sidebar-style"
                  value={sidebarStyle}
                  onChange={handleSidebarStyleChange}
                >
                  <FormControlLabel value="full" control={<Radio />} label="Full" />
                  <FormControlLabel value="compact" control={<Radio />} label="Compact" />
                  <FormControlLabel value="closed" control={<Radio />} label="Closed" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            {/* Navbar Position */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Navbar Position
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup row value={navbarPosition} onChange={handleNavbarPositionChange}>
                  <FormControlLabel value="fixed" control={<Radio size="small" />} label="Fixed" />
                  <FormControlLabel value="static" control={<Radio size="small" />} label="Static" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        )}

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Apply Changes
        </Button>
      </Box>
    </Drawer>
  );
}
