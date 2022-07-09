import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";
import styles from "./index.module.css";
import { PrintButton } from "components/PrintButton";
import Image from 'next/image'

import { fetcher } from "utils/fetcher";

export const NftCard = ({
  devices,
  setDevices,
  details,
  images,
  setImage,
  setOpen,
  setPhotoIndex,
  setImageCaption,
  setImageTitle,
  index,
  authenticated,
  onSelect,
  onTokenDetailsFetched = () => { },
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri, symbol } = details?.data ?? {};

  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
    if (image) {
      setImage([...images, image]);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image, description } = data ?? {};

  const openModal = (index) => {
    setOpen(true);
    setPhotoIndex(images.indexOf(image));
    setImageTitle(name);
    setImageCaption(description);
    setImageTitle(name);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  if(!image) return null;

  console.log(dropdownOpen);
  return (
    <div
      className={`${dropdownOpen ? styles.opened : ""
        } overflow-visible card bordered max-w-xs compact rounded-md cursor-pointer`}
    >
      <figure
        className="min-h-16 animation-pulse-color"
        onClick={() => openModal(index)}
      >
        {!fallbackImage || !error ? (
          <img
            src={image}
            width={265}
            height={265}
            className="bg-gray-800 object-cover"
            alt={name}
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className={`card-body ${styles.dropdownContainer}`}>
        <h2 className="card-title text-sm text-left">{name}</h2>
        <PrintButton
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          devices={devices}
          setDevices={setDevices}
          imageUrl={image}
          authenticated={authenticated}
        />
      </div>
    </div>
  );
};
