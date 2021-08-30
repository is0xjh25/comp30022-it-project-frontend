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

const useStyles = makeStyles((theme) => ({
	headLine: {
		fontFamily: 'Optima-Italic',
		fontSize: 50,
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	favicon: {
		position: 'relative',
		top:140,
		left: 360,
		width: 40,
		height: 40
	},		
	paper: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	}
}));


function Welcome(props) {

	const [firstName, setFirstName] = useState(0);
	const [lastName, setLastName] = useState(0);
	const [phone, setPhone] = useState(0);
	const [email, setEmail] = useState(0);
	const [password, setPassword] = useState(0);
	const [org, setOrg] = useState(0);
	const classes = useStyles();

	let validateForm = () => (this.email.length > 0 && this.password.length > 0);

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
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="firstName"
				label="First Name"
				name="firstName"
				autoComplete="given-name"
				autoFocus
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
			/>
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				id="organisation"
				label="Join Organisation (optional)"
				name="organisation"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
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
export default Welcome;