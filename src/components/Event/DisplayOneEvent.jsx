import { Fragment, useState, useEffect } from "react";
import AlertDialog from "../Dialog/AlertDialog";
import { getEventInfo, updateEvent, deleteEventContact, addEventContact } from "../../api/Event";
import { toLocalTime } from "../../api/Util";
import { searchAllCustomers } from "../../api/Contact";
import { processPhoto } from '../../api/Photo';
import Mail from '@material-ui/icons/MailOutline';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useSnackbar } from 'notistack';
import {
	Box, 
    Button,
	IconButton,
    Dialog,
	Grid,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    ToggleButtonGroup,
    ToggleButton,
	MenuItem,
	FormControl,
	Select,
	Typography,
	Avatar,
	Link
} from '@mui/material'

export default function DisplayOneEvent(props) {

	const { enqueueSnackbar } = useSnackbar();
	const { eventId, handleClose, handleYearMonthChange, yearMonth } = props;
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
		  	fontFamily:'NTR',
		  	fontWeight:'bold',
		  	bgcolor:'#35baf6',
		  	borderRadius:100
	  	},
		subTitle: {
			fontSize:25,
		  	fontFamily:'NTR',
		  	fontWeight:'bold'
	  	},
		grid: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		}
	};

	//================ Discard Alart Popup ==================
	const [discardAlertOpen, setDiscardAlertOpen] = useState(false);
	const discardAlertTitle = 'Discard Confirm';
	const discardAlertMessage = "Do you really want to leave?";
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
				enqueueSnackbar("Successfully added!",{variant:'success'});
				setAddContactOpen(false);
				update();
			} else {
				enqueueSnackbar(res.msg,{variant: 'error'});
			}
		})
	}

	// Check whether the detail has been changed
	const checkChange = () => {
		
		let body = {};

		if (startTime !== data.start_time) {
			body["start_time"] = startTime;
		}

		if (finishTime !== data.finish_time) {
			body["finish_time"] = finishTime;
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
					enqueueSnackbar(res.msg,{variant: 'error'});
				}
			})
		}
    };

	const handleOnSelect = (e, id) => {
		if (id === "status") {
			setStatus(e.target.value);
		}
	}

	const handleBack = () => {
		handleClose();
	}

	const handleEdit = () => {
		setPageStatus("edit");
	}

	const confirmDiscard = () => {
		setPageStatus("view");
	}

	// Check if a time update is valid - finish should be later than start
	const checkValidTime = (start, finish) => {
		let eventStart = new Date(data.start_time);
		let eventFinish = new Date(data.finish_time);

		if (start !== undefined) {
			eventStart = new Date(start);
		}

		if (finish !== undefined) {
			eventFinish = new Date(finish);
		}
		
		if (eventFinish.getTime() < eventStart.getTime()) {
			enqueueSnackbar("Finish time cannot be earlier than start time.",{variant: 'warning'});
			return false;
		}
		return true;
	}

	// Update event
	const confirmUpdate = () => {
		const body = checkChange();
		if (checkValidTime(body["start_time"], body["finish_time"])){
			
			if (Object.keys(body).length !== 0) { 
				body["id"] = eventId;
				updateEvent(body).then(res => {
					if (res.code===200) {
						enqueueSnackbar("Successfully updated!",{variant:'success'});
						if (body["start_time"] !== undefined) {
							let month = new Date(startTime).getMonth()+1;
							let year = new Date(startTime).getFullYear();
							if ((year+month) === yearMonth) {
								handleYearMonthChange(startTime);
							}
						}
						
						setPageStatus("view");
					} else {
						enqueueSnackbar(res.msg,{variant: 'error'});
					}
				})
			} else {
				enqueueSnackbar("Nothing has beem changed!",{variant:'warning'});
			}
		}
	}

	// Remove a contact from this event
	const confirmDelete = () => {
		deleteEventContact(selectedAttend).then(res => {
			if (res.code===200) {
				enqueueSnackbar("Successfully deleted!",{variant:'success'});
				update();
			} else {
				enqueueSnackbar(res.msg,{variant: 'error'});
			}
		})
	}

	//conbine of all email
	const allEmail = () => {
		let allEmailUrl = "";
		attendents.forEach(function (contact) {
			if(contact !== undefined && contact.email != null){
				allEmailUrl = allEmailUrl + contact.email + ',';
			}
		});
		if(allEmailUrl.length !== 0){
			allEmailUrl = allEmailUrl.substring(0, allEmailUrl.length - 1);
			return (
			<Link color="inherit" href = {`mailto:${allEmailUrl}`}>
				<IconButton>
					<Mail />
				</IconButton>
			</Link>);
		}
		else{
			return ;
		}
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
				enqueueSnackbar(res.msg,{variant: 'error'});
			}
		})
	}, [eventId, pageStatus, updateCount])

	let display; 
	if (pageStatus === "view") {
		display =
		<Grid container textAlign='center' rowSpacing={3} sx={{py:"3%", px:"3%", minWidth:"100%"}}>
			<Grid item xs={12} >
				<Typography sx={classes.title}>Event Information</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography sx={classes.subTitle}>Progress</Typography> 
				<Box>{data.status}</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography sx={classes.subTitle}>Start Time</Typography> 
				<Box>{toLocalTime(data.start_time)}</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography sx={classes.subTitle}>Finish Time</Typography> 
				<Box>{toLocalTime(data.finish_time)}</Box>
			</Grid>
			<Grid item xs={12} textAlign='center'>
				<Typography sx={classes.subTitle}>Description</Typography> 
				<Box>{data.description}</Box>
			</Grid>
			<Grid item xs={12} textAlign='center'>
				<Typography sx={classes.subTitle}>Invited Contacts</Typography> 
			</Grid>
			<Grid container item xs={12} rowSpacing={3} textAlign='center' sx={{alignItems:'center', justifyContent:'center'}}>
				<Grid item xs={1}>
				</Grid>
				<Grid item xs={3} sx={{fontWeight:"bold"}} textAlign='center'>
					Name
				</Grid>
				<Grid item xs={2} sx={{fontWeight:"bold"}} textAlign='center'>
					Phone
				</Grid>
				<Grid item xs={5} sx={{fontWeight:"bold"}} textAlign='center'>
					Email	
				</Grid>
				<Grid item xs={1}>
					{allEmail()}
				</Grid>
				<Grid container item xs={12}>
					{typeof attendents !== 'undefined' && attendents.length > 0 ?
						attendents.map((e) => {						
							return (
							<Grid container item xs={12} key={e.attend_id} value={e} sx={{alignItems:'center', justifyContent:'center'}}>
								<Grid itme xs={1}>
									<Avatar src={processPhoto(e.photo)} sx={{align: 'right'}}>
									</Avatar>
								</Grid>
								<Grid item xs={3} textAlign='center'>
									{e.first_name} {e.last_name}
								</Grid>
								<Grid item xs={2} textAlign='center'>
									{e.phone}
								</Grid>
								<Grid item xs={5} textAlign='center' sx={{overflowWrap:"break-word"}}>
									{e.email}
								</Grid>
								<Grid item xs={1}>
									<Link color="inherit" href = {`mailto:${e.email}`}>
										<IconButton>
											<Mail />
										</IconButton>
									</Link>
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>~There is no participant~</Grid>
					}
				</Grid>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<ArrowBackSharpIcon color="error" fontSize="large" onClick={handleBack}/>
				</IconButton>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<EditSharpIcon color="primary" fontSize="large" onClick={handleEdit}/>
				</IconButton>
			</Grid>
		</Grid> 
	} else if (pageStatus==="edit") {
		display =
		<Grid container textAlign='center' rowSpacing={3} sx={{py:"3%", px:"3%", minWidth:"100%"}}>
			<Grid item xs={12} >
				<Typography sx={classes.title}>Edit Event</Typography>
			</Grid>
			<Grid item xs={12} sx={{display:"flex", flexDirection:"column"}}>
				<Grid>
					<Typography sx={classes.subTitle}>Progress</Typography> 
					<FormControl fullWidth>
						<Select
							id="progress"
							value={status}
							onChange={(event) => handleOnSelect(event,"status")}
						>
							<MenuItem value={"upcoming"}>upcoming</MenuItem>
							<MenuItem value={"in progress"}>in progress</MenuItem>
							<MenuItem value={"done"}>done</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid item xs={12} sx={{display:"flex", flexDirection:"column"}}>
				<Typography sx={classes.subTitle}>Start Time</Typography> 
				<LocalizationProvider dateAdapter={AdapterDateFns} >
					<DesktopDateTimePicker
						renderInput={(params) => <TextField {...params} />}
						id="startTime"
						value={startTime}
						onChange={setStartTime}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12} sx={{display:"flex", flexDirection:"column"}}>
				<Typography sx={classes.subTitle}>Finish Time</Typography> 
				<LocalizationProvider dateAdapter={AdapterDateFns} >
					<DesktopDateTimePicker
						id="finishTime"
						value={finishTime}
						onChange={setFinishTime}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}} >
				<Typography sx={classes.subTitle}>Description</Typography>
				<TextField id="description" defaultValue= {data.description} multiline rows={5} onChange={handleOnChange}/>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<ArrowBackSharpIcon color="error" fontSize="large" onClick={handleDiscard}/>
				</IconButton>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<UpdateSharpIcon color="primary" fontSize="large" onClick={handleUpdate}/>
				</IconButton>
			</Grid>
			<Grid item xs={12} textAlign='center'>
				<Typography sx={classes.subTitle}> Invited Contacts </Typography>
			</Grid>
			<Grid container item xs={12} rowSpacing={1} textAlign='center'>
				<Grid itme xs={1}>
				</Grid>
				<Grid item xs={3} sx={{fontWeight:"bold"}} textAlign='center'>
					Name
				</Grid>
				<Grid item xs={2} sx={{fontWeight:"bold"}} textAlign='center'>
					Phone
				</Grid>
				<Grid item xs={5} sx={{fontWeight:"bold"}} textAlign='center'>
					Email
				</Grid>
				<Grid container columnSpacing={2} item xs={12} rowSpacing={1} >
					{typeof data.contact_list !== 'undefined' && data.contact_list.length > 0 ?
						data.contact_list.map((e) => {						
							return (
							<Grid container item xs={12} key={e.attend_id} value={e} sx={{alignItems:'center', justifyContent:'center'}}>
								<Grid itme xs={1}>
									<Avatar src={processPhoto(e.photo)} sx={{align: 'right'}}/>
								</Grid>
								<Grid item xs={3} textAlign='center'>
									{e.first_name} {e.last_name}
								</Grid>
								<Grid item xs={2} textAlign='center'>
									{e.phone}
								</Grid>
								<Grid item xs={5} textAlign='center' sx={{overflowWrap:"anywhere"}}>
									{e.email}
								</Grid>
								<Grid item xs={1} textAlign='center'>
									<IconButton>
										<DeleteIcon fontSize="medium" onClick={()=>handleDelete(e.attend_id)}/>
									</IconButton>
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12} sx={{pt:5}}>~There is no participant.~</Grid>
					}
					<Grid item xs={12} textAlign='center' sx={{my:5}}>
						<Button size="medium" variant="contained" onClick={handleAddContact}>Add contact</Button>
					</Grid>
				</Grid>
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
			handleCancel={() => { setDeleteAlertOpen(false) }}
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