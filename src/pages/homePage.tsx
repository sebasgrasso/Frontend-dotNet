import { Grid } from "@mui/material"
import { PostType } from "../interfaces/interfaces" 
import { Post } from "../posts/components/post"
import {LoginPopup} from "../auth/pages/loginPopup"
import {NuevoPost} from "../posts/pages/nuevoPost"

export const HomePage = () =>{
    const elPost:PostType = 
    {
        userName:"seba",
        userLongName:"@seba_13",
        content:"Este es el contenido del post",
        citado:null,
        upvotes:0,
        upvoted:false
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