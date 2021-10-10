import React, { useState } from 'react';
import {createOrg} from '../../api/Manage';
import {
    Button,
    TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';

export default function CreateOrg(props) {
	
	const update = props.update;
	const [open, setOpen] = useState(false);
	const [available, setAvailable] = useState(false);
	const [firstTry, setFirstTry] = useState(true);
  	const [organization, setorganization] = useState("");

  	const handleClickOpen = () => {
    	setFirstTry(true);
		setOpen(true);
  	};

  	const handleClickClose = () => {
		setorganization("");
		setAvailable(false);
		setOpen(false);
  	};
	
	const handleOnChange = (e) => {
		if (e.target.id === "organization") {
			setorganization(e.target.value);
			setFirstTry(true);
		}
    };

	const handleCreate = () =>{
		if (organization !== "") {
			createOrg(organization).then(res => {
			if (res.ok) {
				update();
				alert("Successfully created");
				setAvailable(true);
				handleClickClose();
            } else {
				setAvailable(false);
				setFirstTry(false);
                res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
			})
		} else {
			alert("Typing box cannot be empty");
		}
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Create a new organization
			</Button>
			<Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Creating</DialogTitle>
				<DialogContent>
				<DialogContentText>
					Type the name of the orgnaisation.
				</DialogContentText>
				<TextField
					autoFocus
					fullWidth
					margin="dense"
					id="organization"
					type="organization"
					label="organization"
					onChange={handleOnChange}
					error={!available && !firstTry ? true : false}
					helperText={available || firstTry ? "Let's start" : "The organization name is invalid"}
				/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClickClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleCreate} color="primary"> 
					Create 
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}