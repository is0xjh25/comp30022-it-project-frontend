


import {
    Paper,
    Grid,
    Box,
    Typography,
    LinearProgress,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Avatar,


} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {processPhoto} from '../../api/Photo';

const theme = createTheme({
    palette: {
        RecentActivity: {
            main: '#2ED47A',
            light: '#EBEFF2',
            // dark: '#EBEFF2',
        }
    }

})


export default function RecentActivity() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // console.log(event.toLocaleDateString(undefined, options));

    return (
        <ThemeProvider theme={theme}>
            <Paper boarderRadius={'10px'} elevation={10} sx={{ mx: 4, height:'80vh',
            borderRadius: '20px', px: 5, py: 2, display: 'flex', flexDirection:'column'

            }}>
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{width: '50%', textAlign: 'left', fontWeight: 'bold'}}>
                        8 task completed out of 10
                    </Box>
                    <Box sx={{width: '50%', textAlign: 'right'}}>
                        Show: This week v
                    </Box>
                </Box>

                <LinearProgress variant="determinate" color='RecentActivity' value={80} sx={{my: 2, color: 'red'}}/>


                <Box sx={{display: 'flex', }}>
                    <Box sx={{width: '100%', textAlign: 'left', fontWeight: 'bold', fontSize: 'large'}}>
                        {(new Date()).toLocaleDateString(undefined, options)}
                    </Box>
                </Box>

                <Divider fullWidth sx={{mt: 1}}/>

                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    <Card sx={{my: 2}} >
                        <CardActionArea>
                            <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                        <Typography variant='h5' sx={{width: '50%', fontWeight: 'bold'}}>
                                            Event/ToDo Name
                                        </Typography>
                                    

                                        <Typography sx={{width: '50%', color:'gray', textAlign:'right'}}>
                                            Event/ToDo
                                        </Typography>
                                </Box>

                                <Box sx={{display:'flex', flexDirection:'row'}}>
                                    <Typography>
                                        {'Due Date: '}
                                    </Typography>
                                    <Typography>
                                        DD/MM/YYYY
                                    </Typography>
                                </Box>

                                <Box sx={{display: 'flex', flexDirection: 'row', mt: 2, mb: 1 }}>
                                    <Box sx={{width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center  '}}>
                                        <Avatar src={processPhoto(null)}/>
                                        <Typography sx={{ml: 2}}> HAHAHAH </Typography>
                                    </Box>
                                    <Box sx={{width: '50%', textAlign: 'right'}}>
                                        <Typography>
                                            Done
                                        </Typography>
                                    </Box>

                                </Box>
                                

                            </CardContent>

                        </CardActionArea>
                    </Card>


                </Box>

                
            </Paper>
        </ThemeProvider>

    )
}


 