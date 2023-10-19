import { Grid, Paper } from "@mui/material"
import { Post } from "../posts/components/post"
import {LoginPopup} from "../auth/pages/loginPopup"
import {NuevoPost} from "../posts/components/nuevoPost"
import { useLazyGetPostsQuery } from "../store/apis/microbApis"
import { useEffect } from "react"
import { SignUpPopup } from "../auth/pages/signupPopup"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const HomePage = () =>{
    const [startGetPosts,{data:posts}]=useLazyGetPostsQuery()
    useEffect(() => {
        startGetPosts({skip:0,limit:100});
      }, []);
      
    return (
        <div style={{ backgroundColor: "#15202b", minHeight: "100vh" }}>
        <ToastContainer />
        <LoginPopup/>
        <SignUpPopup/>
        <NuevoPost/>
        <Paper style={{ margin: 'auto', maxWidth: 600, }}> {}
                <Grid container direction="column" alignItems="center" bgcolor={"#15202b"} spacing={1}> {}
                    {posts?.map((post, index) => (
                        <Grid key={index} item xs={12}> {}
                            <Post post={post}/> 
                        </Grid> 
                    ))}
                </Grid>
        </Paper>   
        </div>
    )
}

 