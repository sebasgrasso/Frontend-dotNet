import React, { useState } from 'react';
import { Avatar, Typography, Tooltip, IconButton, Paper, Box,Dialog, DialogContent, List, ListItem, ListItemText  } from '@mui/material';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGetNotificationsQuery } from '../../store/apis/microbApis';
import CheckIcon from '@mui/icons-material/Check';
import { useViewedNotification } from '../hooks/useViewedNotification';

interface ProfileCardProps {
  username: string;
  nickname: string;
  imageUrl: string; 
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, nickname, imageUrl }) => {
  const navigate = useNavigate();
  const idUser = useAppSelector((state) => state.auth.id);
  const { handleLogout } = useAuth();

  const { data: notifications, refetch } = useGetNotificationsQuery(undefined, {
    pollingInterval: 30000, 
  });

  const unseenNotifications = notifications?.filter(notification => !notification.visto).length || 0;
  const {handleViewedNotification} = useViewedNotification();


  const handleMenuClick = () => {
    if (!idUser) return;
    const idEncoded = btoa(idUser);
    navigate(`perfil/${idEncoded}`);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleNotificationClick = (notificationId) => {
    handleViewedNotification(notificationId);
  };

  const [openNotifications, setOpenNotifications] = useState(false);


  const renderNotificationsList = () => {
    const noVistos = notifications?.filter(notification => !notification.visto);

    if (noVistos && noVistos.length > 0) {
      return noVistos.map(notification => (
        <ListItem key={notification.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ListItemText 
            primary={notification.mensaje}
            secondary={new Date(notification.fechaHora).toLocaleString()}
          />
          {!notification.visto && (
            <Tooltip title="Marcar como leído">
              <IconButton 
                onClick={() => handleNotificationClick(notification.id)} 
                sx={{
                  backgroundColor: "primary.main", 
                  color: "white",
                  textTransform: 'none', 
                  borderRadius: '4px', 
                  width: '30px',
                  height: '30px',
                  marginLeft: '20px',
                  boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                  transition: 'background-color .3s, color .3s, box-shadow .3s',
                  ":hover": {
                    backgroundColor: "white", 
                    color: "primary.main",

                  }
                }}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>
      ));
    } else {
      return (
        <ListItem>
          <ListItemText 
            primary="No hay notificaciones nuevas." 
            primaryTypographyProps={{ textAlign: 'center', fontStyle: 'italic' }}
          />
        </ListItem>
      );
    }
  };

  return (
    <>
    <style>
        {`
          @keyframes badgeAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            animation: badgeAnimation 1.5s infinite;
          }
        `}
      </style>
      <Dialog open={openNotifications} onClose={handleNotificationsClose}>
        <DialogContent>
          <List>
          {renderNotificationsList()}
          </List>
        </DialogContent>
      </Dialog>
    <Paper sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      bgcolor: 'background.paper',
    }}>
      <Avatar src={imageUrl} alt={username} sx={{ width: 60, height: 60 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
        {nickname}
      </Typography>
      <Typography color="textSecondary" gutterBottom>@{username}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <Tooltip title="Perfil">
          <IconButton onClick={handleMenuClick} sx={{
            backgroundColor: "primary.main", 
            color: "white",
            textTransform: 'none', 
            borderRadius: '4px', 
            boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
            transition: 'background-color .3s, color .3s, box-shadow .3s',
            ":hover": {
              color:"primary.main",
              backgroundColor: "white", 
              borderColor: "#1565c0",
              boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
            }
          }}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notificaciones">
          <IconButton onClick={handleNotificationsOpen} sx={{
            backgroundColor: "primary.main", 
            color: "white",
            textTransform: 'none', 
            borderRadius: '4px', 
            marginLeft: '8px',
            boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
            transition: 'background-color .3s, color .3s, box-shadow .3s',
            ":hover": {
              color:"primary.main",
              backgroundColor: "white", 
              borderColor: "#1565c0",
              boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
            }
          }}>
            <NotificationsIcon />
          {unseenNotifications > 0 && <div className="notification-badge">{unseenNotifications}</div>} 
          </IconButton>
        </Tooltip>
        <Tooltip title="Cerrar sesión">
          <IconButton onClick={handleLogout} sx={{
            backgroundColor: "primary.main", 
            color: "white",
            textTransform: 'none', 
            borderRadius: '4px', 
            marginLeft: '8px',
            boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
            transition: 'background-color .3s, color .3s, box-shadow .3s',
            ":hover": {
              color:"primary.main",
              backgroundColor: "white", 
              borderColor: "#1565c0",
              boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
            }
          }}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
    </>
  );
}

export default ProfileCard;
