import React from 'react';

// Import from MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    FormControl,
    Select,
    OutlinedInput,
    Box
} from '@mui/material'

// A common select dialog implementation, can customize title, message, select items and so on..
export default function DialogSelect(props) {
    const {items, currentSelected ,title , label, open, handleChange, handleClose, handleConfirm} = props;

    return (
    <div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="demo-dialog-native">{label}</InputLabel>
                    <Select
                    native
                    value={currentSelected}
                    onChange={handleChange}
                    input={<OutlinedInput label={label}/>}
                    >
                    <option aria-label="None" value={-1} />
                    {items.map(item => {
                        return (<option key={item.value} value={item.value}>{item.name}</option>)
                    })}
                    </Select>
                </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
