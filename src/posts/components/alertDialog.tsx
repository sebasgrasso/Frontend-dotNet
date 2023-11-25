import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning'; // Import the warning icon

function AlertDialog({ open, handleClose, title, message }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ // Apply custom styles to the dialog
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        padding: '16px',
                        borderRadius: '8px', // Rounded corners
                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)', // Custom shadow
                    },
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ color: 'orange', marginRight: '8px' }} /> {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" sx={{color: 'white'}}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;
