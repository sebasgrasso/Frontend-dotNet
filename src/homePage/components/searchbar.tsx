import { IconButton, InputBase, Paper } from "@mui/material";
import { SyntheticEvent, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


export const SearchBar = () => {
  const [q, setQ] = useState("");
  const textFieldRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathParts = location.pathname.split('/');
  // Assuming 'instance1' is at the second segment of the URL ('/')
  const urlSearchbar = pathParts[2]; // This gets 'instance1' from the URL
  const urlInstancia = pathParts[1]; // This gets 'instance1' from the URL

  const handlepostContentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setQ(target.value);
  };

  const handlepostSubmit = ()=>{
      if(urlSearchbar!="searchResults"){
        navigate(`searchResults`, {state: q})}
      else{
        navigate(`/${urlInstancia}/searchResults`, {state:q})
        }
  }

  return (
    <Paper
      component="form"
      onSubmit={handlepostSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: 2,
        marginBottom: 3,
        borderRadius: 20,
      }}
    >
      <IconButton type="submit" sx={{ p: '10px', color: 'black' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'black' }} 
        placeholder="Buscar"
        inputProps={{ 'aria-label': 'buscar' }}
        value={q}
        onChange={handlepostContentChange}
        inputRef={textFieldRef}
      />
    </Paper>
  );
};
