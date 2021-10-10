import React, { useState } from 'react';
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { resend } from '../../api/Login';
import {
	Box,
	Container,
	CssBaseline, 
    Button,
	Grid,
    TextField,
	Typography
} from '@mui/material';

// Style sheet
const useStyles = makeStyles((theme) => ({
	headLine: {
		fontSize: 19,
		fontFamily: 'Optima-Italic',
		marginTop: theme.spacing(30),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},	
	paper: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Resend(props) {

	const classes = useStyles();
	const [email, setEmail] = useState("");

	let history = useHistory();

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			setEmail(e.target.value);
		}
    };

	// Email validation check
	const handleValidation = () => {

		let formIsValid = true;
		let alertMessage = "";

		if (!email) {
		   formIsValid = false;
		   alertMessage = "Email cannot be empty (ʘдʘ╬)";
		} else if (typeof email !== "undefined") {
			let lastAtPos = email.lastIndexOf('@');
			let lastDotPos = email.lastIndexOf('.');
			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
			   formIsValid = false;
			   alertMessage = "Invalid email 눈_눈";
			}
		}

		if (alertMessage !== "") {
			alert(alertMessage);
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			resend(email).then(res => {
				if (res.ok) {
					alert("Request is submitted. Please check your mailbox !");
					history.push('/Login');
				} else {
					res.json().then(bodyRes=>{alert(bodyRes.msg);});
					history.push('/Login');
				}}).catch(error => {alert(error);})
		}
	}

	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.headLine}>
			<h1>Forgot your password ?</h1>
		</div>
		<div className={classes.paper}>
			<Typography component="h1" variant="h5">
			Reset password via email address.
			</Typography>
			<form className={classes.form} noValidate>
			<TextField
				autoFocus
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				onChange={handleOnChange}
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handleSubmit}
			>
				Send
			</Button>
			<Grid container>
				<Grid item xs>
				<NavLink to = '/Login' variant="2" onClick={() => props.setPageStatus("signIn")}>
					{"Oops! I just remembered"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to = '/Login' variant="2" onClick={() => props.setPageStatus("signUp")}>
					{"Don't have an account? Sign Up"}
				</NavLink>
				</Grid>
			</Grid>
			</form>
		</div>
		<Box mt={8}>
			<Copyright />
		</Box>
		</Container>
	);
}
