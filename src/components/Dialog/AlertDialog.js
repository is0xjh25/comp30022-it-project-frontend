import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    const {alertTitle, alertMessage, handleClose, handleConfirm, handleCancel, open} = props

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

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
