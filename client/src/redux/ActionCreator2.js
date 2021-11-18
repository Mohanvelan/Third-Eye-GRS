import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//fetchDashboard
export const fetchDashboard = (email) => (dispatch) => {
    
     let obj = {email: email};

     return fetch(baseUrl + 'dashboard', {
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
          dispatch(addDashboard(res.data))
    })
    .catch(err => alert(err));
};

export const addDashboard = (res) => ({
     type: ActionTypes.ADD_DASHBOARD,
     payload: res 
});


// postComplaint
export const postComplaint = (userid, issueid, service, dept, sub, issue, proofData, proofname, prooftype) => (dispatch) => {
    
    const obj = {
        userid: userid, issueid: issueid,
        service: service, dept: dept, 
        sub: sub, issue: issue,
        proof: { 
            proofname: proofname, 
            prooftype: prooftype 
        },
        proofData: proofData, 
        status: 'pending',
        date: new Date().toISOString() 
    };

    console.log('ActionCrea2: ', obj.proofData); 

    return fetch(baseUrl + 'postComplaint', {
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