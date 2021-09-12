import React, { useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

function Resend(props) {

	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	let history = useHistory();

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			setEmail(e.target.value);
		}
    };

	const handleValidation = useCallback(() => {

		let formIsValid = true;

		if (!email) {
		   formIsValid = false;
		   setError("Email cannot be empty (ʘдʘ╬)");
		} else if (typeof email !== "undefined") {
			let lastAtPos = email.lastIndexOf('@');
			let lastDotPos = email.lastIndexOf('.');
			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
			   formIsValid = false;
			   setError("Invalid email 눈_눈");
			}
		}

		return formIsValid;
	}, [email]);

	const handleResend = () => {

		const info = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email: email})
		};

		fetch(`https://comp30022-team35-backend.herokuapp.com/user/resetPassword?email=${email}`, info)
		.then(res => {
			if (res.status === "200") {
				alert("Request is submitted. Please check your mailbox !");
				history.push('/Login');
			if (res.status === "401") {
				alert(res.json('msg'));
				history.push('/Login');
			}}})
		.catch(error => {alert(error);})
	}

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			alert("Please check your email");
			handleResend();
		} else {
		   	alert(error);
		}
	}

	useEffect(() => {}, [email]);

	useEffect(() => {handleValidation();}, [handleValidation]);

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
				<NavLink to = '/Login' variant="2" onClick={() => props.setStatus("signIn")}>
					{"Oops! I just remembered"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to = '/Login' variant="2" onClick={() => props.setStatus("signUp")}>
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
export default Resend;