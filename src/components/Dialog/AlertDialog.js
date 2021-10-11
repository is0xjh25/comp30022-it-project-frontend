import React from 'react';

// Import from MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'

// A common alert dialog implementation, can customize title, message and so on
export default function AlertDialog(props) {
    const {alertTitle, alertMessage, handleClose, handleConfirm, handleCancel, open} = props

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {alertMessage}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
