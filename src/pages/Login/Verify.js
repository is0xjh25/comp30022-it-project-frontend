import React from 'react';
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router";
import {handleVerify } from '../../api/Login';
import { setCookie } from '../../api/Util';
import { useSnackbar } from 'notistack';


export default function Verify() {
    
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    let token = window.location.href;
    token = token.substring(token.indexOf('?token=') + 7);
    token = 'Bearer ' + token;
    setCookie('token', token, 1);

    handleVerify().then(res => {
        if(res.code === 200) {
            history.push('./Dashboard')
        }else {
            enqueueSnackbar(res.msg,{variant:'error'}); 
        }
    })

    return (
        <Paper>
            Please wait while we activate your account...
        </Paper>
    )
}