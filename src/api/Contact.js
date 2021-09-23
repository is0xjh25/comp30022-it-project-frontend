const BASE_URL = process.env.REACT_APP_BASE_URL;

function getToken() {
    return sessionStorage.getItem('Token');
}

// get all customer of an organization and department
function getAllCustomer (orgId, departId) {
    // const orgId = 3
    // const departId = 4
    const info = {
        method: 'GET',
        headers: {'Authorization': getToken()},
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `contact?organization_id=$}contact?organization_id=${orgId}&department_id=${departId}`, info)
        .then(res => {
            if (res.ok) {
                resolve(res);
            } else {
                res.json().then(body=>{alert(body.msg)})
            }
        })
        .catch(error => {reject(error)})
    })
}

// Create a customer
function handleCreateCustomer(data, departmentId) {
    const body = new FormData();
    body.append("departmentId", departmentId);
    body.append("email", data.email);
    body.append("phone", data.phone);
    body.append("description", data.description);
    body.append("firstName", data.firstName);
    body.append("lastName", data.lastName);
    body.append("middleName", data.middleName);
    body.append("gender", data.gender);
    body.append("birthday", data.dob);
    body.append("address", data.address);
    body.append("organization", data.organisation);
    body.append("customerType", data.customerType);

    const info = {
        method: 'POST',
        headers: {'Authorization': getToken()},
        body: body
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact?department_id=${departmentId}`, info)
    .then(res => {
        if (res.ok) {   
            resolve(res);
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

// Delete one customer's information
function handleDeleteCustomer(customerId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getToken()},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact?client_id=${customerId}`, info)
    .then(res => {
        if (res.ok) {   
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

// Update Customer information
function handleUpdateCustomer(data, customerId) {
    
    const body = new FormData();
    body.append("departmentId", data.departmentId);
    body.append("email", data.email);
    body.append("phone", data.phone);
    body.append("description", data.description);
    body.append("firstName", data.firstName);
    body.append("lastName", data.lastName);
    body.append("middleName", data.middleName);
    body.append("gender", data.gender);
    body.append("birthday", data.dob);
    body.append("address", data.address);
    body.append("organization", data.organisation);
    body.append("customerType", data.customerType);

    const info = {
        method: 'PUT',
        headers: {'Authorization': getToken()},
        body: body
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/contact?client_id=${customerId}`, info)
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
    getAllCustomer,
    handleCreateCustomer,
    handleDisplayCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer
}