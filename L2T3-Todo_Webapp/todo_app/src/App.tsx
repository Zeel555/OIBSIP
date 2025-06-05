import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Todo from './components/Todo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todo />
    </ThemeProvider>
  );
}

export default App;
