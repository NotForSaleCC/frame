import { useState, Fragment } from "react";
import RegisterDevice from "../../components/RegisterDevice";
import Popup from "../../components/popup";
// import registerDevice from "../utils/registerDevice";

export const RegisterDeviceView = () => {
  // const [clientId, setClientId] = useState("");
  // const [topic, setTopic] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // const submitForm = function (e, clientId, topic) {
  //   registerDevice(clientId, topic);
  //   e.preventDefault();
  // };

  return (
    <Fragment>
      {showPopup && (
        <Popup onClose={() => {
          setShowPopup(false)
        }}>
          <>
            <RegisterDevice />
          </>
        </Popup>
      )}

      <button
        className="btn btn-ghost btn-lg"
        onClick={() => setShowPopup(true)}
      >
        <div>
          <svg width="24px" height="24px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="w-6 h-6"
            fill="none"
            stroke="currentColor" class="jam jam-qr-code"><path d='M13 18h3a2 2 0 0 0 2-2v-3a1 1 0 0 1 2 0v3a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-3a1 1 0 0 1 2 0v3a2 2 0 0 0 2 2h3a1 1 0 0 1 0 2h6a1 1 0 0 1 0-2zM2 7a1 1 0 1 1-2 0V4a4 4 0 0 1 4-4h3a1 1 0 1 1 0 2H4a2 2 0 0 0-2 2v3zm16 0V4a2 2 0 0 0-2-2h-3a1 1 0 0 1 0-2h3a4 4 0 0 1 4 4v3a1 1 0 0 1-2 0z' /></svg>
        </div>
      </button>
    </Fragment>
  )
}

export default RegisterDeviceView;