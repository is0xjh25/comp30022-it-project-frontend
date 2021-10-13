


import {
    Paper,
    Grid,
    Box,
    Typography
} from '@mui/material';



export default function RecentActivity() {
    return (
        <Paper boarderRadius={'10px'} elevation={10} sx={{ m: '10vh', height:'80vh', width:'45vw',
        borderRadius: '20px',

        }}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                <Box sx={{display: 'flex', justifySelf: 'flex-start'}}>
                    8 task completed out of 10
                </Box>
                <Box sx={{justifySelf: 'end'}}>
                    Show: This week v
                </Box>
            </Box>
        </Paper>
    )
}


 