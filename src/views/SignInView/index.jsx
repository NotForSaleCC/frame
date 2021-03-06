import { useState } from "react";

export const SignInView = ({ authenticated, setAuthenticated, setSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = function (e, email, password) {
    console.log(email, password);
    signIn(email, password);
    e.preventDefault();
  };

  async function signIn(email, password) {
    if (authenticated) return null;

    await fetch("/api/v1/users/log_in", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
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
          setError("Wrong email or password");

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
          Sign In
        </button>
        <span className="pl-4">
          <a href="#" onClick={(e) => { setSignUp(true) }}>Sign Up</a>
        </span>
      </div>
    </form>
  )
}

export default SignInView;