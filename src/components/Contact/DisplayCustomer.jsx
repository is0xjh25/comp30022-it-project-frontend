import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	header: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	bot: {
		fontSize: 50,
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	left: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	leftText:{
		margin: theme.spacing(2),
		fontSize: 20,
	},
	right: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	name: {
		fontSize: 60,
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	email: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	phone: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	description: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	gender: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	birthday: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	address: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	age: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	organization: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	customer_type: {
		fontSize: 30,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(10),
	},
	button_div: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(0),
		flexDirection: 'row',
	},
	edit_button: {
		fontSize: 20,
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(30),
		background: 'white'
	},
	delete_button: {
		fontSize: 20,
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(30),
		background: 'pink'
	},
	back_button: {
		fontSize: 20,
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(30),
		background: 'white'
	}	
}));

export default function DisplayCustomer(customerID) {
	
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const classes = useStyles();
	
	useEffect(() => {
        setLoading(false);
    }, [])

	useEffect(() => {
        
		const test =  [
			{
				"department_id": 1,
				"email": "qqq@gmail.com",
				"firstName": "JoJo",
				"lastName": "JJ",
				"phone": 1234567890,
				"description": "Cute boy",
				"gender": "male",
				"birthday": "31/02/2000",
				"age": 21,
				"address": "Grattan Street, Parkville, Victoria, 3010",
				"organization": "KFC",
				"customer_type": "who never buy"
            }
		]
		
		return () => {
            setData(test[0]);
        }
    }, [loading])

	if (loading) {
        return <div>loading...
        </div>
    }

	

	return (
		
			<div>
				<Grid className={classes.header}>
					<Typography className={classes.name} style={{ fontWeight: 600 }}>
					{data.firstName} {data.lastName}
					</Typography>
				</Grid>			
				<Grid container>
					<Grid item xs={6} className={classes.left}> 
						<Typography className={classes.leftText}>
						<Typography className={classes.organization} style={{ fontWeight: 600 }}>
							Orgnization:
						</Typography>
						<Typography className={classes.organization}>
							{data.organization}
						</Typography>
						<Typography className={classes.organization} style={{ fontWeight: 600 }}>
							Email: 
						</Typography>
						<Typography className={classes.email}>
							{data.email}
						</Typography>
						<Typography className={classes.phone} style={{ fontWeight: 600 }}>
							Phone Number:
						</Typography>
						<Typography className={classes.phone}>
							{data.phone}
						</Typography>
						<Typography className={classes.address} style={{ fontWeight: 600 }}>
							Address:
						</Typography>
						<Typography className={classes.address}>
							{data.address}
						</Typography>
						</Typography>
					</Grid>
					<Grid item xs={6} className={classes.right}>
						<Typography className={classes.gender} style={{ fontWeight: 600 }}>
							Gender:
						</Typography>
						<Typography className={classes.gender}>
							{data.gender}
						</Typography>
						<Typography className={classes.birthday} style={{ fontWeight: 600 }}>
							Birthday:
						</Typography>
						<Typography className={classes.birthday}>
							{data.birthday} (age: {data.age})
						</Typography>
						<Typography className={classes.description} style={{ fontWeight: 600 }}>
							Description:
						</Typography>
						<Typography className={classes.description}>
							{data.description}
						</Typography>
						<Typography className={classes.customer_type} style={{ fontWeight: 600 }}>
							Customer Type:
						</Typography> 
						<Typography className={classes.customer_type}>
							{data.customer_type}
						</Typography> 
					</Grid>
				</Grid>
				<Grid container className={classes.button_div}>
					<Grid item xs={4}>
						<Button className={classes.back_button}>
							Back
						</Button>
					</Grid>
					<Grid item xs={4}>
						<Button className={classes.delete_button}>
							Delete
						</Button>
					</Grid>
					<Grid item xs={4}>
						<Button className={classes.edit_button}>
							Edit
						</Button>
					</Grid>
				</Grid>
			</div>
	)
}


						
				