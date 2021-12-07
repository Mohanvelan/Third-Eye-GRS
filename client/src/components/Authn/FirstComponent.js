import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalBody, ModalHeader, Label,
        Row, InputGroup, InputGroupAddon, InputGroupText, ButtonGroup  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import Cookies from 'universal-cookie';


const required = (val) => (val) && (val.length);
const validEmail = (email) => {
   return !(email) || /^[A-Za-z0-9._%+-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(email)
};


function CardView1(props){
    return(
       <>
          <Card className='mr-2 p-3 cview' style={{borderRadius: '18px'}}>
                <CardBody body inverse>
                    <CardTitle><b>User Login</b></CardTitle>
                    <CardText>For Users and People</CardText>
                    
                    
                    <div className='row row-content mt-4 px-2'>

                        <Button color='primary' className='col-auto text-white' style={{'border-radius': '20px'}} 
                            onClick={() => props.toggleModal1()}>
                            Click Here
                        </Button>
                    
                    
                        <div className='col-7 py-2 pl-5'>
                            New User ? <Link to='/first/signup'>Register Here </Link> 
                        </div>
                    </div>
                </CardBody>
         </Card>
       </>
    );
}

function CardView2(props){
    return(
      <>
         <Card className='ml-2 p-3 cview' style={{borderRadius: '18px'}}>
            <CardBody body inverse>
                <CardTitle><b>Employee Login</b></CardTitle>
                <CardText>For Officials</CardText>
                
                <div className='row row-content mt-4 px-2'>
                    <Button color='success' className='col-auto text-white' style={{'border-radius': '20px'}} 
                        onClick={() => props.toggleModal2()}>
                        Click Here
                    </Button>
                </div>
            </CardBody>
         </Card>
      </>
    );
}


class First extends Component
{
    constructor(props){
        super(props);     
        
        this.state = {
            isOpen1: false,
            isOpen2: false
         };
         this.toggleModal1 = this.toggleModal1.bind(this);
         this.toggleModal2 = this.toggleModal2.bind(this);
     }
 
     toggleModal1()
     {
         this.setState({
             isOpen1: !this.state.isOpen1
         });
     }
 
     toggleModal2()
     {
         this.setState({
             isOpen2: !this.state.isOpen2
         });
     }
 
 
     handleSubmit1(values)
     {
         this.props.userLogin(values.email, values.password);
     }
 
     handleSubmit2(values)
     {
        this.props.adminLogin(values.empid, values.password);
     }

    render()
    {
        if(this.props.uisLogin === true)
        {
            const cookies = new Cookies();
            const userid = this.props.udata[0].email;
            cookies.set('userid', userid, { path: '/'});

            window.location.reload();
            window.location.href = '/user/home'; 
            return;       
         
        }

        else if(this.props.aisLogin === true)
        {
                const cookies = new Cookies();
               // alert(JSON.stringify(this.props.adata));
                const empid = this.props.adata[0].emp_id;
                const deptid = this.props.adata[0].dept_id;

                cookies.set('empid', empid, { path: '/'});
                cookies.set('deptid', deptid, { path: '/'});

                window.location.reload();
                window.location.href = '/emp/home';
                return;
        }
       
        else 
        {
         return(

           <div className='container first p-5'>

               <div className='row justify-content-center'>
                   <h2 className='col-auto'>Welcome to Third Eye !</h2>
               </div>
     
               <div className='justify-content-center mt-5'>
                   <h4 className='col-auto'>Choose Your Options</h4>
               </div>
                
                <div className='row row-content pt-3'>
                    
                    <div className='col-12 col-md-5' >
                    <CardView1 toggleModal1 = {this.toggleModal1} />
                    </div>

                    <div className='col-12 col-md-5 offset-1'>
                    <CardView2 toggleModal2 = {this.toggleModal2} />
                    </div> 
                </div>


            <Modal isOpen={this.state.isOpen1} toggle={() => this.toggleModal1()}>

                    <ModalHeader tag='h5'> User Login </ModalHeader>

                    <ModalBody className="col-12 m-2">
                    <p className='text-secondary'>Please fill this form to log into your account.</p>
                
                <LocalForm onSubmit={(values) => this.handleSubmit1(values)}>

                        <Row className='form-group p-2'>
                            <Label htmlFor='email' md={5} className='pl-3'>Email Address</Label>                
                        
                            <InputGroup className='' style={{width: '430px'}}>                     
                            <Control.text model='.email' name='email' placeholder='Eg. mail@example.com'
                                    className='form-control'
                                    validators={{
                                        required, validEmail
                                    }}
                            />
                            <InputGroupAddon addonType='append' className='igadd' style={{borderRadius: '13px'}}>
                                <InputGroupText className='igt'>
                                    <i className='fa fa-user p-1'></i>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                        <Errors model='.email' className='text-danger'
                            show='touched'
                            messages={{
                                required: 'Required',
                                validEmail: 'Invalid Email Address'
                            }}
                        /> 
                        </Row>
                        
                        <Row className='form-group p-2'>
                            <Label htmlFor='password' md={5} className='ml-3'>Password</Label>
                            
                            <InputGroup className='' style={{width: '430px'}}>          
                            <Control type='password' model='.password' name='password'
                                    placeholder='Password' className='form-control' 
                                    validators={{
                                        required
                                    }}
                            />
                            <InputGroupAddon addonType='append' className='igadd' style={{borderRadius: '13px'}}>
                                <InputGroupText className='igt'><i className='fa fa-lock p-1'></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                        <Errors model='.password' className='text-danger'
                            show='touched'
                            messages={{
                                required: 'Required'
                            }}
                        />   
                        </Row>

                            
                        <ButtonGroup className='mt-4 p-3'>
                            
                            <Button type="submit" color="primary"
                                style={{borderRadius: '5px', width: '90px', height: '40px'}}>
                                <span className='fa fa-paper-plane fa-md color-white'></span> Get In
                            </Button>
                            
                            <Button outline color="primary" onClick={() => this.toggleModal1()}
                                style={{borderRadius: '5px', width: '90px', height: '40px', marginLeft: '10px'}}>
                                <span className='fa fa-undo fa-md color-white'></span> back
                            </Button>
                        
                    </ButtonGroup>

                </LocalForm>    
                </ModalBody>
            </Modal>
           

           <Modal isOpen={this.state.isOpen2} toggle={() => this.toggleModal2()} className='p-2'>
              
               <ModalHeader tag='h5'> <span className='ml-2'> Admin Login</span></ModalHeader>
              
               <ModalBody className="col-12 m-2">
                <p className='text-secondary'>Please fill this form to create an account.</p>

                <LocalForm onSubmit={(values) => this.handleSubmit2(values)}>
                        <Row className='form-group p-2'>
                            <Label htmlFor='empid' md={5}>Employee ID</Label>
                            
                            <InputGroup className=''  style={{width: '430px'}}>             
                               
                              <Control.text addon model='.empid' name='empid' 
                                    placeholder='Employee ID' className='form-control' 
                                    validators={{ required }}
                              />
                             <InputGroupAddon addonType='append' className='igadd2' style={{borderRadius:'12px'}}>
                                 <InputGroupText className='igt'><i className='fa fa-user p-1'></i></InputGroupText>
                             </InputGroupAddon>
                           </InputGroup>

                           <Errors model='.empid' className='text-danger'
                                show='touched'
                                messages={{
                                    required: 'Required'
                                }}
                            /> 
                        </Row>
                        
                       <Row className='form-group p-2'>
                          <Label htmlFor='password' md={5} >Password</Label>
                            
                          <InputGroup className=''  style={{width: '430px'}}>   

                              <Control type='password' model='.password' name='password' 
                                    placeholder='Password' className='form-control'
                                    validators={{ required }}
                              />
                            <InputGroupAddon addonType='append' className='igadd2' style={{borderRadius:'12px'}}>
                                <InputGroupText className='igt'><i className='fa fa-lock p-1'></i></InputGroupText>
                             </InputGroupAddon>

                            </InputGroup>

                            <Errors model='.password' className='text-danger'
                                show='touched'
                                messages={{
                                    required: 'Required'
                                }}
                            /> 
                       </Row>

                   <ButtonGroup className='mt-4 p-3'>
                        
                        <Button type="submit" color="success"
                            style={{borderRadius: '5px', width: '90px', height: '40px'}}>
                            <span className='fa fa-paper-plane fa-md color-white'></span> Get In
                        </Button>
                        
                        <Button outline color="success" onClick={() => this.toggleModal2()}
                            style={{borderRadius: '5px', width: '90px', height: '40px', marginLeft: '10px'}}>
                            <span className='fa fa-undo fa-md color-white'></span> back
                        </Button>
                    
                   </ButtonGroup>

                 </LocalForm>
               </ModalBody>
          </Modal>

        </div>
      );
    }
  }
}

export default First;