import { Grid } from "@mui/material"
import { PostType } from "../interfaces/interfaces" 
import { Post } from "../posts/components/post"


export const HomePage = () =>{
    const elPost:PostType = {userName:"seba",userLongName:"@seba_13",content:"Este es el contenido del post"}

    return (
        <>
        <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        asd
      </section>
        <Grid container justifyContent={"center"} >
            <Grid item >
                <Post post={elPost}/>
            </Grid>  
        </Grid>          
        </>
    )
}