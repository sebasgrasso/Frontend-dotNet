import { Button, Container, Grid, Paper } from "@mui/material";
import LeftBar from "../../homePage/components/leftBar";
import RightBar from "../../homePage/components/rightBar";
import { Post } from "../components/post";
import { PostDTO } from "../../interfaces/interfaces";
//import { Respuesta } from "../components/respuesta";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetRespuestasQuery } from "../../store/apis/microbApis";
import { Respuesta } from "../components/respuesta";
import { getInstanciaStorage } from "../../utils/localstorage";

export const PostPage = () =>{
//falta obtener el post id desde el navigate, y obtener la lista de respuestas
const location = useLocation();
const post: PostDTO = location.state;
const navigate = useNavigate();
const {alias} = getInstanciaStorage()
const {data} = useGetRespuestasQuery(post.id);


  return (
      <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
      <Container style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LeftBar  />
          </Grid>
          <Grid item xs={6}>
             <Paper sx={{padding: '20px',marginTop: '20px',backgroundColor:"rgb(25, 27, 34)"}}>
            
              <Button 
                sx={{backgroundColor:"white"}} 
                onClick={()=>{alias ? navigate(`/${alias}`) : navigate("/") }}
              >
                VOLVER
              </Button>
              <InfiniteScroll
                dataLength={24}
                next={()=>alert("hola")}
                hasMore={true}
                loader={""}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No hay más posts para mostrar</b>
                  </p>
                }
              >
                <Grid sx={{mt:"20px"}} container direction="column" spacing={2}>
                  <Post post={ post} clickeable={false}/>
                  {data?.map((respuesta) => (
                    <Grid key={respuesta.id} item xs={12}>
                      <Respuesta post={respuesta} padre={post.usuarioNickname} />
                     </Grid>
                  ))} 
                </Grid>
              </InfiniteScroll>

          </Paper>
             

          </Grid>
          <Grid item xs={3}>
            <RightBar />
          </Grid>
        </Grid>
      </Container>
      </div>
    );
}
