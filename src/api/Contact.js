import { getCookie, checkUnauthorized } from "./Util";

const BASE_URL = process.env.REACT_APP_BASE_URL;


// get all customer of an organization and department
function getAllCustomer (orgId, departId, pageSize, currentPage) {
    // const orgId = 3
    // const departId = 4
    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/contact?organization_id=${orgId}&department_id=${departId}&size=${pageSize}&current=${currentPage}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody)
                });
            } else {
                // res.json().then(body=>{alert(body.msg)})
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
        if(checkUnauthorized(res)) {
            return;
        }
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
        if(checkUnauthorized(res)) {
            return;
        }
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
        if(checkUnauthorized(res)) {
            return;
        }
        res.json().then(resBody => {
            resolve(resBody);
        })
    })
    .catch(error => {reject(error);})
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
        if(checkUnauthorized(res)) {
            return;
        }
        if (res.ok) {   
            res.json().then(bodyRes=>{resolve(bodyRes);});
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

export {
    getAllCustomer,
    handleCreateCustomer,
    handleDisplayCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer
}