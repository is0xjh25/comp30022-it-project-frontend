import React, { useState } from 'react';
import Favicon from '../../images/favicon.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { handleSignUp } from '../../api/Login';

const useStyles = makeStyles((theme) => ({
	headLine: {
		fontFamily: 'Optima-Italic',
		fontSize: 50,
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	favicon: {
		position: 'relative',
		top:100,
		left: 360,
		width: 40,
		height: 40
	},		
	paper: {
		marginTop: theme.spacing(0),
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


export default function SignUp(props) {

	const classes = useStyles();	
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [organisation, setOrganisation] = useState("");
	const [error, setError] = useState("");

	let history = useHistory();

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			setEmail(e.target.value);
		} else if (e.target.id === "password") {
			setPassword(e.target.value);
		} else if (e.target.id === "firstName") {
			setFirstName(e.target.value);
		} else if (e.target.id === "lastName") {
			setLastName(e.target.value);
		} else if (e.target.id === "phone") {
			setPhone(e.target.value);
		} else if (e.target.id === "organisation") {
			setOrganisation(e.target.value);
		}
    };

	// Email and password validation check
	const handleValidation = () => {

		let formIsValid = true;
		
		if (!password) {
			formIsValid = false;
			setError("Password cannot be empty ಠ_ಠ");
		}

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

		if (!phone) {
			formIsValid = false;
			setError("Phone Number cannot be empty ಠ_ಠ");
		} else if (typeof phone !== "undefined") {
			if (phone.length !== 10) {
			   formIsValid = false;
			   setError("Invalid phone number 눈_눈");
			}        
		}

		if (!lastName) {
			formIsValid = false;
			setError("Last Name cannot be empty ಠ_ಠ");
		} else if (typeof lastName !== "undefined") {
			if (!lastName.match(/^[a-zA-Z-]+$/)) {
			   formIsValid = false;
			   setError("Invalid last name 눈_눈");
			}        
		}

		if (!firstName) {
			formIsValid = false;
			setError("First Name cannot be empty ಠ_ಠ");
		} else if (typeof firstName !== "undefined") {
			if (!firstName.match(/^[a-zA-Z-]+$/)) {
			   formIsValid = false;
			   setError("Invalid first name 눈_눈");
			}        
		}

		if (!email && !password && !firstName && !lastName && !phone) {
			formIsValid = false;
			setError("Hey, just tell me something about you (#｀皿´)");
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			handleSignUp (email, password, firstName, lastName, phone, organisation).then(res => {
			if (res.ok) {
				alert("Welcom to join ConnecTI !");
				let data = res.headers.get("Authorization");
				sessionStorage.setItem('Token', data);
				history.push('/');
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
				history.push('/Login');
			}
			})
		} else {
		   	alert(error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div>
			<img src={Favicon} alt='' className={classes.favicon}></img>
			<h3 className={classes.headLine}>Join ConnecTi</h3>
		</div>
		<div className={classes.paper} fontWeight="fontWeightBold">
			<Typography component="h1" variant="h5">
			Personal Information
			</Typography>
			<form className={classes.form} noValidate>
			<TextField
				autoFocus
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="firstName"
				label="First Name"
				name="firstName"
				autoComplete="given-name"
				onChange={handleOnChange}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="lastName"
				label="Last Name"
				name="lastName"
				autoComplete="family-name"
				onChange={handleOnChange}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="phone"
				label="Phone Number"
				name="phone"
				autoComplete="phone"
				onChange={handleOnChange}
			/>
			<TextField
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
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				onChange={handleOnChange}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				id="organisation"
				label="Join Organisation (optional)"
				name="organisation"
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
				Sign up
			</Button>
			<Grid container>
				<Grid item xs>
				<NavLink to='./Login' variant="body2" onClick={() => props.setStatus("resend")}>
					{"Forgot password?"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to='./Login' variant="body2" onClick={() => props.setStatus("signIn")}>
					{"Already have an account"}
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