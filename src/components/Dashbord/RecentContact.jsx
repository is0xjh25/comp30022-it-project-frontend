import React from 'react';
import { processPhoto } from '../../api/Photo';
import Mail from '@material-ui/icons/MailOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
	Paper,
    Box,
	Typography,
	IconButton,
	Link,
	Grid,
	Avatar
} from '@mui/material';

const theme = createTheme({
    palette: {
        RecentActivity: {
            main: '#2ED47A',
            light: '#EBEFF2',
            // dark: '#EBEFF2',
        }
    }

})

export default function RecentContact(){

	return(
		<ThemeProvider theme={theme}>
		<Paper boarderRadius={'10px'} elevation={10} sx={{ m: '10vh', height:'80vh', width:'30vw',
		borderRadius:'20px', px: 4, py: 2, textAlign:"center"}}>
			<Grid container rowSpacing="15">
				<Grid item xs={12}>
					<Typography sx={{}}>
						Recent Contact
					</Typography>
				</Grid>
				<Grid container item xs={10} sx={{alignItems:'center', justifyContent:'center'}}>
					<Grid item xs={2} sx={{alignItems: 'center', justifyContent:'center', bgcolor:"purple"}}>
						<Avatar src={processPhoto("xxx")}>
						</Avatar>
					</Grid>
					<Grid item xs={8}>
						<Grid sx={{bgcolor:"red"}}>
							111
						</Grid>
						<Grid sx={{bgcolor:"orange"}}>
							222
						</Grid>
					</Grid>
					<Grid item xs={2}>
						???
					</Grid>
				</Grid>
				<Grid item xs={2} sx={{bgcolor:"pink"}}>
					<Link color="inherit" href = {`mailto:$email`}>
						<IconButton>
							<Mail />
						</IconButton>
					</Link>
				</Grid>
			</Grid>
			
		</Paper>
		</ThemeProvider>
	)
}