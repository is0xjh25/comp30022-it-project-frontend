import React, {useState} from 'react';
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

function ForgetPassword(props) {
	
	const [email, setEmail] = useState(0);
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.headLine}>
			<h1>Forget your password ?</h1>
		</div>
		<div className={classes.paper}>
			<Typography style={{fontSize:20}} component="h2" variant="h5">
			Reset password via email address!
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
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				Send
			</Button>
			<Grid container>
				<Grid item xs>
				<NavLink to = '/Login' variant="2" onClick={() => props.setStatus("welcome")}>
					{"Oh! I just remembered."}
				</NavLink>
				</Grid>
				<Grid item>
				<NavLink to = '/Login' variant="2" onClick={() => props.setStatus("register")}>
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
export default ForgetPassword;
