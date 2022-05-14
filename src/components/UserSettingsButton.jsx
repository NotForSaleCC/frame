import { useState, Fragment, useEffect } from "react";
import Popup from "./popup";
import { useRouter } from "next/router";
import registerDevice from "../hooks/registerDevice";
import SignInView from "../views/SignInView";
import SignUpView from "../views/SignUpView";

export const UserSettingsButton = ({ authenticated, setAuthenticated }) => {
  const router = useRouter();
  const login = router.query.login === "true" && !authenticated;

  const [showPopup, setShowPopup] = useState(login);
  const [deviceRegistered, setDeviceRegistered] = useState(false);
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    if (authenticated && !deviceRegistered) {
      registerDevice(window.sessionStorage.device_id);
      setDeviceRegistered(true);
    }
  });

  const signOut = () => {
    delete window.sessionStorage.token;
    setAuthenticated(false);
  };

  return (
    <Fragment>
      {showPopup && (
        <Popup onClose={() => {
          setShowPopup(false)
          setSignUp(false)}
        }>
          <>
            {authenticated && (
              <div>
                <p>You are logged in</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            )}
            {!authenticated && !signUp && (<SignInView authenticated={authenticated} setAuthenticated={setAuthenticated} setSignUp={setSignUp} />)}
            {!authenticated && signUp && (<SignUpView authenticated={authenticated} setAuthenticated={setAuthenticated} setSignUp={setSignUp} />)}
          </>
        </Popup>
      )}
      <button
        className="btn btn-ghost btn-lg"
        onClick={() => setShowPopup(true)}
      >
        <div>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </div>
      </button>
    </Fragment>
  );
};
