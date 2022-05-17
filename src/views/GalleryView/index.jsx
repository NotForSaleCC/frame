import { useEffect, useState, createContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { Loader, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
import { UserSettingsButton } from "components/UserSettingsButton";
const walletPublicKey = "FkDvvPMm3zgeAKsyfF3SkUM9bavJepybvdbafxf48QmS";

import RegisterDeviceView from "../RegisterDeviceView";

export const GalleryView = () => {
  const [authenticated, setAuthenticated] = useState(
    window.sessionStorage?.token
  );

  const { publicKey } = useWallet();

  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState(walletPublicKey);

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
  });

  console.log("nfts", nfts);

  const onChange = (e) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  const [devices, setDevices] = useState(null);

  useEffect(() => {
    if (authenticated && !devices) {
      let token = `Bearer ${window.sessionStorage.token}`;

      console.log(token);

      fetch("http://localhost:4000/api/v1/frames", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setDevices(json.data);
          console.log("Success:", json);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [devices, authenticated]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <a href="https://notforsale.cc">
            <img
              alt="notforsale logo"
              className="rounded-full h-14 w-14 mr-3 ml-2"
              src="/not_for_sale_logo.jpg"
            />
          </a>
          <div className="flex-auto">
            <label className="input-group input-group-vertical input-group-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Wallet Address"
                  className="w-full input input-bordered input-lg"
                  value={walletToParsePublicKey}
                  onChange={onChange}
                  style={{
                    borderRadius:
                      "0 0 var(--rounded-btn,.5rem) var(--rounded-btn,.5rem)",
                  }}
                />

                <SelectAndConnectWalletButton
                  onUseWalletClick={onUseWalletClick}
                />
              </div>
            </label>
          </div>
          <div className="flex p-2">
            <WalletMultiButton className="btn btn-ghost btn-lg" />
          </div>
          <div>
            <UserSettingsButton
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
            <div>
              <RegisterDeviceView />
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {error?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList
                      nfts={nfts}
                      devices={devices}
                      authenticated={authenticated}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NftList = ({ nfts, devices, authenticated }) => {
  const [images, setImage] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageCaption, setImageCaption] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft, index) => (
        <NftCard
          key={nft.mint}
          devices={devices}
          details={nft}
          images={images}
          setImage={setImage}
          setOpen={setOpen}
          setPhotoIndex={setPhotoIndex}
          setImageCaption={setImageCaption}
          setImageTitle={setImageTitle}
          index={index}
          authenticated={authenticated}
          onSelect={() => {}}
        />
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          // nextSrc={images[(photoIndex + 1) % images.length]}
          // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + images.length + 1) % images.length)
          }
          imageTitle={imageTitle}
          imageCaption={imageCaption}
        />
      )}
    </div>
  );
};
