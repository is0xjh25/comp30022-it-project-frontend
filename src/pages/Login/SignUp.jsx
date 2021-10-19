import React, { useState } from 'react';
import Favicon from '../../images/favicon.png'
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory , NavLink } from 'react-router-dom';
import { signUp } from '../../api/Login';
import { setCookie } from '../../api/Util';
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
		fontFamily: 'NTR',
		fontSize: 50,
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	favicon: {
		position: 'relative',
		top:105,
		left: 370,
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
		}
    };

	// Email and password validation check
	const handleValidation = () => {

		let formIsValid = true;
		let alertMessage = "";

		if (!password) {
			formIsValid = false;
			alertMessage = "Password cannot be empty ಠ_ಠ";
		}

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

		if (!phone) {
			formIsValid = false;
			alertMessage = "Phone Number cannot be empty ಠ_ಠ";
		} else if (typeof phone !== "undefined") {
			if (phone.length !== 10) {
			   formIsValid = false;
			   alertMessage = "Invalid phone number 눈_눈";
			}        
		}

		if (!lastName) {
			formIsValid = false;
			alertMessage = "Last Name cannot be empty ಠ_ಠ";
		} else if (typeof lastName !== "undefined") {
			if (!lastName.match(/^[a-zA-Z-]+$/)) {
			   formIsValid = false;
			   alertMessage = "Invalid last name 눈_눈";
			}        
		}

		if (!firstName) {
			formIsValid = false;
			alertMessage = "First Name cannot be empty ಠ_ಠ";
		} else if (typeof firstName !== "undefined") {
			if (!firstName.match(/^[a-zA-Z-]+$/)) {
			   formIsValid = false;
			   alertMessage = "Invalid first name 눈_눈";
			}        
		}

		if (!email && !password && !firstName && !lastName && !phone) {
			formIsValid = false;
			alertMessage = "Hey, just tell me something about you (#｀皿´)";
		}

		if (alertMessage !== "") {
			alert(alertMessage);
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			signUp (email, password, firstName, lastName, phone).then(res => {
			if (res.ok) {
				setCookie('token', res.headers.get("Authorization"), 1)
                res.json().then(resBody => {
                    console.log(resBody);
                })
				alert("Please go to your email and activiate your account");
				history.push('/login');
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
				history.push('/login');
			}
			})
		}
	};

	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div>
			<img src={Favicon} alt='' className={classes.favicon}></img>
			<h3 className={classes.headLine}>Join ConnecTi</h3>
		</div>
		<div className={classes.paper}>
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
			<Grid container sx={{fontSize:14}}>
				<Grid item xs>
				<NavLink to='./Login' onClick={() => props.setPageStatus("resend")}>
					{"Forgot password?"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to='./Login' onClick={() => props.setPageStatus("signIn")}>
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