import { getCookie, setCookie, checkUnauthorized } from "./Util";
const BASE_URL = process.env.REACT_APP_BASE_URL;


// Login page signin
function signIn(email, password) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password})
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/user/login", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            if (res.ok) {
                setCookie('token', res.headers.get("Authorization"), 1)
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}


// Request email for reset passward
function resend(email) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email})
    };

    return new Promise((resolve) => {
    fetch(BASE_URL + "/user/resetPassword", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}


// Sign up as a new member
function signUp (email, password, firstName, lastName, phone) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({
            "email": email, 
            "password": password, 
            "first_name": firstName, 
            "last_name": lastName, 
            "phone": phone
        })
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/user", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}

// Logout
function logout() {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/user/logout", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}

function handleVerify() {
    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/user/verify", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}

export {
    signIn,
    resend,
    signUp,
    logout,
    handleVerify
}
