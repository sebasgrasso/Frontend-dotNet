import { Container, Grid } from "@mui/material";
import LeftBar from "../../homePage/components/leftBar";
import RightBar from "../../homePage/components/rightBar";
import { Post } from "../components/post";
import { PostDTO } from "../../interfaces/interfaces";
//import { Respuesta } from "../components/respuesta";
import { useLocation } from "react-router-dom";

export const PostPage = () =>{
//falta obtener el post id desde el navigate, y obtener la lista de respuestas
const location = useLocation();
const post: PostDTO = location.state;

  return (
      <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
      <Container style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LeftBar  />
          </Grid>
          <Grid item xs={6}>
            <Post post={ post}/>
            {/* {respuestaEjemplo?.map((respuesta) => (
            <Grid key={respuesta.id} item xs={12}>
              
              <Respuesta post={respuesta} padre={postEjemplo.usuarioNickname} />
            </Grid>
          ))} */}

          </Grid>
          <Grid item xs={3}>
            <RightBar />
          </Grid>
        </Grid>
      </Container>
      </div>
    );
}
