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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid() {
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgSrc2, setImgSrc2] = React.useState(null);
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
            <img src = {imgSrc}/> 
        
        {/* <Basic /> */}
            <DropzoneComponent />
            <div>
            <strong> Files: </strong>
            <ul>
                <li>{fileNames}</li>
            </ul>
          </div>
          </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="file" >Select File</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onclick = {handleImageUpload(file)}>Send File</Button>
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
          
          {/* <Grid item xs={8}>
          <Button variant="contained" onClick={()=>{handleImageUpload()
        capture()
          }}>Capture photo</Button>
            {imgSrc2 && (
              <img
                src={imgSrc2}
              />
            )}
        </Grid> */}

          <Grid item xs={12}>
            <Button variant="contained" onClick={()=>{
              var fl = new File([{imgSrc}],Date.now(),{
                type: "image/jpeg",
              });
              console.log(fl)
              handleImageUpload(fl)}}> Send Image </Button>
          </Grid> 
        </Grid>
      </React.Fragment>
    );
  }


  function FormRow3() {
    return (
      <React.Fragment>
        <Grid container direction="column" spacing = {5}>

          <Grid item xs={12}>
            <div>
            <Paper variant="elevation">
              <div border = {true}>
                <ul>{files}</ul>
              </div>
            </Paper>
            </div>
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" onClick = {() => { async function hello() {
                var data = await fetch("http://127.0.0.1:5000/hello-world").then(res => {
                return res.json();
                });
                setServerFiles(data["message"])
                console.log(data);

              } hello() }} > Call HelloWord API </Button>
          </Grid> 


          <Grid item xs={12}>
            <Button variant="contained" onClick = {() => { 
                async function fetchData() {
                var data = await fetch("http://127.0.0.1:5000/access-files").then(res => {
                return res.json();
                });
                setServerFiles(data["Filename"])
                console.log(data["Filename"])
              } 
              fetchData()
            } 
            }> Get All Files</Button>
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
      // ImageResizer.createResizedImage(objectURL, 200, 200, compressFormat, quality).then((resizedImageUri) => {
      //   setImgSrc(resizedImageUri)
      //   // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
      // }).catch((err) => {
      //   // Oops, something went wrong. Check that the filename is correct and
      //   // inspect err to get more details.
      // });
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
    width: 200,
    height: 200,
    facingMode: "user"
  };
  
  const WebcamCapture = () => {
    // const webcamRef = React.useRef(null);
    // const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 200, height:200});
      setImgSrc2(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored = {true}
          height={160}
          width={160}
        />
        <Button variant="contained" onClick={()=>{handleImageUpload()
        capture()
      }}>Capture</Button>
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
  // formdata = '/Users/ishanmalhotra/Desktop/Dori/materialapp/create-copy-2/src/bp.jpg'
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
      <Grid container spacing={50} xs={50}> 
        
        <Grid item xs={4}> 
          <FormRow />
        </Grid>

        <Grid item xs={4}> 
          <FormRow2 />
        </Grid>

        <Grid item xs={4}> 
          <FormRow3 />
        </Grid>

      </Grid>   
         
  </div>

  );

}