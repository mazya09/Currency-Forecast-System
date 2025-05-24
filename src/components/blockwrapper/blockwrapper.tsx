import React from 'react';
import './blockwrapper.scss'
export default function Blockwrapper({ children }) {
  return (
    <div className='conten_w'>
      {children}
    </div>
  );
}
