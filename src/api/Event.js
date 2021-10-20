import { getCookie, checkUnauthorized } from "./Util";

const BASE_URL = process.env.REACT_APP_BASE_URL;


// Get an event
function getEventInfo(eventId) {

    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token'), 'Origin': process.env.ORIGIN_URL},
    };

    return new Promise((resolve) => {
        fetch(`${BASE_URL}/event?event_id=${eventId}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Create an event
function createEvent(startTime, finishTime, description) {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"start_time": startTime, "finish_time": finishTime, "description": description})
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Update an event
function updateEvent(body) {

    const info = {
        method: 'PUT',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify(body)
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/event", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Delete an event
function deleteEvent(eventId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token'), 'Origin': process.env.ORIGIN_URL},
    };

    return new Promise((resolve) => {
        fetch(`${BASE_URL}/event?event_id=${eventId}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Add a contact into an event
function addEventContact(eventId, contactId) {

    const info = {
        method: 'POST',
        headers: {'Authorization': getCookie('token'), 'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"contact_id": contactId, "event_id": eventId})
    };

    return new Promise((resolve) => {
        fetch(BASE_URL + "/event/contact", info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Delete a Contact
function deleteEventContact(attendId) {

    const info = {
        method: 'DELETE',
        headers: {'Authorization': getCookie('token'), 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"attend_id": attendId})
    };

    return new Promise((resolve) => {
        fetch(`${BASE_URL}/event/contact?attend_id=${attendId}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Search event in a period
function getMultipleEvents(startTime, finishTime) {
    
    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token'),'Origin': process.env.ORIGIN_URL},
    };

    return new Promise((resolve) => {
        fetch(`${BASE_URL}/event/between?start_time=${startTime}&finish_time=${finishTime}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

// Search amount of events per day in one month
function getMonthlyEvents(year, month, TimeZoneOffset) {
    
    const info = {
        method: 'GET',
        headers: {'Authorization': getCookie('token'),'Origin': process.env.ORIGIN_URL},
    };

    return new Promise((resolve) => {
        fetch(`${BASE_URL}/event/amount?year=${year}&month=${month}&time_zone_offset=${TimeZoneOffset}`, info)
        .then(res => {
            if(checkUnauthorized(res)) {
                return;
            }
            res.json().then(resBody => {
                resolve(resBody)
            })
        })
    })
}

export {
	getEventInfo,
	createEvent,
	updateEvent,
	deleteEvent,
	addEventContact,
	deleteEventContact,
	getMultipleEvents,
    getMonthlyEvents
}