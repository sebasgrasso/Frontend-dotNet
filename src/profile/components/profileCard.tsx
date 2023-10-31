// profileCard.tsx
import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography,  Dialog, DialogActions, DialogContent, DialogTitle, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useAuth } from '../../auth/hooks/useAuth';
import Profile from './profile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';




interface ProfileCardProps {
  username: string;
  nickname: string;
  imageUrl: string; // URL de la imagen de perfil
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, nickname, imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleLogout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openProfile, setOpenProfile] = useState(false);

  const handleProfileOpen = () => {
      setOpenProfile(true);
  };

  const handleProfileClose = () => {
      setOpenProfile(false);
  };

  const handleMenuClick = () => {
    handleProfileOpen();
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #e1e4e8',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <Avatar src={imageUrl} alt={username} style={{ marginRight: '10px' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" >
          {nickname}
        </Typography>
        <Typography variant="h6">
          @{username}
        </Typography>
      </div>
      <Button aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); handleMenuClick() }}>
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); handleLogout()}}>
          <ListItemIcon>
              <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesion" />
      </MenuItem>
      </Menu>
      <Dialog open={openProfile} onClose={handleProfileClose}>
          <DialogTitle>Mi Perfil</DialogTitle>
          <DialogContent>
              <Profile />
          </DialogContent>
          <DialogActions>
              <Button onClick={handleProfileClose} color="primary">
                  Cerrar
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileCard;
