import { Button, Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";

export const NuevoPost = () => {
  const [tweetContent, setTweetContent] = useState("");
  const textFieldRef = useRef(null);

  const handleTweetContentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTweetContent(target.value);
  };

  const handleTweetSubmit = () => {
    if (tweetContent === "") {
      if (textFieldRef.current) {
        (textFieldRef.current as HTMLTextAreaElement).focus();
      }
    } else {
      alert(tweetContent);
      setTweetContent("");
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
            value={tweetContent}
            onChange={handleTweetContentChange}
            variant="outlined"
            inputRef={textFieldRef}
          />
          <Grid container justifyContent="flex-end" sx={{ marginTop: '10px' }}>
            <Grid item>
              <Button variant="contained" onClick={handleTweetSubmit}>
                Publicar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
