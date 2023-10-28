// profileCard.tsx
import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

interface ProfileCardProps {
  username: string;
  imageUrl: string; // URL de la imagen de perfil
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Typography variant="h6" style={{ flex: 1 }}>
        @{username}
      </Typography>
      <Button aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); alert('Editar perfil'); }}>Editar perfil</MenuItem>
        <MenuItem onClick={() => { handleClose(); alert('Editar perfil'); }}>Cerrar sesion</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileCard;
