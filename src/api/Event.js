const BASE_URL = process.env.REACT_APP_BASE_URL;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Get an event
function getEventInfo(eventId) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"event_id": eventId})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Create an event
function createEvent(startTime, finishTime, description) {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"start_time": startTime, "finish_time": finishTime, "description": description})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Update an event
function updateEvent(props) {

    const info = {
        method: 'PUT',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"id": props.id, "start_time": props.startTime, "finish_time": props.finishTime,
								"description": props.description, "status": props.status})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Delete an event
function deleteEvent(eventId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"event_id": eventId})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Add a contact into an event
function addEventContact(contactId, eventId) {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"contact_id": contactId, "event_id": eventId})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Delete a Contact
function deleteEventContact(attendId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"attend_id": attendId})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event/contact", info)
        .then(res => {
            resolve(res)
        })
        .catch(error => {reject(error);})
    })
}

// Search event in a period
function getMultipleEvents(startTime, finishTime) {
    
    console.log(JSON.stringify({"start_time": startTime, "finish_time": finishTime}));

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"start_time": startTime, "finish_time": finishTime})
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + "/event/between", info)
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
	getEventInfo,
	createEvent,
	updateEvent,
	deleteEvent,
	addEventContact,
	deleteEventContact,
	getMultipleEvents
}