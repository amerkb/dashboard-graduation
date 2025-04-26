import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import { Toaster } from 'react-hot-toast';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#7d224b',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    spacing: 8,
  });
  return (
    <div className="font-cairo overflow-hidden">
      <BrowserRouter>
        <Toaster />
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
