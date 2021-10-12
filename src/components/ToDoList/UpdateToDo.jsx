import * as React from 'react';
import { useState, useEffect } from 'react';

// Import from MUI
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    TextField,
    Stack,
    Button,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle
} from '@mui/material';

// Import from local
import { updateToDo } from '../../api/ToDoList';

export default function UpdateToDo(props) {
    const { original, open, handleClose, update } = props;

    // Attributes for updating to-do
    const [time, setTime] = useState(new Date());
    const [description, setDescription] = useState(original.description);

    useEffect(() => {
        setTime(new Date());
        setDescription("");
    }, [open])

    // const handleChangeTime = (e) => {
    //     setTime(e);
    // }

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
            <DialogTitle >Update your to-do event</DialogTitle>
            <DialogContent>
                <Stack 
                    justifyContent="center" 
                    alignItems="center"
                    spacing={2}
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            renderInput={(params) => <TextField {...params} />}
                            label="Select time"
                            value={time}
                            onChange={(e) => {
                                setTime(e)
                            }}
                            sx={{mt: 2}}
                        />
                    </LocalizationProvider>
                    <TextField
                        id="description"
                        label="Enter description"
                        onChange={handleOnChange}
                        sx={{mt: 2}}
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
