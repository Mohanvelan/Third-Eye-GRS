import * as ActionTypes from '../ActionTypes';

export const Raised = (state = {
     isErr: false,
     errMess: null,
     data: []
}, action) => {
     
    switch(action.type) 
    {
        case ActionTypes.ADD_RAISED:
           return{...state, isErr: false, errMess: null, data: action.payload};
        
        case ActionTypes.ERR_RAISED:
           return{...state, isErr: true, errMess: action.payload, data: []};
        
        default: 
           return state;
    }
}

export const Received = (state = {
   isErr: false,
   errMess: null,
   data: []
}, action) => {
   
  switch(action.type) 
  {
      case ActionTypes.ADD_RECEIVED:
         return{...state, isErr: false, errMess: null, data: action.payload};
      
      case ActionTypes.ERR_RECEIVED:
         return{...state, isErr: true, errMess: action.payload, data: []};
      
      default: 
         return state;
  }
}