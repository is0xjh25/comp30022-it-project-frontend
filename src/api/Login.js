const BASE_URL = process.env.REACT_APP_BASE_URL;

// Handle sign in
function handleSignIn(email, password) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/user/login", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Handle Resend
function handleResend(email) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email})
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/user/resetPassword?email=${email}`, info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

// Handle sign up
function handleSignUp (email, password, firstName, lastName, phone, organisation) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password, 
            "firstName": firstName, "lastName": lastName, "phone": phone, "organisation": organisation})
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/user", info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

module.exports = {
    handleSignIn, 
    handleResend, 
    handleSignUp
}
