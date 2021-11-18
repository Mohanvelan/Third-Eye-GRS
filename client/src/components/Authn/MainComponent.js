import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import First from './FirstComponent';
import Signup from './SignupComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { userLogin, adminLogin, registerUser } from '../../redux/ActionCreator';


const mapStateToProps = (state) => {
    return {
       userlogin: state.userlogin,
       adminlogin: state.adminlogin,
       userregister: state.userregister
    };
}

const mapDispatchToProps = (dispatch) => ({

    userLogin: (uname, pwd) => {
         dispatch(userLogin(uname, pwd))
    },

    adminLogin: (eid, pwd) => {
        dispatch(adminLogin(eid, pwd))
    },

    registerUser: (fname, lname, email, aadhar, mobile, password) => {
        dispatch(registerUser(fname, lname, email, aadhar, mobile, password))
    },

});

class Main extends Component
{
    constructor(props){
        super(props);
    }


    renderHeader()
    {
        return(
           <div className=''>
               <Navbar dark expand='md'>
                  <div className='container pt-2'> 
                    <NavbarBrand className='mr-auto' style={{fontFamily:  "Goudy Bookletter 1911"}} >
                        <div className='row'>
                            <span className='col-4'>
                                <img src='/assets/thirdeye.png' height='50' weight='51' alt='logo' style={{borderRadius: '30px'}} />
                            </span>
                            <h3 className='col-8 pt-2'>Third Eye</h3>
                        </div>
                    </NavbarBrand>
                  </div>
               </Navbar>
           </div>
        );
    }

    renderFooter()
    {
        return(
            <div className='row justify-content-left'>
              <div className='col-auto p-3'>
                 <p className=''>@ Copyright 2021 Third Eye</p>
              </div>
            </div>
        );
    }

    render()
    {
        const LoginPage = () => {
           return(
             <First 
                 uisLogin = {this.props.userlogin.isLogin}
                 uerrMess = {this.props.userlogin.errMess}
                 udata = {this.props.userlogin.data}
                 aisLogin = {this.props.adminlogin.isLogin}
                 aerrMess = {this.props.adminlogin.errMess}
                 adata = {this.props.adminlogin.data}
                 userLogin = {this.props.userLogin}
                 adminLogin = {this.props.adminLogin}
             />
           );
        };

        const SignupPage = () => {
            return(
              <Signup 
                 isRegister = {this.props.isRegister}
                 errMess = {this.props.errMess}
                 data = {this.props.data}
                 registerUser = {this.props.registerUser}
              />
            );
        };

        return(
           <div className=''>
              {this.renderHeader()}

                <Switch>
                    <Route path='/first/app' component={LoginPage} />
                    <Route path='/first/signup' component={SignupPage} />
                    <Redirect to='/first/app' />
                </Switch>
    
             <div className='container'>
                {this.renderFooter()}
             </div>

           </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main));