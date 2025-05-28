import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useSettings } from '../hooks/useSettings'; // Adjusted path for useSettings

const LayoutSwitcher: React.FC = () => {
  const { layout, setLayout } = useSettings();

  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLayout(event.target.value);
  };

  return (
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <FormLabel component="legend" sx={{ mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">Layout Options</Typography>
      </FormLabel>
      <RadioGroup
        aria-label="layout"
        name="layout-radio-buttons-group"
        value={layout}
        onChange={handleLayoutChange}
      >
        <FormControlLabel value="vertical" control={<Radio />} label="Vertical (Left Sidebar)" />
        <FormControlLabel value="vertical-right" control={<Radio />} label="Vertical (Right Sidebar)" />
        <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
        <FormControlLabel value="content-focused" control={<Radio />} label="Content Focused" />
        <FormControlLabel value="compact-vertical" control={<Radio />} label="Compact Vertical" />
        {/* Add more layout options here if needed in the future */}
      </RadioGroup>
    </FormControl>
  );
};

export default LayoutSwitcher;
