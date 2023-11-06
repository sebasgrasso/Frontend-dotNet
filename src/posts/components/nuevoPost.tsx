import { Button, Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { skipValue, changeNewPost } from '../../store/posts/postsSlice';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const NuevoPost = () => {
  const [postContent, setPostContent] = useState("");
  const textFieldRef = useRef(null);
  const dispatch = useAppDispatch();
  const {newPost} = useAppSelector((state) => state.postsSkip);
  const {handleCreatePost}= useCreatePost();
  const {id} = useAppSelector((state)=>state.auth)
  const handlepostContentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPostContent(target.value);
  };

  const handlepostSubmit = () => {
    if (postContent === "") {
      if (textFieldRef.current) {
        (textFieldRef.current as HTMLTextAreaElement).focus();
      }
    } else if(id) {
      handleCreatePost({contenido:postContent,postIdCita:null,postIdPadre:null});
      setPostContent("");
      dispatch(skipValue({skip:0}))
      dispatch(changeNewPost(newPost))
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '20px'}}>
      <Card sx={{ width: 500, maxWidth: '100%' }}> {}
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            placeholder="¿En que estas pensando?"
            multiline
            rows={4}
            fullWidth
            value={postContent}
            onChange={handlepostContentChange}
            variant="outlined"
            inputRef={textFieldRef}
          />
          <Grid container justifyContent="flex-end" sx={{ marginTop: '10px' }}>
            <Grid item>
              <Button variant="contained" onClick={handlepostSubmit}>
                Publicar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
