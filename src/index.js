import React from 'react';

import Nav from './component/nav';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './component/app'

ReactDOM.render(
  <>
    <BrowserRouter>
    <Nav></Nav>
    <App></App>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);



