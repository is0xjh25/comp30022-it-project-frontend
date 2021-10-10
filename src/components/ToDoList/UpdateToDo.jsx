import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Dialog, DialogTitle } from '@mui/material';

import { updateToDo } from '../../api/ToDoList';

export default function UpdateToDo(props) {
    const { original, open, handleClose, update } = props;

    // Attributes for updating to-do
    const [time, setTime] = useState(new Date());
    // const [dateTime, setDateTime] = useState(new Date());
    const [description, setDescription] = useState(original.description);

    useEffect(() => {
        setTime(new Date());
        setDescription("");
    }, [open])

    const handleChangeTime = (e) => {
        setTime(e);
    }

    const handleOnChange = (e) => {
        if (e.target.id === "description") {
            setDescription(e.target.value);
        }
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    const handleUpdate = () => {
        const dateTime = time.toISOString();

        let dataDescription = description;
        if (isBlank(description) ) {
            dataDescription = original.description;
        }
        
        const data = {
            "id": original.id,
            "date_time": dateTime,
            "description": dataDescription,
            "status": "to do"
        }

        updateToDo(data).then(res => {
            if (res.code === 200) {
                alert("To-do updated successfully");
                update();
                handleClose();
            }
        })
    }

    return (
        <Dialog fullWidth maxWidth='xs' open={open}>
            <DialogTitle>Update your to-do event</DialogTitle>
            <DialogContent>
                <Stack 
                    justifyContent="center" 
                    alignItems="center"
                    spacing={2}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Select time"
                            value={time}
                            onChange={handleChangeTime}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        id="description"
                        label="Enter description"
                        onChange={handleOnChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={() => {handleClose()}}>Discard</Button>
                <Button variant="text" onClick={() => {handleUpdate()}}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
