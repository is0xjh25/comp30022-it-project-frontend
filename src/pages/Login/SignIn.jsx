import React, { useState } from 'react';
import Favicon from '../../images/favicon.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { handleSignIn } from '../../api/Login';

const useStyles = makeStyles((theme) => ({
	headLine: {
		marginTop: theme.spacing(15),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	firstLine: {
		fontFamily: 'Optima-Italic',
		fontSize: 30
	},
	secondLine: {
		fontFamily: 'Optima-Italic',
		fontSize: 70,
		marginTop: theme.spacing(0)
	},
	favicon: {
		position: 'relative',
		top:180,
		left: 180,
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

function SignIn(props) {

	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState("");
	
	let history = useHistory();

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			setEmail(e.target.value);
		} else if (e.target.id === "password") {
			setPassword(e.target.value);
		} else if (e.target.id === "remember") {
			setRemember(e.target.checked);
		}
    };

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
				setError("Invalid Email 눈_눈");
			}
		}

		if (!email && !password) {
			formIsValid = false;
			setError("Email and Password cannot be empty (#｀皿´)");
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			handleSignIn(email, password).then(res => {
			if (res.ok) {
                let data = res.headers.get("Authorization");
                if (remember) localStorage.setItem('Token', data);
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
	}
		
	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.headLine}>
			<img src={Favicon} alt='' className={classes.favicon}></img>
			<h3 className={classes.firstLine}>Welcome to</h3>
			<h3 className={classes.secondLine}>ConnecTi</h3>
		</div>
		<div className={classes.paper}>
			<Typography component="h1" variant="h5">
			Sign in
			</Typography>
			<form className={classes.form} noValidate >
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
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
				id="remember"
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
				Sign In
			</Button>
			<Grid container>
				<Grid item xs>
				<NavLink to='./Login' variant="body2" onClick={()=>props.setStatus("resend")}>
					{"Forgot password?"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to='./Login' variant="body2" onClick={()=>props.setStatus("signUp")}>
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
export default SignIn;