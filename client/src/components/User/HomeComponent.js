import React, { Component } from 'react';
import { Jumbotron, Card, CardBody, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading,
        ListGroupItemText, Badge, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AiFillHourglass, AiFillLike, AiFillRocket, AiFillWechat, AiOutlineFile } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { HiStatusOnline } from 'react-icons/hi';
import { MdFeedback } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { IoMdList } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import FileViewer from 'react-file-viewer';

var mimetypes = require('mime-types');

class Home extends Component 
{
    constructor(props) {
        super(props);

        this.state = {
            activeKey: 1,
            openModal: false,
            fetched: null
        };
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.byDefault = this.byDefault.bind(this);
    }

    toggle(key) {
       this.setState ({
          activeKey: key
       });
    }

   toggleFileViewer() {
      this.setState ({
         openModal: !this.state.openModal
      });
   }
    
    handleClick(fetch) {
       this.setState ({
           fetched: fetch
       });
    }

    renderData(fetched) 
    {
        if(fetched === null)
          return (
            <div className='mt-5 pt-5' >
               <div className='d-flex justify-content-center pt-3'>
                  <img src='/assets/thirdeye.png' alt='Third eye' style={{opacity: '0.3', borderRadius: '50%', height: '70px', width: '70px'}} />
                </div> <br/>
                <h5 className='d-flex justify-content-center'> No Item is Selected... </h5> 
            </div>
          );
   
        else
          return (
             <div className='pt-3 pl-4'>
                <div className='row'>
                    <h4 className='col-md-8'> {fetched.sub} </h4> 
                    <span className='col-md-4'>
                       { (fetched.status === 'resolved')? <i className='fa fa-check-circle fa-lg text-success'></i> :
                          <i className='fa fa-spinner fa-lg text-primary'></i> }
                    </span>
                </div> <hr/>

                <dl>
                <dt><GoIssueOpened /> Issue Id </dt> <dd>{fetched.issueid}</dd>
                <dt><BiUserCircle /> Raised by </dt> <dd>{fetched.userid}</dd>
                <dt><MdFeedback /> Summary </dt>  <dd>{fetched.issue}</dd>
                <dt><FiClock /> Raised on </dt>  
                <dd>{new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'})
                                          .format(new Date(fetched.date))} </dd>

                <dt>Proof</dt>
                <dd>
                   <a onClick={() => this.toggleFileViewer()}> <AiOutlineFile /> {fetched.proof.name} </a> <br/>
                   <p className='text-primary py-2' onClick={() => this.toggleFileViewer()}>&#62; <u> Tap to Open...</u></p>
                    

                   <Modal size='lg' isOpen={this.state.openModal} toggle={() => this.toggleFileViewer()} contentClassName='custom-modal'>
                      <ModalHeader>{fetched.proof.name}</ModalHeader>
                       <ModalBody>
                        <div className='p-2' style={{height: '550px', overflow: 'scroll'}}>
                           <FileViewer 
                              fileType={ mimetypes.extension(fetched.proof.type) }
                              filePath={fetched.proof.path}
                           />
                        </div>
                      </ModalBody>
                  </Modal>
                </dd>

                <dt><HiStatusOnline /> Status </dt> 
                <dd>
                 { (fetched.status === 'pending')? <i className='fa fa-spinner text-primary'></i>: <i className='fa fa-check-circle text-success'></i> } {' '}
                 <span className='p-2'> { fetched.status.toUpperCase() }  </span>
                </dd>

                <dt></dt>
                <dd className='pt-3'>
                  <Link to={`/user/${fetched.issueid}`}> <i className='fa fa-angle-double-right'></i> Tap for More info </Link> 
                </dd>

                </dl>
             </div>
          );
    }


