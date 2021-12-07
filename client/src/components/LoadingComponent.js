import React from 'react';

function Loading() {

   return(
      <div className='col-12 d-flex justify-content-center py-5'>
          <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
          <p>Loading...</p>
      </div>
   );

}

export default Loading;

