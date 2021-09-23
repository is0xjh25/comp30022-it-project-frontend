import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { handleDisplayCustomer, handleDeleteCustomer } from '../../api/Contact';
import EditCustomer from './EditCustomer';
import Box from '@mui/material/Box';

export default function DisplayCustomer(props) {
	//const {authority, customerId} = props;
	const customerId = 0;
	const authority = 0;
	const [status, setStatus] = useState("display");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

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
			bgcolor:'coral',
			borderRadius:15
		},
		descriptionBody: {
			fontSize:25,
			fontFamily:'Arial',
			textAlign:'left',
			bgcolor:'coral',
			borderRadius:15,
			px:5
		},
		gird: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		},
		box: {
			display:'flex', 
			flexDirection:'column'
		},
		backButton: {
			borderRadius: 20,
			backgroundColor: 'CornflowerBlue',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		},
		deleteButton: {
			borderRadius: 20,
			backgroundColor: 'Crimson',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		},
		editButton: {
			borderRadius: 20,
			backgroundColor: 'ForestGreen',
			color: '#FFFFFF',
			fontSize: '20px',
			fontWeight: 'bold'	
		}
	};

	// Fetch data
	useEffect(() => {

		// handleDisplayCustomer(customerId).then(res => {
		// 	if (res.ok) {
		// 		console.log(data);
		// 		setData(res.data);
		// 	} else {
		// 		res.json().then(bodyRes=>{alert(bodyRes.msg);});
		// 	}
		// })
		const test = [{
			'firstName':"Naruto",
			'lastName':"Sasuke",
			'middleName':"JoJo",
			'phone':"1234567890",
			'email':"owo@gmail.com",
			'address':"123 swanston street",
			'gender':"male",
			'dob':"02/02/2000",
			'description':"The characters in the American animated television series SpongeBob SquarePants were created by artist, animator, and former marine biologist Stephen Hillenburg. The series chronicles the adventures of the title character and his various friends in the fictional underwater city of Bikini Bottom. Most characters are anthropomorphic sea creatures based on real-life species.",
			'organisation':"Anime",
			'customerType':"Who never buy"
		}]
		setData(test);
        setLoading(false);
    }, [])

	useEffect(() => {
		return () => {
        }
    }, [loading])

	if (loading) {
        return <div>loading...</div>
    }

	const handleDelete = () => {
		// need Alert Dialog to confirm
		// handleDeleteCustomer(info, customerId).then(res => {
		// 	if (res.ok) {
		// 		alert("Successfully deleted");
		// 		handleBack();
		// 	} else {
		// 		res.json().then(bodyRes=>{alert(bodyRes.msg);});
		// 	}
		// })
	}

	const handleBack = () => {}

	const handleEdit = () => {
		setStatus("edit");
	}
		
	const showDisplay = 
	(<Grid container rowSpacing={10} sx={{pt:10, px:15}}>
		<Grid container item columnSpacing={4}>
			<Grid item xs={2} textAlign='center' sx={classes.gird}>
				<Avatar sx={{ width: 70, height: 70}}></Avatar>
			</Grid>
			<Grid item xs={5} textAlign='center' sx={classes.box}>
				<Box sx={classes.title} >First Name</Box>
				<Box sx={classes.body}>{data[0].firstName}</Box>
			</Grid>
			<Grid item xs={5}  textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Last Name</Box>
				<Box sx={classes.body}>{data[0].lastName}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid item xs={4} textAlign='center'sx={classes.box}>
				<Box sx={classes.title}>Middle Name</Box>
				<Box sx={classes.body}>{data[0].middleName}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Organisation</Box>
				<Box sx={classes.body}>{data[0].organisation}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Date of Birth</Box>
				<Box sx={classes.body}>{data[0].dob}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Phone</Box>
				<Box sx={classes.body}>{data[0].phone}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Address</Box>
				<Box sx={classes.body}>{data[0].address}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Customer Type</Box>
				<Box sx={classes.body}>{data[0].customerType}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid container item xs={4} textAlign='center' rowSpacing={15}>
				<Grid item xs={12} textAlign='center' sx={classes.box}>
					<Box sx={classes.title}>Email</Box>
					<Box sx={classes.body}>{data[0].email}</Box>
				</Grid>
				<Grid item xs={12} textAlign='center' sx={classes.box}>
					<Box sx={classes.title}>Gender</Box>
					<Box sx={classes.body}>{data[0].gender}</Box>
				</Grid>
			</Grid>
			<Grid item xs={8}  textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Description</Box>
				<Box sx={classes.descriptionBody}>{data[0].description}</Box>
			</Grid>
		</Grid>
		<Grid container item>
			<Grid item xs={4} textAlign='center'>
				<Button style={classes.backButton} variant="outlined" onClick={handleBack}>Back</Button>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority === 0 ? <Button style={classes.deleteButton}variant="outlined" onClick={handleDelete}>Delete</Button> : null} 
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority === 0 ? <Button style={classes.editButton} variant="outlined" onClick={handleEdit}>Edit</Button> : null}
			</Grid>
		</Grid>
	</Grid>)

	return (
			<div>
				{status === 'display' ? (
					showDisplay
					) : status === 'edit' ? (
						<EditCustomer setStatus={setStatus} data={data} customerId={customerId}/>
					): null 
				}
			</div>
	);
}