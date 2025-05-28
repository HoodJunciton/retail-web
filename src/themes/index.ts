import { createTheme, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // A slightly different primary for dark if needed
    },
    secondary: {
      main: '#f50057', // A different secondary for dark if needed
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#121212', // Common dark theme background
      paper: '#1e1e1e', // Common dark theme paper background
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Blue Theme Variants
export const blueLightThemeOptions: ThemeOptions = {
  ...lightThemeOptions, // Spread default light options
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light',
    primary: {
      main: '#2196f3', // Blue primary
    },
    secondary: {
      main: '#ffc107', // Amber secondary for contrast
    },
  },
};
export const blueDarkThemeOptions: ThemeOptions = {
  ...darkThemeOptions, // Spread default dark options
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#42a5f5', // Lighter blue for dark mode
    },
    secondary: {
      main: '#ffca28', // Lighter amber for dark mode
    },
  },
};

// Green Theme Variants
export const greenLightThemeOptions: ThemeOptions = {
  ...lightThemeOptions, // Spread default light options
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light',
    primary: {
      main: '#4caf50', // Green primary
    },
    secondary: {
      main: '#ff9800', // Orange secondary for contrast
    },
  },
};
export const greenDarkThemeOptions: ThemeOptions = {
  ...darkThemeOptions, // Spread default dark options
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#66bb6a', // Lighter green for dark mode
    },
    secondary: {
      main: '#ffa726', // Lighter orange for dark mode
    },
  },
};

export const blueLightTheme = createTheme(blueLightThemeOptions);
export const blueDarkTheme = createTheme(blueDarkThemeOptions);
export const greenLightTheme = createTheme(greenLightThemeOptions);
export const greenDarkTheme = createTheme(greenDarkThemeOptions);

// Purple Theme Variants
export const purpleLightThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light',
    primary: {
      main: '#673ab7', // Purple
    },
    secondary: {
      main: '#ffeb3b', // Yellow
    },
  },
};
export const purpleDarkThemeOptions: ThemeOptions = {
  ...darkThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#9575cd', // Lighter Purple
    },
    secondary: {
      main: '#fff176', // Lighter Yellow
    },
  },
};

// Orange Theme Variants
export const orangeLightThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light',
    primary: {
      main: '#ff9800', // Orange
    },
    secondary: {
      main: '#03a9f4', // Light Blue
    },
  },
};
export const orangeDarkThemeOptions: ThemeOptions = {
  ...darkThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#ffb74d', // Lighter Orange
    },
    secondary: {
      main: '#4fc3f7', // Lighter Light Blue
    },
  },
};

// Teal Theme Variants
export const tealLightThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light',
    primary: {
      main: '#009688', // Teal
    },
    secondary: {
      main: '#e91e63', // Pink
    },
  },
};
export const tealDarkThemeOptions: ThemeOptions = {
  ...darkThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#4db6ac', // Lighter Teal
    },
    secondary: {
      main: '#f06292', // Lighter Pink
    },
  },
};

export const purpleLightTheme = createTheme(purpleLightThemeOptions);
export const purpleDarkTheme = createTheme(purpleDarkThemeOptions);
export const orangeLightTheme = createTheme(orangeLightThemeOptions);
export const orangeDarkTheme = createTheme(orangeDarkThemeOptions);
export const tealLightTheme = createTheme(tealLightThemeOptions);
export const tealDarkTheme = createTheme(tealDarkThemeOptions);
