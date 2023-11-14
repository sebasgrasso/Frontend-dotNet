import { Container, Grid } from '@mui/material';
import LeftBar from '../../homePage/components/leftBar';
import RightBar from '../../homePage/components/rightBar';
import SearchFeed from '../components/searchFeed';
import { useLocation } from 'react-router-dom';


export const SearchResultsPage = () =>{
  const location = useLocation();
  const q = location.state
  console.log("q vale: ",q);
  
  
    return (
        <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Container style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <LeftBar  />
            </Grid>
            <Grid item xs={6}>
              <SearchFeed q={q} />
            </Grid>
            <Grid item xs={3}>
              <RightBar />
            </Grid>
          </Grid>
        </Container>
        </div>
      );
}
