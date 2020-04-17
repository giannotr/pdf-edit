import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  dark: '#0b0a07',
  light: '#bed4e0',
  primary: '#00a9d3',
  secondary: '#ff5722',
  tertiary: '#52528c',
}

export const theme = {
  colors: {
    outline: palette.primary,
    buttons: {
      primary: palette.tertiary,
      secondary: palette.secondary,
      tertiary: palette.primary,
    },
    input: {
      background: palette.light,
      text: palette.dark,
      placeholder: palette.tertiary,
      label: palette.tertiary,
    },
    list: {
      background: {
        main: palette.light,
        drag: palette.primary,
      },
      text: palette.dark,
    }
  },
}

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Muli"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
