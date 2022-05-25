import React, { useState } from "react";

const SignUpView = ({ authenticated, setAuthenticated, setSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = function (e, email, password) {
    console.log(email, password);
    signUp(email, password);
    e.preventDefault();
  };

  async function signUp(email, password) {
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/register`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((json) => {
          window.sessionStorage.token = json.data.token;
          setAuthenticated(true);
        });
      } else {
        return response.json().then((error) => {
          for (const key in error.message) {
            setError(`${key}: ${error.message[key]}`);
          } 

          throw error;
        });
      }
    });
  }

  return (
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
          className={`shadow appearance-none border ${error.length > 0 && "border-red-500"
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
          className={`shadow appearance-none border ${error.length > 0 && "border-red-500"
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
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUpView;