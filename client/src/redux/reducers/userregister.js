import * as ActionTypes from '../ActionTypes';

export const UserRegister = (state = {
     isRegister: false,
     errMess: null,
     data: []
}, action) => {
   
     switch(action.type)
     {
         case ActionTypes.REGISTER_SUCCESS:
            return{...state, isRegister: true, errMess:null, data: [action.payload]};

         case ActionTypes.REGISTER_SUCCESS:
            return{...state, isRegister: false, errMess: action.payload, data: []};

         default:
            return state;
     }
}