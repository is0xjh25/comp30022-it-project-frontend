import React from 'react';
import { useState } from 'react';
import AlertDialog from '../Dialog/AlertDialog';
import { updateCustomer } from '../../api/Contact';
import {
    Button,
	Box,
    TextField,
	Grid,
	Avatar,
	IconButton,
	Badge,
	MenuItem,
	FormControl,
	Select
} from '@mui/material';
import { Input,uploadContactPhoto } from '../../api/UploadPhoto';
import ChangeCircleRoundedIcon from '@material-ui/icons/ChangeCircleRounded';


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
	const [photo, setPhoto] = useState(props.data.photo);
	
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
		} else if (e.target.id === "middleName") {
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
		props.setPageStatus('view');
	}

	const handleOnSelect = (e,id) => {
		if (id === "customerType") {
			setCustomerType(e.target.value);
		}else if (id === "gender") {
			setGender(e.target.value);
		}
    };

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
			"customer_type":customerType
		}

		updateCustomer(data, customerId).then(res => {
			if (res.code===200) {
				alert("Successfully updated");
				props.setPageStatus('view');
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
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<label htmlFor="contained-button-file">
								<Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => {
										uploadContactPhoto(customerId, e.currentTarget.files[0]);
										window.location.reload();
									}}/>
								<IconButton color="primary" aria-label="upload picture" component="span">
									<ChangeCircleRoundedIcon size="small"/>
								</IconButton>
								</label>
							}
						>
							<Avatar src={`data:image/gif;base64,${photo}`}
								sx={{ width: 70, height: 70}}>
							</Avatar>
						</Badge>
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
						<FormControl fullWidth>
							<Select
								id="customerType"
								value={customerType}
								onChange={(event) => handleOnSelect(event,"customerType")}
							>
								<MenuItem value={"company"}>company</MenuItem>
								<MenuItem value={"personal"}>personal</MenuItem>
							</Select>
						</FormControl>
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
							<FormControl>
								<Select
									id="gender"
									value={gender}
									onChange={(event) => handleOnSelect(event,"gender")}
								>
									<MenuItem value={"male"}>male</MenuItem>
									<MenuItem value={"female"}>female</MenuItem>
									<MenuItem value={"not specified"}>not specified</MenuItem>
								</Select>
							</FormControl>
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