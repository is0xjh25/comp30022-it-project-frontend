// import { getToken } from './Util'

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

module.exports = {
    getAllUsers,
    changePermission,
    acceptUser,
    deleteUser,
    declineUser,
}