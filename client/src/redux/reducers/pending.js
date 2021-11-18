import * as ActionTypes from '../ActionTypes';

export const Pending = (state = {
    isErr: false,
    errMess: null,
    data: []

}, action) => {
    
   switch(action.type) 
   {
       case ActionTypes.ADD_PENDING:
          return{...state, isErr: false, errMess: null, data: action.payload};
       
       case ActionTypes.ERR_PENDING:
          return{...state, isErr: true, errMess: action.payload, data: []};
       
       default: 
          return state;
   }
}