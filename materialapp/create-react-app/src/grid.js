import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import doFunction from './hello.js'
import  { useState } from 'react';




const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



function CenteredGrid(props) {
  const { classes } = props;
  // const [json_response, setCount] = useState("helloo");
  // console.log(json_response.toString())

  function hello_world() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/", requestOptions)
        .then(response => { return response.json()})

        .then(function(res){ console.log(res) })
        .catch(error => console.log('error', error));
  }

  const [items, setItems] = React.useState(0);

  
  return (
    <div className={classes.root}>
      <Grid container spacing={20}>
        <Grid item xs={12} >
            <Grid container justify="center">
          {/* <Paper className={classes.paper}>xs=12</Paper> */}
          <Button variant="contained" onClick = {() => { 
            async function fetchData() {
            var data = await fetch("http://127.0.0.1:5000/").then(res => {
            return res.json();
            });
            setItems(data);
            console.log(data);

          } fetchData()

        } }> Visited {items} times
          {/* <input id="clickMe" type="button" value="clickme" " /> */}
           </Button>
           <div>
             
           </div>
            </Grid>
        </Grid>
        <Grid item xs={6}>
            <Grid container justify="center">
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            <Button variant="contained" href='/Users/ishanmalhotra/Desktop/Dori/materialapp/create-react-app/src/file.html'>Click to upload </Button>
                </Grid>
        </Grid>
        <Grid item xs={6}>
        <Grid container justify="center">
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            <Button variant="contained">Click to send </Button>
                </Grid>
        </Grid>
        



      </Grid>
    </div>
  );
}

const ul = document.getElementById('authors');



function hello_world() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/", requestOptions)
        .then(response => { setCount(response.json())})
        .then(function(res){ console.log(res) })
        .catch(error => console.log('error', error));
  }


CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);