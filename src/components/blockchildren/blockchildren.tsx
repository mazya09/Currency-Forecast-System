import React from 'react';
import './blockchildren.scss'

export default function Blockchildren({children}) {
  return (
    <div className='content_ch'>
      {children}
    </div>
  );
}
