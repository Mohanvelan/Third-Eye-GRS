import React, { Component } from 'react';
import {Row, Col, Label, Button } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !(val) || !isNaN(val);
const validEmail = (email) => {
   return !(email) || /^[A-Za-z0-9._%+-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(email)
};


class Contact extends Component 
{
    constructor(props){
       super(props);
    }

    handleSubmit(values)
    {

    }

    render()
    {
        return(
           <div className='container p-3'>

              <div className='mt-4'>
                <h3 className='pl-5'>Contact Us</h3> <hr />    
              </div>
             
              <div className='row row-content p-5'>
                 <div className='col-7'>
                    <h4> Location Address</h4>

                   <div className=''>
                     <address className='mt-4' style={{fontSize: '20px'}}>
                         Public Grievance Redressal System, block 1/23, <br />
                         Karl Marx Road, <br />
                         Chennai City.
                     </address>
                      <p><b>Helpline:</b> +91 4343434343 /+91 5353535353 </p>
                      <p><b>Email Address:</b> pgrshelpline@chennai.gov.in</p>
                   </div>
                </div>
                
                <div className='col-5'>
                    <h4>Follow Us</h4>
                    <div className="col-12 mt-4">
                        <a className='p-2' href="http://google.com/"><i className="fa fa-google fa-lg"></i></a>
                        <a className='p-2' href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook fa-lg"></i></a>
                        <a className='p-2' href="http://www.linkedin.com/in/"><i className="fa fa-linkedin fa-lg"></i></a>
                        <a className='p-2' href="http://twitter.com/"><i className="fa fa-twitter fa-lg"></i></a>
                        <a className='p-2' href="http://youtube.com/"><i className="fa fa-youtube fa-lg"></i></a>
                        <a className='p-2' href="mailto:"><i className="fa fa-envelope-o fa-lg"></i></a>
                    </div>
                
               </div>
             </div>

             <div className='row row-content mt-3'>

                  <div className="col-12"> <h3>Send Your Feedback</h3> </div>   

                  <div className="col-12 col-md-9 mt-3">

                    <LocalForm model='feedback' className="my-4" onSubmit={(values) => this.handleSubmit(values)}>

                           <Row className="form-group p-2">
                               <Label htmlFor="firstname" md={2} >First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" 
                                    className="form-control"
                                    placeholder="Firstname"  
                                    validators = {{
                                       required, 
                                       minLength: minLength(3),
                                       maxLength: maxLength(15)
                                    }}
                                    />
                                   <Errors className="text-danger" model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 letters',
                                            maxLength: 'Must be lesseer than 11 letters'
                                        }}
                                    />
                                </Col>
                           </Row>

                           <Row className="form-group p-2">
                               <Label htmlFor="lastname" md={2} >Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" 
                                    placeholder="Lastname" 
                                    className="form-control" 
                                    validators = {{
                                        required, 
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                     }}
                                     />
                                    <Errors className="text-danger" model=".lastname"
                                         show="touched"
                                         messages={{
                                             required: 'Required',
                                             minLength: 'Must be greater than 2 letters',
                                             maxLength: 'Must be lesseer than 11 letters'
                                         }}
                                     />
                                </Col>
                           </Row>


                           <Row className="form-group p-2">
                               <Label htmlFor="email" md={2} >Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" 
                                    placeholder="Email" 
                                    className="form-control"
                                    validators={{
                                        required, validEmail
                                    }}
                                    />

                                    <Errors className="text-danger" 
                                       model=".email"
                                       show='touched'
                                       messages={{
                                          required: 'Required',
                                          validEmail: 'Invalid email address'
                                       }}
                                    />
                                </Col>
                           </Row>

                          <Row className="form-group p-2">
                               <Label htmlFor="message" md={2}> Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" type='textarea' name="message" rows="8"
                                    placeholder="Comments here..."
                                    className="form-control"
                                    />
                                </Col>
                          </Row>

                          <Row className="form-group pt-2">
                               <Col md={{size: 2, offset: 10}}  >
                                   <Button type="submit" color="primary" className=''>
                                       Submit here
                                   </Button>
                               </Col>
                           </Row>
                    </LocalForm>
                  </div>
               </div>

           </div>
        );
    }
}

export default Contact;