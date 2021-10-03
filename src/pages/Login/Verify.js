import React from 'react';
import { Paper } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router";

import {handleVerify } from '../../api/Login';
import { setCookie } from '../../api/Util';


export default function Verify() {
    const {url, path} = useRouteMatch();
    const history = useHistory();
    console.log(url);
    console.log(path);
    let token = window.location.href;
    token = token.substring(token.indexOf('?token=') + 7);
    token = 'Bearer ' + token;
    setCookie('token', token, 1);

    handleVerify().then(res => {
        if(res.code === 200) {
            console.log(res);
            history.push('./Dashboard')
        }else {
            alert(res.msg);
        }
        
    })

    return (
        <Paper>
            Please wait while we activate your account...
        </Paper>
    )
}