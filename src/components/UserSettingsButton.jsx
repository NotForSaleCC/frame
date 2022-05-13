import { useState, Fragment, useEffect } from "react";
import Popup from "./popup";
import { useRouter } from "next/router";
import registerDevice from "../hooks/registerDevice";
import Link from "next/link";

export const UserSettingsButton = ({ authenticated, setAuthenticated }) => {
  const router = useRouter();
  const login = router.query.login === "true" && !authenticated;

  const [showPopup, setShowPopup] = useState(login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (authenticated && !registered) {
      registerDevice(window.sessionStorage.device_id);
      setRegistered(true);
    }
  });

  const submitForm = function (e, email, password) {
    signIn(email, password);
    e.preventDefault();
  };

  async function signIn(email, password) {
    if (authenticated) return null;

    let payload = new FormData();

    payload.append("email", email);
    payload.append("password", password);

    await fetch("http://localhost:4000/api/v1/users/log_in", {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((json) => {
          window.sessionStorage.token = json.data.token;
          setAuthenticated(true);
        });
      } else {
        return response.json().then((error) => {
          setError("Wrong email or password");

          throw error;
        });
      }
    });
  }

  const signOut = () => {
    delete window.sessionStorage.token;
    setAuthenticated(false);
  };

  return (
    <Fragment>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
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
            {!authenticated && (
              <form
                className="bg-white px-6 pt-6"
                onSubmit={(e) => {
                  submitForm(e, username, password);
                }}
              >
                {error && (
                  <div
                    class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    <span class="font-medium">{error}</span>
                  </div>
                )}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className={`shadow appearance-none border ${
                      error.length > 0 && "border-red-500"
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    type="text"
                    value={username}
                    placeholder="Email"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className={`shadow appearance-none border ${
                      error.length > 0 && "border-red-500"
                    } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <span className="pl-4">
                    <Link href="/signup">Sign Up</Link>
                  </span>
                </div>
              </form>
            )}
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
