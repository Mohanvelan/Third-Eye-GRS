import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//userDash
export const userDash = (email) => (dispatch) => {
    
     let obj = {email: email};

     return fetch(baseUrl + 'userDash', {
         method: 'POST',
         body: JSON.stringify(obj),
         headers: {
             'Content-type': 'application/json'
         },
         credentials: 'same-origin'
     })
     .then(res => {
         if(res.ok)
           return res;
         else {
            var error = new Error('Error :'+res.status+': '+res.statusText);
            error.response = res;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(res => res.json())
    .then(res => {
        if(!res.isErr) 
          dispatch(addUserDash(res.data))
    })
    .catch(err => alert(err));
};

export const addUserDash = (res) => ({
     type: ActionTypes.ADD_USER_DASH,
     payload: res 
});

//userDash
export const empDash = (deptid) => (dispatch) => {
    
    let obj = {deptid: deptid};

    return fetch(baseUrl + 'empDash', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok)
          return res;
        else {
           var error = new Error('Error :'+res.status+': '+res.statusText);
           error.response = res;
           throw error;
       }
   }, error => {
       var errmess = new Error(error.message);
       throw errmess;
   })
   .then(res => res.json())
   .then(res => {
       if(!res.isErr) 
         dispatch(addEmpDash(res.data))
   })
   .catch(err => alert(err));
};

export const addEmpDash = (res) => ({
    type: ActionTypes.ADD_EMP_DASH,
    payload: res 
});


// postComplaint
export const postComplaint = (fdata) => (dispatch) => {

    return fetch(baseUrl + 'postComplaint', {
        method: 'POST',
        body: fdata,
        credentials: 'same-origin'
    })
    .then(res => {
       if(res.ok)
           return res;
       else {
           var error = new Error('Error :'+res.status+': '+res.statusText);
           error.response = res;
           throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(res => res.json())
    .then(res => {
        if(!res.isErr)
         alert(res.msg);
    })
    .catch(err => alert(err)); 
};


//fetchRaised
export const fetchRaised = (email) => (dispatch) => {
    
    var obj = {email: email};

    return fetch(baseUrl + 'raised', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok)
           return res;
        else {
            var error = new Error('Error :'+res.status+': '+res.statusText);
            error.response = res;
            throw error; 
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(res => res.json())
    .then(res => {
        if(!res.isErr) {
            //console.log(JSON.stringify(res.data));
            dispatch(addRaised(res.data))
        }
        else
          dispatch(errRaised(res.errMess))
    })
    .catch(err => alert(err));
};

export const addRaised = (res) => ({
     type: ActionTypes.ADD_RAISED,
     payload: res
});

export const errRaised = (err) => ({
    type: ActionTypes.ERR_RAISED,
    payload: err
});


//fetchPending
export const fetchPending = (email) => (dispatch) => {
     
    var obj = {email: email};

    return fetch(baseUrl + 'pending', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
           'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok)
           return res;
        else {
            var error = new Error('Error :'+res.status+': '+res.statusText);
            error.response = res;
            throw error; 
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(res => res.json())
    .then(res => {
        if(!res.isErr) {
            //console.log(JSON.stringify(res.data));
            dispatch(addPending(res.data))
        }
        else
          dispatch(errPending(res.errMess))
    })
    .catch(err => alert(err));
};

export const addPending = (res) => ({
    type: ActionTypes.ADD_PENDING,
    payload: res
});

export const errPending = (err) => ({
   type: ActionTypes.ERR_PENDING,
   payload: err
});


//fetchResolved
export const fetchResolved = (email) => (dispatch) => {
     
    var obj = {email: email};

    return fetch(baseUrl + 'resolved', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
           'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok)
           return res;
        else {
            var error = new Error('Error :'+res.status+': '+res.statusText);
            error.response = res;
            throw error; 
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(res => res.json())
    .then(res => {
        if(!res.isErr) {
            //console.log(JSON.stringify(res.data));
            dispatch(addResolved(res.data))
        }
        else
          dispatch(errResolved(res.errMess))
    })
    .catch(err => alert(err));
};

export const addResolved = (res) => ({
    type: ActionTypes.ADD_RESOLVED,
    payload: res
});

export const errResolved = (err) => ({
   type: ActionTypes.ERR_RESOLVED,
   payload: err
});