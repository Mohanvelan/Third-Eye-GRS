import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

//userLogin
export const userLogin = (uname, pwd) => (dispatch) => {
     
     const user = {
         uname: uname, pwd: pwd
     };
    
     return fetch(baseUrl + 'userlogin', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    }) 
    .then( res => {
        if(res.ok){
            return res;
        }
        else{
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
        if(res.isLogin) {
          alert(res.msg);
          dispatch(userLoginSuccess(res.data)); 
        }
        else {
            alert(res.msg);
        }
    })
    .catch(error => {
        alert(error);
        dispatch(userLoginFailed(error));
    })
}; 

export const userLoginSuccess = (res) => ({
    type: ActionTypes.USER_LOGIN_SUCCESS,
    payload: res
});

export const userLoginFailed = (err) => ({
   type: ActionTypes.USER_LOGIN_FAILED,
   payload: err
});


//adminLogin
export const adminLogin = (eid, pwd) => (dispatch) => {
     
    const emp = {
        eid: eid, pwd: pwd
    };
   
    return fetch(baseUrl + 'adminlogin', {
       method: 'POST',
       body: JSON.stringify(emp),
       headers: {
           'Content-type': 'application/json'
       },
       credentials: 'same-origin'
   }) 
   .then( res => {
       if(res.ok){
           return res;
       }
       else{
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
       if(res.isLogin){
         alert(res.msg);
         dispatch(adminLoginSuccess(res.data)); 
       }
       else{
           alert(res.msg);
       }
   })
   .catch(error => {
       dispatch(adminLoginFailed(error))
       alert(error);
   })
};

export const adminLoginSuccess = (res) => ({
    type: ActionTypes.ADMIN_LOGIN_SUCCESS,
    payload: res
});

export const adminLoginFailed = (err) => ({
   type: ActionTypes.ADMIN_LOGIN_FAILED,
   payload: err
});

//registerUser

export const registerUser = (fname, lname, email, aadhar, mobile, pwd) => (dispatch) => {
    
     const newUser = {
        fname: fname, lname: lname, email: email,
        aadhar: aadhar, mobile: mobile, pwd: pwd,
        joined: new Date().toISOString()
     };

     return fetch(baseUrl + 'registerUser', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
     })
     .then( res => {
        if(res.ok){
            return res;
        }
        else{
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
        if(res.isRegister){
          dispatch(registerSuccess(res)); 
          alert(res.msg);
        }
        else{
            alert(res.msg);
        }
    })
    .catch(error => {
        dispatch(registerFailed(error))
        alert(error);
    });
};

export const registerSuccess = (res) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: res
});

export const registerFailed = (err) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: err
});


//fetchDepartments

export const fetchDepartments = () => (dispatch) => {
    
    return fetch(baseUrl + 'getdept')
    .then( res => {
        if(res.ok){
            return res;
        }
        else{
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
        console.log(res);
        dispatch(addDepartments(res.data));
    })
    .catch(err => {
        alert(err);
    });

};

export const addDepartments = (res) => ({
     type: ActionTypes.ADD_DEPARTMENTS,
     payload: res
});


//fetchProfile

export const fetchProfile = (email) => (dispatch) => {

    const obj = { email: email };

     return fetch(baseUrl + 'getProfile',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
     }) 
     .then( res => {
        if(res.ok){
            return res;
        }
        else{
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
          //console.log(res.data);
         dispatch(addProfile(res.data))
        }
     })
     .catch(err => addProfileErr(err));
};

export const addProfile = (res) => ({
     type: ActionTypes.ADD_PROFILE,
     payload: res
});

export const addProfileErr = (err) => ({
    type: ActionTypes.ADD_PROFILE_ERR,
    payload: err
});


//fetchEmpProfile
export const fetchEmpProfile = (empid) => (dispatch) => {

    const obj = { empid: empid };
    //console.log(JSON.stringify(obj));

     return fetch(baseUrl + 'getEmpProfile',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
     }) 
     .then( res => {
        if(res.ok){
            return res;
        }
        else{
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
          console.log(res.data);
         dispatch(addEmpProfile(res.data))
        }
     })
     .catch(err => addEmpProfileErr(err));
};

export const addEmpProfile = (res) => ({
     type: ActionTypes.ADD_EMP_PROFILE,
     payload: res
});

export const addEmpProfileErr = (err) => ({
    type: ActionTypes.ADD_EMP_PROFILE_ERR,
    payload: err
});