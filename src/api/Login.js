const BASE_URL = process.env.REACT_APP_BASE_URL;

// Set cookie when login
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

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
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}


// Sign up as a new member
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
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

module.exports = {
    setCookie,
    handleSignIn,
    handleResend,
    handleSignUp,
    handleLogout
}
