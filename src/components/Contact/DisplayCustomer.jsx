import React from 'react';
import { useState, useEffect } from 'react';
import { displayCustomer, deleteCustomer } from '../../api/Contact';
import EditCustomer from './EditCustomer';
import AlertDialog from '../Dialog/AlertDialog';
import { useHistory, useParams } from 'react-router';
import { getMyPermissionLevel } from '../../api/Manage';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import {
    Avatar,
	Box,
	Grid,
	IconButton
} from '@mui/material';


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
		  	position:'static',
		  	fontFamily:'NTR',
		  	fontWeight:'bold',
		  	bgcolor:'#35baf6',
		  	borderRadius:15
	  	},
		body: {
			fontSize:25,
			fontFamily:'Arial',
			borderColor: 'black',
			textAlign:'center',
			m: 1,
			px:5
		},
		descriptionBody: {
			fontSize:25,
			fontFamily:'Arial',
			borderColor: 'black',
			textAlign:'left',
			m: 1,
			px:5
		},
		grid: {
			display:'flex', 
			justifyContent:'center', 
			alignItems:'center',
			color:'black'
		}
	};

	// Fetch data
	useEffect(() => {
		displayCustomer(customerId).then(res => {
			if (res.code===200) {
				console.log(res.data.birthday);
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
	(<Grid container rowSpacing={8} sx={{pt:10, px:15}}>
		<Grid container item columnSpacing={4}>
			<Grid item xs={2} textAlign='center' sx={classes.grid}>
				<Avatar src={`data:image/gif;base64,${data.photo}`}
					sx={{ width: 1/2, height: 1}}>
				</Avatar>
			</Grid>
			<Grid item xs={5} textAlign='center' rowSpacing={10}>
				<Box sx={classes.title} >First Name</Box>
				<Box sx={classes.body}>{data.first_name !== "" ? data.first_name : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={5}  textAlign='center'>
				<Box sx={classes.title}>Last Name</Box>
				<Box sx={classes.body}>{data.last_name !== "" ? data.last_name : "~No Record~"}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>Middle Name</Box>
				<Box sx={classes.body}>{data.middle_name !== "" ? data.middle_name : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>organization</Box>
				<Box sx={classes.body}>{data.organization !== "" ? data.organization : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>Date of Birth</Box>
				<Box sx={classes.body}>{data.birthday !== null ? data.birthday : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>Phone</Box>
				<Box sx={classes.body}>{data.phone !== "" ? data.phone : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>Address</Box>
				<Box sx={classes.body}>{data.address !== "" ? data.address : "~No Record~"}</Box>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				<Box sx={classes.title}>Customer Type</Box>
				<Box sx={classes.body}>{data.customer_type !== "" ? data.customer_type : "~No Record~"}</Box>
			</Grid>
		</Grid>
		<Grid container item rowSpacing={5} columnSpacing={3}>
			<Grid container item xs={4} textAlign='center' rowSpacing={15}>
				<Grid item xs={12} textAlign='center'>
					<Box sx={classes.title}>Email</Box>
					<Box sx={classes.body}>{data.email !== "" ? data.email : "~No Record~"}</Box>
				</Grid>
				<Grid item xs={12} textAlign='center'>
					<Box sx={classes.title}>Gender</Box>
					<Box sx={classes.body}>{data.gender !== "" ? data.gender : "~No Record~"}</Box>
				</Grid>
			</Grid>
			<Grid item xs={8}  textAlign='center' >
				<Box sx={classes.title}>Description</Box>
				<Box sx={classes.descriptionBody}>{data.description !== "" ? data.description : "~No Record~"}</Box>
			</Grid>
		</Grid>
		<Grid container item>
			<Grid item xs={4} textAlign='center'>
				<IconButton>
					<ArrowBackSharpIcon color="error" fontSize="large" onClick={handleBack}/>
				</IconButton>
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority >= 3 ? 
				<IconButton>
					<DeleteIcon color="secondary" fontSize="large" onClick={handleDelete}/>
				</IconButton> : null}	
			</Grid>
			<Grid item xs={4} textAlign='center'>
				{authority >= 2 ? 
				<IconButton>
					<EditSharpIcon color="primary" fontSize="large" onClick={handleEdit}/>
				</IconButton> : null}	
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