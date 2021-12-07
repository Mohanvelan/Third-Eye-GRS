import React, { Component } from 'react';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Complain from './ComplainComponent';
import Contact from '../ContactComponent';
import About from '../AboutComponent';
import Converse from './ConverseComponent';
import Cookies from 'universal-cookie';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchDepartments, fetchProfile } from '../../redux/ActionCreator';
import { userDash, postComplaint, fetchRaised, fetchPending, fetchResolved } from '../../redux/ActionCreator2';
import { fetchUserReply, handleWithdraw, postUserReply } from '../../redux/ActionCreator3';


const mapStateToProps = (state) => {
    return {
        departments: state.departments,
        profile: state.profile,
        userdash: state.userdash,
        raised: state.raised,
        pending: state.pending,
        resolved: state.resolved,
        reply: state.userreply
    };
};

const mapDispatchToProps = (dispatch) => ({
      
      fetchDepartments: () => { dispatch(fetchDepartments()) },

      fetchProfile: (email) => { dispatch(fetchProfile(email)) },

      userDash: (email) => { dispatch(userDash(email)) },

      postComplaint: (fdata) => { dispatch(postComplaint(fdata)) },

      fetchRaised: (email) => { dispatch(fetchRaised(email)) },

      fetchPending: (email) => { dispatch(fetchPending(email)) },

      fetchResolved: (email) => { dispatch(fetchResolved(email)) },

      postUserReply: (userid, issueid, msg) => { dispatch(postUserReply(userid, issueid, msg)) },

      fetchUserReply: (userid) => { dispatch(fetchUserReply(userid)) },

      handleWithdraw: (uid, issid) => { dispatch(handleWithdraw(uid, issid)) }
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

       this.props.userDash(cookies.get('userid'));
       this.props.fetchRaised(cookies.get('userid'));
       this.props.fetchPending(cookies.get('userid'));
       this.props.fetchResolved(cookies.get('userid'));
       this.props.fetchUserReply(cookies.get('userid'));
    }
    

     render(){    

        const Homepage = () => {
           return (
             <Home 
                isErr = {this.props.userdash.isErr}
                dash = {this.props.userdash.data}
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

        const ConversePage = ({match}) => {
            return(
               <Converse 
                  fetched={ this.props.raised.data.filter((issue) => issue.issueid === match.params.issueid)[0] }
                  reply = { this.props.reply.data.filter((re) => re.issueid === match.params.issueid)[0] }
                  postUserReply = { this.props.postUserReply } 
                  fetchReply = { this.props.fetchUserReply }
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
                   <Route exact path='/user/:issueid' component={ConversePage} />
                   <Redirect to='/user/home' />
                 </Switch>

               <Footer />
            </div>
        );
     }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main2));