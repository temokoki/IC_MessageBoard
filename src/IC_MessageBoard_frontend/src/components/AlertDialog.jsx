import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function AlertDialog(props) {
    return (
        <Dialog open={props.open}>
            <DialogContent>
                <DialogTitle>
                </DialogTitle>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={props.close} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}