// import { getToken } from './Util'

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

module.exports = {
    getAllUsers,
    acceptUser,
    declineUser,
}