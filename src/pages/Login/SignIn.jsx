import React, { useState } from 'react';
import Favicon from '../../images/favicon.png'
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory , NavLink } from 'react-router-dom';
import { signIn } from '../../api/Login';
import { setCookie } from '../../api/Util';
import { useSnackbar } from 'notistack';
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
		marginTop: theme.spacing(15),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	firstLine: {
		fontFamily: 'NTR',
		fontSize: 30
	},
	secondLine: {
		fontFamily: 'NTR',
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
		marginTop: theme.spacing(2)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignIn(props) {

    const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	let history = useHistory();

	const handleOnChange = (e) => {
		if (e.target.id === "email") {
			setEmail(e.target.value);
		} else if (e.target.id === "password") {
			setPassword(e.target.value);
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
				alertMessage ="Invalid Email 눈_눈";
			}
		}

		if (!email && !password) {
			formIsValid = false;
			alertMessage = "Email and Password cannot be empty (#｀皿´)";
		}

		if (alertMessage !== "") {
			enqueueSnackbar(alertMessage,{variant: 'warning'});    
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		if (handleValidation()) {
			signIn(email, password).then(res => {
			if (res.code===200) {
                history.push('/');
            } else {
				enqueueSnackbar(res.msg,{variant:'error'}); 
                history.push('/Login');
			}
			})
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
			Sign In
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
			<Grid container sx={{fontSize:14}}>
				<Grid item xs>
				<NavLink to='./Login' onClick={()=>props.setPageStatus("resend")}>
					{"Forgot password?"}
				</NavLink>
				</Grid>
				<Grid item >
				<NavLink to='./Login' onClick={()=>props.setPageStatus("signUp")}>
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