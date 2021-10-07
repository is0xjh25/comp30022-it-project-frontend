import React, { Fragment, useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getMultipleEvents, deleteEvent, getMonthlyEvents } from "../../api/Event";
import AlertDialog from "../Dialog/AlertDialog";
import CreateEvent from "./CreateEvent";
import DisplayOneEvent from "./DisplayOneEvent";
import {
    Box,
	Badge,
	Dialog,
	Paper,
	Grid,
	Button
} from '@mui/material'

export default function DisplayEvents() {

	const [date, changeDate] = useState(new Date());
	const [dayEvent, setDayEvent] = useState([]);
	const [monthEvent, setMonthEvent] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(0);
	const classes = {
		title: {
		  	fontSize:30,
			fontFamily:'Arial',
			fontWeight:'bold'
		},
		body: {
			fontSize:25,
			fontFamily:'Arial',
			textAlign:'center',
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
		addButton: {
			borderRadius: 20,
			backgroundColor: 'ForestGreen',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		},
        calendar: {
            width: '80%'
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
		let month = d.toLocaleDateString().substring(3,5);
		let year = d.toLocaleDateString().substring(6,10);

		getMonthlyEvents(year, month).then(res => {
			if (res.code===200) {
				console.log(res.data);
				setMonthEvent(res.data);
			} else {
				alert(res.msg);
			}
		})
	}

	//================ List events in one day ==================
	const displayDayEvent = (e) => {
		
		const startTime = e.toISOString().substring(0,10) + " 00:00";
		const finishTime = e.toISOString().substring(0,10) + " 23:59";

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
	
	return(
		<Fragment>
            <Box xs={12} sx={{width: '54%', mx: '23%'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
					id="Calendar"
                    autoOk
					dateFormat="YYYY-MM-DD"
                    orientation="landscape"
                    variant="static"
                    openTo="date"
					onMonthChange={(date) => {handleYearMonthChange(date)}}
					onYearChange={(date) => {handleYearMonthChange(date)}}
					onChange={handleOnChange}
                    value={date}
					// renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
					// 	const date = new Date(day);	
					// 	const isSelected = isInCurrentMonth && monthEvent.includes(date.getDate());
					// 	//return <Badge color="secondary" badgeContent={isSelected ? "!" : undefined}>{dayComponent}</Badge>;
					// 	return (isSelected ? <Badge color="secondary" variant="dot">{dayComponent}</Badge> : <Badge color="secondary">{dayComponent}</Badge> );
					// }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
			<Grid container rowSpacing={10} xs={12} sx={{pt:10}}>
				<Grid container item xs={12} rowSpacing={5}>
					<Grid container item xs={12}>
						<Grid item xs={2} textAlign='center'>
							Progress
						</Grid>
						<Grid item xs={4} textAlign='center'>
							Start Time
						</Grid>
						<Grid item xs={4} textAlign='center'>
							Description
						</Grid>
					</Grid>
					{typeof dayEvent !== 'undefined' && dayEvent.length > 0 ?
						dayEvent.map((e) => {						
							return (
							<Grid container item xs={12} key={e.id} value={e} arial-label={e.name}>
								<Grid item xs={2} textAlign='center'>
									{e.status}
								</Grid>
								<Grid item xs={4} textAlign='center'>
									{e.start_time}
								</Grid>
								<Grid item xs={4} textAlign='center'>
									{e.description}
								</Grid>
								<Grid item xs={2} textAlign='center'>
								<Button onClick={()=>handleDisplayEvent(e.id)}>
									Detail
								</Button>
								<Button onClick={()=>handleDelete(e.id)}>
									Delete
								</Button>
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>There is no event today. Do you want do add one ?</Grid>
					}
				</Grid>
				<Grid item textAlign='center' xs={12}>
				<Button style={classes.addButton}  variant="contained" onClick={handleCreateEvent}>
					Add new event
				</Button>
				<Dialog open={createEventOpen} fullWidth maxWidth>
					<Paper fullWidth>
						<CreateEvent handleClose={handleCreateClose} />
					</Paper>
				</Dialog>
				<Dialog open={displayEventOpen} fullWidth maxWidth>
					<Paper fullWidth>
						<DisplayOneEvent eventId={selectedEvent} handleClose={handleDisplayClose} />
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
		</Fragment>
	);
}