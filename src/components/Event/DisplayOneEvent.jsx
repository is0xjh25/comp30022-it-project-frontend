import React, { Fragment, useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getEventInfo, updateEvent } from "../../api/Event";

export default function DisplayOneEvent(eventId) {

	const [pageStatus, setPageStatus] = useState("view");	
	const [status, setStatus] = useState("");
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState("");
	const [contacts, setContacts] = useState([]);
	const [data, setData] = useState();

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
	
	// Get event information
	useEffect(() => {
		getEventInfo(22).then(res => {
			if (res.code===200) {
				setData(res.data);
				setStartTime(res.data.start_time);
				setFinishTime(res.data.finish_time);
				setContacts(res.data.contact_list);
				setDescription(res.data.description);
				setStatus(res.data.status);
			} else {
				alert(res.msg);
			}
		})
	}, [])
	
	const handleOnChange = (e) => {
		if (e.target.id === "description") {
			setDescription(e.target.value);
		}
    };

	const handleBack = () => {
	}
	const handleEdit = () => {
	}
	const confirmDiscard = () => {
	}
	const confirmUpdate = () => {
	}

	let display; 
	if (pageStatus === "view") {
		display =
		<Grid container textAlign='center' rowSpacing={10} sx={{pt:10, px:20}}>
			<Grid item xs={12}>
				<Grid>Progress: {status}</Grid>
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
			<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
				<Box>Current contact</Box>
				<Grid>
					{typeof contacts !== 'undefined' && contacts.length > 0 ?
						contacts.map((e) => {						
							return (
							<Grid container item xs={12} key={e.id} value={e} arial-label={e.name}>
								<Grid item xs={2} textAlign='center'>
									{e.status}
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>There is no participant.</Grid>
					}
				</Grid>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.discardButton}>Back</Button>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.createButton}>Edit</Button>
			</Grid>
		</Grid> 
	} else if (pageStatus==="edit") {
		<Grid>!!!</Grid>
	}

	return (
		<Fragment>
			{display}
		</Fragment>
	)
}