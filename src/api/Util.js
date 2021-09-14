
function getToken() {
    return sessionStorage.getItem('Token');
}

module.exports = {
    getToken,
}