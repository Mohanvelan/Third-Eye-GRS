import * as ActionTypes from '../ActionTypes';

export const UserReply = (state = {
     isErr: false,
     errMess: null,
     data: []
}, action) => {
     
    switch(action.type) 
    {   
        case ActionTypes.ADD_USER_REPLY:
           return{...state, isErr: false, errMess: null, data: action.payload};
        
        default: 
           return state;
    }
}

export const EmpReply = (state = {
    isErr: false,
    errMess: null,
    data: []
}, action) => {
    
   switch(action.type) 
   {   
       case ActionTypes.ADD_EMP_REPLY:
          return{...state, isErr: false, errMess: null, data: action.payload};
       
       default: 
          return state;
   }
}

