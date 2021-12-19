import { useState, useEffect } from "react";
import styles from "./index.module.css"

export const PrintButton = ({ dropdownOpen, setDropdownOpen, devices, image, authenticated }) => {

    const openDropdown = () => {
        if(authenticated) {
            setDropdownOpen(!dropdownOpen)
        } else {
            alert("Please authenticate first")
        }
    }

    const printPicture = (client_id) => {
        console.log(image)

        let payload = new FormData();
        let token = `Bearer ${window.sessionStorage.token}`

        payload.append("client_id", client_id)
        payload.append("image_url", image)
        payload.append("action", "draw")

        console.log(token)

        fetch('http://localhost:4000/api/v1/frames/print', {
            method: 'POST',
            body: payload,
            headers: {
                Accept: 'application/json',
                Authorization: token
            },
        }).then(response => response.json())
            .then(json => {
                console.log('Success:', json);
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (dropdownOpen) {
            const handler = (e) => {
                console.log(e)
                setDropdownOpen(false)
            }

            window.addEventListener("click", handler)

            return () => {
                window.removeEventListener("click", handler)
            }
        }
    }, [dropdownOpen])

    return (
        <div>
            <button
                className="bg-transparent hover:btn-secondary font-semibold py-2 px-4 border hover:border-transparent rounded w-full"
                onClick={openDropdown}
            >
                Print
            </button>
            {dropdownOpen &&
                <div className={styles.dropdown}>
                    {
                        devices?.map(({ client_id, id, topic }) => (
                            <button
                                key={id}
                                className="bg-transparent hover:btn-primary font-semibold py-2 px-4 border hover:border-transparent rounded w-full"
                                onClick={() => printPicture(client_id)}
                            >
                                {client_id} - {topic}
                            </button>
                        ))
                    }
                </div>
            }
        </div>
    )
}