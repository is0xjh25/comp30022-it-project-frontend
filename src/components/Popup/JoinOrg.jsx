import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function JoinOrg() {
	
	const [open, setOpen] = useState(false);
	const [firstTry, setFirstTry] = useState(true);
	const [available, setAvailable] = useState(false);
  	const [organisation, setOrganisation] = useState("");
	const [selected, setSelected] = useState("");
	const [results, setResults] = useState([]);

	useEffect(() => {
        const data = [
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
        ]
        return () => {
            // setLoading(false);
            setResults(data);
        }
    }, [available])

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
		
		setFirstTry(false);

		if (organisation === "") {
			alert("Searching box cannot be empty")
			setAvailable(false);
		} else if (organisation === "uni") {
			setAvailable(true);
		} else {
			setAvailable(false);
		}
	}

	const handleResult = () => {

		return (

			<div>
			<ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleSelected}>
				{results.map((org) => (
					<ToggleButton value={org.name} aria-label={org.name}>
						{org.name}
					</ToggleButton>
				))}			
	  		</ToggleButtonGroup>
			</div>
		);
	}

	const handleJoin = () =>{
		handleClickClose();
		setFirstTry(true);
		setAvailable(false);
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