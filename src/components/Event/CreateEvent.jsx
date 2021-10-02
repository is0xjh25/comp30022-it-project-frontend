import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createEvent } from "../../api/Event";

export default function CreateEvent() {

	const classes = {
		title: {
		  	fontSize:30,
			fontFamily:'Arial',
			fontWeight:'bold',
			bgcolor:'coral',
			borderRadius:15
		},
		grid: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		},
		box: {
			display:'flex', 
			flexDirection:'column'
		},
		discardButton: {
			borderRadius: 20,
			backgroundColor: 'Crimson',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		},
		createButton: {
			borderRadius: 20,
			backgroundColor: 'ForestGreen',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		}
	};
	
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState(""); 
	
	const handleOnChange = (e) => {
		if (e.target.id === "description") {
			setDescription(e.target.value);
		}
    };

	const handleCreate = () => {
		
		const transformStartTime = startTime.toISOString().replace("T", " ").substring(0,16);
		const transformFinishTime = finishTime.toISOString().replace("T", " ").substring(0,16);

		createEvent(transformStartTime, transformFinishTime, description).then(res => {
			if (res.ok) {
				alert("Create event successfully");	
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		});
	}

	const handleDiscard = () => {

	}

	return (
		<Grid container textAlign='center' rowSpacing={10} sx={{pt:10, px:20}}>
			<Grid item xs={12}>
				<Box>Create a new event</Box>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Box>Start Time</Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DateTimePicker
					id="startTime"
					value={startTime}
					onChange={setStartTime}
					renderInput={(params) => <TextField {...params} />}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Box>Finish Time</Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DateTimePicker
					id="finishTime"
					value={finishTime}
					onChange={setFinishTime}
					renderInput={(params) => <TextField {...params} />}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
				<Box >Description</Box>
				<TextField id="description" multiline rows={10} onChange={handleOnChange}/>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.discardButton} onClick={handleDiscard}>Discard</Button>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.createButton} onClick={handleCreate}>Create</Button>
			</Grid>
		</Grid>
	)
}