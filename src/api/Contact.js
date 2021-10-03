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

// Get all customer of an organization and department
function getAllCustomer (orgId, departId, pageSize, currentPage) {
    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/contact?organization_id=${orgId}&department_id=${departId}&size=${pageSize}&current=${currentPage}`, info)
        .then(res => {
            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody)
                });
            } else {
                res.json().then(body=>{alert(body.msg)})
            }
        })
        .catch(error => {reject(error)})
    })
}

// Create a customer
function handleCreateCustomer(data, departmentId) {
    data['department_id'] = departmentId;

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type':'application/json'},
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact`, info)
    .then(res => {
        if (res.ok) {   
            res.json().then(bodyRes=>{resolve(bodyRes);});
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
    }})
    .catch(error => {reject(error);})
    })
}

// Get customer's information
function handleDisplayCustomer(customerId) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact/detail?contact_id=${customerId}`, info)
    .then(res => {
        if (res.ok) {   
            res.json().then(bodyRes=>{resolve(bodyRes)});
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

// Delete one customer's information
function handleDeleteCustomer(customerId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact?contact_id=${customerId}`, info)
    .then(res => {
        if (res.ok) {
            res.json().then(resBody => {
                resolve(resBody)
            })
        } else {
            res.json().then(body => {alert(body.msg)})
        }
    })
    .catch(error => {reject(error)})
    })
}

// Update Customer information
function handleUpdateCustomer(data, customerId) {
    
    data['id'] = customerId;

    const info = {
        method: 'PUT',
        headers: {'Authorization': getCookie('token'), 'Content-Type':'application/json'},
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact`, info)
    .then(res => {
        if (res.ok) {   
            res.json().then(bodyRes=>{resolve(bodyRes);});
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

module.exports = {
    getAllCustomer,
    handleCreateCustomer,
    handleDisplayCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer
}