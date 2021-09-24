import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AlertDialog from '../Dialog/AlertDialog';
import { handleCreateCustomer } from '../../api/Contact';

export default function AddCustomer(props) {

    const {departmentId, handleClose, update} = props;



	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [birthday, setBirthday] = useState("");
	const [description, setDescription] = useState("");
	const [organization, setOrganization] = useState("");
	const [customerType, setCustomerType] = useState("");



	const classes = {
		title: {
		  	fontSize:30,
			fontFamily:'Arial',
			fontWeight:'bold',
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
		if (e.target.id === "email") {
			setEmail(e.target.value);
		} else if (e.target.id === "firstName") {
			setFirstName(e.target.value);
		} else if (e.target.id === "lastName") {
			setLastName(e.target.value);
		} else if (e.target.id === "middleName") {
			setMiddleName(e.target.value);
		} else if (e.target.id === "phone") {
			setPhone(e.target.value);
		} else if (e.target.id === "organization") {
			setOrganization(e.target.value);
		} else if (e.target.id === "address") {
			setAddress(e.target.value);
		} else if (e.target.id === "description") {
			setDescription(e.target.value);
		} else if (e.target.id === "gender") {
			setGender(e.target.value);
		} else if (e.target.id === "customerType") {
			setCustomerType(e.target.value);
		} else if (e.target.id === "birthday") {
			setBirthday(e.target.value);
		}
    };

	const handleCreate = () => {
		
		const data = {
			"first_name":firstName,
			"last_name":lastName,
			"middle_name":middleName,
			"email":email,
			"phone":phone,
			"description":description,
			"gender":gender,
			"birthday":birthday,
			"address":address,
			"organization":organization,
			"customer_type":customerType
		}

		handleCreateCustomer(data, departmentId).then(res => {
			if (res.code===200) {
				alert("Successfully created");
                handleClose();
                update();
			} else {
				alert(res.msg);
			}
		})
	}

	// Go back to table
	const confirmDiscard = () => {
        handleClose();
	}

	// Alart Dialog
	const [alertOpen, setAlertOpen] = useState(false);
	const alertTitle = 'Delete Confirm';
	const alertMessage = `Do you want to delete ${firstName} ${lastName}?`;
	const handleDiscard = function() {
		setAlertOpen(true);
	}
	const handleAlertConfirm = function() {
		confirmDiscard();
		setAlertOpen(false);
	}

	return (
		<div>
		    <Grid container rowSpacing={5} sx={{pt:5, px :15}}>
				<Grid container item columnSpacing={4}>
					<Grid item xs={2} textAlign='center' sx={{display:"flex", justifyContent:'center', alignItems:'center'}}>
						<Avatar sx={{ width: 70, height: 70}}></Avatar>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>First Name</Box>
						<TextField id="firstName" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Last Name</Box>
						<TextField id="lastName" onChange={handleOnChange}/>
					</Grid>
				</Grid>
				<Grid container item rowSpacing={5} columnSpacing={3}>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Middle Name</Box>
						<TextField id="middleName" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Organization</Box>
						<TextField id="organization" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Date of Birth</Box>
						<TextField id="birthday" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Phone</Box>
						<TextField id="phone" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Address</Box>
						<TextField id="address" onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Customer Type</Box>
						<TextField id="customerType" onChange={handleOnChange}/>
					</Grid>
				</Grid>
				<Grid container item rowSpacing={5} columnSpacing={3}>
					<Grid container item xs={4} textAlign='center' rowSpacing={15}>
						<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
							<Box sx={classes.title}>Email</Box>
							<TextField id="email" onChange={handleOnChange}/>
						</Grid>
						<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
							<Box sx={classes.title}>Gender</Box>
							<TextField id="gender" onChange={handleOnChange}/>
						</Grid>
					</Grid>
					<Grid item xs={8}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Description</Box>
						<TextField
						id="description"
						onChange={handleOnChange}
						multiline
						rows={10}
						/>
					</Grid>
				</Grid>
				<Grid container item>
					<Grid item xs={4} textAlign='center'>
						<Button variant="outlined" style={classes.discardButton} onClick={handleDiscard}>Discard</Button>
					</Grid>
					<Grid item xs={4} textAlign='center'>
					</Grid>
					<Grid item xs={4} textAlign='center'>
						<Button variant="outlined" style={classes.createButton} onClick={handleCreate}>Create</Button>
					</Grid>
				</Grid>
			</Grid>
			<AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
            />
			</div> 
	)
}