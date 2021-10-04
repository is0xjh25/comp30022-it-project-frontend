import React, { Fragment, useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getMultipleEvents, deleteEvent } from "../../api/Event";
import { Badge } from "@material-ui/core";
import AlertDialog from "../Dialog/AlertDialog";

export default function DisplayEvent() {

	const [month, setMonth] = useState("");
	const [date, changeDate] = useState(new Date());
	const [dayEvent, setDayEvent] = useState([]);
	const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
	const [selectEvent, setSelectEvent] = useState(0);

	// Alart Dialog
	const [alertOpen, setAlertOpen] = useState(false);
	const alertTitle = 'Delete Confirm';
	const alertMessage = "Do you want to delete this event";
	const handleDelete = function(e) {
		setAlertOpen(true);
		setSelectEvent(e);
	}
	const handleAlertConfirm = function() {
		confirmDelete();
		setAlertOpen(false);
	}

	const confirmDelete = function() {
		deleteEvent(selectEvent).then(res => {
			if (res.ok) {
				alert("!!!");
			} else {
				alert(res.msg);
			}
		})
	}

	const handleOnChange = (e) => {
		changeDate(e);
		changeDay(e);
	}

	const changeDay = (e) => {
		
		const transformDate = e.toISOString();
		const startTime = transformDate.substring(0,10) + " 00:00";
		const finishTime = transformDate.substring(0,10) + " 23:59";

		getMultipleEvents(startTime, finishTime).then(res => {
			if (res.ok) {
				res.json().then(body => {
					setDayEvent(body.data);
				});
			} else {
				alert(res.msg);
			}
		})
	}

	const handleAddEvent = () => {
		
	}

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
		}
	};

	
	return(
		<Fragment>
			<Grid container rowSpacing={10} sx={{pt:10, px:85}}>
				<Grid item xs={12}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
						autoOk
						orientation="landscape"
						variant="static"
						openTo="date"
						renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
							const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());
							// You can also use our internal <Day /> component
							return <Badge color="secondary" badgeContent={isSelected ? "4" : undefined}>{dayComponent}</Badge>;
						}}
						value={date}
						onChange={handleOnChange}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			</Grid>
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
								<Button>
									Detail
								</Button>
								<Button onClick={handleDelete}>
									Delete
								</Button>
								</Grid>
							</Grid>)
						})		
					: <Grid item textAlign='center' xs={12}>There is no event today. Do you want do add one ?</Grid>
					}
				</Grid>
				<Grid item textAlign='center' xs={12}>
				<Button xs={6} textAlign='center' style={classes.addButton} variant="outlined" onClick={handleAddEvent}>
					Add new event
				</Button>
				</Grid>
				<AlertDialog 
				alertTitle={alertTitle}
				alertMessage={alertMessage}
				open={setAlertOpen}
				handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
				handleConfirm={handleAlertConfirm}
				handleCancel={() => { setAlertOpen(false) }}
				/>
			</Grid>
		</Fragment>
	);
}