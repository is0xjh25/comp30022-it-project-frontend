import React from 'react';
import { useState } from 'react';
import AlertDialog from '../Dialog/AlertDialog';
import { createCustomer } from '../../api/Contact';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {
    IconButton,
	Box,
    TextField,
	Grid,
	Avatar,
	MenuItem,
	FormControl,
	Select
} from '@mui/material';
import {processPhoto} from '../../api/Photo';

import {formatTime} from '../../api/Util';

export default function AddCustomer(props) {

    const {departmentId, handleClose, update} = props;
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [birthday, setBirthday] = useState("2000-01-01");
	const [description, setDescription] = useState("");
	const [organization, setOrganization] = useState("");
	const [customerType, setCustomerType] = useState("");

	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");

	const classes = {
		title: {
		  	fontSize:30,
			fontFamily:'Arial',
			fontWeight:'bold',
			bgcolor:'#ff5722',
			borderRadius:15
		},
		descriptionBody: {
			fontSize:25,
			fontFamily:'Arial',
			textAlign:'left',
			bgcolor:'#ff5722',
			borderRadius:15,
			px:5
		},
		grid: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		}
	};

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			if(e.target.value === ""){
				setEmailError("Email cannot be empty!")
			}
			else{
				setEmailError("")
			}
			setEmail(e.target.value);
		} else if (e.target.id === "firstName") {
			if(e.target.value === ""){
				setFirstNameError("First name cannot be empty!")
			}
			else{
				setFirstNameError("")
			}
			setFirstName(e.target.value);
		} else if (e.target.id === "lastName") {
			if(e.target.value === ""){
				setLastNameError("Last name cannot be empty!")
			}
			else{
				setLastNameError("")
			}
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
		}
    };


	const handleOnSelect = (e,id) => {
		console.log(e)
		if (id === "customerType") {
			setCustomerType(e.target.value);
		}else if (id === "gender") {
			setGender(e.target.value);
		}else if (id === "birthday") {
			if(e!=null){
				const birthdayYear = e.getFullYear();
				const birthdayMonthDate = formatTime(e, 'MM-dd');
				setBirthday(birthdayYear+'-'+birthdayMonthDate);
			}
			else{
				setBirthday(null);
			}
			
		}
    };

	const handleCreateIconColor= () => {
		if(firstName==="" || lastName==="" || email===""){
			return "disable"
		}
		else{
			return "primary"
		}
	}

	const handleCreate = () => {

		if(firstName==="" || lastName==="" || email===""){
			return false;
		}

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

		createCustomer(data, departmentId).then(res => {
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
	const alertTitle = 'Discard Confirm';
	const alertMessage = `Do you want to leave without saving?`;
	const handleDiscard = function() {
		setAlertOpen(true);
	}
	const handleAlertConfirm = function() {
		confirmDiscard();
		setAlertOpen(false);
	}

	return (
		<div>
		    <Grid container rowSpacing={5} sx={{pt:5, px :15, minWidth:1000}}>
				<Grid container item columnSpacing={4}>
					<Grid item xs={2} textAlign='center' sx={{display:"flex", justifyContent:'center', alignItems:'center'}}>
						<Avatar src={processPhoto(null)} sx={{ width: 0.5, height: 1}}>
						</Avatar>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>First Name*</Box>
						<TextField id="firstName" error={firstNameError!==""} helperText={firstNameError} onChange={handleOnChange}/>
					</Grid>
					<Grid item xs={5}  textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
						<Box sx={classes.title}>Last Name*</Box>
						<TextField id="lastName" error={lastNameError!==""} helperText={lastNameError} onChange={handleOnChange}/>
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
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
									id="birthday"
									inputFormat="yyyy-MM-dd"
									value={new Date(birthday)}
									onChange={(event) => handleOnSelect(event, "birthday")}
									renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
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
							<Box sx={classes.title}>Email*</Box>
							<TextField id="email" error={emailError!==""} helperText={emailError} onChange={handleOnChange}/>
						</Grid>
						<Grid item xs={12} textAlign='center' sx={{display:"flex", flexDirection:"column"}}>
							<Box sx={classes.title}>Gender</Box>
							<FormControl fullWidth>
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
						onChange={handleOnChange}
						multiline
						rows={10}
						/>
					</Grid>
				</Grid>
				<Grid container item>
					<Grid item xs={4} textAlign='center'>
						<IconButton>
							<ArrowBackSharpIcon color="error" fontSize="large" onClick={handleDiscard}/>
						</IconButton>
					</Grid>
					<Grid item xs={4} textAlign='center'>
					</Grid>
					<Grid item xs={4} textAlign='center'>
						<IconButton>
							<UpdateSharpIcon color={handleCreateIconColor()} fontSize="large"  onClick={handleCreate} />
						</IconButton>
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