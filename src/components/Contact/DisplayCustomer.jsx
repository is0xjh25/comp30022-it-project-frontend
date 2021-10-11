import React from 'react';
import { useState, useEffect } from 'react';
import { displayCustomer, deleteCustomer } from '../../api/Contact';
import EditCustomer from './EditCustomer';
import AlertDialog from '../Dialog/AlertDialog';
import { useHistory, useParams } from 'react-router';
import { getMyPermissionLevel } from '../../api/Manage';
import {
    Avatar,
	Box,
    Button,
	Grid,
} from '@mui/material';
import {processPhoto} from '../../api/Photo';

export default function DisplayCustomer(props) {
	
    const history = useHistory();
    const {depId, customerId} = useParams();
    const [authority, setAuthority] = useState(1);
	const [pageStatus, setPageStatus] = useState("view");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

    // Alart Dialog
	const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Delete Confirm';
    const alertMessage = `Do you want to delete ${data.first_name} ${data.last_name}?`;
    const handleDelete = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        confirmDelete();
        setAlertOpen(false);
    }

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
		displayCustomer(customerId).then(res => {
			if (res.code===200) {
				setData(res.data);
                setLoading(false);
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})

        getMyPermissionLevel(depId).then(res => {
            if(res.code === 200) {
                setAuthority(res.data.authority_level);
            }
        });
        
    }, [pageStatus, customerId, depId])

	useEffect(() => {
		return () => {
        }
    }, [loading])

	if (loading) {
        return <div>loading...</div>
    }

	const confirmDelete = () => {
		deleteCustomer(customerId).then(res => {
			if (res.code === 200) {
				alert("Successfully deleted");
				handleBack();
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})
	}

	const handleBack = () => {
        history.goBack();
    }

	const handleEdit = () => {
		setPageStatus("edit");
	}


		
	const showDisplay = 
	(<Grid container rowSpacing={10} sx={{pt:10, px:15}}>
		<Grid container item columnSpacing={4}>
			<Grid item xs={2} textAlign='center' sx={classes.grid}>
				<Avatar src={processPhoto(data.photo)}
					sx={{ width: 1/2, height: 1}}>
				</Avatar>
			</Grid>
			<Grid item xs={5} textAlign='center' sx={classes.box}>
				<Box sx={classes.title} >First Name</Box>
				<Box sx={classes.body}>{data.first_name}</Box>
			</Grid>
			<Grid item xs={5}  textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Last Name</Box>
				<Box sx={classes.body}>{data.last_name}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid item xs={4} textAlign='center'sx={classes.box}>
				<Box sx={classes.title}>Middle Name</Box>
				<Box sx={classes.body}>{data.middle_name}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>organization</Box>
				<Box sx={classes.body}>{data.organization}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Date of Birth</Box>
				<Box sx={classes.body}>{data.birthday}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Phone</Box>
				<Box sx={classes.body}>{data.phone}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Address</Box>
				<Box sx={classes.body}>{data.address}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Customer Type</Box>
				<Box sx={classes.body}>{data.customer_type}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid container item xs={4} textAlign='center' rowSpacing={15}>
				<Grid item xs={12} textAlign='center' sx={classes.box}>
					<Box sx={classes.title}>Email</Box>
					<Box sx={classes.body}>{data.email}</Box>
				</Grid>
				<Grid item xs={12} textAlign='center' sx={classes.box}>
					<Box sx={classes.title}>Gender</Box>
					<Box sx={classes.body}>{data.gender}</Box>
				</Grid>
			</Grid>
			<Grid item xs={8}  textAlign='center' sx={classes.box}>
				<Box sx={classes.title}>Description</Box>
				<Box sx={classes.descriptionBody}>{data.description}</Box>
			</Grid>
		</Grid>
		<Grid container item>
			<Grid item xs={4} textAlign='center'>
				<Button style={classes.backButton} variant="outlined" onClick={handleBack}>Back</Button>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority >= 3 ? <Button style={classes.deleteButton}variant="outlined" onClick={handleDelete}>Delete</Button> : null} 
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority >= 2 ? <Button style={classes.editButton} variant="outlined" onClick={handleEdit}>Edit</Button> : null}
			</Grid>
		</Grid>
	</Grid>)

	return (
			<div>
				{pageStatus === 'view' ? (
					showDisplay
					) : pageStatus === 'edit' ? (
						<EditCustomer setPageStatus={setPageStatus} data={data} customerId={customerId}/>
					): null 
				}
				<AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
                />
			</div>
	);
}