    renderList(fetched, isErr, errMess) {
       
      if(isErr) 
         return ( <div>{errMess}</div> ); 
      
      else if (fetched.length === 0)
         return (
            <div className='m-5 p-5'> <p> Not Available </p>  </div>
         );

      else
      { 
       return(
         <> <ListGroup className='lg'>
          {
             fetched.map((fetch) => {
                   
              return(
                <div className='lgi'> 
                   <ListGroupItem className='lgisub' active={this.state.fetched === null || this.state.fetched.issueid !== fetch.issueid}
                      style={{height: '110px', margin: '2px 0 3px 0'}} color='primary'
                      onClick={() => this.handleClick(fetch)}>
                   
                     <ListGroupItemHeading className='row'>
                        <div className='col-9'> {fetch.sub} </div>
                        <div className='col-3'>
                           <Badge> {new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric'}).format(new Date(fetch.date))} </Badge>
                        </div>
                     </ListGroupItemHeading>
                     <ListGroupItemText>
                         <div> Issue No. {fetch.issueid} </div> 
                         <span className='pt-1'>
                            {(fetch.status.toUpperCase() ==='RESOLVED')? <i className='fa fa-check-circle'></i>
                          : <i className='fa fa-spinner'></i>} {' '} {fetch.status.toUpperCase()}
                         </span>
                    
                     </ListGroupItemText>
                  </ListGroupItem>             
                </div>
              );
            })
          }
        </ListGroup> </>
       );
      }
    }

    byDefault() {
       this.setState ({
          fetched: null
       });
    }

     render() {

        return(
         <>     
          <Jumbotron className='py-5'>
               <div className='container'>
                  
                  <div className='col-12'>
                      <h4 className='row justify-content-center'>DASHBOARD</h4>
                      <h4 className='mt-4'>MY COMPLAINTS</h4>

                      <div className='row mt-4'>

                         <div className='col-md-3 p-1'>
                            <div>
                              <Card className='cview1 px-2' style={{borderRadius: '20px', width: '250px'}} >
                               <CardBody className='row pl-4 pt-4'>
                                 <AiFillRocket className='col-3 mt-2' size='md' />
                                 <span className='col-9'>
                                    Raised  <p style={{fontSize: '25px', color: '#0275d8'}}> 
                                         { this.props.dash.raised }
                                    </p>
                                 </span>
                               </CardBody>
                              </Card>
                            </div>
                         </div>
                         
                         <div className='col-md-3 p-1'>
                            <div>
                              <Card className='cview1 px-2' style={{borderRadius: '20px', width: '250px'}}>
                               <CardBody className='row pl-4 pt-4'>
                               <AiFillLike className='col-3 mt-2' size='md' />
                               <span className='col-9'>
                                  Resolved <p style={{fontSize: '25px', color: '#1d8f4a'}}> 
                                     { this.props.dash.resolved }    
                                   </p>
                               </span>
                               </CardBody>
                               </Card>
                            </div>
                         </div>

                         <div className='col-md-3 p-1'>
                            <div>
                            <Card className='cview1 px-2' style={{borderRadius: '20px', width: '250px'}}>
                             <CardBody className='row pl-4 pt-4'>
                             <AiFillHourglass className='col-3 mt-2' size='md' />
                               <span className='col-9'>
                                  Pending  <p style={{fontSize: '25px', color: '#CC0000'}}> 
                                    { this.props.dash.pending }
                                  </p>
                               </span>
                              </CardBody>
                            </Card>
                            </div>
                         </div>

                         <div className='col-md-3 p-1'>
                            <div>
                            <Card className='cview1 px-2' style={{borderRadius: '20px', width: '250px'}}>
                              <CardBody className='row pl-4 pt-4'>
                              <AiFillWechat className='col-3 mt-2' size='md' />
                               <span className='col-9'>
                                  Suggestions  <p style={{fontSize: '25px', color: '#1d8f4a'}}> 
                                   { this.props.dash.suggested }
                                  </p>
                               </span>
                              </CardBody>
                              </Card>
                            </div>
                         </div>
                         
                      </div>
                  </div>
               </div>
          </Jumbotron>
      

          <Tab.Container defaultActiveKey="first">
              <div className='row row-content py-5'>
                  <Nav variant="pills" className="flex-row justify-content-center">
                     <Nav.Item>
                        <Nav.Link eventKey="first" onClick={this.byDefault}>Raised By You</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="second" onClick={this.byDefault}>Resolved By Us</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="third" onClick={this.byDefault}>In Progress</Nav.Link>
                     </Nav.Item>
                  </Nav>
               </div>

               <Row className='py-3 px-5'>
                  <Tab.Content>
                     <Tab.Pane eventKey="first" style={{height: '700px'}}>
                          <Row> 
                            <div> <h5> # RAISED BY YOU </h5> <hr/> </div>
                          </Row>
                        <Row className='mt-4'>
                           <Col md={5}>
                           <div className='mylist'>
                             { this.renderList(this.props.raisedData, this.props.raisedErr, this.props.raisedErrMess) } 
                           </div>
                           </Col>
                           <Col md={7}>                             
                             <div className='px-4 py-1'>
                               { this.renderData(this.state.fetched) }
                             </div>
                           </Col>
                        </Row>
                     </Tab.Pane>

                     <Tab.Pane eventKey="second" style={{height: '700px'}}>
                         <Row> 
                            <div> <h5> # RESOLVED BY US </h5>  <hr/> </div>
                          </Row>
                        <Row className='mt-4'>
                           <Col md={5}>
                           <div className='mylist'>
                            { this.renderList(this.props.resolvedData, this.props.resolvedErr, this.props.resolvedErrMess) } 
                           </div>
                          </Col>
                           <Col md={7}>
                            <div className='px-4 py-1'>
                               { this.renderData(this.state.fetched) }
                             </div>
                           </Col>
                        </Row>
                     </Tab.Pane>
                     
                     <Tab.Pane eventKey="third" style={{height: '700px'}}>
                        <Row> 
                            <div> <h5> # IN PROGRESS </h5>  <hr/> </div>
                          </Row>
                       <Row className='mt-4'>
                           <Col md={5}>
                           <div className='mylist'>
                            { this.renderList(this.props.pendingData, this.props.pendingErr, this.props.pendingErrMess) } 
                           </div>
                           </Col>
                           <Col md={7}>
                            <div className='px-4 py-1'>
                               { this.renderData(this.state.fetched) }
                             </div>
                           </Col>
                        </Row>
                     </Tab.Pane>
                  </Tab.Content>
               </Row>
         </Tab.Container>

        </>
       );
     }
}

export default Home;