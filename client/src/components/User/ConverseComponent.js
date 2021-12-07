import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Label, Button, Card, CardBody } from 'reactstrap';

import { FiClock } from 'react-icons/fi';
import { HiStatusOnline } from 'react-icons/hi';
import { MdFeedback } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineFile } from 'react-icons/ai';

import { LocalForm, Control, Errors } from 'react-redux-form';
import Cookies from 'universal-cookie';
import FileViewer from 'react-file-viewer';
var mimetypes = require('mime-types');

class Converse extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
           isOpen: false,
           props: props
        };
    }

    toggleFileViewer() {
       this.setState({ isOpen: !this.state.isOpen });
    }

    handleSubmit(values) {
       this.props.postUserReply(this.state.props.fetched.userid, this.state.props.fetched.issueid, values.comment);
    }

    componentDidMount() {
      const cookies = new Cookies();
      
      setInterval(() => {
        this.props.fetchReply(cookies.get('userid'))
       }, 100000);
    }


    handleFinal(flag) {

       var conf = window.confirm("Are you sure want to proceed ?");
       if(!conf) return;

       if(flag) {
          this.props.handleWithdraw(this.state.props.fetched.userid, this.state.props.fetched.issueid);
       }
    }
    

    renderLeft(fetch) {

      return (
        <div className='p-3' style={{height: '550px', borderRight: '2px solid #a3a3a5'}}>

           <h4># Issue ID {fetch.issueid}</h4> 
            <dl className='pt-3'>
              <dt><BiUserCircle /> Raised by </dt> <dd>{fetch.userid}</dd>
              <dt><i className='fa fa-bolt'></i> Subject</dt> <dd>{fetch.sub}</dd>
              <dt><MdFeedback /> Summary </dt>  <dd>{fetch.issue}</dd>
              <dt><FiClock /> Raised on </dt>  
              <dd>{new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'})
                                        .format(new Date(fetch.date))} </dd>
              <dt><HiStatusOnline /> Status </dt> 
              <dd>
                 { (fetch.status === 'pending')? <i className='fa fa-spinner text-primary'></i>: <i className='fa fa-check-circle text-green'></i> } {' '}
                 <span className='p-2'> { fetch.status.toUpperCase() }  </span>
              </dd>

              <dt>Proof</dt>
              <dd>
                 <a onClick={() => this.toggleFileViewer()}> <AiOutlineFile /> {fetch.proof.name} </a> <br />
                   <p className='text-primary py-2' onClick={() => this.toggleFileViewer()}>&#62; <u> Tap to Open...</u></p>

                    
                   <Modal size='lg' isOpen={this.state.isOpen} toggle={() => this.toggleFileViewer()}>
                      <ModalHeader>{fetch.proof.name}</ModalHeader>
                       <ModalBody>
                        <div className='p-2' style={{height: '550px', overflow: 'scroll'}}>
                           <FileViewer 
                              fileType={ mimetypes.extension(fetch.proof.type) }
                              filePath={fetch.proof.path}
                           />
                        </div>
                       </ModalBody>
                  </Modal>
              </dd>
            </dl>

            <div className='p-2' hidden={!this.state.props.reply.closed}>
                <h4><span className='fa fa-check-circle fa-lg'></span> Closed</h4>
            </div>
         </div>
       );
    }

    renderRight(reply) {

      //if(reply.converse.length() === 0)
        //  return(<div></div>);

      return (
         <div className='p-3'>
            <h4>Conversation </h4>

            <div className='pt-3'>
                <div className='' style={{ height:'500px', overflowY: 'scroll' }}>    

                   {          
                       reply.convers.map((conv) => {
                         if(conv.id !== this.state.props.fetched.userid)
                               return (
                                 <div className='my-4'>
                                 <Card className='cview1' style={{width: '400px', borderRadius: '20px'}}>
                                    <CardBody>
                                       <div>
                                           <h6 className='text-primary'>{conv.id}</h6> 
                                       </div>
                                       <div>
                                          {conv.msg}
                                         <div className='d-flex justify-content-end text-secondary' style={{fontSize: 13}}>
                                           {new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'})
                                              .format(new Date(conv.date))}</div>
                                       </div>
                                    </CardBody>
                                 </Card>
                                 </div>
                               );
                          
                          else
                            return (
                              <div className='d-flex justify-content-end my-4'>
                                <Card className='cview1' style={{width: '400px', borderRadius: '20px', backgroundColor: 'lightgreen'}}>
                                <CardBody>
                                    <div>
                                        <h6 className='text-success'>{conv.id}</h6> 
                                    </div>
                                    <div>
                                       {conv.msg}
                                      <div className='d-flex justify-content-end text-secondary' style={{fontSize: 13}}>
                                        {new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'})
                                          .format(new Date(conv.date))}</div>
                                    </div>
                                </CardBody>
                              </Card>
                             </div>
                            );
                        })  
                   }
                 
                 <div className='p-2' hidden={!reply.closed}>
                    <h6><span className='fa fa-check-circle fa-lg'></span> Closed Conversation...</h6>
                 </div>

                </div>

                <LocalForm className='pt-3' onSubmit={(values) => this.handleSubmit(values)}>
                  <Row>
                    <Label htmlFor='comment' className='py-1'> <h6> Your Reply </h6> </Label>
                    <Control.textarea model='.comment' className='form-control' placeholder="Type something..." 
                        rows={5} type='textarea' disabled={this.state.props.reply.closed}
                    />
                  </Row>
                  
                  <div className='pt-2 d-flex justify-content-end'>
                    <Button type='submit' color='primary'>
                      <span className='fa fa-paper-plane'></span> Proceed 
                    </Button>
                  </div>
                </LocalForm>
            </div>
         </div>
      );
    }

    goBack() {
      window.history.back();
    }


    render() {

      return(
        <div className='container-fluid p-5' style={{height: 'auto'}}>

         <div className='row'> 
           <div className='col-md-10'>
               <h3> 
                <i className='fa fa-angle-left' onClick={() => this.goBack()}></i> {' '}
                {this.state.props.fetched.sub}
               </h3>
          </div>

          <div className='col-md-2'>
              <Button color='danger' disabled={this.state.props.reply.closed} onClick={() => this.handleFinal(true) }> 
                  <span className='fa fa-undo'></span> Withdraw
              </Button>
          </div>
        </div><hr/>

          <div className='row row-content'>
              <div className='col-12 col-md-5'>
                  { this.renderLeft(this.state.props.fetched) }
              </div>
              <div className='col-12 col-md-7'>
                { this.renderRight(this.state.props.reply) }
              </div>
          </div>

        </div>
      ); 
    }
}

export default Converse;