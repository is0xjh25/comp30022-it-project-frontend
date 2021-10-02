const BASE_URL = process.env.REACT_APP_BASE_URL;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Set cookie when login
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Deletes the token of the user
function deleteUserToken() {
    setCookie('token', '', 0);
}

// Check if a user is not logged in, and redirects to login page
function checkUnauthorized(res) {
    console.log(res);
    if(res.status === 401) {
        document.location.href = '/login';
        console.log("Currently unauthorized, please login!");
        deleteUserToken();
        
        return true;
    }else {
        return false;
    }
}

// Get the current user's information
function getUserInfo() {
    return new Promise((resolve, reject) => {
        const token = getCookie('token');
        const url = BASE_URL + '/user'
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Origin': process.env.ORIGIN_URL
            }
        }).then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            console.log("here");
            res.json().then(resBody => {
                resolve(resBody)
            })
        }).catch(err => {
            reject(err);
        })
    })
}

// Update the current user's information
function updateUserInfo(body) {
    return new Promise((resolve, reject) => {
        const token = getCookie('token');
        const url = BASE_URL + '/user'
        fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
                'Origin': process.env.ORIGIN_URL
            },
            body: JSON.stringify(body)
        }).then(res => {
            res.json().then(resBody => {
                resolve(resBody)
            })
        }).catch(err => {
            reject(err);
        })
    })
}

export {
    getCookie,
    setCookie,
    deleteUserToken,
    checkUnauthorized,
    getUserInfo,
    updateUserInfo
}