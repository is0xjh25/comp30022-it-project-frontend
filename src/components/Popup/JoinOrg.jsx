import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {handleSearchOrg, handleJoinOrg} from '../../api/Manage';

export default function JoinOrg(props) {
	
	const update = props.update;
	const [open, setOpen] = useState(false);
	const [firstTry, setFirstTry] = useState(true);
	const [available, setAvailable] = useState(false);
  	const [organization, setorganization] = useState("");
	const [selected, setSelected] = useState(0);
	const [results, setResults] = useState([]);

	const handleClickOpen = () => {
	  	setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	  	setorganization("");
		setSelected(0);
	  	setAvailable(false);
		setFirstTry(true);
	};
	
	const handleOnChange = (e) => {
		if (e.target.id === "organization") {
			setorganization(e.target.value);
			setAvailable(false);
			setFirstTry(true);
		}
    };

	const handleSelected = (event, e) => {
		setSelected(e);
	}

	// Search button
  	const handleSearch = () => {
		if (organization !== "") {
			handleSearchOrg(organization).then(res => {
			if (res.ok) {
				res.json().then(bodyRes=>{
					setResults(bodyRes.data);
					if (bodyRes.data.length !== 0) {
						setAvailable(true);
					} else {
						setAvailable(false);
						setFirstTry(false);
					}
				});
            } else {
                res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})	
		} else {
			alert("Typing box cannot be empty") 
		}
	}

	// Display result
	const handleResult = () => {
		 return (
			<div>
			<ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleSelected}>
				{results.map((org) => (
					<ToggleButton key={org.id} value={org.id} aria-label={org.name}>
						{org.name}
					</ToggleButton>
				))}			
	  		</ToggleButtonGroup>
			</div>
		);
	}

	// Join button
	const handleJoin = () =>{
		if (selected===0) {
			alert("please select an organization!")
		} else {
			handleJoinOrg(selected).then(res => {
				if (res.ok) {
					update();
					alert("Successfully join");
				} else {
					res.json().then(bodyRes=>{alert(bodyRes.msg);});
				}
			})
			handleClickClose();
		}	
	}

	let button;
	let display;
	if (!available) {
		button = <Button onClick={handleSearch} color="primary"> Search </Button>
		display = null;
	} else {
		button = <Button onClick={handleJoin}  color="primary"> Join </Button>
		display = handleResult();
	}

	return (
		<div>
		<Button variant="outlined" color="primary" onClick={handleClickOpen}>
			Join a new organization
		</Button>
		<Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Searching</DialogTitle>
			<DialogContent>
			<DialogContentText>
				Type the name of the orgnaisation.
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="organization"
				label="organization"
				type="organization"
				fullWidth
				onChange={handleOnChange}
				error={!available && !firstTry ? true : false}
				helperText={available || firstTry ? "Ready to join" : "organization does not exist"}
			/>
			{display}
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