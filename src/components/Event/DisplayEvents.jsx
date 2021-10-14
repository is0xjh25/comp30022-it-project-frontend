import { Fragment, useState, useEffect } from "react";

// Import from MUI
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import CalendarPicker from '@mui/lab/CalendarPicker';
import {
    Box,
	Badge,
	Dialog,
	Paper,
	Grid,
	IconButton,
	Typography
} from '@mui/material'
import AlertDialog from "../Dialog/AlertDialog";
import CreateEvent from "./CreateEvent";
import DisplayOneEvent from "./DisplayOneEvent";
import { getMultipleEvents, deleteEvent, getMonthlyEvents } from "../../api/Event";
import { toLocalTime } from "../../api/Util";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';


export default function DisplayEvents() {

	const [date, changeDate] = useState(new Date());
	const [yearMonth, setYearMonth] = useState("");
	const [dayEvent, setDayEvent] = useState([]);
	const [monthEvent, setMonthEvent] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(0);
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
		contactText: {
			fontSize:20,
			fontFamily:'Arial',
	  	},
		grid: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		}
	};

	//================ Delete Alart Popup ==================
	const [alertOpen, setAlertOpen] = useState(false);
	const alertTitle = 'Delete Confirm';
	const alertMessage = "Do you want to delete this event";
	const handleDelete = function(e) {
		setAlertOpen(true);
		setSelectedEvent(e);
	}
	const handleAlertConfirm = function() {
		confirmDelete();
		setAlertOpen(false);
	}

	//================ Create Event Popup ==================
	const [createEventOpen, setCreateEventOpen] = useState(false);
	const handleCreateEvent = () => {
		setCreateEventOpen(true);
	}
	const handleCreateClose = () => {
		setCreateEventOpen(false);
	}

	//================ Display a single event in detail ==================
	const [displayEventOpen, setDisplayEventOpen] = useState(false);
	const handleDisplayEvent = (e) => {
		setDisplayEventOpen(true);
		setSelectedEvent(e);
	}
	const handleDisplayClose = () => {
		setDisplayEventOpen(false);
	}

	const confirmDelete = function() {
		deleteEvent(selectedEvent).then(res => {
			if (res.code===200) {
				alert("Successfully deleted");
			} else {
				alert(res.msg);
			}
		})
	}

	const handleOnChange = (e) => {
		changeDate(e);
		displayDayEvent(e);
	}

	// Display event in one month
	const handleYearMonthChange = (d) => {

		// Extract month and year
		let month = new Date(d).getMonth()+1;
		let year = new Date(d).getFullYear();
		setYearMonth(year+month);

		getMonthlyEvents(year, month).then(res => {
			if (res.code===200) {
				setMonthEvent(res.data);
			} else {
				alert(res.msg);
			}
		})
	}

	//================ List events in one day ==================
	const displayDayEvent = (e) => {
		
		const startTime = e.toISOString().substring(0,10) + "T00:00:00.000Z";
		const finishTime = e.toISOString().substring(0,10) + "T23:59:00.000Z";

		getMultipleEvents(startTime, finishTime).then(res => {
			if (res.code===200) {
				setDayEvent(res.data);
			} else {
				alert(res.msg);
			}
		})
	}

	// Initial calendar
	useEffect(() => {
		handleYearMonthChange(new Date());
	}, []);

	
	const [thisDate, setThisDate] = useState(new Date());
	
	return(
		<Fragment sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
			<Grid sx={{ width: '100%', mx:'3%'}}>
				<Typography sx={classes.title} textAlign="center"> Events </Typography>
				<Box sx={{width: '60%', mx: '20%', pt:5}}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<CalendarPicker
						orientation="landscape"
						value={date}
						onMonthChange={(date) => {handleYearMonthChange(date)}}
						onYearChange={(date) => {handleYearMonthChange(date)}}
						onChange={handleOnChange}
						renderInput={(day, selectedDate, isInCurrentMonth, dayComponent) => {
							const date = new Date(day);	
							const isSelected = isInCurrentMonth && monthEvent.includes(date.getDate());
							return (isSelected ? <Badge color="secondary" variant="dot">{dayComponent}</Badge> : <Badge color="secondary">{dayComponent}</Badge> );
						}}
						/>
					</LocalizationProvider>
				</Box>
				<Grid container rowSpacing={10} xs={12} sx={{pt:5}}>
					<Grid container item xs={12} rowSpacing={5}>
						<Grid container item xs={12} >
							<Grid item xs={2} textAlign='center'>
								<Typography sx={classes.subTitle}> Progress </Typography>
							</Grid>
							<Grid item xs={4} textAlign='center'>
								<Typography sx={classes.subTitle}> Start Time </Typography>
							</Grid>
							<Grid item xs={4} textAlign='center'>
								<Typography sx={classes.subTitle}> Description </Typography>
							</Grid>
						</Grid>
						{typeof dayEvent !== 'undefined' && dayEvent.length > 0 ?
							dayEvent.map((e) => {						
								return (
								<Grid container item xs={12} key={e.id} value={e} arial-label={e.name} sx={{alignItems:'center', justifyContent:'center'}}>
									<Grid item xs={2} textAlign='center'>
										{e.status}
									</Grid>
									<Grid item xs={4} textAlign='center'>
										{toLocalTime(e.start_time)}
									</Grid>
									<Grid item xs={4} textAlign='center'>
										{e.description}
									</Grid>
									<Grid item xs={2} textAlign='center'>
										<IconButton>
											<InfoIcon color="primary" fontSize="medium" onClick={()=>handleDisplayEvent(e.id)}/>
										</IconButton>
										<IconButton>
											<DeleteIcon fontSize="medium" onClick={()=>handleDelete(e.id)}/>
										</IconButton>
									</Grid>
								</Grid>)
							})		
						: <Grid item textAlign='center' xs={12}>There is no event today. Do you want do add one ?</Grid>
						}
					</Grid>
					<Grid item textAlign='center' xs={12}>
						<IconButton >
							<AddIcon color="primary" fontSize="large" onClick={handleCreateEvent}/>
						</IconButton>
					<Dialog open={createEventOpen} fullWidth maxWidth>
						<Paper fullWidth>
							<CreateEvent handleClose={handleCreateClose} handleYearMonthChange={handleYearMonthChange} yearMonth={yearMonth}/>
						</Paper>
					</Dialog>
					<Dialog open={displayEventOpen} fullWidth maxWidth>
						<Paper fullWidth>
							<DisplayOneEvent eventId={selectedEvent} handleClose={handleDisplayClose} handleYearMonthChange={handleYearMonthChange} yearMonth={yearMonth}/>
						</Paper>
					</Dialog>
					</Grid>
				</Grid>
				<AlertDialog 
					alertTitle={alertTitle}
					alertMessage={alertMessage}
					open={alertOpen}
					handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
					handleConfirm={handleAlertConfirm}
					handleCancel={() => { setAlertOpen(false) }}
				/>
			</Grid>
		</Fragment>
	);
}