// profileCard.tsx
import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, Button, Tooltip } from '@mui/material';
import { IconBlockquote, IconRepeat } from '@tabler/icons-react';
import { PostDTO } from '../../interfaces/interfaces';
import { useCreatePost } from '../hooks/useCreatePost';
import CitarPost from './citarPost';
import { useAppSelector } from '../../hooks/hooks';



const RepostButton= ({post}:{post:PostDTO}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {handleCreatePost}= useCreatePost();
  const {status} = useAppSelector((state)=>state.auth)
  

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(status=="authenticated"){
      setAnchorEl(event.currentTarget);
    }
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
    console.log("entre al handle repost");
    
    if(status=="authenticated"){
      console.log("post.id",post.id);
      
      handleCreatePost({contenido:null,postIdCita:post.id,postIdPadre:null})
    }
  }

  return (
    <>
      <Tooltip title="Repost">
        <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleClick}>
          <IconRepeat />
        </Button>
      </Tooltip>
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
        </Dialog>
    </>
      
  );
}

export default RepostButton;
