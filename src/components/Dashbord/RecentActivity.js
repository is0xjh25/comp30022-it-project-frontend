
import React, { useState, useEffect } from 'react';

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
    Chip


} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { processPhoto } from '../../api/Photo';
import { getMultipleEvents } from '../../api/Event';
import { getMultipleTodos, getAllToDo } from '../../api/ToDoList';



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
    const [eventData, setEventData] = useState([]);
    const [todoData, setTodoData] = useState([]);
    const [data, setData] = useState([]);
    const [stat, setStat] = useState({
        'done' : 0,
        'total': 0
    })

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const startTime = new Date();
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
    const finishTime = new Date(startTime);
    finishTime.setHours(24);

    useEffect(() => {
        getMultipleEvents(startTime.toISOString(), finishTime.toISOString()).then(res => {
            console.log(res);
            setEventData(res.data);
        })

        getAllToDo().then(res => {
            console.log(res);
            const filtered = res.data.filter(record => {
                const date = new Date(record['date_time']);
                return startTime < date && finishTime > date;
            })
            setTodoData(filtered);
            console.log(filtered);
        })

    }, [])

    useEffect(() => {
        const result = [];
        eventData.forEach(elem => {
            elem['date_time'] = elem['start_time'];
            elem['type'] = 'event';
            result.push(elem);
        })
        todoData.forEach(elem => {
            elem['type'] = 'todo';
            if(elem['status'] === 'to do' && (new Date(elem['date_time'])) < (new Date())) {
                elem['status'] = 'in progress'
            }
            result.push(elem);
        })

        result.sort((ele1,ele2) => {
            const date1 = new Date(ele1['date_time']);
            const date2 = new Date(ele2['date_time']);
            return date1 < date2 ? -1 : 1;
        });
        let countDone = 0;
        result.forEach(ele => {
            if(ele.status === 'done') {
                countDone = countDone + 1;
            }
        })
        setStat({
            'total' : result.length,
            'done'  : countDone
        })
        setData(result);
        console.log(result);
    }, [eventData,todoData])


    const getRowLabel = (status) => {
        if (status === "to do") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper boarderRadius={'10px'} elevation={10} sx={{ mx: 4, height:'80vh',
            borderRadius: '20px', px: 5, py: 2, display: 'flex', flexDirection:'column'

            }}>
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{width: '100%', textAlign: 'left', fontWeight: 'bold'}}>
                        {`${stat.done} task completed out of ${stat.total}`}
                    </Box>

                </Box>

                <LinearProgress variant="determinate" color='RecentActivity' value={stat.done * 100.0 /stat.total} sx={{my: 2, color: 'red'}}/>


                <Box sx={{display: 'flex', }}>
                    <Box sx={{width: '100%', textAlign: 'left', fontWeight: 'bold', fontSize: 'large'}}>
                        {(new Date()).toLocaleDateString(undefined, options)}
                    </Box>
                </Box>

                <Divider fullWidth sx={{mt: 1}}/>

                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    {
                        data.map(elem => {
                            const eventTime = new Date(elem['date_time']);
                            

                            return (
                                <Card raised sx={{my: 2, mx: '5%', width: '90%'}} >
                                <CardActionArea>
                                    <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                                <Typography variant='h5' sx={{width: '50%', fontWeight: 'bold'}}>
                                                    {elem.description}
                                                </Typography>
                                            
        
                                                <Typography sx={{width: '50%', color:'gray', textAlign:'right'}}>
                                                    {elem.type}
                                                </Typography>
                                        </Box>
        
                                        <Box sx={{display:'flex', flexDirection:'row'}}>
                                            <Typography>
                                                {'Start Time: '}
                                            </Typography>
                                            <Typography>
                                                {eventTime.toTimeString().slice(0, 5)}
                                            </Typography>
                                        </Box>
        
                                        <Box sx={{display: 'flex', flexDirection: 'row', mt: 2, mb: 1 }}>
                                            <Box sx={{width: '100%', textAlign: 'right'}}>
                                                {getRowLabel(elem.status)}
                                            </Box>
        
                                        </Box>
                                        
        
                                    </CardContent>
        
                                </CardActionArea>
                            </Card>
                            )
                        })
                    }



                </Box>

                
            </Paper>
        </ThemeProvider>

    )
}


 