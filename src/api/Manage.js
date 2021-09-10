require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Gets all users from a department
function getAllUsers(departmentId) {

}

// Change a user's permission
function changePermission(userId, permissionLevel, departmentId) {
    const url = BASE_URL + '/permission';
    const requestInfo = {
        
    }
    const requestInit = {
        method: 'GET',
        headers: {
            
        }
    }
    fetch(requestInfo, requestInit).then(res => {

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

}