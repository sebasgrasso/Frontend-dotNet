import { Container, Grid } from "@mui/material";
import LeftBar from "../../homePage/components/leftBar";
import RightBar from "../../homePage/components/rightBar";
import { Post } from "../components/post";
import { PostDTO } from "../../interfaces/interfaces";
import { Respuesta } from "../components/respuesta";


export const PostPage = () =>{
//falta obtener el post id desde el navigate, y obtener la lista de respuestas
  const postEjemplo:PostDTO = {
      id:"1",
      instanciaId: 1,
      instanciaAlias: "Instancia1",
      usuarioId: 1,
      usuarioUsername: "@sebaga13",
      usuarioNickname: "Seba",
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
      usuarioUsername: "@axel123",
      usuarioNickname: "Axel",
      fechaHora: "1998-03-13",
      contenido: "Este es el contenido de la respuesta",
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
            <Respuesta post={respuestaEjemplo} padre={postEjemplo.usuarioNickname} />
          </Grid>
          <Grid item xs={3}>
            <RightBar />
          </Grid>
        </Grid>
      </Container>
      </div>
    );
}
