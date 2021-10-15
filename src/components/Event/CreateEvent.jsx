import { useState } from "react";
import { createEvent } from "../../api/Event";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {
	Grid,
	TextField,
	IconButton,
	Typography
} from '@mui/material'

export default function CreateEvent(props) {
	const { handleClose, handleYearMonthChange, yearMonth, setMonth} = props;
	const [startTime, setStartTime] = useState(new Date());
	const [finishTime, setFinishTime] = useState(new Date());
	const [description, setDescription] = useState(""); 
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
		<Grid container textAlign='center' rowSpacing={5} sx={{pt:10, px:20}}>
			<Grid item xs={12}>
				<Typography sx={classes.title}>Create New Event</Typography>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Typography sx={classes.subTitle}>Start Time</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDateTimePicker
						id="startTime"
						value={startTime}
						onChange={setStartTime}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12}  sx={{display:"flex", flexDirection:"column"}}>
				<Typography sx={classes.subTitle}>Finish Time</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDateTimePicker
						id="finishTime"
						value={finishTime}
						onChange={setFinishTime}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
				<Typography sx={classes.subTitle}>Description</Typography>
				<TextField id="description" multiline rows={10} onChange={handleOnChange}/>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<ArrowBackSharpIcon color="error" fontSize="large" onClick={confirmDiscard}/>
				</IconButton>
			</Grid>
			<Grid item xs={6} textAlign='center'>
				<IconButton>
					<UpdateSharpIcon color="primary" fontSize="large" onClick={handleCreate}/>
				</IconButton>
			</Grid>
		</Grid>
	)
}