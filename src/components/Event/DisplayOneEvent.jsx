import React, { Fragment, useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import AlertDialog from "../Dialog/AlertDialog";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getEventInfo, updateEvent, deleteEventContact, addEventContact } from "../../api/Event";
import { searchAllCustomers } from "../../api/Contact";
import {
	Box, 
    Button,
    Dialog,
	Grid,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material'

export default function DisplayOneEvent(props) {
	
	const { eventId, handleClose } = props;
	const [pageStatus, setPageStatus] = useState("view");	
	const [status, setStatus] = useState("");
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState("");
	const [data, setData] = useState({});
	const [selectedAttend, setSelectedAttend] = useState(0);
	const [attendents, setAttendents] = useState([]);
	const [updateCount, setUpdateCount] = useState(0);
	const update = () => { setTimeout(() => { setUpdateCount(updateCount + 1) }, 1000);}

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

	//================ Discard Alart Popup ==================
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

	//================ Update Alart Popup ==================
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

	//================ Delete Alart Popup ==================
	const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
	const deleteAlertTitle = 'Delete Confirm';
	const deleteAlertMessage = "Do you want to remove this contact from this event?";
	const handleDelete = function(attendId) {
		setDeleteAlertOpen(true);
		setSelectedAttend(attendId);
	}
	const handleDeleteAlertConfirm = function() {
		confirmDelete();
		setDeleteAlertOpen(false);
	}

	//================ Add Contact Popup ==================
	const [addContactOpen, setAddContactOpen] = useState(false);
	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(undefined);
	const handleAddContact = function() {
		setAddContactOpen(true);
	}
	const handleAddContactCancel = function() {
		setAddContactOpen(false);
		setSelectedContact(undefined);
		setContacts([]);
	}
	const handleSelectContact = (event, e) => {
		setSelectedContact(e);
	}
	const confirmAddContact = () => {
		addEventContact(eventId, selectedContact).then(res => {
			if (res.code===200) {
				alert("Successfully added");
				setAddContactOpen(false);
				update();
			} else {
				alert(res.msg);
			}
		})
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

		return body;
	}
	
	const handleOnChange = (e) => {
		if (e.target.id === "description") {
			setDescription(e.target.value);
		} else if (e.target.id === "status") {
			setStatus(e.target.value);
		} else if (e.target.id === "contact") {
			searchAllCustomers(e.target.value).then(res => {
				if (res.code === 200) {
					const data = res.data
					data.forEach(row => {
						row.name = row.first_name + ' ' + row.last_name
					});
					setContacts(data);
					} else {
					alert(res.msg);
				}
			})
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
					update();
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
	const confirmDelete = () => {
		deleteEventContact(selectedAttend).then(res => {
			if (res.code===200) {
				alert("Successfully Deleted");
				update();
			} else {
				alert(res.msg);
			}
		})
	}

	// Formatting the time
	const transformDate = (t) => {
		return (new Date(t).toISOString().substring(0, 16).replace("T", " "));
	}

	//================ Display Event ==================
	useEffect(() => {
		getEventInfo(eventId).then(res => {
			if (res.code===200) {
				setData(res.data);
				setStartTime(res.data.start_time);
				setFinishTime(res.data.finish_time);
				setAttendents(res.data.contact_list);
				setDescription(res.data.description);
				setStatus(res.data.status);
			} else {
				alert(res.msg);
			}
		})
	}, [eventId, pageStatus, updateCount])

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
					{typeof attendents !== 'undefined' && attendents.length > 0 ?
						attendents.map((e) => {						
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
					{typeof data.contact_list !== 'undefined' && data.contact_list.length > 0 ?
						data.contact_list.map((e) => {						
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
			<Grid item xs={4} textAlign='center'>
				<Button variant="outlined" style={classes.discardButton} onClick={handleDiscard}>Discard</Button>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Button variant="outlined" onClick={handleAddContact}>Add contact</Button>
			</Grid>
			<Grid item xs={4} textAlign='center'>
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
			<Dialog open={addContactOpen} onClose={handleAddContactCancel} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add a Contact</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Start typing the name of the contact.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="contact"
						label="search"
						type="contact"
						fullWidth
						onChange={handleOnChange}
					/>
					<ToggleButtonGroup orientation="vertical" value={selectedContact} exclusive onChange={handleSelectContact} sx={{display:"flex", justifyContent: 'center'}}>
						{contacts.map( (contact) => {
							return (<ToggleButton key={contact.id} value={contact.id} aria-label={contact.name}>
								{contact.name}
							</ToggleButton>)
						})}
					</ToggleButtonGroup>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleAddContactCancel} color="primary">
					Cancel
				</Button>
				<Button disabled={selectedContact===undefined} onClick={confirmAddContact}>
					Add
				</Button>
				</DialogActions>
            </Dialog>
		</Grid> 
	}

	return (
		<Fragment>
			{display}
		</Fragment>
	)
}