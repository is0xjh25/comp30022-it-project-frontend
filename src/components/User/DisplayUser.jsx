import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getUserInfo, updateUserInfo } from '../../api/Util';
import { Input,uploadUserPhoto } from '../../api/Photo';
import AlertDialog from '../Dialog/AlertDialog';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import ChangeCircleRoundedIcon from '@material-ui/icons/ChangeCircleRounded';
import {
	Avatar,
	Box,
	IconButton,
	Grid,
    TextField,
	Badge,
    LinearProgress
} from '@mui/material';
import {processPhoto} from '../../api/Photo';


export default function DisplayUser() {
    
	const history = useHistory();
	const [status, setPageStatus] = useState("view");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [website, setWebsite] = useState("");
	const [description, setDescription] = useState("");

	const classes = {
		title: {
			fontSize:30,
		  	position:'static',
		  	fontFamily:'NTR',
		  	fontWeight:'bold',
		  	bgcolor:'#35baf6',
		  	borderRadius:15
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
		}
	};

	//Alart Dialog Discard
	const [discardAlertOpen, setDiscardAlertOpen] = useState(false);
	const discardAlertTitle = 'Discard Confirm';
	const discardAlertMessage = "Do you want to leave without saving?";
	const handleDiscard = function() {
		setDiscardAlertOpen(true);
	}
	const handleDiscardAlertConfirm = function() {
		confirmDiscard();
		setDiscardAlertOpen(false);
	}

	//Alart Dialog Update
	const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
	const updateAlertTitle = 'Update Confirm';
	const updateAlertMessage = "Do you want to Update?";
	const handleUpdate = function() {
		setUpdateAlertOpen(true);
	}
	const handleUpdateAlertConfirm = function() {
		confirmUpdate();
		setUpdateAlertOpen(false);
	}

	const handleOnChange = (e) => {
		if (e.target.id === "firstName") {
			setFirstName(e.target.value);
		} else if (e.target.id === "lastName") {
			setLastName(e.target.value);
		} else if (e.target.id === "middleName") {
			setMiddleName(e.target.value);
		}  else if (e.target.id === "phone") {
			setPhone(e.target.value);
		} else if (e.target.id === "password") {
			setPassword(e.target.value);
		} else if (e.target.id === "website") {
			setWebsite(e.target.value);
		} else if (e.target.id === "description") {
			setDescription(e.target.value);
		}
    };

	const handleBack = () => {
		setPageStatus("view");
        history.goBack();
    }

	const handleEdit = () => {
		setPageStatus("edit");
	}

	const confirmDiscard = () => {
		setPageStatus("view");
		// Reset all attributes
		setFirstName(data.first_name);
		setLastName(data.last_name);
		setMiddleName(data.middle_name);
		setPhone(data.phone);
		setPassword(data.password);
		setWebsite(data.website);
		setDescription(data.description);
	}

	const checkChange = () => {
		
		let body = {};

		if (firstName !== data.first_name) {
			body["first_name"] = firstName;
		}

		if (lastName !== data.last_name) {
			body["last_name"] = lastName;
		}

		if (middleName !== data.middle_name) {
			body["middle_name"] = middleName;
		}

		if (phone !== data.phone) {
			body["phone"] = phone;
		}

		if (password !== data.password) {
			body["password"] = password;
		}

		if (website !== data.website) {
			body["website"] = website;
		}
		
		if (description !== data.description) {
			body["description"] = description;
		}

		return body;
	}

	const confirmUpdate = () => {
		const body = checkChange();
		if (Object.keys(body).length !== 0) { 
			updateUserInfo(body).then(res => {
				if (res.code===200) {
					alert("Successfully updated");
					if (body["first_name"] !== undefined || body["last_name"] !== undefined) {
						window.location.reload();
					} else {
						setPageStatus('view');
					}
				} else {
					alert(res.msg);
				}
			})
		} else {
			alert("Nothing has been changed");
		}
	}

	// Fetch data
	useEffect(() => {
		getUserInfo().then(res => {
			if (res.code===200) {
				setData(res.data);
				setFirstName(res.data.first_name);
				setLastName(res.data.last_name);
				setMiddleName(res.data.middle_name);
				setPhone(res.data.phone);
				setPassword(res.data.password);
				setWebsite(res.data.website);
				setDescription(res.data.description);  
				setLoading(false);
			} else {
				alert(res.msg);
			}
		})
		
	}, [status])

	useEffect(() => {
		return () => {
		}
	}, [loading])

    // Display loading page if the request is not finished
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

	let leftButton; 
	let rightButton;
	if (status === "view") {
		leftButton = 
			<IconButton xs={6}>
				<ArrowBackSharpIcon color="error" fontSize="large" onClick={handleBack}/>
			</IconButton>;
		rightButton = 
			<IconButton xs={6}>
				<EditSharpIcon color="primary" fontSize="large" onClick={handleEdit}/>
			</IconButton>;
	} else if (status === "edit") {
		leftButton = 
			<IconButton xs={6}>
				<ArrowBackSharpIcon color="secondary" fontSize="large" onClick={handleDiscard}/>
			</IconButton>;
		rightButton = 
			<IconButton xs={6}>
				<UpdateSharpIcon color="primary" fontSize="large" onClick={handleUpdate}/>
			</IconButton>;
	}

	return (

        <Grid container sx={{mt: 10}}>
            <Grid item xs={12}>
                <Grid sx={{pt:"1%", px:"5%", minWidth:700}}>
                    <Grid container rowSpacing={8}>
                        <Grid container item columnSpacing={5}>
                            <Grid item xs={12} textAlign='center' sx={classes.grid}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => {
                                                uploadUserPhoto(e.currentTarget.files[0]);
                                            }}/>
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <ChangeCircleRoundedIcon size="small"/>
                                        </IconButton>
                                        </label>
                                    }
                                >
                                    <Avatar id="user_avator" src={processPhoto(data.photo)}
                                        sx={{ width: 70, height: 70}}>
                                    </Avatar>
                                </Badge>
                            </Grid>
                        </Grid>
                        
                        <Grid container item rowSpacing={5} columnSpacing={3}>
                            <Grid item xs={6} textAlign='center'sx={classes.box}>
                                <Box sx={classes.title}>First Name</Box> 
                                {status === "view" ?
                                <Box sx={classes.body}>{data.first_name}</Box> : 
                                <TextField id="firstName" defaultValue={data.first_name} onChange={handleOnChange}/>
                                }
                            </Grid>
                            <Grid item xs={6} textAlign='center' sx={classes.box}>
                                <Box sx={classes.title}>Email</Box>
                                <Box sx={classes.body}>{data.email}</Box>
                            </Grid>
                        </Grid>
                        <Grid container item rowSpacing={5} columnSpacing={3}>
                            <Grid item xs={6} textAlign='center'sx={classes.box}>
                                <Box sx={classes.title}>Last Name</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>{data.last_name}</Box> :
                                <TextField id="lastName" defaultValue={data.last_name} onChange={handleOnChange}/>
                                }
                            </Grid>
                            <Grid item xs={6} textAlign='center' sx={classes.box}>
                                <Box sx={classes.title}>Phone</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>{data.phone}</Box> :
                                <TextField id="phone" defaultValue={data.phone} onChange={handleOnChange}/>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item rowSpacing={5} columnSpacing={3}>
                            <Grid item xs={6} textAlign='center'sx={classes.box}>
                                <Box sx={classes.title}>Middle Name</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>{data.middle_name}</Box> :
                                <TextField id="middleName" defaultValue={data.middle_name} onChange={handleOnChange}/>
                                }
                            </Grid>
                            <Grid item xs={6} textAlign='center' sx={classes.box}>
                                <Box sx={classes.title}>Password</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>********</Box> :
                                <TextField id="password" type="password" defaultValue="********" onChange={handleOnChange}/>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item rowSpacing={5} columnSpacing={3}>
                            <Grid item xs={6} textAlign='center'sx={classes.box}>
                                <Box sx={classes.title}>Website</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>{data.website}</Box> :
                                <TextField id="website" defaultValue={data.website} onChange={handleOnChange}/>
                                }
                            </Grid>
                            <Grid item xs={6} textAlign='center' sx={classes.box}>
                                <Box sx={classes.title}>Description</Box>
                                {status === "view" ?
                                <Box sx={classes.body}>{data.description}</Box> :
                                <TextField id="description" defaultValue={data.description} onChange={handleOnChange}/>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item>
                            <Grid item xs={6} textAlign='center'>
                                {leftButton}
                            </Grid>
                            <Grid item xs={6} textAlign='center'>
                                {rightButton}
                            </Grid>
                        </Grid>
                    </Grid>
                    <AlertDialog 
                    alertTitle={discardAlertTitle}
                    alertMessage={discardAlertMessage}
                    open={discardAlertOpen}
                    handleClose={() => { setDiscardAlertOpen(false) }} // Close the alert dialog
                    handleConfirm={handleDiscardAlertConfirm}
                    handleCancel={() => { setDiscardAlertOpen(false) }}
                    />
                    <AlertDialog 
                    alertTitle={updateAlertTitle}
                    alertMessage={updateAlertMessage}
                    open={updateAlertOpen}
                    handleClose={() => { setUpdateAlertOpen(false) }} // Close the alert dialog
                    handleConfirm={handleUpdateAlertConfirm}
                    handleCancel={() => { setUpdateAlertOpen(false) }}
                    />
                </Grid> 
            </Grid>
        </Grid>
	);
}