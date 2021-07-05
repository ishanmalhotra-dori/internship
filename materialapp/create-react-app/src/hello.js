var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://127.0.0.1:5000/", requestOptions)
    .then(response => response.text())
    .then(response_json => response.json())
    .catch(error => console.log('error', error));




    



