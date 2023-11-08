import LeftBar from '../components/leftBar.tsx';
import Feed from '../components/feed.tsx';
import RightBar from '../components/rightBar.tsx';
import { Container, Grid } from '@mui/material';


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
