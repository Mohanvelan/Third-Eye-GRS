import React, { Component } from 'react';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Complain from './ComplainComponent';
import Contact from '../ContactComponent';
import About from '../AboutComponent';
import Cookies from 'universal-cookie';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDepartments, fetchProfile } from '../../redux/ActionCreator';
import { fetchDashboard, postComplaint, fetchRaised, fetchPending, fetchResolved } from '../../redux/ActionCreator2';

const mapStateToProps = (state) => {
    return {
        departments: state.departments,
        profile: state.profile,
        dashboard: state.dashboard,
        raised: state.raised,
        pending: state.pending,
        resolved: state.resolved
    };
};

const mapDispatchToProps = (dispatch) => ({
      
      fetchDepartments: () => {
          dispatch(fetchDepartments())
      },

      fetchProfile: (email) => {
          dispatch(fetchProfile(email))
      },

      fetchDashboard: (email) => {
          dispatch(fetchDashboard(email))
      },

      postComplaint: (userid, issueid, service, dept, sub, issue, proofData, proofname, prooftype) => {
          console.log('main2: ',proofData.get('proof'));
         dispatch(postComplaint(userid, issueid, service, dept, sub, issue, proofData, proofname, prooftype))
      },

      fetchRaised: (email) => {
         dispatch(fetchRaised(email))
      },

      fetchPending: (email) => {
        dispatch(fetchPending(email))
     },

     fetchResolved: (email) => {
        dispatch(fetchResolved(email))
     }
});

class Main2 extends Component 
{
    constructor(props){
        super(props);
    }

    componentDidMount(){
       const cookies = new Cookies();

       this.props.fetchDepartments(cookies.get('userid'));
       this.props.fetchProfile(cookies.get('userid'));

       this.props.fetchDashboard(cookies.get('userid'));
       this.props.fetchRaised(cookies.get('userid'));
       this.props.fetchPending(cookies.get('userid'));
       this.props.fetchResolved(cookies.get('userid'));
    }
    

     render(){       

        const Homepage = () => {
           return (
             <Home 
                isErr = {this.props.dashboard.isErr}
                dash = {this.props.dashboard.data}
                raisedErr = {this.props.raised.isErr}
                raisedErrMess = {this.props.raised.errMess}
                raisedData = {this.props.raised.data}
                pendingErr = {this.props.pending.isErr}
                pendingErrMess = {this.props.pending.errMess}
                pendingData = {this.props.pending.data}
                resolvedErr = {this.props.resolved.isErr}
                resolvedErrMess = {this.props.resolved.errMess}
                resolvedData = {this.props.resolved.data}
             />
           );
        };

        const ComplaintPage = () => {
            return(
                <Complain dept={this.props.departments.data} 
                    postComplaint = {this.props.postComplaint}
                />
            );
        };

        return(
            <div className="App">
               <Header 
                   isLogin = {this.props.profile.isLogin}
                   udata={this.props.profile.data}
                   errMess={this.props.profile.errMess}
               />
                 
                 <Switch>
                   <Route path='/user/home' component= {Homepage} />
                   <Route path='/user/complain' component={ComplaintPage} />
                   <Route  path='/user/contact' component={() => <Contact /> } />
                   <Route  path='/user/about' component={() => <About /> } />
                   <Redirect to='/user/home' />
                 </Switch>

               <Footer />
            </div>
        );
     }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main2));