import * as React from 'react';
import { useState, useEffect } from 'react';
// Import from MUI
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useSnackbar } from 'notistack';
import {
    TextField,
    Stack,
    Button,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
} from '@mui/material';

// Import from local
import { createNewToDo } from '../../api/ToDoList';

export default function AddToDo(props) {
    
    const { enqueueSnackbar } = useSnackbar();
    const { open, handleClose, update } = props;
    // Attributes for creating to-do
    const [time, setTime] = useState(new Date());
    const [description, setDescription] = useState("");

    useEffect(() => {
        setTime(new Date());
        setDescription("");
    }, [open])

    const handleOnChange = (e) => {
        if (e.target.id === "description") {
            setDescription(e.target.value);
        }
    }

    const handleCreate = () => {
        const dateTime = time.toISOString();
        const data = {
            "date_time": dateTime,
            "description": description,
            "status": "to do"
        }

        createNewToDo(data).then(res => {
            if (res.code===200) {
                enqueueSnackbar("Successfully created!",{variant:'success'});
                update();
                handleClose();
            } else {
                enqueueSnackbar(res.msg,{variant:'error'});
            }
        })
    }

    return (
        <Dialog fullWidth maxWidth='xs' open={open}>
            <DialogTitle>Create new to-do event</DialogTitle>
            <DialogContent>
                <Stack
                    justifyContent="center" 
                    alignItems="center"
                    spacing={2}
                    sx={{mt: 1}}
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            label="Select time"
                            value={time}
                            onChange={setTime}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        sx={{width: '65%'}}
                        id="description"
                        label="Enter description"
                        onChange={handleOnChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={() => {handleClose()}}>Discard</Button>
                <Button variant="text" onClick={() => {handleCreate()}}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}
