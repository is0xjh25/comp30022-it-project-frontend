import { Fragment, useState, useEffect } from "react";

// Import from MUI
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    Box,
	Badge,
	Dialog,
	Paper,
	Grid,
	IconButton,
	Typography,
	Chip
} from '@mui/material'
import AlertDialog from "../Dialog/AlertDialog";
import CreateEvent from "./CreateEvent";
import DisplayOneEvent from "./DisplayOneEvent";
import { styled } from '@mui/material/styles';
import PickersDay from '@mui/lab/PickersDay';
import { getMultipleEvents, deleteEvent, getMonthlyEvents } from "../../api/Event";
import { toLocalTime } from "../../api/Util";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';


export default function DisplayEvents() {

	const [date, changeDate] = useState(new Date());
	const [yearMonth, setYearMonth] = useState("");
	const [month, setMonth] = useState("");
	const [dayEvent, setDayEvent] = useState([]);
	const [monthEvent, setMonthEvent] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(0);
	const [updateCount, setUpdateCount] = useState(0);
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
				update();
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
		setMonth(new Date(d).getMonth()+1);
		setYearMonth(year+month);
		
		getMonthlyEvents(year, month, d.getTimezoneOffset()).then(res => {
			if (res.code===200) {
				setMonthEvent(res.data);
			} else {
				alert(res.msg);
			}
		})
	}

	//================ List events in one day ==================
	const displayDayEvent = (e) => {

		const startTime = new Date(e);
		startTime.setHours(0);
		startTime.setMinutes(0);
		startTime.setSeconds(0);
		startTime.setMilliseconds(0);
		const finishTime = new Date(startTime);
		finishTime.setHours(24);

		getMultipleEvents(startTime.toISOString(), finishTime.toISOString()).then(res => {
			if (res.code===200) {
				setDayEvent(res.data);
			} else {
				alert(res.msg);
			}
		})
	}

	const CustomPickersDay = styled(PickersDay, {
		shouldForwardProp: (prop) =>
		  prop !== 'dayIsBetween',
	  })(({ theme, dayIsBetween}) => ({
		...(dayIsBetween && 
		
		{
		  borderRadius: 0,
		  disableHighlightToday: true,
		  // backgroundColor: theme.palette.primary.light,
		  borderTopLeftRadius: '50%',
		  borderBottomLeftRadius: '50%',
		  borderTopRightRadius: '50%',
		  borderBottomRightRadius: '50%',
		  color: theme.palette.common.black,
		  '&:hover, &:focus': {
		  //   backgroundColor: theme.palette.primary.dark,
		  },
		}
		),
	  }));

	const renderWeekPickerDay2 = (date, selectedDate, pickersDayProps) => {

		let dayIsBetween = false

		const dateTemp = new Date(date)
		const monthTemp = dateTemp.getMonth();
		

		if (month === monthTemp+1 && monthEvent.includes(date.getDate())) {
			dayIsBetween = true;
		}

		let selected = false
		if (dayIsBetween === true) {
			selected = true
		}

		return (
		selected ?
			<Badge color="warning" variant="dot" overlap="circular">
			<CustomPickersDay
				{...pickersDayProps}
				disableMargin
				dayIsBetween={dayIsBetween}
			/>
			</Badge> 
		: 
			<Badge>
			<CustomPickersDay
				{...pickersDayProps}
				disableMargin
				dayIsBetween={dayIsBetween}
			/>
			</Badge>
		); 
	};

	const getRowLabel = (status) => {
        if (status === "to do") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }
    }

	const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

	// Initial calendar
	useEffect(() => {
		handleYearMonthChange(new Date());
		displayDayEvent(date);
	}, [displayEventOpen, updateCount]);
	
	return(
		<Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
			<Grid>
				<Typography sx={classes.title} textAlign="center">Events</Typography>
				<Box sx={{width: '60%', mx:'20%', pt:5}}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<StaticDatePicker
						open
						orientation="landscape"
						value={date}
						displayStaticWrapperAs="desktop"
						onMonthChange={(date) => {handleYearMonthChange(date)}}
						onYearChange={(date) => {handleYearMonthChange(date)}}
						onChange={handleOnChange}
						renderDay={renderWeekPickerDay2}			
						/>
					</LocalizationProvider>
				</Box>
				<Grid container item rowSpacing={2} xs={12} sx={{pt:5}}>
					<Grid container item xs={12} rowSpacing={2}>
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
										{getRowLabel(e.status)}
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
					</Grid>
					<Dialog open={createEventOpen} fullWidth PaperProps={{sx:{width:"80%", height:"70%"}}}>
						<Paper >
							<CreateEvent handleClose={handleCreateClose} handleYearMonthChange={handleYearMonthChange} setMonth={setMonth} yearMonth={yearMonth} update={update}/>
						</Paper>
					</Dialog>
					<Dialog open={displayEventOpen} fullWidthPaperProps={{sx:{width:"80%", height:"70%"}}}>
						<Paper fullWidth >
							<DisplayOneEvent eventId={selectedEvent} handleClose={handleDisplayClose} handleYearMonthChange={handleYearMonthChange} yearMonth={yearMonth}/>
						</Paper>
					</Dialog>
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
		</Grid>
	);
}