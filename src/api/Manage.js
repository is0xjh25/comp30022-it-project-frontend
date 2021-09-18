// import { getToken } from './Util'

const { formatMs } = require('@material-ui/core');

require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getToken() {
    return sessionStorage.getItem('Token');
}


// Gets all users from a department
function getAllUsers(departmentId) {
    const url = BASE_URL + '/';

    const requestInit = {
        method: 'GET',
        headers: {
            Authorization: getToken(),

        }
    }

    fetch(url, requestInit).then(res => {

    }).catch(err => {

    })

}

// Change a user's permission
async function changePermission(userId, permissionLevel, departmentId) {
    const url = BASE_URL + '/permission';
    const requestInit = {
        method: 'POST',
        headers: {
            Authorization: getToken(),
        }
    }
    fetch(url, requestInit).then(res => {
        console.log();
        return res.body.data;

    }).catch(err => {

    })
}

// Accept user into a department
function acceptUser(userId, departmentId) {
    changePermission(userId, 1, departmentId)
}

function declineUser(userId, departmentId) {

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
        }})
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
        }})
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
        }})
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
        }})
    .catch(error => {reject(error);})
    })
}

module.exports = {
    getAllUsers,
    acceptUser,
    declineUser,
    handleSearchOrg,
    handleJoinOrg,
    handleCreateOrg,
    handleCreateDep
}