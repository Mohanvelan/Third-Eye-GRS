import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import About from '../AboutComponent';
import Contact from '../ContactComponent';
import Home2 from './Home2Component';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Cookies from 'universal-cookie';

import { fetchEmpProfile } from '../../redux/ActionCreator';
import { fetchReceived, fetchEmpResolved } from '../../redux/ActionCreator3';


const mapStateToProps = (state) => {
     return {
       profile: state.profile,
       received: state.received,
       empresolved: state.empresolved
     };
};

const mapDispatchToProps = (dispatch) => ({
     
    fetchEmpProfile: (empid) => {
        dispatch(fetchEmpProfile(empid))
    },

    fetchReceived: (deptid) => {
      dispatch(fetchReceived(deptid))
    },

    fetchEmpResolved: (deptid) => {
      dispatch(fetchEmpResolved(deptid))
    }
});

class Main3 extends Component 
{
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      const cookies = new Cookies();

      this.props.fetchEmpProfile(cookies.get('empid'));
      this.props.fetchReceived(cookies.get('deptid'));
      this.props.fetchEmpResolved(cookies.get('deptid'));
   }

   render(){

       const Homepage = () => {
           return(
              <Home2
                  isReceivedErr = {this.props.received.isErr}
                  receivedErrMess = {this.props.received.errMess}
                  receivedData = {this.props.received.data}
                  isResolvedErr = {this.props.received.isErr}
                  resolvedErrMess = {this.props.received.errMess}
                  resolvedData = {this.props.empresolved.data}
              />
           );
       };

       return(
         <div className=''>
              <Header 
                  isLogin = {this.props.profile.isLogin}
                  adata={this.props.profile.data}
                  errMess={this.props.profile.errMess}
              />
                
                <Switch>
                  <Route path='/emp/home' component= {Homepage} />
                  <Route  path='/emp/contact' component={() => <Contact /> } />
                  <Route  path='/emp/about' component={() => <About /> } />
                  <Redirect to='/emp/home' />
                </Switch>

              <Footer />
         </div>
       );
   };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main3));