// import { getToken } from './Util'

const { formatMs } = require('@material-ui/core');

require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getToken() {
    return sessionStorage.getItem('Token');
}


// Gets users from a department
function getAllUsers(departmentId, currentPage) {
    const url = BASE_URL + '/department/member?department_id=' + departmentId + '&size=10&current=' + currentPage;
    const requestInit = {
        method: 'GET',
        headers: {
            Authorization: getToken(),
        }
    }
    return new Promise((resovle) => {
        fetch(url, requestInit).then(res => {
            res.json().then(value => resovle(value));    
        }).catch(err => {
    
        })
    })
}

// Change a user's permission
function changePermission(userId, permissionLevel, departmentId) {
    const url = BASE_URL + `/permission?user_id=${userId}&department_id=${departmentId}&permission_level=${permissionLevel}`;

    const requestInit = {
        method: 'PUT',
        headers: {
            Authorization: getToken(),
        },
    }
    fetch(url, requestInit).then(res => {
        res.json.then(resJson => {
            console.log(resJson)
            return resJson;
        })
    }).catch(err => {

    })
}

// Accept user into a department
function acceptUser(userId, departmentId) {
    changePermission(userId, 1, departmentId)
}

function deleteUser(userId, departmentId) {
    const url = BASE_URL + '/permission?user_id=' + userId + '&department_id=' + departmentId;
    const requestInit = {
        method: 'DELETE',
        headers: {
            Authorization: getToken(),
        }
    }
    fetch(url, requestInit).then(res => {
        console.log(res);
        return res.body.data;
    }).catch(err => {

    })
}

function declineUser(userId, departmentId) {
    deleteUser(userId, departmentId)
}

// Search an organisation
function handleSearchOrg(organisation) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getToken()},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/organization/name?organization_name=${organisation}`, info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

// Join an organisation
function handleJoinOrg(organisationId) {

    const body = new FormData();
    body.append("organization_id", organisationId);

    const info = {
        method: 'POST',
        headers: {'Authorization': getToken()},
        body: body
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/organization/join", info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

// Create an organisation
function handleCreateOrg(organisation) {
    
    const body = new FormData();
    body.append("organization_name", organisation);
    
    const info = {
        method: 'POST',
        headers: {'Authorization': getToken()},
        body: body
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/organization", info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}


// Create a department
function handleCreateDep(organisationId, department) {
    
    const info = {
        method: 'POST',
        headers: {'Authorization': getToken()},
        body: JSON.stringify({"organisation": organisationId, "organisation": department})
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/organization/department", info)
    .then(res => {
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

function getOrganization() {
    const info = {
        method: 'GET',
        headers: {'Authorization': getToken()},
    }
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + '/organization/myOrganization', info)
        .then(res => {
            if (res.ok) {
                resolve(res);
            } else {
                res.json().then(bodyRes => {alert(bodyRes.msg)});
            }
        })
        .catch(error => {reject(error)})
    })
}

function getDepartment(organization_id) {
    const info = {
        method: 'GET',
        headers: {
            'Authorization': getToken(),
            'Origin': process.env.ORIGIN_URL
    },
    }
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/organization/departments?organization_id=${organization_id}`, info)
        .then(res => {
            if (res.ok) {
                resolve(res);
            } else {
                res.json().then(bodyRes => {alert(bodyRes.msg)});
            }
        })
        .catch(error => {reject(error)})
    })
}

module.exports = {
    getAllUsers,
    changePermission,
    acceptUser,
    deleteUser,
    declineUser,
    handleSearchOrg,
    handleJoinOrg,
    handleCreateOrg,
    handleCreateDep,
    getOrganization,
    getDepartment
}