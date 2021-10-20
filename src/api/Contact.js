import { getCookie, checkUnauthorized } from "./Util";

const BASE_URL = process.env.REACT_APP_BASE_URL;


// Get all customer of an organization and department
function getAllCustomer (orgId, departId, pageSize, currentPage) {
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
                res.json().then(resBody => {
                    resolve(resBody);
                })
            }
        })
    })
}

function searchCustomer(departmentId, searchKey, size, current) {
    const url = `${BASE_URL}/contact/search?department_id=${departmentId}&search_key=${searchKey}&size=${size}&current=${current}`;

    const requestInit = {
        method: 'GET',
        headers: {
            Authorization: getCookie('token'),
        }
    }
    return new Promise((resovle) => {
        fetch(url, requestInit).then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(value => resovle(value));    
        })
    })
}

// Create a customer
function createCustomer(data, departmentId) {
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
        res.json().then(bodyRes=>{resolve(bodyRes);});
    })
    .catch(error => {reject(error);})
    })
}

// Get customer's information
function displayCustomer(customerId) {

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
        res.json().then(bodyRes=>{resolve(bodyRes);});
    })
    .catch(error => {reject(error);})
    })
}

// Delete one customer's information
function deleteCustomer(customerId) {

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
        res.json().then(bodyRes=>{resolve(bodyRes);});
    })
    .catch(error => {reject(error);})
    })
}

// Update Customer information
function updateCustomer(data, customerId) {
    
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
        res.json().then(bodyRes=>{resolve(bodyRes);});
    })
    .catch(error => {reject(error);})
    })
}

// Search all customers
function searchAllCustomers(searchkey) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    };
    
    return new Promise(resolve => {
        fetch(BASE_URL + `/contact/searchAll?search_key=${searchkey}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}

// Search recent contacted customers
function getRecentCustomer(limit) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    };
    
    return new Promise((resolve) => {
        fetch(BASE_URL + `/recentContact?limit=${limit}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(bodyRes=>{resolve(bodyRes);});
        })
    })
}

export {
    getAllCustomer,
    searchCustomer,
    createCustomer,
    displayCustomer,
    deleteCustomer,
    updateCustomer,
    searchAllCustomers,
    getRecentCustomer
}