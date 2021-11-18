import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//fetchReceived
export const fetchReceived = (deptid) => (dispatch) => {
    
     let obj = { deptid: deptid };

     return fetch(baseUrl + 'getReceived', {
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
         // alert(JSON.stringify(res.data));
          dispatch(addReceived(res.data))
        }
    })
    .catch(err => errReceived(err));
};

export const addReceived = (res) => ({
     type: ActionTypes.ADD_RECEIVED,
     payload: res 
});

export const errReceived = (err) => ({
    type: ActionTypes.ERR_RECEIVED,
    payload: err
});



//fetchEmpResolved
export const fetchEmpResolved = (deptid) => (dispatch) => {
    
    let obj = {deptid: deptid};

    return fetch(baseUrl + 'getEmpResolved', {
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
         dispatch(addEmpResolved(res.data))
   })
   .catch(err => errEmpResolved(err));
};

export const addEmpResolved = (res) => ({
    type: ActionTypes.ADD_EMP_RESOLVED,
    payload: res 
});

export const errEmpResolved = (err) => ({
   type: ActionTypes.ERR_EMP_RESOLVED,
   payload: err
});