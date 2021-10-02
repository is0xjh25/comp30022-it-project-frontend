import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getMultipleEvents } from "../../api/Event";

export default function DisplayEvent() {

	const [monthEvent, setMonthEvent] = useState([]);
	const [dayEvent, setDayEvent] = useState([]);
	const [date, changeDate] = useState(new Date());
	
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

	const handleOnChange = (e) => {
		changeDate(e);
		changeDay();
	}
	// Sat Oct 02 2021 10:02:04 GMT+1000

	const changeDay = () => {

		const transformDate = date.toISOString();
		const startTime = transformDate.substring(0,10) + " 00:00";
		const finishTime = transformDate.substring(0,10) + " 23:59";

		getMultipleEvents(startTime, finishTime).then(res => {
			if (res.ok) {
				setDayEvent(res);	
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})
	}

	const eventDisplay = () => {

		return(
			<Grid container rowSpacing={10} sx={{pt:10, px:0}} class={classes.body}>
			{/* <ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleSelected}>
				{results.map((org) => (
					<ToggleButton key={org.id} value={org.id} aria-label={org.name}>
						{org.name}
					</ToggleButton>
				))}			
	  		</ToggleButtonGroup> */}
				<Grid item xs={12} textAlign='center'>
				!!!	
				</Grid>
				<Grid item xs={12} textAlign='center'>
				!!!	
				</Grid>
				<Grid item xs={12} textAlign='center'>
				!!!	
				</Grid>
			</Grid>
		);
	}

	const handleAddEvent = () => {
		
	}

	let temp = null;
	let display;
	if (temp === null) {
		display = <Grid item textAlign='center' xs={12}  >There is no event today. Do you want do add one ?</Grid>;
	} else {
		display = temp;
	}

	return(
		<Grid container rowSpacing={10} sx={{pt:15, px:85}}>
			<Grid item>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DatePicker
					autoOk
					orientation="landscape"
					variant="static"
					openTo="date"
					value={date}
					onChange={handleOnChange}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			{display}
			<Grid item textAlign='center' xs={12}>
			<Button xs={6} textAlign='center' style={classes.addButton} variant="outlined" onClick={handleAddEvent}>
				Add new event
			</Button>
			</Grid>
		</Grid>
	);
}