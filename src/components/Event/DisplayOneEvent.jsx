import React, { Fragment, useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getEventInfo, updateEvent, deleteEventContact } from "../../api/Event";
import AlertDialog from "../Dialog/AlertDialog";

export default function DisplayOneEvent(props) {
	const { eventId, handleClose } = props;
	const [pageStatus, setPageStatus] = useState("view");	
	const [status, setStatus] = useState("");
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState("");
	const [contacts, setContacts] = useState([]);
	const [data, setData] = useState({});
	const [selectAttend, setSelectAttend] = useState(0);

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

	//Alart Dialog Discard
	const [discardAlertOpen, setDiscardAlertOpen] = useState(false);
	const discardAlertTitle = 'Discard Confirm';
	const discardAlertMessage = "Do you want to leave without saving?";
	const handleDiscard = function() {
		setDiscardAlertOpen(true);
	}
	const handleDiscardAlertConfirm = function() {
		confirmDiscard();
		setDiscardAlertOpen(false);
	}

	//Alart Dialog Update
	const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
	const updateAlertTitle = 'Update Confirm';
	const updateAlertMessage = "Do you want to update?";
	const handleUpdate = function() {
		setUpdateAlertOpen(true);
	}
	const handleUpdateAlertConfirm = function() {
		confirmUpdate();
		setUpdateAlertOpen(false);
	}

	//Alart Dialog Delete Contact
	const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
	const deleteAlertTitle = 'Delete Confirm';
	const deleteAlertMessage = "Do you want to remove this contact from this event?";
	const handleDelete = function(attendId) {
		setDeleteAlertOpen(true);
		setSelectAttend(attendId);
	}
	const handleDeleteAlertConfirm = function() {
		confirmDelete();
		setDeleteAlertOpen(false);
	}

	// Check whether the detail has been changed
	const checkChange = () => {
		
		let body = {};

		if (transformDate(startTime) !== data.start_time) {
			body["start_time"] = transformDate(startTime);
		}

		if (transformDate(finishTime) !== data.finish_time) {
			body["finish_time"] = transformDate(finishTime);
		}

		if (description !== data.description) {
			body["description"] = description;
		}
		
		if (status !== data.status) {
			body["status"] = status;
		}

		if (contacts !== data.contact_list) {
			body["contact_list"] = contacts;
		}

		return body;
	}

	// Get event information
	useEffect(() => {
		getEventInfo(eventId).then(res => {
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
	}, [pageStatus])
	
	const handleOnChange = (e) => {
		if (e.target.id === "description") {
			setDescription(e.target.value);
		} else if (e.target.id === "status") {
			setStatus(e.target.value);
		}
    };

	const handleBack = () => {
		handleClose();
	}

	const handleEdit = () => {
		setPageStatus("edit");
	}

	const confirmDiscard = () => {
		setPageStatus("view");
	}

	// Update event
	const confirmUpdate = () => {
		const body = checkChange();
		if (Object.keys(body).length !== 0) { 
			body["id"] = eventId;
			updateEvent(body).then(res => {
				if (res.code===200) {
					alert("Successfully updated");
					setPageStatus("view");
				} else {
					alert(res.msg);
				}
			})
		} else {
			alert("Nothing has been changed");
		}
	}

	// Remove a contact from this event
	const confirmDelete = () =>{
		deleteEventContact(selectAttend).then(res => {
			if (res.code===200) {
				alert("Successfully Deleted");
			} else {
				alert(res.msg);
			}
		})
	}

	// Formatting the time
	const transformDate = (t) => {
		return (new Date(t).toISOString().substring(0, 16).replace("T", " "));
	}

	let display; 
	if (pageStatus === "view") {
		display =
		<Grid container textAlign='center' rowSpacing={5} sx={{pt:10, px:20}}>
			<Grid item xs={12}>
				<Grid>Progress</Grid>
				<Box>{data.status}</Box>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Box>Start Time</Box>
				<Box>{data.start_time}</Box>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Box>Finish Time</Box>
				<Box>{data.finish_time}</Box>
			</Grid>
			<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
				<Box>Description</Box>
				<Box>{data.description}</Box>
			</Grid>
			<Grid item xs={12} textAlign='center'>Current contact</Grid>
			<Grid container item xs={12} textAlign='center'>
				<Grid item xs={3} textAlign='center'>
					First name
				</Grid>
				<Grid item xs={3} textAlign='center'>
					Last name
				</Grid>
				<Grid item xs={2} textAlign='center'>
					Phone number
				</Grid>
				<Grid item xs={4} textAlign='center'>
					Email
				</Grid>
				<Grid container item xs={12}>
					{typeof contacts !== 'undefined' && contacts.length > 0 ?
						contacts.map((e) => {						
							return (
							<Grid container item xs={12} key={e.attend_id} value={e}>
								<Grid item xs={3} textAlign='center'>
									{e.first_name}
								</Grid>
								<Grid item xs={3} textAlign='center'>
									{e.last_name}
								</Grid>
								<Grid item xs={2} textAlign='center'>
									{e.phone}
								</Grid>
								<Grid item xs={4} textAlign='center'>
									{e.email}
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>There is no participant.</Grid>
					}
				</Grid>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.discardButton} onClick={handleBack}>Back</Button>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.createButton} onClick={handleEdit}>Edit</Button>
			</Grid>
		</Grid> 
	} else if (pageStatus==="edit") {
		display =
		<Grid container textAlign='center' rowSpacing={5} sx={{pt:10, px:20}}>
			<Grid item xs={12} sx={{display:"flex", flexDirection:"column"}}>
				<Grid>Progress: <TextField id="status" defaultValue= {data.status} onChange={handleOnChange}/></Grid>
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
				<Grid item xs={12} textAlign='center'>{data.description}</Grid>
				<TextField id="description" defaultValue= {data.description} multiline rows={5} onChange={handleOnChange}/>
			</Grid>
			<Grid item xs={12} textAlign='center'>Current contact</Grid>
			<Grid container item xs={12} textAlign='center'>
				<Grid item xs={2} textAlign='center'>
					First name
				</Grid>
				<Grid item xs={2} textAlign='center'>
					Last name
				</Grid>
				<Grid item xs={3} textAlign='center'>
					Phone number
				</Grid>
				<Grid item xs={4} textAlign='center'>
					Email
				</Grid>
				<Grid container item xs={12} rowSpacing={5}>
					{typeof contacts !== 'undefined' && contacts.length > 0 ?
						contacts.map((e) => {						
							return (
							<Grid container item xs={12} key={e.attend_id} value={e} sx={{pt:5}}>
								<Grid item xs={2} textAlign='center'>
									{e.first_name}
								</Grid>
								<Grid item xs={2} textAlign='center'>
									{e.last_name}
								</Grid>
								<Grid item xs={3} textAlign='center'>
									{e.phone}
								</Grid>
								<Grid item xs={4} textAlign='center'>
									{e.email}
								</Grid>
								<Grid item xs={1} textAlign='center'>
									<Button style={classes.discardButton} onClick={()=>handleDelete(e.attend_id)}>
										Delete
									</Button>
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>There is no participant.</Grid>
					}
				</Grid>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.discardButton} onClick={handleDiscard}>Discard</Button>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.createButton} onClick={handleUpdate}>Update</Button>
			</Grid>
			<AlertDialog 
			alertTitle={discardAlertTitle}
			alertMessage={discardAlertMessage}
			open={discardAlertOpen}
			handleClose={() => { setDiscardAlertOpen(false) }}
			handleConfirm={handleDiscardAlertConfirm}
			handleCancel={() => { setDiscardAlertOpen(false) }}
			/>
			<AlertDialog 
			alertTitle={updateAlertTitle}
			alertMessage={updateAlertMessage}
			open={updateAlertOpen}
			handleClose={() => { setUpdateAlertOpen(false) }}
			handleConfirm={handleUpdateAlertConfirm}
			handleCancel={() => { setUpdateAlertOpen(false) }}
			/>
			<AlertDialog 
			alertTitle={deleteAlertTitle}
			alertMessage={deleteAlertMessage}
			open={deleteAlertOpen}
			handleClose={() => { setDeleteAlertOpen(false) }}
			handleConfirm={handleDeleteAlertConfirm}
			/>
		</Grid> 
	}

	return (
		<Fragment>
			{display}
		</Fragment>
	)
}