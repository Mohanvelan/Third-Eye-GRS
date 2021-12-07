import * as ActionTypes from '../ActionTypes';

export const UserDash = (state = {
     isErr: false,
     data: []
}, action) => {
    
     switch(action.type) 
     {
         case ActionTypes.ADD_USER_DASH:
            return {...state, isErr: false, data: action.payload };

         default:
            return state;
     }
}

export const EmpDash = (state = {
   isErr: false,
   data: []
}, action) => {
  
   switch(action.type) 
   {
       case ActionTypes.ADD_EMP_DASH:
          return {...state, isErr: false, data: action.payload };

       default:
          return state;
   }
}