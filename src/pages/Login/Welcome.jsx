import React from 'react';
import Favicon from './favicon.png'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

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
		height: 40,
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

	const classes = useStyles();
	
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
			<form className={classes.form} noValidate>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
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
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				Sign In
			</Button>
			<Grid container>
				<Grid item xs>
				<NavLink to='./Login' variant="body2" onClick={() => props.setActive("forgetPassword")}>
					{"Forgot password?"}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to='./Login' variant="body2" onClick={() => props.setActive("register")}>
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
export default Welcome;