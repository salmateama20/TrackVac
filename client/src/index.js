import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#F6F5F5',
      dark: '#276678',
      contrastText: '#D3E0EA',
      main: '#1687A7'


    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
