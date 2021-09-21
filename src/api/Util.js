
const BASE_URL = process.env.REACT_APP_BASE_URL;

function getUserInfo() {
    return new Promise((resolve, reject) => {
        const token = sessionStorage.getItem('Token');
        const url = BASE_URL + '/user'
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: token,
            }
        }).then(res => {
            
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = {
    getUserInfo
}