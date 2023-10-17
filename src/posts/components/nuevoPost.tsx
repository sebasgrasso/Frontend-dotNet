import { Button, Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";
import { useCreatePost } from "../hooks/useCreatePost";

export const NuevoPost = () => {
  const [postContent, setPostContent] = useState("");
  const textFieldRef = useRef(null);
  
  const {handleCreatePost}= useCreatePost();

  const handlepostContentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPostContent(target.value);
  };

  const handlepostSubmit = () => {
    if (postContent === "") {
      if (textFieldRef.current) {
        (textFieldRef.current as HTMLTextAreaElement).focus();
      }
    } else {
      handleCreatePost(1,1,postContent);
      setPostContent("");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '20px'}}>
      <Card sx={{ width: 600, maxWidth: '100%' }}> {}
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
