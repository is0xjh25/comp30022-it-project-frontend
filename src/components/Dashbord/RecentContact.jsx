import { React, useState, useEffect} from 'react';
import { processPhoto } from '../../api/Photo';
import Mail from '@material-ui/icons/MailOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getRecentCustomer } from '../../api/Contact';
import { toLocalTime } from '../../api/Util';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import {
	Paper,
    Box,
	Typography,
	Button,
	IconButton,
	Link,
	Grid,
	Avatar,
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

export default function RecentContact() {
	
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const [recentContact, setRecentContact] = useState([]);
	const classes = {
		title: {
			fontSize:30,
			fontFamily:'NTR',
			fontWeight:'bold',
			bgcolor:'#35baf6',
			borderRadius:100
		},
	};

	const getContact = () => {
		getRecentCustomer(7).then(res => {
			if (res.code===200) {
				setRecentContact(res.data);
			} else {
				enqueueSnackbar(res.msg,{variant: 'error'});
			}
		})
	};

	const handleSingleContact = (e) => { 
		history.push(`/Contacts/${e.organization_id}/${e.department_id}/${e.id}`);
	}

	useEffect(() => {
		getContact();
	}, []);

	return(
		<ThemeProvider theme={theme}>
		<Paper boarderRadius={'10px'} elevation={10} sx={{ mx: 4, height:'80vh',
			borderRadius:'20px', px: 2, py: 2, textAlign:"center", display: 'flex', flexDirection: 'column'}}>

			<Typography sx={classes.title}>
				Recent Contact
			</Typography>
            <Box sx={{flexGrow: 1, overflow: 'auto'}}>

                { recentContact.length === 0 && 
                    <Typography variant='h5' sx={{my: 3,width: '100%', fontWeight: 'bold'}}>
                        Check out some contact first~
                    </Typography>

                }
                {recentContact.map((c) => {						
				return (
					<Box 
						key={c.id}
						value={c}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							height: 80,
							borderRadius: 2,
							boxShadow: '0 5px 5px 5px rgba(105, 105, 105, .3)',
							my: '5%',
                            mx: 1
						}}
					>
						<Box
							sx={{
								display: 'flex', 
								width: "90%",
								height: "100%",
							}} 
						>	
							<Button sx={{minHeight:"100%", minWidth:"100%"}} onClick={()=>handleSingleContact(c)}>
								<Grid container sx={{alignItems:'center', justifyContent:'center'}} >
									<Grid item xs={2} sx={{alignItems:'center', justifyContent:'center'}}>
										<Avatar src={processPhoto(c.photo)}>
										</Avatar>
									</Grid>
									<Grid container item xs={7}>
										<Grid item xs={12}>
											<Typography sx={{color:"#191919", fontSize:15, overflowWrap:"break-word"}}>{c.first_name} {c.last_name}</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography sx={{color:"#262626", fontSize:10, overflowWrap:"break-word"}}>{c.email}</Typography>
										</Grid>
									</Grid>
									<Grid item xs={3}>
										<Grid>
											<Typography sx={{color:"#262626", fontSize:10, overflowWrap:"break-word"}}>{toLocalTime(c.last_contact)}</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Button>
						</Box>
						<Box
							sx={{
								display: 'flex', 
								width: "10%",
								height: "100%",
								borderTopRightRadius:2,
								borderBottomRightRadius:2,
							}} 
						>
							<Link href = {`mailto:${c.email}`}>
								<IconButton sx={{minHeight:"100%", minWidth:"100%", align:"left"}}>
									<Mail/>
								</IconButton>
							</Link>
						</Box>
					</Box>
				)})
			}
            </Box>
			
		</Paper>
		</ThemeProvider>
	)
}