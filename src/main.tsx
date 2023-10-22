import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { HomePage } from './homePage/homePage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>    
      <CssBaseline/>
      <HomePage/>
    </Provider>
  </React.StrictMode>
)
