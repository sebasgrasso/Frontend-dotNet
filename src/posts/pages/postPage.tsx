import { Button, Container, Grid, Paper } from "@mui/material";
import LeftBar from "../../homePage/components/leftBar";
import RightBar from "../../homePage/components/rightBar";
import { Post } from "../components/post";
import {  useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPostQuery, useGetRespuestasQuery } from "../../store/apis/microbApis";
import { Respuesta } from "../components/respuesta";
import { getInstanciaStorage } from "../../utils/localstorage";

export const PostPage = () =>{
const navigate = useNavigate();
const instanciaDelStore = getInstanciaStorage()

const pathParts = location.pathname.split('/');
    
const urlPostID = pathParts[3]; // This gets 'instance1' from the URL
const {data: post} = useGetPostQuery(urlPostID)

const { data: respuestas } = useGetRespuestasQuery(post?.id?.toString() || '');

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
                onClick={()=>{instanciaDelStore?.alias ? navigate(`/${instanciaDelStore.alias}`) : navigate("/") }}
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
                {post ? 
                  <Grid sx={{mt:"20px"}} container direction="column" spacing={2}>
                    <Post post={ post} clickeable={false}/>
                    {respuestas?.map((respuesta) => (
                      <Grid key={respuesta.id} item xs={12}>
                        <Respuesta post={respuesta} padre={post.usuarioNickname} />
                      </Grid>
                    ))} 
                  </Grid> : null}
                
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
