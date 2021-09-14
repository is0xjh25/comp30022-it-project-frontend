import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function JoinDep() {
	
	const [open, setOpen] = useState(false);
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
            setResults(null);
        }
    })
	
	let history = useHistory();

	const handleClickOpen = () => {
	  setOpen(true);
	};

	const handleClickClose = () => {
	  setSelected("");
	  setOpen(false);
	};
	
	const handleSelected = (event, e) => {
		setSelected(e);
	}

	const handleJoin = () =>{
		handleClickClose();
	}

	let display;
	let join;
	if (results !== null) {
		join = <div>Join</div>;
		display = <ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleSelected}>
				{results.map((dep) => (
					<ToggleButton value={dep.name} aria-label={dep.name}>
						{dep.name}
					</ToggleButton>
				))}			
	  			</ToggleButtonGroup>;
	} else {
		console.log("!!!");
		join = "Back";
		display = <div style = {{color:"red"}}>There is no department in this organisation</div>;
	}

	return (
		<div>
		<Button variant="outlined" color="primary" onClick={handleClickOpen}>
			Join an existing Department
		</Button>
		<Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Finding</DialogTitle>
			<DialogContent>
			<DialogContentText>
				Select a Department.
			</DialogContentText>
			{display}
			</DialogContent>
			<DialogActions>
			<Button onClick={handleClickClose} color="primary">
				Cancel
			</Button>
			<Button onClick={handleJoin}  color="primary">
				{join}
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
}