import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Label, Button, Row, Col,
         InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

import emailjs from 'emailjs-com';
import First from './FirstComponent';
 
const required = (val) => (val) && (val.length);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const isNumber = (val) => !(val) || !isNaN(val)
const validEmail = (email) => {
   return !(email) || /^[A-Za-z0-9._%+-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(email)
};

class Signup extends Component 
{
    constructor(props){
        super(props);

        this.state = {
           isOpen: false,
           otp: null,
           values: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        if(values.password !== values.cpassword)
        { 
            alert("Password Mismatch...");
            return;
        }
        
        var otp = this.generateOTP(values.email, values.firstname, values.lastname);

        this.setState({
            otp: otp,
            values: values
        });

        this.toggleModal();
       
        //this.props.registerUser(values.firstname, values.lastname, values.email, values.aadharno, values.phoneno, values.password);
    }

    toggleModal()
    {
       this.setState({
           isOpen: !this.state.isOpen
       });
    }

   generateOTP(email, fname, lname) {
          
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      
      console.log('generated otp: ',OTP,'\n email: ',email);
      var msg = "Your OTP for verification is "+OTP+". It will be expired after 5 minutes.";
      
      emailjs.send("service_gjg52fc","template_jt4zcjh", { 
         message: msg,
         reply_to: email,
         to_name: fname +' '+ lname

      }, "user_ixb8MCpbywK1dJ96NiYyz")
      .then((msg) => {
          alert('6-digit OTP sent to your mail-id');
          
      },(err) => {
           alert('Error: while sending...try again...\n'+err);
      });
      
      return OTP;
   }

    handleSubmitVerify(values)
    {
        this.toggleModal();

        if(values.otp !== this.state.otp){
           alert("OTP Verification failed...");
        }
        else{
           this.props.registerUser(this.state.values.firstname, this.state.values.lastname, this.state.values.email, 
            this.state.values.aadharno, this.state.values.phoneno, this.state.values.password);
        }
    }

    render()
    {
        if(this.props.isRegister)
        {
           return(
               <First />
           );
        }

        return(
          <div className='container-fluid'>
            
           <Row className='row justify-content-center'>
          
             <Col md={8}>
              <Card body inverse className='cview col-12 col-md-10 p-5 mt-2'>
                 <CardHeader style={{'color':'black'}} tag='h3'>SignUp Page</CardHeader>
                
                 <CardBody className='px-4'>
                  <div className="col-12">

                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                     <Row className='form-group p-2'>
                         <Col md={5}>    
                         <Label htmlFor='firstname' md={5} style={{color: 'black'}}> Firstname</Label>
                           
                         <InputGroup size='sm'>
                             <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                  <InputGroupText className='igt'><i className='p-0'>F</i></InputGroupText>
                              </InputGroupAddon>
                             <Control.text model='.firstname' name='firstname' placeholder='Firstname'
                                    className='form-control'
                                    validators={{
                                        required, minLength: minLength(1), 
                                        maxLength: maxLength(15) 
                                    }}
                              />
                         </InputGroup>

                        <Errors model='.firstname' className='text-danger'
                                  show='touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must be less greater than or equal to 1 character',
                                     maxLength: 'Must be lesser than or equal to 15 characters'
                                  }}
                        />
                      </Col>

                          <Col md={{size:5, offset:2}}>    
                            <Label htmlFor='lastname' md={5} style={{color: 'black'}}> Lastname</Label>
                            
                            <InputGroup size='sm'>
                                 <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                    <InputGroupText className='igt'><i className='p-0'>L</i></InputGroupText>
                                 </InputGroupAddon>

                                 <Control.text model='.lastname' name='lastname' placeholder='Lastname' 
                                     className='form-control'
                                     validators={{
                                        required, minLength: minLength(1), 
                                        maxLength: maxLength(15)
                                     }}
                                 />
                             </InputGroup>

                              <Errors model='.lastname' className='text-danger'
                                  show = 'touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must be less greater than or equal to 1 character',
                                     maxLength: 'Must be lesser than or equal to 15 characters'
                                  }}
                              />
                           </Col>
                     </Row>

                     <Row className="form-group p-2">
                         <Label htmlFor='email' md={4} style={{color: 'black'}}> Email Address</Label>
                        
                           <InputGroup size=''>
                              <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                 <InputGroupText className='igt'><i className='fa fa-user p-1'></i></InputGroupText>
                              </InputGroupAddon>

                              <Control.text model='.email' id='email' name='email' placeholder='Eg. mail@example.com'
                                 className="form-control"
                                 validators={{
                                    required, validEmail
                                 }}
                              />
                           </InputGroup>

                           <Errors model='.email' className='text-danger'
                               show ='touched'
                               messages={{
                                     required: 'Required',
                                     validEmail: 'Invalid Email Address'
                               }}
                          />
                     </Row>

                     <Row className='form-group p-2'>
                            <Label htmlFor='aadharno' md={4} style={{color: 'black'}}> Aadhar No.</Label>
                           
                              <InputGroup>
                                 <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}> 
                                    <InputGroupText className='igt'><i className='fa fa-info p-1'></i></InputGroupText>
                                 </InputGroupAddon>

                                 <Control.text model='.aadharno' name='aadharno' style={{width: '100px'}}
                                       placeholder='Aadhar No.' className='form-control'
                                       validators={{
                                          required, minLength: minLength(12), 
                                          maxLength:maxLength(12), isNumber
                                       }}
                                 />
                              </InputGroup>

                              <Errors model='.aadharno' className='text-danger'
                                 show = 'touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must contain 12 digits',
                                     maxLength: 'Must contain 10 digits',
                                     isNumber: 'Must contain Numbers'
                                  }}
                              />

                     </Row>

                     <Row className='form-group p-2'>
                           <Label htmlFor='phoneno' md={4} style={{color: 'black'}}> Mobile No.</Label>
                           
                           <InputGroup size=''>
                              <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                 <InputGroupText className='igt'><i className='fa fa-phone p-1'></i></InputGroupText>
                              </InputGroupAddon>

                              <Control.text model='.phoneno' name='phoneno' style={{width: '450px'}}
                                 placeholder='Phone No.' className='form-control'
                                 validators={{
                                    required, minLength: minLength(10),
                                    maxLength: maxLength(10), isNumber
                                 }}
                              />
                           </InputGroup>

                           <Errors model='.phoneno' className='text-danger'
                                  show = 'touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must contain 10 digits',
                                     maxLength: 'Must contain 10 digits',
                                     isNumber: 'Must contain Numbers'
                                  }}
                           />
                     </Row>

                     <Row className='form-group p-2'>
                           <Col md={5}>
                           <Label htmlFor='password' md={6} style={{color: 'black'}}> Password</Label>
                           
                           <InputGroup size=''>
                              <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                 <InputGroupText className='igt'><i className='fa fa-lock p-1'></i></InputGroupText>
                              </InputGroupAddon>

                              <Control type='password' model='.password' id='password' name='password'
                                  placeholder='password' className='form-control'
                                  validators={{
                                     required, minLength: minLength(6)
                                  }}
                              />
                           </InputGroup>

                            <Errors model='.password' className='text-danger'
                                  show = 'touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must contain 6 characters'
                                  }}
                            />
                           </Col>

                           <Col md={{size:5, offset:2}}>
                              <Label htmlFor='cpassword' md={12} style={{color: 'black'}}> Confirm Password</Label>
                              
                              <InputGroup size=''>
                                 <InputGroupAddon className='igadd2' style={{borderRadius: '12px'}}>
                                 <InputGroupText className='igt'><i className='fa fa-lock p-1'></i></InputGroupText>
                                 </InputGroupAddon>
                                
                               <Control type='password' model='.cpassword' id='cpassword' name='cpassword'
                                   placeholder='confirm password' className='form-control'
                                  validators={{
                                    required, minLength: minLength(6)
                                  }}
                              />
                              </InputGroup>

                              <Errors model='.cpassword' className='text-danger'
                                  show = 'touched'
                                  messages={{
                                     required: 'Required',
                                     minLength: 'Must contain 6 characters'
                                  }}
                             />
                           </Col>
                     </Row>

                     <Row className='form-group mt-2 p-2'>
                           <div className='form-check'>
                              <Label check style={{'color':'black'}}>
                                 <Control.checkbox model='.agree' name='agree'
                                    className='form-check-input'
                                 />{' '}
                                 I agree with terms and conditions.
                              </Label>
                           </div>
                      </Row>
                       
                     <Row className='form-group pt-2 mt-3'>
                          <Col>
                               <Button type="submit" color="success" style={{borderRadius: '20px', width: '140px', height: '45px'}}>
                                   <span className='fa fa-sign-in fa-md color-white'></span> SignUp
                              </Button>
                          </Col>
                       </Row>
                    
                    </LocalForm>
                 </div> 

                </CardBody>
             </Card>
            </Col>
           </Row>
         
          <Modal isOpen={this.state.isOpen} className='p-2'>
             <ModalHeader tag='h5'  toggle={() => this.toggleModal()}>
                 <span className='ml-2'>Email Verification</span> 
            </ModalHeader>
            
             <ModalBody className='p-3'>
                <LocalForm onSubmit={(values) => this.handleSubmitVerify(values)}>
                    <div className='form-group'>
                       <Label htmlFor='otp' className='p-2' style={{color: 'black'}}> 6-digit Number</Label>
                       <Control type='password' model='.otp' className='form-control mx-1' name='otp'
                           placeholder='6-digit number' 
                           validators={{ required }}
                       />
                       <Errors model='.otp' className='text-danger'
                          show='touched'
                          messages={{
                             required: 'Required'
                          }}
                       />
                    </div>
          
                  <div className='d-flex justify-content-end'>
                    <Button type='submit' className='btn btn-danger my-2'> Verify </Button>  
                  </div>  
                </LocalForm>
             </ModalBody>
          </Modal>

          </div>      
        );
    }
}

export default Signup; 