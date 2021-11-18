import * as ActionTypes from '../ActionTypes';

export const Dashboard = (state = {
     isErr: false,
     data: []
}, action) => {
    
     switch(action.type) 
     {
         case ActionTypes.ADD_DASHBOARD:
            return {...state, isErr: false, data: action.payload };

         default:
            return state;
     }
}