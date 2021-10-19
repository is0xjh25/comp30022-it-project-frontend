import { getCookie, checkUnauthorized } from "./Util";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Gets all users from a department
function getAllUsers(departmentId, currentPage) {
    const url = BASE_URL + '/department/member?department_id=' + departmentId + '&size=10&current=' + currentPage;

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
        }).catch(err => {
    
        })
    })
}

function searchMember(departmentId, searchKey, size, current) {
    const url = `${BASE_URL}/department/searchMember?department_id=${departmentId}&search_key=${searchKey}&size=${size}&current=${current}`;

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

// Change a user's permission
function changePermission(userId, permissionLevel, departmentId) {
    const url = BASE_URL + `/permission?user_id=${userId}&department_id=${departmentId}&permission_level=${permissionLevel}`;

    const requestInit = {
        method: 'PUT',
        headers: {
            Authorization: getCookie('token'),
        },
    }
    return new Promise(resolve => {
        fetch(url, requestInit).then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
        }).catch(err => {
    
        })
    })

}

// Accept user into a department
function acceptUser(userId, departmentId) {
    return changePermission(userId, 1, departmentId)
}

// Delete a user from a department
function deleteUser(userId, departmentId) {
    const url = BASE_URL + '/permission?user_id=' + userId + '&department_id=' + departmentId;
    const requestInit = {
        method: 'DELETE',
        headers: {
            Authorization: getCookie('token'),
        }
    }
    return new Promise(resolve => {
        fetch(url, requestInit).then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
            
        }).catch(err => {
    
        })
    })

}

// Delince a user's request to join a department
function declineUser(userId, departmentId) {
    return deleteUser(userId, departmentId)
}

// Search an organisation
function searchOrg(organisation) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + `/organization/name?organization_name=${organisation}`, info)
    .then(res => {
        if(checkUnauthorized(res)) {
            return;
        }
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
function joinOrg(organisationId) {

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
        if(checkUnauthorized(res)) {
            return;
        }
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

// Join a department
function joinDep(departmentId) {
    const body = new FormData();
    body.append("department_id", departmentId);

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token')},
        body: body
    };

    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/department/join", info)
    .then(res => {
        if(checkUnauthorized(res)) {
            return;
        }
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
function createOrg(organisation) {
    
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
        if(checkUnauthorized(res)) {
            return;
        }
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
function createDep(organisationId, department) {
    
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
        if(checkUnauthorized(res)) {
            return;
        }
        if (res.ok) {
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }
    })
    .catch(error => {reject(error);})
    })
}

// Get all organization of the current user
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
            if(checkUnauthorized(res)) {
                return;
            }
            if (res.ok) {
                resolve(res);
            } else {
                res.json().then(bodyRes => {alert(bodyRes.msg)});
            }
        })
        .catch(error => {reject(error)})
    })
}

// Get all department of the current user and current organization
function getDepartment(organizationId) {
    const info = {
        method: 'GET',
        headers: {
            'Authorization': getCookie('token'),
            'Origin': process.env.ORIGIN_URL
        },
    }
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/organization/departments?organization_id=${organizationId}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            if (res.ok) {
                resolve(res);
            } else {
                res.json().then(bodyRes => {alert(bodyRes.msg)});
            }
        })
        .catch(error => {reject(error)})
    })
}

// Delete an organization
function deleteOrganization(origanizationId) {
    const url = `${BASE_URL}/organization?organization_id=${origanizationId}`;
    const info = {
        method: 'DELETE',
        headers: {
            'Authorization': getCookie('token'),
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
        })
    })
}

// Leave an organization
function leaveOrganization(orgId) {
    const url = `${BASE_URL}/organization/leave?organization_id=${orgId}`;
    const info = {
        method: 'DELETE',
        headers: {
            'Authorization': getCookie('token'),
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
        })
    })
}

// Delete an organization
function deleteDepartment(departmentId) {
    const url = `${BASE_URL}/department?department_id=${departmentId}`;
    const info = {
        method: 'DELETE',
        headers: {
            'Authorization': getCookie('token'),
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody);
            })
        })
    })
}

// Get my permission level from this department
function getMyPermissionLevel(departmentId) {
    const url = `${BASE_URL}/permission/myPermission?department_id=${departmentId}`;
    const info = {
        method: 'GET',
        headers: {
            'Authorization': getCookie('token'),
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody);
                })
            } else {
                alert(res.json().then((resBody) => {alert(resBody.msg)}))
            }
        })
        .catch((error) => {reject(error)})
    })
}

function searchMemberInOrg(orgId, searchKey) {
    const size = 999;
    const url = `${BASE_URL}/organization/searchMember?organization_id=${orgId}&search_key=${searchKey}&size=${size}&current=${1}`;

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

function transferOwnership(orgId, newOwner) {
    const url = `${BASE_URL}/organization/transfer?organization_id=${orgId}&new_owner=${newOwner}`;

    const requestInit = {
        method: 'PUT',
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

function getOrgDetail(orgId) {
    const url = `${BASE_URL}/organization?organization_id=${orgId}`;

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

// Gets if an user has pending request 
function getIfUserHasPendingRequest() {
    const url = BASE_URL + '/permission/pending';

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

// Gets if an user has pending request in a organization
function getIfUserHasPendingRequestBasedOnOrgId(orgId) {
    const url = `${BASE_URL}/permission/pending?organization_id=${orgId}`;
    // const url = BASE_URL + '/permission/pending';
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

// Gets if an user has pending request in a department
function getIfUserHasPendingRequestBasedOnDepartmentId(orgId, departmentId) {
    const url = `${BASE_URL}/permission/pending?organization_id=${orgId}&department_id=${departmentId}`;
    // const url = BASE_URL + '/permission/pending';
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



export {
    getAllUsers,
    searchMember,
    searchMemberInOrg,
    changePermission,
    acceptUser,
    deleteUser,
    declineUser,
    searchOrg,
    joinOrg,
    joinDep,
    createOrg,
    createDep,
    getOrganization,
    getDepartment,
    deleteOrganization,
    leaveOrganization,
    deleteDepartment,
    getMyPermissionLevel,
    transferOwnership,
    getOrgDetail,
    getIfUserHasPendingRequest,
    getIfUserHasPendingRequestBasedOnOrgId,
    getIfUserHasPendingRequestBasedOnDepartmentId
}