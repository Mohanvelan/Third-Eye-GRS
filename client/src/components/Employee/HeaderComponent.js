import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';


class Header extends Component 
{
    constructor(props){
        super(props);

        this.state = {
           isOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
    }

   toggleModal() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }
   
   logOut() {

      var r = window.confirm("Are you sure you want to log out?");
      if(r === true)
        alert("You have been logged out successfully...");

      const cookies = new Cookies();
      cookies.remove('empid', { path: '/'});
     
      window.location.reload();
      window.location.href = '/first/app';
   }

   renderModal() {

      if(this.props.isLogin === true) {
         return(
           <>     
            <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
               <ModalHeader>
                     YOUR PROFILE
               </ModalHeader>
               <ModalBody className='p-3'>
                     <dl>
                        <dt>Employee Id</dt> <dd>{this.props.adata[0].emp_id } </dd>
                        <dt>Dept</dt> <dd>{this.props.adata[0].dept}</dd> 
                        <dt>Dept Id</dt> <dd>{this.props.adata[0].dept_id}</dd> 
                     </dl>
               </ModalBody>
            </Modal>
           </>
         );
      }
      else {
         <div></div>
      }
   }

   renderNav() {

      if(this.props.isLogin !== true) {
         
        return(
         <div className=''>
            <Navbar expand='md' className='subnav px-3 row'>
               <div className='col-7'>
                  <Nav navbar className='ml-auto'>
                     <NavItem className='px-5'>
                         <span className='px-5'> Hello folks ! </span>
                     </NavItem>
                  </Nav>
               </div>
         
               <div className='col-5 ml-auto'>
                  <Nav navbar className='mx-5'>
                     <NavItem className='px-5 py-2'>
                           You're not logged in.<i className='fa fa-caret'></i>
                     </NavItem>
                     <NavItem className='pt-2'>
                        <NavLink to='/first' className='text-white'>
                           Signin
                        </NavLink>
                     </NavItem>
                  </Nav>
               </div>
            </Navbar>
         </div>
        );
      }

      else if(this.props.isLogin === true) {
        return(
         <div>
            <Navbar expand='md' className='subnav p-2 row'>
               <div className='col-9'>
                  <Nav navbar className='px-5'>
                     <NavItem>
                           <span className='px-5'>Hello { this.props.adata[0].emp_id.toUpperCase() } ! </span>
                     </NavItem>
                  </Nav>
               </div>

               <div className='col-3 ml-auto'>
                  <Nav className='ml-auto' navbar>
                     <NavItem>
                        <Button color='link' onClick={() => this.toggleModal()}>Profile</Button>
                     </NavItem>
                     <NavItem>
                     <Button color='link' onClick={() => this.logOut()}> Log Out </Button>
                     </NavItem> 
                  </Nav>
               </div>
            </Navbar>
         </div>
        );
      }
   }

   
   render() {
  
        return(
           <div >
            <Navbar dark expand='md' style={{position: 'sticky'}}>
              <div className='container'>
                 <NavbarBrand className='mr-auto' style={{fontFamily:  "Goudy Bookletter 1911"}} >
                   <div className='row'>
                     <span className='col-4'>
                        <img src='/assets/thirdeye.png' height='50' weight='51' alt='logo' style={{borderRadius: '30px'}} />
                     </span>
                     <h3 className='col-8 pt-2'>Third Eye</h3>
                  </div>
                 </NavbarBrand>

                 <Nav navbar>
                    <NavItem>
                      <NavLink className='nav-link' to='/emp/home'>
                          <span className='fa fa-home fa-md color-white'></span> Home
                      </NavLink>
                    </NavItem>
                 
                    <NavItem>
                      <NavLink className='nav-link' to='/emp/raised'>
                          <span className='fa fa-edit fa-md'></span> Raised
                      </NavLink>
                    </NavItem>
                
                    <NavItem>
                      <NavLink className='nav-link' to='/emp/contact'>
                          <span className='fa fa-envelope fa-md'></span> Contact Us
                      </NavLink>
                    </NavItem>
     
                    <NavItem>
                      <NavLink className='nav-link' to='/emp/about'>
                          <span className='fa fa-info fa-md'></span> About Us
                      </NavLink>
                    </NavItem>
                 </Nav>
               </div>
            </Navbar>
          
         
        
           { this.renderNav() }
        
           { this.renderModal() }
         
         
         </div>
        );
     }
}

export default Header;