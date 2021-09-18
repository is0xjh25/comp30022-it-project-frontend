const BASE_URL = process.env.REACT_APP_BASE_URL;

function getToken() {
    return sessionStorage.getItem('Token');
}

// Get customer's information
function handleDisplayCustomer (customerId) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getToken()},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact/detail?client_id=${customerId}`, info)
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
    handleDisplayCustomer
}