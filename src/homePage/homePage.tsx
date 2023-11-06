import { useEffect } from 'react';
import LeftBar from './components/leftBar.tsx';
import Feed from './components/feed.tsx';
import RightBar from './components/rightBar.tsx';
import { Container, Grid } from '@mui/material';
import './css/homePage.ts';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth.ts';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { setInstance } from '../store/instance/instanceSlice.ts';
import { useGetInstanciaQuery } from '../store/apis/microbApis.ts';


export const HomePage = () =>{
  const dispatch = useAppDispatch();
  const { handleLogout } = useAuth();

  //obtengo alias de la instancia desde la url
  const { instanciaX } = useParams<{ instanciaX: string }>();
  console.log(instanciaX)
  //obtengo la instancia desde el back
  const {data} = useGetInstanciaQuery({alias: instanciaX || "" })
  //agarro la instancia actual desde redux
  const instanciaActual = useAppSelector((state)=>state.instance)

  useEffect(() => {
    if (instanciaX !== instanciaActual.alias) {
      if (data) {
        dispatch(setInstance(data));
      }
      handleLogout();
      console.log("Closed session because the instance changed");
    }
  }, [instanciaX, instanciaActual.alias, dispatch, handleLogout, data]);
  
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
