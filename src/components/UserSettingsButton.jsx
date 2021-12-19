import { FC, useState, Fragment } from "react";
import Popup from "./popup"


export const UserSettingsButton = ({ authenticated, setAuthenticated }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = function (e, email, password) {
        signIn(email, password)
        e.preventDefault();
    }

    async function signIn(email, password) {
        let payload = new FormData();

        payload.append("email", email)
        payload.append("password", password)

        const response = await fetch('http://localhost:4000/api/v1/users/log_in', {
            method: 'POST',
            body: payload,
            headers: {
                Accept: 'application/json'
            },
        }).then(response => response.json())
            .then(json => {
                window.sessionStorage.token = json.data.token;
                setAuthenticated(true)

                console.log('Success:', json);
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    const signOut = () => {
        delete window.sessionStorage.token
        setAuthenticated(false)
    }

    return (
        <Fragment>
            {
                showPopup &&
                <Popup onClose={() => setShowPopup(false)}>
                    <>
                        {
                            authenticated &&
                            <div>
                                <p>You are logged in</p>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signOut}>
                                        Sign Out
                                </button>
                            </div>
                        }
                        {
                            !authenticated &&
                            <form className="bg-white px-6 pt-6" onSubmit={(e) => { submitForm(e, username, password) }}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Email
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={username} placeholder="Email" required onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} required onChange={e => setPassword(e.target.value)} />
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        }
                    </>
                </Popup>
            }
            <button
                className="btn btn-ghost btn-lg"
                onClick={() => setShowPopup(true)}
            >
                <div><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
            </button>
        </Fragment>
    );
};
