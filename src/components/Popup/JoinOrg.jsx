import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {handleSearchOrg, handleJoinOrg} from '../../api/Login';

export default function JoinOrg() {
	
	const [open, setOpen] = useState(false);
	const [firstTry, setFirstTry] = useState(true);
	const [available, setAvailable] = useState(false);
  	const [organisation, setOrganisation] = useState("");
	const [selected, setSelected] = useState(0);
	const [results, setResults] = useState([]);

	/*        const data = [
            {
                "name": "University of Melbourne",
                "owner_id": 111,
            },
            {
                "name": "University of Sydeny",
                "owner_id": 222,
            },
            {
                "name": "Peking University",
                "owner_id": 333,
            },
            {
                "name": "University of Tokyo",
                "owner_id": 444,
            }
        ]*/

	const handleClickOpen = () => {
	  setFirstTry(true);
	  setOpen(true);
	};

	const handleClickClose = () => {
	  setOrganisation("");
	  setAvailable(false);
	  setOpen(false);
	};
	
	const handleOnChange = (e) => {
		if (e.target.id === "organisation") {
			setOrganisation(e.target.value);
		}
    };

	const handleSelected = (event, e) => {
		setSelected(e);
	}

  	const handleSearch = () => {
		
		if (organisation !== true) {
			setFirstTry(false);
			handleSearchOrg(organisation).then(res => {
			if (res.ok) {
				let data = JSON.parse(res.json());
				if (data !== null) {
					setResults(data);
					setAvailable(true)
					handleResult();
				} else {
					setAvailable(false);
				}
            } else {
                res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
			})
		} else {
			alert("Typing box cannot be empty") 
		}
	}

	const handleResult = () => {
		return (
			<div>
			<ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleSelected}>
				{results.map((org) => (
					<ToggleButton value={org.id} aria-label={org.name}>
						{org.name}
					</ToggleButton>
				))}			
	  		</ToggleButtonGroup>
			</div>
		);
	}

	const handleJoin = () =>{
		handleJoinOrg(selected).then(res => {
			if (res.ok) {
				alert("Successfully join");
            } else {
                res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})
		handleClickClose();
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
			Join a new Organisation
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
				id="organisation"
				label="Organisation"
				type="organisation"
				fullWidth
				onChange={handleOnChange}
				error={!available && !firstTry ? true : false}
				helperText={!available ? "Ready to join" : "Organisation does not exist"}
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