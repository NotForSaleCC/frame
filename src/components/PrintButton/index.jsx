import { useEffect } from "react";
import styles from "./index.module.css";

export const PrintButton = ({
  dropdownOpen,
  setDropdownOpen,
  devices,
  setDevices,
  imageUrl,
  authenticated,
}) => {
  const openDropdown = () => {
    if (authenticated) {
      if (devices?.length > 0) {
        setDropdownOpen(!dropdownOpen);
      } else {
        alert("You need to get the devices first!");
      }
    } else {
      alert("Please authenticate first");
    }
  };

  const deleteFrame = (id) => {
    if (!confirm(
      "Are you sure you want to delete this frame?"
    )) return null;

    fetch(`/api/v1/frames/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
    }).then((response) => {
      if (response.status === 204) {
        setDevices(devices.filter((device) => device.id !== id));
        setDropdownOpen(false);
      } else {
        alert("Something went wrong");
      }
    });
  };

  const printPicture = (clientId) => {
    let token = `Bearer ${window.sessionStorage.token}`;
    let payload = JSON.stringify({ client_id: clientId, image_url: imageUrl, action: "draw" });
    console.log(payload)

    fetch("/api/v1/frames/print", {
      method: "POST",
      body: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Success:", json);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      setDropdownOpen(false);
  };

  return (
    <div>
      <button
        className="bg-transparent hover:btn-secondary font-semibold py-2 px-4 border hover:border-transparent rounded w-full"
        onClick={openDropdown}
      >
        Print
      </button>
      {devices && dropdownOpen && (
        <div className={styles.dropdown}>
          {devices?.map(({ client_id, id }) => (
            <div key={client_id} className="flex flex-row">
              <div className="w-full">
                <button
                  key={id}
                  className="text-white bg-transparent hover:border-white font-semibold py-2 px-4 border border-transparent rounded w-full"
                  onClick={() => printPicture(client_id)}
                >
                  {client_id}
                </button>
              </div>
              <div>
                <button className="bg-transparent hover:border-white font-semibold py-2 px-4 border border-transparent rounded w-full"
                  onClick={() => deleteFrame(id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20px"
                    heigt="20px"
                    fill="#ffff"
                    viewBox="0 0 459 459"
                    xmlSpace="preserve"
                  >
                    <path d="M229.5 0C102.751 0 0 102.751 0 229.5S102.751 459 229.5 459 459 356.249 459 229.5 356.249 0 229.5 0zm77.605 271.629c9.797 9.797 9.797 25.68 0 35.477a25.007 25.007 0 01-17.738 7.347c-6.42 0-12.84-2.449-17.738-7.347L229.5 264.977l-42.128 42.129a25.007 25.007 0 01-17.738 7.347c-6.42 0-12.84-2.449-17.738-7.347-9.797-9.796-9.797-25.68 0-35.477l42.129-42.129-42.129-42.129c-9.797-9.797-9.797-25.68 0-35.477s25.68-9.797 35.477 0l42.128 42.129 42.128-42.129c9.797-9.797 25.68-9.797 35.477 0 9.797 9.796 9.797 25.68 0 35.477l-42.13 42.129 42.129 42.129z" />
                  </svg>
                </button>
              </div>


            </div>

          ))}
        </div>
      )}
    </div>
  );
};
