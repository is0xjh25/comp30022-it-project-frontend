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
    return new Promise((resolve) => {
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
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Update the current user's information
function updateUserInfo(body) {
    return new Promise((resolve) => {
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
        })
    })
}

// Reference: https://www.cnblogs.com/tugenhua0707/p/3776808.html
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,
       "d+" : this.getDate(),
       "H+" : this.getHours(),
       "m+" : this.getMinutes(),
       "s+" : this.getSeconds(),
       "q+" : Math.floor((this.getMonth()+3)/3),
       "S"  : this.getMilliseconds()
   };
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

const formatTime = function(time, format) {
    var d = new Date(time);
    return(d.format(format))
}

// Convert time to local time zone
function toLocalTime(time) {
    const localTime = new Date(time)
    return localTime.toLocaleString("en-AU");
}

// Check whether the email is valid
function checkEmail(email) {
    //check email
    let lastAtPos = email.lastIndexOf('@');
    let lastDotPos = email.lastIndexOf('.');
    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        return false;
    }
    else{
        return true;
    }
}

export {
    getCookie,
    setCookie,
    deleteUserToken,
    checkUnauthorized,
    getUserInfo,
    updateUserInfo,
    toLocalTime,
    formatTime,
    checkEmail
}