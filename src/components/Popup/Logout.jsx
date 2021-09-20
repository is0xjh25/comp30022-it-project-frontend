import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { handleLogout } from '../../api/Login';
import { useHistory } from 'react-router';

export default function Logout() {
	
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const handleClickOpen = () => {
	  	setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};
	
	// Logout
  	const handleConfirm = () => {
		handleLogout().then(res => {
			if (res.ok) {
				alert("Successfully logout");
				document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				history.push("./login");
			} else {
				console.log("!!!");
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})	
	}

	return (
		<div>
		<Button variant="outlined" color="primary" onClick={handleClickOpen}>
			Logout
		</Button>
		<Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">See you next time</DialogTitle>
			<DialogContent>
			<DialogContentText>
				Do you really want to leave?
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={handleClickClose} color="primary">
				Cancel
			</Button>
			<Button onClick={handleConfirm} color="primary">
				Confirm
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
}