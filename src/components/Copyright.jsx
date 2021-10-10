import {
	Typography,
	Link
} from '@mui/material';


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://www.unimelb.edu.au">
			ConnecTI
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
		</Typography>
	);
}

export default Copyright;
