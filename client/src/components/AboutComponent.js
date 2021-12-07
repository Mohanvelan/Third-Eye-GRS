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
                  <div className="col-12 p-3">
                     <h4>Third Eye - A Public Grievance Redressal System</h4>
                     <div className='mt-4' style={{textAlign: 'justify'}}>
                        <p>
                           It's an initiative by the Government with the intention to address the public complaints and 
                           issues raised by common people and ensure that they are satisfied with the services provided by
                           the Goverment. 
                        </p>
                     </div>
                  </div>
             </div>

             <div className='py-3'>
                 <h4 className='pt-3'> How We Solve</h4>

                 <img src='/assets/process-2.PNG' alt='' className='p-3' />

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