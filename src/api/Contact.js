const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get customer's information
function handleShowCustomer (customerId) {

    const info = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Origin': process.env.ORIGIN_URL},
        body: JSON.stringify({"email":customerId})
    };
    return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/contact/detail", info)
    .then(res => {
        if (res.ok) {
            alert("Welcom to join ConnecTI !");
            resolve(res);
        } else {
            res.json().then(bodyRes=>{alert(bodyRes.msg);});
        }})
    .catch(error => {reject(error);})
    })
}

module.exports = {
    handleShowCustomer
}