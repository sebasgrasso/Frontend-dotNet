import React from 'react';
import LeftBar from '../homePage/components/leftBar';
import Feed from '../homePage/components/feed';
import RightBar from '../homePage/components/rightBar';
import { Container, Grid } from '@mui/material';
import '../homePage/css/homePage.ts';


export const HomePage = () =>{
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

 