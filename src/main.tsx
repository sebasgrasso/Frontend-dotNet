import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRouter } from './router/AppRouter.tsx'

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRouter />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>    
      <CssBaseline/>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
