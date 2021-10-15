


import {
    Paper,
    Grid,
    Box,
    Typography,
    LinearProgress,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    return (
        <ThemeProvider theme={theme}>
            <Paper boarderRadius={'10px'} elevation={10} sx={{ m: '10vh', height:'80vh', width:'40vw',
            borderRadius: '20px', px: 4, py: 2

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


                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{width: '50%', textAlign: 'left', fontWeight: 'bold'}}>
                        8 task completed out of 10
                    </Box>
                    <Box sx={{width: '50%', textAlign: 'right'}}>
                        Show: This week v
                    </Box>
                </Box>

                
            </Paper>
        </ThemeProvider>

    )
}


 