// profileCard.tsx
import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IconBlockquote, IconRepeat } from '@tabler/icons-react';
import { PostDTO } from '../../interfaces/interfaces';
import { useCreatePost } from '../hooks/useCreatePost';
import CitarPost from './citarPost';



const RepostButton= ({post}:{post:PostDTO}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {handleCreatePost}= useCreatePost();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openRepost, setOpenRepost] = useState(false);

  const handleRepostOpen = () => {
      setOpenRepost(true);
  };

  const handleRepostClose = () => {
      setOpenRepost(false);
  };

  

  const handleRepost = () => {
    handleCreatePost({contenido:null,postIdCita:post.id,postIdPadre:null})
  }

  return (
    <>
    <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleClick}>
        <IconRepeat />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); handleRepostOpen() }}>
            <ListItemIcon>
                <IconBlockquote />
            </ListItemIcon>
            <ListItemText primary="Citar" />
        </MenuItem>
        <MenuItem onClick={(e) => {handleClose(); e.stopPropagation(); handleRepost();}}>  
          <ListItemIcon>
            <IconRepeat /> 
          </ListItemIcon>
          <ListItemText primary="Repostear" />
        </MenuItem>
        </Menu>
        <Dialog open={openRepost} onClose={handleRepostClose}>
            <DialogTitle>Citar Post</DialogTitle>
            <DialogContent>
                <CitarPost post={post} />
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    </>
      
  );
}

export default RepostButton;
