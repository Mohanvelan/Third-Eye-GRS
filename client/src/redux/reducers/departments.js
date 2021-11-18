import * as ActionTypes from '../ActionTypes';


export const Departments = (state = {
     errMess: null,
     data: []
}, action) => {
    
     switch(action.type)
     {
         case ActionTypes.ADD_DEPARTMENTS:
            return {...state, errMess: null, data: action.payload };

         default: 
            return state;
     }
};