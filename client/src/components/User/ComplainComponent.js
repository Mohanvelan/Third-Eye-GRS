import React, { Component } from 'react';
import { Row, Col, Label, InputGroup, Button, InputGroupAddon, InputGroupText, ModalHeader, 
     Modal, ModalBody, ModalFooter, Table } from 'reactstrap';
import { LocalForm, Control, Errors, Field } from 'react-redux-form';
import Cookies from 'universal-cookie';

const required = (val) => val && val.length;


class Complain extends Component 
{
    constructor(props){
       super(props);

       this.state = {
          service: null,
          isOpen: false,
          id: null,
          selectedFile: null,
          checked: true,
          values: []
       };

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.selectFile = this.selectFile.bind(this);
       this.onCheck = this.onCheck.bind(this);
    }

    handleChange(event){
       this.setState({
           service: event.target.value
       });
    }

    toggleModal() {
       this.setState({
          isOpen: !this.state.isOpen
       });
    }

    selectFile(event) {
       this.setState ({
          selectedFile: event.target.files[0]
       });
    }

    onCheck() {
      this.setState ({
        checked: !this.state.checked
      });
    }

    showDetails(data) {
      if(data === null)
         return (<>
             <p className='pt-2'> None</p>
          </>);
      else
         return(<>
           <p className='pt-2'> {data.type}</p>
        </>);
    }
    
    generateID() {
          
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      console.log('ID', OTP);
      return OTP;
    }


    handleSubmit(values) {
        var id =  this.generateID();

        this.setState ({
          values: values,
          id: id
        });

        this.toggleModal();
    }

    handleFinalSubmit() {
      this.toggleModal();

       console.log('selectedFile: ',this.state.selectedFile);
        
       const fdata = new FormData();
       fdata.append('userid', new Cookies().get('userid'));
       fdata.append('issueid', this.state.id);  fdata.append('service', this.state.values.service);
       fdata.append('dept', this.state.values.dept);  fdata.append('sub', this.state.values.sub);
       fdata.append('issue', this.state.values.issue);  fdata.append('proof', this.state.selectedFile);
       fdata.append('proofname', this.state.selectedFile.name);
       fdata.append('prooftype', this.state.selectedFile.type);

       this.props.postComplaint(fdata);

       window.location.reload();
    }

