import React from 'react';'fileInput';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from "./bp.jpg";
import Dropzone from 'react-dropzone'
// import MyDropzone from './dropzon'
import Upload from './dropzon';
import FileUploadPage from './upload-file'
// import DropzoneComponent from './dropzon';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { render } from 'react-dom';
// import ImageResizer from './react-native-image-resizer';
// import {useDropzone} from 'react-dropzone';


const WebcamComponent = () => <Webcam />;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'cen',
    color: theme.palette.text.secondary,
  },
}));



export default function NestedGrid() {
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgSrc2, setImgSrc2] = React.useState(null);
  const [imgSrc3, setImgSrc3] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [fileNames, setFileNames] = React.useState("");
  const [serverFiles, setServerFiles] = React.useState([]);
  let compressFormat = 'JPEG' // or 'PNG'
  let quality = 80 // out of 100

  // const handleDrop = acceptedFiles =>
  // setFileNames(acceptedFiles.map(file => file.name));
  
  const files = serverFiles.map(file => (
    <li key={file}>
      {file}
    </li>
    ));
    


  function FormRow() {
    return (
      <React.Fragment>
        <Grid container direction = "column" spacing = {3}>
          <Grid item xs={12} >
            <div>
            <img src = {imgSrc}/> 
            <img src = {imgSrc3}/> 
            </div>
        {/* <Basic /> */}
            <DropzoneComponent />
            <div>
            <strong> Files: </strong>
            <ul>
                <li>{fileNames}</li>
            </ul>
          </div>
          </Grid>
        {/* <Grid item xs={12}>
          <Button variant="contained" type="file" >Select File</Button>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container direction = "row">  
            <Grid item xs={6}>
            <Button variant="contained" onclick = {handleImageUpload(file)}>Send local</Button>
            </Grid>

            <Grid item xs={6}>
            <Button variant="contained" onclick = {handleImageUpload(file)}>Send s3</Button>
            </Grid>
          </Grid > 

        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={()=>{handlePredictions(file)}}> Get Predictions </Button>
        </Grid> 
       
      
        </Grid>
      </React.Fragment>
    );
  }


  
  function FormRow2() {
    return (
      <React.Fragment>
        <Grid container direction="column" spacing = {3}>
          <Grid item xs={12}>
            <WebcamCapture />
          </Grid>
          <Grid container direction = "row"> 
            <Grid item xs={6}>
              <Button variant="contained" onClick={()=>{
                var fl = new File([{imgSrc}],Date.now()+".jpeg",{
                  type: 'image/jpeg'
                });
                const objectURL = URL.createObjectURL(fl)
                console.log(imgSrc)

                console.log(fl)
                handleImageUpload(fl)}}> Send Image </Button>
              </Grid>
              <Grid item xs={6}>
                  <Button variant="contained" onClick={()=>{
              capture()
              }}> Capture </Button>
              </Grid>
            </Grid>

        </Grid>

      </React.Fragment>
    );
  }




  function FormRow3() {
    return (
      <React.Fragment>
        <Grid container direction="column" spacing = {2}>
          <Grid item xs={12}>
            <div>
            <Paper variant="elevation">
              <div border = {true}>
                <ul>{files}</ul>
              </div>
            </Paper>
            </div>
          </Grid>
          <Grid container direction = "row">
          <Grid item xs={4}>
            <Button variant="contained" onClick = {() => { 
                async function fetchData() {
                var data = await fetch("http://127.0.0.1:5000/get-file-local").then(res => {
                return res.json();
                });
                setServerFiles(data["dir"])
                console.log(data["dir"])
              } 
              fetchData()
            } 
            }> Get Local Files</Button>

          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" onClick = {() => { 
                async function fetchData() {
                var data = await fetch("http://127.0.0.1:5000/access-files").then(res => {
                return res.json();
                });
                setServerFiles(data["dir"])
                console.log(data["dir"])
              } 
              fetchData()
            } 
            }> Get S3 Files</Button>
            
          </Grid>
            
          <Grid item xs = {4}>
            <Button variant="contained" onClick = {() => {setServerFiles([])}}>Close</Button>
          </Grid>
          </Grid>
       
      </Grid>
      </React.Fragment>
      
    );
  }

  function DropzoneComponent() {
    const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles);
      console.log(acceptedFiles[0]["path"])
      setFileNames(acceptedFiles[0]["path"])
      // var res = JSON.parse(acceptedFiles);
      var res = acceptedFiles;
      setFile(acceptedFiles[0])
      console.log(acceptedFiles[0])
      const objectURL = URL.createObjectURL(acceptedFiles[0])
      setImgSrc(objectURL)
      
      
    }, []);
  
    const {
      getRootProps,
      getInputProps
    } = useDropzone({
      onDrop
    });
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div> Drag and drop your images here.</div>
      </div>
    )
  }

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
  };
  
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 400, height:400});
    setImgSrc2(imageSrc);
  }, [webcamRef, setImgSrc]);

  const WebcamCapture = () => {
    // const webcamRef = React.useRef(null);
    // const [imgSrc, setImgSrc] = React.useState(null);
  
    // const capture = React.useCallback(() => {
    //   const imageSrc = webcamRef.current.getScreenshot({width: 400, height:400});
    //   setImgSrc2(imageSrc);
    // }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored = {true}
          height={400}
          width={400}
        />
        {/* <Button variant="contained" onClick={()=>{
        capture()
      }} >Capture</Button> */}
        {imgSrc2 && (
          <img
            src={imgSrc2}
          />
        )}
      </>
    );
  };
  
  

  function handleImageUpload(file) {
  var formdata = new FormData();
  formdata.append("files", file);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("http://127.0.0.1:5000/upload", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }


  function handlePredictions1(file) {
    var formdata = new FormData();
    formdata.append("files", file);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
      fetch("http://127.0.0.1:5000/get-predictions", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }

    function handlePredictions(file) {
      var formdata = new FormData();
      formdata.append("files", file);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      //   fetch("http://127.0.0.1:5000/get-predictions", requestOptions)
      //   .then(response => console.log(response))
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      // }
        { 
        async function fetchData() {
        var data = await fetch("http://127.0.0.1:5000/get-predictions",requestOptions).then(res => {
        return res.blob();
        });
        console.log(data)
        const myFile = new File([data], "image.jpeg", {
          type: data.type,
        });
        const objectURL = URL.createObjectURL(myFile)
        setImgSrc3(objectURL)
        
        console.log(myFile);
      } 
      fetchData()
    } 
  }
    
  


      
  function getFile(){
    var formdata = new FormData();
    var requestOptions = {
    method: 'GET',
    body: formdata,
    redirect: 'follow'
    };

  fetch("http://127.0.0.1:5000/access-files", requestOptions)
    .then(response = () => {response.text()
    console.log(response.json())
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

 
function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  console.log(acceptedFiles[0])
  setFile(acceptedFiles[0])
  const objectURL = URL.createObjectURL(acceptedFiles[0][0])
  setImgSrc(objectURL)


  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}


  

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing = {15}> 
        <Grid item xs={12}> 
          <FormRow />
        </Grid>
        <Grid item xs={12}> 
          <FormRow2 />
        </Grid>
        <Grid item xs={12}> 
          <FormRow3 />
        </Grid>
      </Grid>   
         
  </div>

  );

}
