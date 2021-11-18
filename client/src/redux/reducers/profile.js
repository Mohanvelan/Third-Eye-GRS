import * as ActionTypes from '../ActionTypes';

export const Profile = (state = {
    isLogin: false,
    errMess: null,
    data: []
}, action) => {
    
    switch(action.type) 
    {
        case ActionTypes.ADD_PROFILE:
            return {...state, isLogin: true, errMess: null, data: action.payload };
        
        case ActionTypes.ADD_PROFILE_ERR:
            return {...state, isLogin: false, errMess: action.payload, data: [] };
    
        case ActionTypes.ADD_EMP_PROFILE:
            return {...state, isLogin: true, errMess: null, data: action.payload };
        
        case ActionTypes.ADD_EMP_PROFILE_ERR:
            return {...state, isLogin: false, errMess: action.payload, data: [] };

        default:
            return state;
    }
};