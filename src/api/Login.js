

// Return token
export default function handleSignIn(email, password) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email": email, "password": password})
    };
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASE_URL + "/user/login", info)
        .then(res => {
            // if (res.ok) {
            //     let data = res.headers.get("Authorization");
            //     if (remember) localStorage.setItem('Token', data);
            //     sessionStorage.setItem('Token', data);
            //     history.push('/');
            // } else {
            //     res.json().then(bodyRes=>{alert(bodyRes.msg);});
            //     history.push('/Login');
            resolve(res)
            })
        .catch(error => {alert(error);})
    })
}