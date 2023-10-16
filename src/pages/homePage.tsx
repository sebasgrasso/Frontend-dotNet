import { Grid } from "@mui/material"
import { PostDTO } from "../interfaces/interfaces" 
import { Post } from "../posts/components/post"
import {LoginPopup} from "../auth/pages/loginPopup"
import {NuevoPost} from "../posts/pages/nuevoPost"

export const HomePage = () =>{
    const elPost:PostDTO = 
    {
        id: "1",
        instanciaId: 1,
        instanciaNickname: "futebol",
        usuarioId: 1,
        usuarioUsername: "seba_g_a",
        usuarioNickname: "Seba",
        fechaHora: "2023-10-16T19:49:09.294Z", // Consider using a Date type instead
        contenido: "este es el contenido del post",
        hashtags: ["microbio","arrozConLeche"],
        tieneCita: false,
        postCitado: null,
        postIdPadre: null,
    }

    return (
        <div style={{ backgroundColor: "#15202b", minHeight: "100vh" }}>
        <LoginPopup/>
        <NuevoPost/>
        <Grid container justifyContent={"center"} >
            <Grid item >
                <Post post={elPost}/>
            </Grid>  
        </Grid>          
        </div>
    )
}