import * as ActionTypes from '../ActionTypes';

export const UserLogin = (state = {
     isLogin: false,
     errMess: null,
     data: []
}, action) => {
    
     switch(action.type)
     {
         case ActionTypes.USER_LOGIN_SUCCESS:
            return {...state, isLogin: true, errMess: null, data: action.payload };
        
         case ActionTypes.USER_LOGIN_FAILED:
            return {...state, isLogin: false, errMess: action.payload, data:[] };

         default: 
            return state;
     }
};