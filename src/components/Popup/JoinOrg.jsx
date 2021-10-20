import React, { useState} from 'react';
import {searchOrg, joinOrg} from '../../api/Manage';
import { useSnackbar } from 'notistack';
import {
	Button,
	TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';


export default function JoinOrg(props) {
	
	const { enqueueSnackbar } = useSnackbar();
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
			searchOrg(organization).then(res => {
			if (res.code===200) {
				setResults(res.data);
				if (res.data.length !== 0) {
					setAvailable(true);
				} else {
					setAvailable(false);
					setFirstTry(false);
				}
            } else {
                enqueueSnackbar(res.msg,{variant: 'error'});
			}
		})	
		} else {
			enqueueSnackbar("Typing box cannot be empty",{variant: 'warning'}); 
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
			enqueueSnackbar("please select an organization!",{variant: 'warning'});
		} else {
			joinOrg(selected).then(res => {
				if (res.code===200) {
					update();
					enqueueSnackbar("Successfully join",{variant: 'success'});
				} else {
					enqueueSnackbar(res.msg,{variant: 'error'});
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