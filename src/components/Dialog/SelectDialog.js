import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from "@material-ui/core/Box";

export default function DialogSelect(props) {
    const {items, currentSelected ,title , label, open, handleChange, handleClose, handleConfirm} = props;

    return (
    <div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
