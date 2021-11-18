import React, { Component } from 'react';
import { Jumbotron, Card, CardBody, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading,
        ListGroupItemText, Badge } from 'reactstrap';
import { AiFillHourglass, AiFillLike, AiFillRocket, AiFillWechat } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { HiStatusOnline } from 'react-icons/hi';
import { MdFeedback, MdCached } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { GrStatusGood } from 'react-icons/gr';
import { IoMdList } from 'react-icons/io';
import { Tab, Nav } from 'react-bootstrap';


class Home extends Component 
{
    constructor(props) {
        super(props);

        this.state = {
            activeKey: 1,
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

    
    handleClick(fetch) {
       this.setState ({
           fetched: fetch
       });
    }

    renderData(fetched) 
    {
        if(fetched === null)
          return (
             <div className='p-5'>No Item is selected...</div>
          );
        else
          return (
             <div className='pt-3 pl-4'>
                <h4>{fetched.sub}</h4> <hr/>
                <dl>
                <dt><GoIssueOpened /> Issue Id </dt> <dd>{fetched.issueid}</dd>
                <dt><BiUserCircle /> Raised by </dt> <dd>{fetched.userid}</dd>
                <dt><MdFeedback /> Summary </dt>  <dd>{fetched.issue}</dd>
                <dt><FiClock /> Raised on </dt>  
                <dd>{new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'})
                                          .format(new Date(fetched.date))} </dd>
                <dt><HiStatusOnline /> Status </dt> 
                <dd>
                 { (fetched.status === 'pending')? <MdCached />: <GrStatusGood /> } {' '}
                 { fetched.status.toUpperCase() }  
                </dd>
                </dl>
             </div>
          );
    }


    renderList(fetched, isErr, errMess) {
       
      if(isErr) 
         return ( <div>{errMess}</div> );

      else
      { 
       return(
         <> <ListGroup>
          {
             fetched.map((fetch) => {
                   
              return(
                <div>
                   <ListGroupItem active style={{height: '110px'}} onClick={() => this.handleClick(fetch)}>
                        <ListGroupItemHeading className='row'>
                           <div className='col-9'> {fetch.sub} </div>
                           <div className='col-3'>
                              <Badge> {new Intl.DateTimeFormat('en', {day:'2-digit', month:'short', year:'numeric'}).format(new Date(fetch.date))} </Badge>
                           </div>
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                           <p>Issue No. {fetch.issueid} </p>
                           {fetch.status.toUpperCase()}
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
                                         {(this.props.dash!==undefined)?'0':this.props.dash[0].raised}
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
                                    {(this.props.dash!==undefined)?'0':this.props.dash[0].resolved} 
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
                                  {(this.props.dash!==undefined)?'0':this.props.dash[0].pending}
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
                                   {(this.props.dash!==undefined)?'0':this.props.dash[0].suggestions}
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
                     <Tab.Pane eventKey="first" style={{height: '500px'}}>
                          <Row> 
                            <div> <h5> <IoMdList /> RAISED BY YOU </h5> </div>
                          </Row>
                        <Row className='mt-4'>
                           <Col md={5}>
                            { this.renderList(this.props.raisedData, this.props.raisedErr, this.props.raisedErrMess) } 
                           </Col>
                           <Col md={7}>
                             <div className='px-4 py-1'>
                               { this.renderData(this.state.fetched) }
                             </div>
                           </Col>
                        </Row>
                     </Tab.Pane>

                     <Tab.Pane eventKey="second" style={{height: '500px'}}>
                         <Row> 
                            <div> <h5> <IoMdList /> RESOLVED BY US </h5> </div>
                          </Row>
                        <Row className='mt-4'>
                           <Col md={5}>
                            { this.renderList(this.props.resolvedData, this.props.resolvedErr, this.props.resolvedErrMess) } 
                          </Col>
                           <Col md={7}>
                            <div className='px-4 py-1'>
                               { this.renderData(this.state.fetched) }
                             </div>
                           </Col>
                        </Row>
                     </Tab.Pane>
                     
                     <Tab.Pane eventKey="third" style={{height: '500px'}}>
                        <Row> 
                            <div> <h5> <IoMdList /> IN PROGRESS </h5> </div>
                          </Row>
                       <Row className='mt-4'>
                           <Col md={5}>
                            { this.renderList(this.props.pendingData, this.props.pendingErr, this.props.pendingErrMess) } 
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