import { getCookie, checkUnauthorized } from "./Util";

const BASE_URL = process.env.REACT_APP_BASE_URL;


// Login page signin
function handleSignIn(email, password) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/user/login", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}


// Request email for reset passward
function handleResend(email) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email})
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/user/resetPassword", info)
    .then(res => {
        if(checkUnauthorized(res)) {
            return;
        }
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}


// Sign up as a new member
function handleSignUp (email, password, firstName, lastName, phone, organization) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password, 
            "first_name": firstName, "last_name": lastName, "phone": phone, "organization": organization})
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/user", info)
    .then(res => {
        if(checkUnauthorized(res)) {
            return;
        }
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

// Logout
function handleLogout() {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/user/logout", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

function handleVerify() {
    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/user/verify", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
        })
        .catch(error => {reject(error);})
    })
}

export {
    handleSignIn,
    handleResend,
    handleSignUp,
    handleLogout,
    handleVerify
}
