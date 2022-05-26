import { useState, Fragment } from "react";
import RegisterDevice from "../../components/RegisterDevice";
import Popup from "../../components/popup";

export const RegisterDeviceView = () => {
  const [showPopup, setShowPopup] = useState(false);

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
        <svg width="25px" height="25px" fill="#ffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 4v5h2V5h4V3H4a1 1 0 0 0-1 1zm18 5V4a1 1 0 0 0-1-1h-5v2h4v4h2zm-2 10h-4v2h5a1 1 0 0 0 1-1v-5h-2v4zM9 21v-2H5v-4H3v5a1 1 0 0 0 1 1h5zM2 11h20v2H2z"/></svg>
        </div>
      </button>
    </Fragment>
  )
}

export default RegisterDeviceView;