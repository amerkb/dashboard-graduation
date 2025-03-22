import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContent from "./AppContent"
import ScrollToTop from './lib/utils/ScrollTop';
import { Toaster } from 'react-hot-toast';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


function App() {
  const theme = createTheme({
    // Customize your theme here
    palette: {
      primary: {
        main: '#7d224b', // Default primary color
      },
      secondary: {
        main: '#9c27b0', // Default secondary color
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Default font family
    },
    spacing: 8, // Default spacing unit (used for margins, paddings, etc.)
  });
  return (
    <div className="font-cairo overflow-hidden" >

        <BrowserRouter>
          {/* <Toaster/>
          <ScrollToTop/> */}
          <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
        </BrowserRouter>

    </div>
  );
}

export default App;
