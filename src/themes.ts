// themes.ts
import { createTheme } from "@mui/material";

const customTypography = {
  h1: {
    fontSize: 50,
    fontWeight: 500,
  },
};


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#092949',
    },
  },
  typography: customTypography,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: customTypography
});

 const draculaTheme = createTheme({
  palette: {
    mode: 'dark', // or 'dark', depending on what you prefer
    primary: {
      main: '#ff7ac6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#bf95f9',
    },
    background: {
      default: '#272935',
      paper: '#272935',
    },
    action: {
      hover: '#35303b',
      selected: '#35303b',
      active: '#35303b',
    },
    error: {
      main: '#ff564f'
    }
  },
  typography: customTypography,
});

const coffeeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d6822e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#d6822e',
    },
    background: {
      default: '#211720',
      paper: '#211720',
    },
    action: {
      hover: '#322931',
      selected: '#322931',
      active: '#322931',
    },
    error: {
      main: '#fc9783'
    }
  },
  typography: customTypography,
});

const lemonadeTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f7802',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e9e92f',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    action: {
      hover: '#ededed',
      selected: '#ededed',
      active: '#ededed',
    },
    error: {
      main: '#f2b6b5'
    }
  },
  typography: customTypography
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  dracula: draculaTheme,
  coffee: coffeeTheme,
  lemonade: lemonadeTheme,
};

export type ThemeName = keyof typeof themes;
