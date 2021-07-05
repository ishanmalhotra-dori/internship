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
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';



ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <Container maxWidth="sm">
      <Box my={4}>
      <CssBaseline /> 
      
        {/* <App /> */}
        <CGrid aligned = "Center"/>
        {/* <label htmlFor="upload-photo">
          </label>;   */}
        {/* <Footer /> */}
      </Box>
    </Container>
  </ThemeProvider>,
  document.querySelector('#root'),
);

