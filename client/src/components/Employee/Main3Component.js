import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import About from '../AboutComponent';
import Contact from '../ContactComponent';
import Home2 from './Home2Component';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Resolve from './ResolveComponent';
import Cookies from 'universal-cookie';

import { fetchEmpProfile } from '../../redux/ActionCreator';
import { empDash } from '../../redux/ActionCreator2';
import { fetchReceived, fetchEmpResolved, handleSuggested, postEmpReply, 
         fetchEmpReply, handleIgnore, handleResolve } from '../../redux/ActionCreator3';


const mapStateToProps = (state) => {
     return {
       profile: state.profile,
       received: state.received,
       empdash: state.empdash,
       empresolved: state.empresolved,
       reply: state.empreply
     };
};

const mapDispatchToProps = (dispatch) => ({
     
    fetchEmpProfile: (empid) => { dispatch(fetchEmpProfile(empid)) },

    fetchReceived: (deptid) => { dispatch(fetchReceived(deptid)) },

    fetchEmpResolved: (deptid) => { dispatch(fetchEmpResolved(deptid)) },

    empDash: (deptid) => { dispatch(empDash(deptid)) },

    postEmpReply: (empid, deptid, userid, issueid, msg) => {  dispatch(postEmpReply(empid, deptid, userid, issueid, msg)) },

    fetchEmpReply: (deptid) => { dispatch(fetchEmpReply(deptid)) },

    handleResolve: (uid, issid, empid, did) => {dispatch(handleResolve(uid, issid, empid, did)) },

    handleIgnore: (uid, issid, empid, did) => { dispatch(handleIgnore(uid, issid, empid, did)) },

    handleSuggested: (uid, issid, empid, did) => { dispatch(handleSuggested(uid, issid, empid, did)) },

});

class Main3 extends Component 
{
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      const cookies = new Cookies();

      this.props.fetchEmpProfile(cookies.get('empid'));
      this.props.empDash(cookies.get('deptid'));
      this.props.fetchReceived(cookies.get('deptid'));
      this.props.fetchEmpResolved(cookies.get('deptid'));
      this.props.fetchEmpReply(cookies.get('deptid'));
   }


   render(){

       const Homepage = () => {
           return(
              <Home2
                  isErr = { this.props.empdash.isErr }
                  dash = { this.props.empdash.data }
                  isReceivedErr = {this.props.received.isErr}
                  receivedErrMess = {this.props.received.errMess}
                  receivedData = {this.props.received.data}
                  isResolvedErr = {this.props.empresolved.isErr}
                  resolvedErrMess = {this.props.empresolved.errMess}
                  resolvedData = {this.props.empresolved.data}
              />
           );
       };

       const ResolvePage = ({match}) => {
           return(
              <Resolve 
                 fetched={ this.props.received.data.filter((issue) => issue.issueid === match.params.issueid)[0] }
                 reply = { this.props.reply.data.filter((re) => re.issueid === match.params.issueid)[0] }
                 postEmpReply = { this.props.postEmpReply } 
                 fetchReply = { this.props.fetchEmpReply }
                 handleResolve = { this.props.handleResolve }
                 handleIgnore = { this.props.handleIgnore }
                 handleSuggested = { this.props.handleSuggested }
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
                  <Route exact path='/emp/:issueid' component={ResolvePage} />
                  <Redirect to='/emp/home' />
                </Switch>

              <Footer />
         </div>
       );
   };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main3));