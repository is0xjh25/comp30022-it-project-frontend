import { getCookie, checkUnauthorized } from './Util';

// Get all to-do list of a user
function getAllToDo() {
    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token')},
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/toDoList?topNTodoListData=10`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            
            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody)
                });
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        })
        .catch(error => {reject(error)})
    })

}

// Create a new to-do list for a user
function handleCreateToDo(data) {
    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/toDoList`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            
            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody)
                })
            } else {
                res.json().then(body => {alert(body.msg)})
            }
        })
        .catch(error => {reject(error)})
    })
}

// Delete a to-do list for a user
function handleDeleteToDo(toDoListId) {
    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token')}
    }

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/toDoList?todoList_id=${toDoListId}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }

            if (res.ok) {
                res.json().then(resBody => {
                    resolve(resBody)
                })
            } else {
                res.json().then(body => {alert(body.msg)})
            }
        })
        .catch(error => {reject(error)})
    })
}

// Update a to-do list for a user
function handleUpdateToDo(data) {
    const info = {
        method: 'PUT',
        headers: {'Authorization': getCookie('token'), 'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }
    
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/toDoList`, info)
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
    getAllToDo,
    handleCreateToDo,
    handleDeleteToDo,
    handleUpdateToDo
}