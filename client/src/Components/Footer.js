import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const today = new Date();
    return (
      <footer className='footer mt-auto py-2 bg-dark text-center'>
        <div className='container'>
          <p className='text-light'>Copyright &copy; {today.getFullYear()}</p>
        </div>
        
      </footer>

    );
  }

  export default Footer;