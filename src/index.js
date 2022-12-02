import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Suspense, lazy} from 'react'
const AppComponent = lazy(()=> import('./App'))


ReactDOM.render(

<Router>

    <App/>

  
</Router>
  
  
 ,
  document.getElementById('root')
);