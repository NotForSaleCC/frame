import PropTypes from 'prop-types';

const registerDevice = (clientId: String, topic: String) => {
  const token = `Bearer ${window.sessionStorage.token}`;
  
  if (topic) {
    fetch("http://localhost:4000/api/v1/frames", {
      method: "POST",
      body: JSON.stringify({
        frame: { client_id: clientId, topic: topic },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }).then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        return response.json().then((error) => {
          throw error;
        });
      }
    }).then((data) => {
      delete window.sessionStorage.encodedToken;

      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
};


registerDevice.PropTypes = {
  topic: PropTypes.string,
};

export default registerDevice;
