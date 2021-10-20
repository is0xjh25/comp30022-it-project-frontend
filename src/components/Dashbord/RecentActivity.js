
import React, { useState, useEffect } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useHistory } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getMultipleEvents } from '../../api/Event';
import { getAllToDo } from '../../api/ToDoList';
import {formatTime} from '../../api/Util';
import { useSnackbar } from 'notistack';
import {
    Paper,
    Box,
    Typography,
    LinearProgress,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Chip,
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


export default function RecentActivity() {

    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [startTime, setStartTime] = useState(new Date());
    const [eventData, setEventData] = useState([]);
    const [todoData, setTodoData] = useState([]);
    const [data, setData] = useState([]);
    const [stat, setStat] = useState({
        'done' : 0,
        'total': 0
    })

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



    useEffect(() => {
        // const startTime = showDate == null ? new Date() : showDate(showDate);
        startTime.setHours(0);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        const finishTime = new Date(startTime);
        finishTime.setHours(24);
        getMultipleEvents(startTime.toISOString(), finishTime.toISOString()).then(res => {
            setEventData(res.data);
        })

        getAllToDo().then(res => {
            const filtered = res.data.filter(record => {
                const date = new Date(record['date_time']);
                return startTime < date && finishTime > date;
            })
            setTodoData(filtered);
        })

    }, [startTime])

    useEffect(() => {
        const result = [];
        eventData.forEach(elem => {
            elem['date_time'] = elem['start_time'];
            elem['type'] = 'event';
            result.push(elem);
        })
        todoData.forEach(elem => {
            elem['type'] = 'todo';

            result.push(elem);
        })

        result.sort((ele1,ele2) => {
            if(ele1.status !== ele2.status) {
                if(ele1.status === 'done') {
                    return 1;
                }
                if(ele2.status === 'done') {
                    return 1;
                }
            }
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
        if (status === "to do" || status === "upcoming") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }
    }

    const handleOnClick = (e) => {
        // if (e.type === "todo") {
        //     history.push(`/Events`);
        // } else if (e.type === "event") {
            
        // }
        history.push(`/Events`);
    }

    // const handleOnSelect = (e) => {
    //     console.log(e);
    // }

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


                <Box sx={{display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{textAlign: 'left', fontWeight: 'bold', fontSize: 'large'}}>
                        {startTime.toLocaleDateString(undefined, options)}
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DesktopDatePicker
                                id="dashboardDate"
                                inputFormat="yyyy-MM-dd"
                                value={new Date(startTime)}
                                onChange={(time) => setStartTime(time)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box ref={inputRef} sx={{ display: "flex", alignItems: "center" }}>
                                      {InputProps?.endAdornment}
                                    </Box>
                                  )}
                        />
                    </LocalizationProvider>
                </Box>

                <Divider fullWidth sx={{mt: 1}}/>

                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    { data.length === 0 && 
                        <Typography variant='h5' sx={{my: 3,width: '100%', fontWeight: 'bold'}}>
                            Nothing happening today~
                        </Typography>

                    }
                    
                    {
                        data.map(elem => {
                            

                            return (
                                <Card raised sx={{my: 2, mx: '5%', width: '90%'}} >
                                <CardActionArea onClick = {() => handleOnClick(elem)}>
                                    <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                                <Typography variant='h5' sx={{width: '50%', fontWeight: 'bold'}}>
                                                    {elem.description}
                                                </Typography>
                                            
        
                                                <Typography sx={{width: '50%', color:'gray', textAlign:'right'}}>
                                                    {elem.type}
                                                </Typography>
                                        </Box>
                                        {elem.type === 'todo' && 
                                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography>
                                                    {'Due Time: '}
                                                </Typography>
                                                <Typography>
                                                    {(new Date(elem['date_time'])).toTimeString().slice(0, 5)}
                                                </Typography>
                                            </Box>
                                        }

                                        {
                                            elem.type === 'event' &&
                                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography>
                                                    {'Time period: '}
                                                </Typography>
                                                <Typography>
                                                    {`${formatTime(elem['start_time'], 'MM-dd HH:mm')} ~ ${formatTime(elem['finish_time'], 'MM-dd HH:mm')}`}
                                                </Typography>
                                            </Box>
                                        }

        
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


 