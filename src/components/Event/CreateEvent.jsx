import { useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createEvent } from "../../api/Event";
import DateFnsUtils from '@date-io/date-fns';
import {
    Box,
	Grid,
	Button,
	TextField
} from '@mui/material'

export default function CreateEvent(props) {
	const { handleClose, handleYearMonthChange, yearMonth } = props;
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState(""); 
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
	
	const handleOnChange = (e) => {
		if (e.target.id === "description") {
			setDescription(e.target.value);
		}
    };

	const handleCreate = () => {
		
		const transformStartTime = startTime.toISOString();
		const transformFinishTime = finishTime.toISOString();
		
		let month = startTime.toLocaleDateString().substring(3,5);
		let year = startTime.toLocaleDateString().substring(6,10);

		createEvent(transformStartTime, transformFinishTime, description).then(res => {
			if (res.code===200) {
				alert("Create event successfully");
				if ((year+month) === yearMonth) {
					handleYearMonthChange(startTime);
				}
				handleClose();	
			} else {
				alert(res.msg);
			}
		});
	}

	const confirmDiscard = () => {
		handleClose();
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
				<Button variant="outlined" style={classes.discardButton} onClick={confirmDiscard}>Discard</Button>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<Button variant="outlined" style={classes.createButton} onClick={handleCreate}>Create</Button>
			</Grid>
		</Grid>
	)
}