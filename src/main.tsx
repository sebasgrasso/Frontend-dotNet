import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRouter } from './router/AppRouter.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green, red } from '@mui/material/colors';

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRouter />,
  },
]);

const pathParts = location.pathname.split('/');
const urlInstanceIdentifier = pathParts[1];

const greenTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const blueTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

const redTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: red[500],
    },
  },
});



const App = () => {
  // Estado para almacenar el tema actual
  const [theme, setTheme] = useState(blueTheme); // valor por defecto

  // Efecto para actualizar el tema
  useEffect(() => {
    const fetchData = async () => {
      const instancia = await fetch(`http://localhost:5245/instancias/alias/${urlInstanceIdentifier}`);
      const data = await instancia.json();

      switch (data.tema) {
        case 'verde':
          setTheme(greenTheme);
          break;
        case 'azul':
          setTheme(blueTheme);
          break;
        case 'rojo':
          setTheme(redTheme);
          break;
        default:
          setTheme(blueTheme); // tema por defecto si 'data.tema' no es reconocido
      }
    };

    fetchData();
  }, []); // Add tema to the dependency array

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error('Failed to find the root element');
}
