function handleSignIn(email, password) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password})
    };
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASE_URL + "/user/login", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

function handleResend(email) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email})
    };

    return new Promise((resolve, reject) => {
    fetch(`https://comp30022-team35-backend.herokuapp.com/user/resetPassword?email=${email}`, info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

function handleSignUp (email, password, firstName, lastName, phone, organisation) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password, 
            "firstName": firstName, "lastName": lastName, "phone": phone, "organisation": organisation})
    };
    return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_BASE_URL + "/user", info)
    .then(res => {
        if (res.ok) {
            alert("Welcom to join ConnecTI !");
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}



export default {handleSignIn, handleResend, handleSignUp};
