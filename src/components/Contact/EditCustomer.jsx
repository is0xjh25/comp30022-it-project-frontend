import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AlertDialog from '../Dialog/AlertDialog';
import { handleUpdateCustomer } from '../../api/Contact';

export default function EditCustomer(props) {

	const customerId = props.customerId;
	const [firstName, setFirstName] = useState(props.data.first_name);
	const [lastName, setLastName] = useState(props.data.last_name);
	const [middleName, setMiddleName] = useState(props.data.middle_name);
	const [phone, setPhone] = useState(props.data.phone);
	const [email, setEmail] = useState(props.data.email);
	const [address, setAddress] = useState(props.data.address);
	const [gender, setGender] = useState(props.data.gender);
	const [birthday, setbirthday] = useState(props.data.birthday);
	const [description, setDescription] = useState(props.data.description);
	const [organization, setorganization] = useState(props.data.organization);
	const [customerType, setCustomerType] = useState(props.data.customer_type);
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
		updateButton: {
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
		} else if (e.target.id === "middleNmae") {
			setMiddleName(e.target.value);
		} else if (e.target.id === "phone") {
			setPhone(e.target.value);
		} else if (e.target.id === "organization") {
			setorganization(e.target.value);
		} else if (e.target.id === "address") {
			setAddress(e.target.value);
		} else if (e.target.id === "description") {
			setDescription(e.target.value);
		} else if (e.target.id === "gender") {
			setGender(e.target.value);
		} else if (e.target.id === "customerType") {
			setCustomerType(e.target.value);
		} else if (e.target.id === "birthday") {
			setbirthday(e.target.value);
		}
    };

	const confirmDiscard = () => {
		props.setStatus('display');
	}

	const handleUpdate = () => {

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
			"customerType":customerType
		}

		handleUpdateCustomer(data, customerId).then(res => {
			if (res.code===200) {
				alert("Successfully updated");
				props.setStatus('display');
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})
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
		<Grid container rowSpacing={5} sx={{pt:5, px :15}}>
				<Grid container item columnSpacing={4}>
					<Grid item xs={2} textAlign='center' sx={{display:"flex", justifyContent:'center', alignItems:'center'}}>
						<Avatar sx={{ width: 70, height: 70}}></Avatar>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>First Name</Box>
						<TextField id="firstName" defaultValue={firstName} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Last Name</Box>
						<TextField id="LastName" defaultValue={lastName} onChange={handleOnChange}/>
					</Grid>
				</Grid>
				<Grid container item rowSpacing={5} columnSpacing={3}>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Middle Name</Box>
						<TextField id="middleName"  defaultValue={middleName} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>organization</Box>
						<TextField id="organization"  defaultValue={organization} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Date of Birth</Box>
						<TextField id="birthday" defaultValue={birthday} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Phone</Box>
						<TextField id="phone" defaultValue={phone} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Address</Box>
						<TextField id="address" defaultValue={address} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={4} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Customer Type</Box>
						<TextField id="customerType" defaultValue={customerType} onChange={handleOnChange}/>
					</Grid>
				</Grid>
				<Grid container item rowSpacing={5} columnSpacing={3}>
					<Grid container item xs={4} textAlign='center' rowSpacing={15}>
						<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
							<Box sx={classes.title}>Email</Box>
							<TextField id="email" defaultValue={email} onChange={handleOnChange}/>
						</Grid>
						<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
							<Box sx={classes.title}>Gender</Box>
							<TextField id="gender"  defaultValue={gender} onChange={handleOnChange}/>
						</Grid>
					</Grid>
					<Grid item xs={8}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Description</Box>
						<TextField
						id="description"
						defaultValue={description}
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
						<Button variant="outlined" style={classes.updateButton} onClick={handleUpdate}>Update</Button>
					</Grid>
				</Grid>
				<AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
                />
			</Grid> 
	)
}