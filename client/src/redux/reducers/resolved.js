import * as ActionTypes from '../ActionTypes';

export const Resolved = (state = {
    isErr: false,
    errMess: null,
    data: []

}, action) => {
    
   switch(action.type) 
   {
       case ActionTypes.ADD_RESOLVED:
          return{...state, isErr: false, errMess: null, data: action.payload};
       
       case ActionTypes.ERR_RESOLVED:
          return{...state, isErr: true, errMess: action.payload, data: []};
       
       default: 
          return state;
   }
}

export const EmpResolved = (state = {
   isErr: false,
   errMess: null,
   data: []

}, action) => {
   
  switch(action.type) 
  {
      case ActionTypes.ADD_EMP_RESOLVED:
         return{...state, isErr: false, errMess: null, data: action.payload};
      
      case ActionTypes.ERR_EMP_RESOLVED:
         return{...state, isErr: true, errMess: action.payload, data: []};
      
      default: 
         return state;
  }
}