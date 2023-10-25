import { Container, Grid } from "@mui/material";
import LeftBar from "../../homePage/components/leftBar";
import Feed from "../../homePage/components/feed";
import RightBar from "../../homePage/components/rightBar";
import { Post } from "../components/post";
import { PostDTO } from "../../interfaces/interfaces";


export const HomePage = () =>{

    const postEjemplo:PostDTO = {
        id:"1",
        instanciaId: 1,
        instanciaAlias: "Instancia1",
        usuarioId: 1,
        usuarioUsername: "sebaga13",
        usuarioNickname: "seba",
        fechaHora: "1998-03-13",
        contenido: "Este es el contenido del post",
        hashtags: [],
        tieneCita: false
    }
    
    const respuestaEjemplo:PostDTO = {
        id:"1",
        instanciaId: 1,
        instanciaAlias: "Instancia1",
        usuarioId: 1,
        usuarioUsername: "sebaga13",
        usuarioNickname: "seba",
        fechaHora: "1998-03-13",
        contenido: "Este es el contenido del post",
        hashtags: [],
        tieneCita: false
    }
    

    return (
        <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Container style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <LeftBar  />
            </Grid>
            <Grid item xs={6}>
              <Post post={postEjemplo} />
            </Grid>
            <Grid item xs={3}>
              <RightBar />
            </Grid>
          </Grid>
        </Container>
        </div>
      );
}
