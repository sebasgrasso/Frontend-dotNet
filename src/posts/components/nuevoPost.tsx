import { Button, Box, Card, CardContent, Grid, TextField, LinearProgress } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { skipValue, changeNewPost } from '../../store/posts/postsSlice';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import SendIcon from '@mui/icons-material/Send';

export const NuevoPost = () => {
  const [postContent, setPostContent] = useState("");
  const textFieldRef = useRef(null);
  const dispatch = useAppDispatch();
  const {newPost} = useAppSelector((state) => state.postsSkip);
  const {handleCreatePost,isLoading}= useCreatePost();
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
      <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
        <CardContent sx={{ padding: '20px' }}>
          <TextField
            placeholder="¿En qué estás pensando?"
            multiline
            rows={4}
            fullWidth
            value={postContent}
            onChange={handlepostContentChange}
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Box textAlign="right" mt={2}>
            <Button variant="contained" onClick={handlepostSubmit} disabled={isLoading} 
            sx={{
              marginTop: 2,
              color: "white",
              width: '100%',
              fontWeight: 'medium', 
              letterSpacing: 1.2, 
              fontSize: '0.875rem', 
              textTransform: 'none', 
              borderRadius: '4px', 
              padding: '8px 24px', 
              boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
              transition: 'background-color .3s, color .3s, box-shadow .3s',
              
          }}
          startIcon={<SendIcon />} >
              Publicar
            </Button>
          </Box>
          {isLoading && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
