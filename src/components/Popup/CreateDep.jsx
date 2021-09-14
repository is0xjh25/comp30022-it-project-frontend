import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateDep() {
	
	const [open, setOpen] = useState(false);
	const [available, setAvailable] = useState(false);
	const [firstTry, setFirstTry] = useState(true);
  	const [department, setDepartment] = useState("");

	let history = useHistory();

  	const handleClickOpen = () => {
    	setFirstTry(true);
		setOpen(true);
  	};

  	const handleClickClose = () => {
		setDepartment("");
		setAvailable(false);
		setOpen(false);
  	};
	
	const handleOnChange = (e) => {
		if (e.target.id === "department") {
			setDepartment(e.target.value);
		}
    };

	const handleCreate = () =>{
		handleClickClose();
		history.push('/org');
	}

  	const handleSearch = () => {
		setFirstTry(false);
		if (department === "") {
			alert("Searching box cannot be empty") 
			setAvailable(false);
		} else {
			if (department === "yyds") {
				setAvailable(false);
			} else {
				setAvailable(true);
			}
		}
	}

	let button;
	if (!available) {
		button = <Button onClick={handleSearch} color="primary"> Create </Button>
	} else {
		button = <Button onClick={handleCreate}  color="primary"> Confirm </Button>
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Create a new department
			</Button>
			<Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Creating</DialogTitle>
				<DialogContent>
				<DialogContentText>
					Type the name of the department.
				</DialogContentText>
				<TextField
					autoFocus
					fullWidth
					margin="dense"
					id="department"
					type="department"
					label="Department"
					onChange={handleOnChange}
					error={!available && !firstTry ? true : false}
					helperText={available || firstTry ? "Let's start" : "The department name is invalid"}
				/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClickClose} color="primary">
					Cancel
				</Button>
				{button}
				</DialogActions>
			</Dialog>
		</div>
	);
}