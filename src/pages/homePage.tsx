import { Grid } from "@mui/material"
import { Post } from "../posts/components/post"
import {LoginPopup} from "../auth/pages/loginPopup"
import {NuevoPost} from "../posts/components/nuevoPost"
import { useLazyGetPostsQuery } from "../store/apis/microbApis"
import { useEffect } from "react"

export const HomePage = () =>{
    const [startGetPosts,{data:posts}]=useLazyGetPostsQuery()
    useEffect(() => {
        startGetPosts({skip:0,limit:100});
      }, []);
      
    return (
        <div style={{ backgroundColor: "#15202b", minHeight: "100vh" }}>
        <LoginPopup/>
        <NuevoPost/>
        <Grid container justifyContent={"center"} >
            {posts?.map((post, index) => (
                <Grid key={index} item >
                    <Post post={post}/> 
                </Grid> 
            ))}
        </Grid>          
        </div>
    )
}

 