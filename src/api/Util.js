
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
            res.json().then(resBody => {
                resolve(resBody)
            })
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = {
    getUserInfo,
}