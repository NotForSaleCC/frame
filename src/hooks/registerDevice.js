import { useEffect } from "react";

const registerDevice = (topic) => {
  let payload = new FormData();

  payload.append("frame[client_id]", "yo");
  payload.append("frame[topic]", topic);

  let token = `Bearer ${window.sessionStorage.token}`;
  if (topic) {
    fetch("http://localhost:4000/api/v1/frames", {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        delete window.sessionStorage.device_id;

        console.log("Success:", json);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

export default registerDevice;
