const { formatMs } = require('@material-ui/core');

require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Gets all users from a department
function getAllUsers(departmentId) {
    const url = BASE_URL + '/';

    const requestInit = {
        method: 'GET',
        headers: {
            Authorization: getCookie('token'),
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
            Authorization: getCookie('token'),
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
            Authorization: getCookie('token'),
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
        headers: {'Authorization': getCookie('token')},
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
        headers: {'Authorization': getCookie('token')},
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
        headers: {'Authorization': getCookie('token')},
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
    
    const body = new FormData();
    body.append("organization_id", organisationId);
    body.append("department_name", department);

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
        body: body
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
        headers: {
            'Authorization': getCookie('token'),
            'Origin': process.env.ORIGIN_URL
        },
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
            'Authorization': getCookie('token'),
            'Origin': process.env.ORIGIN_URL
        },
    }
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/organization/departments?organization_id=${organization_id}`, info)
        
        // 'https://comp30022-team35-backend.herokuapp.com/organization/departments?organization_id=65'
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
    getCookie,
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