import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import Cookies from 'universal-cookie';


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


//postEmpReply
export const postEmpReply = (empid, deptid, userid, issueid, msg ) => (dispatch) => {
    
    let obj = { 
       empid: empid, userid: userid, 
       issueid: issueid, msg: msg
    };

    return fetch(baseUrl + 'postEmpReply', {
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
         alert("Posted successfully...");
         dispatch(fetchEmpReply(deptid))
       }
   })
   .catch(err => alert(err));
};


//postUserReply
export const postUserReply = (userid, issueid, msg ) => (dispatch) => {
    
    let obj = { userid: userid, issueid: issueid, msg: msg};

    return fetch(baseUrl + 'postUserReply', {
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
         alert("Posted successfully...");
         dispatch(fetchUserReply(userid))
       }
   })
   .catch(err => alert(err));
};




//fetchUserReply
export const fetchUserReply = (userid) => (dispatch) => {

    let obj = { userid: userid };

    return fetch(baseUrl + 'getUserReply', {
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
        // console.log(JSON.stringify(res.data));
         dispatch(addUserReply(res.data))
       }
   })
   .catch(err => alert(err));
};


export const addUserReply = (res) => ({
    type: ActionTypes.ADD_USER_REPLY,
    payload: res
});

export const fetchEmpReply = (deptid) => (dispatch) => {

    let obj = { deptid: deptid };

    return fetch(baseUrl + 'getEmpReply', {
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
        // console.log(JSON.stringify(res.data));
         dispatch(addEmpReply(res.data))
       }
   })
   .catch(err => alert(err));
};

export const addEmpReply = (res) => ({
    type: ActionTypes.ADD_EMP_REPLY,
    payload: res
})




//handleResolve
export const handleResolve = (uid, issid, empid, did) => (dispatch) => {
   
    let obj = { userid: uid, issueid: issid, empid: empid, deptid: did };

    return fetch(baseUrl + 'handleResolve', {
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
         alert("Closed successfully...");
         dispatch(fetchEmpReply(did))
       }
   })
   .catch(err => alert(err));

};


//handleIgnore
export const handleIgnore = (uid, issid, empid, did) => (dispatch) => {
  
    let obj = { userid: uid, issueid: issid, empid: empid, deptid: did };

    return fetch(baseUrl + 'handleIgnore', {
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
          alert("Closed successfully...");
          dispatch(fetchEmpReply(did))
       }
   })
   .catch(err => alert(err));   
};


//handleSuggested
export const handleSuggested = (uid, issid, empid, did) => (dispatch) => {
  
    let obj = { userid: uid, issueid: issid, empid: empid, deptid: did };

    return fetch(baseUrl + 'handleSuggested', {
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
          alert("Closed successfully...");
          dispatch(fetchEmpReply(did))
       }
   })
   .catch(err => alert(err));   
};


//handleWithdraw
export const handleWithdraw = (uid, issid) => (dispatch) => {
  
    let obj = { userid: uid, issueid: issid };

    return fetch(baseUrl + 'handleWithdraw', {
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
          alert("Withdrawn successfully...");
          dispatch(fetchUserReply(uid))
       }
   })
   .catch(err => alert(err));   
};