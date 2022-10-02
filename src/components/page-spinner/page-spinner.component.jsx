import Spinner from 'react-bootstrap/Spinner';
import React from 'react';

const PageSpinner = () => {
  return <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <Spinner animation='border' />
  </div>;
}

export default PageSpinner;