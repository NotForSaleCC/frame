import { useEffect } from "react";
import styles from "./index.module.css";

export const PrintButton = ({
  dropdownOpen,
  setDropdownOpen,
  devices,
  setDevices,
  image,
  authenticated,
}) => {
  const openDropdown = () => {
    if (authenticated) {
      if (devices) {
        setDropdownOpen(!dropdownOpen);
      } else {
        alert("You need to get the devices first!");
      }
    } else {
      alert("Please authenticate first");
    }
  };

  const deleteFrame = (id) => {
    if(!confirm(
      "Are you sure you want to delete this frame?"
    )) return null;

    fetch(`http://localhost:4000/api/v1/frames/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
    }).then((response) => {
      if (response.status === 204) {
        setDevices(devices.filter((device) => device.id !== id));
        alert("Frame deleted");
      } else {
        alert("Something went wrong");
      }
    });
  };

  const printPicture = (client_id) => {
    console.log(image);

    let payload = new FormData();
    let token = `Bearer ${window.sessionStorage.token}`;

    payload.append("client_id", client_id);
    payload.append("image_url", image);
    payload.append("action", "draw");

    console.log(token);

    fetch("http://localhost:4000/api/v1/frames/print", {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
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
  };

  useEffect(() => {
    if (dropdownOpen) {
      const handler = (e) => {
        console.log(e);
        setDropdownOpen(false);
      };

      window.addEventListener("click", handler);

      return () => {
        window.removeEventListener("click", handler);
      };
    }
  }, [dropdownOpen]);

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
            <div className="flex flex-row">
              <div className="w-full">
                <button
                  key={id}
                  className="bg-transparent hover:btn-secondary font-semibold py-2 px-4 border hover:border-transparent rounded w-full"
                  onClick={() => printPicture(client_id)}
                >
                  {client_id}
                </button>
              </div>
              <div>
                <button className="bg-transparent hover:btn-primary font-semibold py-2 px-4 border hover:border-transparent rounded w-full"
                  onClick={() => deleteFrame(id)}>
                  Delete
                </button>
              </div>


            </div>

          ))}
        </div>
      )}
    </div>
  );
};
