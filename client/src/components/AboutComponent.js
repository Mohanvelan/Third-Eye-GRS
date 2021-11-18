import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Media } from 'reactstrap';

class About extends Component 
{
    constructor(props){
       super(props);
    }

    render()
    {
        return(
           <div  className='container p-3'>

               <div className='mt-3'>
                  <h3 className='pl-5'>About Us</h3>  <hr/>
               </div>

               <div className="row row-content">
                  <div className="col-12 col-md-8 p-3">
                     <h4>Third Eye - A Public Grievance Redressal System</h4>
                     <div className='mt-4' style={{textAlign: 'justify'}}>
                        <p>
                           It's an initiative by the Government with the intention to address the public complaints and 
                           issues raised by common people and ensure that they are satisfied with the services provided by
                           the Goverment. 
                        </p>
                     </div>
                  </div>

                  <div className="col-12 col-md-4 p-3">
                     <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                           <dl className="row p-2">
                                 <dt className="col-6">Started</dt>
                                 <dd className="col-6"> 14 Mar, 2018</dd>
                                 <dt className="col-6">Complaints Raised</dt>
                                 <dd className="col-6">000</dd>
                                 <dt className="col-6">Solved </dt>
                                 <dd className="col-6">000</dd>
                                 <dt className="col-6">In Progress</dt>
                                 <dd className="col-6">000</dd>
                                 <dt className="col-6">Suggestions</dt>
                                 <dd className="col-6">000</dd>
                           </dl>
                        </CardBody>
                    </Card>
                  </div>
             </div>

             <div className='col-12 mt-3'>
                  <h3 className='pl-5'>FAQ's</h3>  <hr/>
             </div>

             <div className='row row-content'>
                   
             </div>

         
         </div>
        );
    }
}

export default About;