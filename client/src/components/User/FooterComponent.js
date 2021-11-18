import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component 
{
    constructor(props){
        super(props);
    }

     render(){
        
        return(
           <>
             <div className='footer pt-5 text-white'>
                <div className='row justify-content-center'>
                    
                    <div className='col-4 col-sm-2'>
                       <h4>Links</h4>
                       <ul className='list-unstyled text-white'>
                          <li><Link to='' className=''>Home</Link></li>
                          <li><Link to=''>Complaints</Link></li>
                          <li><Link to=''>Contact Us</Link></li>
                          <li><Link to=''>Who are We?</Link></li>
                       </ul>
                    </div>

                    <div className='col-8 col-sm-4'>

                    </div>

                    <div className='col-12 col-sm-4'>
                       <div className='text-center'>
                         <a><i className='fa fa-facebook fa-lg p-3'></i></a>
                         <a><i className='fa fa-google fa-lg p-3'></i></a>
                         <a><i className='fa fa-twitter fa-lg p-3'></i></a>
                         <a><i className='fa fa-whatsapp fa-lg p-3'></i></a>
                       </div>
                    </div>
                </div>

                <div className='row justify-content-center'>
                  <div className='col-auto pt-3'>
                     <p className='text-secondary'>@ Copyright 2021 Third Eye</p>
                  </div>
                </div>

             </div>
           </>
        );
     }
}

export default Footer;