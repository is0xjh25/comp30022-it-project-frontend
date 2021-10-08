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

import { createNewToDo } from '../../api/ToDoList';

export default function AddToDo(props) {
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
            if (res.code === 200) {
                alert("Create new to-do successfully");
                update();
                handleClose();
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
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Select time"
                            inputFormat="yyyy-MM-dd"
                            value={time}
                            onChange={setTime}
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
                <Button variant="text" onClick={() => {handleCreate()}}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}
