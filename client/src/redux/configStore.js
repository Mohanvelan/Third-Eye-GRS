import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
//import logger from 'redux-logger';

import { UserLogin } from './reducers/userlogin';
import { AdminLogin } from './reducers/adminlogin';
import { UserRegister } from './reducers/userregister';
import { Departments } from './reducers/departments';
import { Profile } from './reducers/profile';
import { UserDash, EmpDash } from './reducers/dashboard';
import { Raised, Received } from './reducers/raised';
import { Pending } from './reducers/pending';
import { Resolved, EmpResolved } from './reducers/resolved';
import { UserReply, EmpReply } from './reducers/reply';

export const ConfigStore = () => {
     
      const store = createStore(
          combineReducers({
              userlogin: UserLogin,
              adminlogin: AdminLogin,
              userregister: UserRegister,
              departments: Departments,
              profile: Profile,
              userdash: UserDash,
              empdash: EmpDash,
              raised: Raised,
              pending: Pending,
              resolved: Resolved,
              received: Received, 
              empresolved: EmpResolved,
              userreply: UserReply,
              empreply: EmpReply
          }),

          applyMiddleware(thunk)
      );

      return store;
};