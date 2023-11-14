import { Button, Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [q, setQ] = useState("");
  const textFieldRef = useRef(null);
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathParts = location.pathname.split('/');
  // Assuming 'instance1' is at the second segment of the URL ('/')
  const urlSearchbar = pathParts[2]; // This gets 'instance1' from the URL
console.log("urlsearchbar: ",urlSearchbar);

  const handlepostContentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPostContent(target.value);
    setQ(target.value);
  };

  const handlepostSubmit = () => {
    if(urlSearchbar=="searchResults"){
      location.state = postContent
      console.log("este es el estado ",location.state);
      return;
    }
    navigate(`searchResults`, { state: q })
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start',marginTop:"20px", marginBottom: '20px'}}>
      <Card sx={{ width: 500, maxWidth: '100%' }}> {}
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            placeholder="Buscar"
            multiline
            rows={4}
            fullWidth
            value={q}
            onChange={handlepostContentChange}
            variant="outlined"
            inputRef={textFieldRef}
          />
          <Grid container justifyContent="flex-end" sx={{ marginTop: '10px' }}>
            <Grid item>
              <Button variant="contained" onClick={handlepostSubmit}>
                Buscar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
