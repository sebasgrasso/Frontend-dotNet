import React, { useEffect } from 'react';
import LeftBar from './components/leftBar.tsx';
import Feed from './components/feed.tsx';
import RightBar from './components/rightBar.tsx';
import { Container, Grid } from '@mui/material';
import './css/homePage.ts';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth.ts';


export const HomePage = () =>{
  const { instanciaX } = useParams<{ instanciaX: string }>();
  const { handleLogout } = useAuth();

  useEffect(() => {
    handleLogout();
    console.log("cerre sesion porque cambie de instancia");
    
  }, [instanciaX]);
  
    return (
        <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Container style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <LeftBar  />
            </Grid>
            <Grid item xs={6}>
              <Feed />
            </Grid>
            <Grid item xs={3}>
              <RightBar />
            </Grid>
          </Grid>
        </Container>
        </div>
      );
}
