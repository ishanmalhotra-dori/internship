import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import Footer from './footer';
import Button from '@material-ui/core/Button';
import CGrid from './grid';
import { Component } from "react";
import { render } from "react-dom";


ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
     <CssBaseline /> 
     
    <App />
    <CGrid />
    <label htmlFor="upload-photo">
      </label>;  
    <Footer />

  </ThemeProvider>,
  document.querySelector('#root'),
);

