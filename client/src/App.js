import React, { Component } from 'react';

import Main from './components/Authn/MainComponent'
import Main2 from './components/User/Main2Component';
import Main3 from './components/Employee/Main3Component';

import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConfigStore } from './redux/configStore';

const store = ConfigStore();


class App extends Component 
{
    constructor(props){
       super(props);
    }

    render() {
      
      return(
          <Provider store={store}>
             <BrowserRouter>
               <div className="">
                  <Switch>
                     <Route path='/first' component={() => <Main /> } />  
                     <Route path='/user' component={() => <Main2 /> } />  
                     <Route path='/emp' component={() => <Main3 /> } />
                     <Redirect to='/first' />
                  </Switch>
               </div>
             </BrowserRouter>
          </Provider>
      );
    }
}

export default App;