    render() {

        return(
           <div className='container p-5'>
               <h3 className=''> Raise Your Complaint! </h3>
              
              <div className='pl-auto'>

                <LocalForm onSubmit={(values) => this.handleSubmit(values)} className='col-9'> 
                   <Row className='form-group p-2'>
                       <Label htmlFor='userid' className='py-2'>Email Address <span className='required'>*</span> </Label>
                       <Control.text model='.userid' className='form-control' name='userid'
                          placeholder=' Eg. mail@gmail.com' value={new Cookies().get('userid')}
                       />
                   </Row>

                   <Row className='form-group p-2'>
                       <Label htmlFor='service' className='py-2'>Service <span className='required'>*</span> </Label>
                       <Field model='.service' className='row' onChange={this.handleChange}>
                        <Col md={5} >
                            <input type='radio' className='form-check-input' value='complaint' /> Complaint
                        </Col>
                        <Col md={5} >
                          <input type='radio' className='form-check-input' value='suggestion'/> Suggestion
                        </Col>
                       </Field>
                   </Row>

                   <Row className='form-group p-2'>
                       <Label htmlFor='dept' className='py-2'>Area of Complanint <span className='required'>*</span> </Label>
                       <Control.select model='.dept' className='form-select' name='dept' type='select'
                          validators={{required}}
                       >
                         <option value='none'>- Select Any -</option>
                       {
                          this.props.dept.map((dpt) => {
                             return(
                              <option key={dpt.dept_id} value={dpt.dept_id}> {dpt.dept} </option>
                             );  
                          })
                       }
                         
                       </Control.select>

                       <Errors model='.dept' className='text-danger'
                         show='touched'
                         messages={{
                           required: 'Required' 
                         }}
                       />
                   </Row>

                   <Row className='form-group py-2'>
                       <Label htmlFor='' className='py-2'> Subject (briefly) <span className='required'>*</span> </Label>
                     
                        <InputGroup className=''>
                          <Control.text model='.sub' className='form-control' name='sub'
                                placeholder=' Subject' type='text' validators={{required}}
                                />

                            <InputGroupAddon addonType='append' className=''>
                              <InputGroupText> Reg </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        
                      <p className='pt-2' style={{fontSize: '13px'}}>
                        * It should not exceed one line.
                      </p>
                        
                       <Errors model='.sub' className='text-danger'
                           show='touched'
                           messages ={{
                             required: 'Required'
                           }}    
                       />
                   </Row>

                   <Row className='form-group p-2'>
                       <Label htmlFor='issue' className='py-2'>Issue to be solved (elaborately) <span className='required'>*</span> </Label>
                       <Control.textarea model='.issue' className='form-control' name='issue'
                          placeholder=' Raise your issue...' rows={7} type='textarea'
                          validators={{required}}
                       />

                       <Errors model='.issue' className='text-danger'
                         show='touched'
                         messages={{
                           required: 'Required' 
                         }}
                       />
                   </Row>

                   <Row className='p-2' hidden={this.state.service ==  'suggestion'}>   
                     <Label htmlFor='proof' className='py-2' md={12}> Proof (if any)</Label>

                      <Col md={1}>
                        <div className='pt-2'>
                         <Control.checkbox model='.checked' className='form-check-input' onClick={this.onCheck}
                         />
                        </div>
                      </Col>
                     
                      <Col md={6}>
                          <Control.file model='.proof' className='form-control' name='proof' disabled={this.state.checked}
                                placeholder='Choose any file' type='file' onChange={this.selectFile}
                          />
                       </Col>
                        
                       <Col md={{size: 4, offset: 1}}>
                           {this.showDetails(this.state.selectedFile)}
                       </Col>

                      <p className='pt-2' style={{fontSize: '13px'}}>
                        * Proofs can be of any form such as audio, video, document and image. It should not contain inappropriate content
                      </p>
                  
                  </Row>

                   <Row className='mt-4 p-2'>
                       <Button type='submit' className='btn btn-success'>
                          <span className='fa fa-paper-plane fa-lg'></span> Proceed
                        </Button>
                   </Row>

                </LocalForm>
              </div>

            <Modal isOpen={this.state.isOpen}>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalBody>
                <Table className='m-2 p-2'>
                  <tr className='m-2 p-2'>
                     <td><b>UserID: </b></td> <td> { new Cookies().get('userid') } </td> 
                  </tr>
                  <tr className='m-2 p-2'>
                     <td><b>Issue ID:</b></td> <td> { this.state.id } </td>
                  </tr>  
                  <tr className='m-2 p-2'>
                    <td><b>Service:</b></td> <td> { this.state.values.service } </td>
                  </tr>  
                  <tr className='m-2 p-2'>
                     <td><b>Area of complaint:</b></td> 
                     <td> { this.state.values.dept } </td>
                  </tr> 
                  <tr className='m-2 p-2'>
                     <td><b>Subject: </b></td> <td> {this.state.values.sub} </td>
                  </tr>
                  <tr className='m-2 p-2'>
                     <td><b>Issue:</b></td> <td> {this.state.values.issue} </td>
                  </tr> 
                  <tr className='m-2 p-2'>
                     <td><b>Proof:</b></td> <td> {this.state.values.proof? "Yes": "No"} </td>
                  </tr> 
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onClick={() => this.handleFinalSubmit()}> Confirm</Button>
              </ModalFooter>
          </Modal>
          </div>
        );
    }
}

export default Complain;