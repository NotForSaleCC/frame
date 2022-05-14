const registerDevice = (topic) => {
  const token = `Bearer ${window.sessionStorage.token}`;
  
  if (topic) {
    fetch("http://localhost:4000/api/v1/frames", {
      method: "POST",
      body: JSON.stringify({
        frame: { client_id: "yo", topic: topic },
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
      delete window.sessionStorage.device_id;

      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
};

export default registerDevice;
