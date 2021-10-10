import { getCookie, checkUnauthorized } from './Util';

const BASE_URL = process.env.REACT_APP_BASE_URL;
		
		
function uploadPhoto(photo){

    let formdata = new FormData();
    formdata.append("photo",photo);
    const info = {
        method: 'POST',
        headers: {
            'Authorization': getCookie('token'),
        },
        body:formdata
    }
    
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + `/user/uploadPhoto`, info)
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

export {
    uploadPhoto
}