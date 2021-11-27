import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";

type Props = {
  details: any;
  images: string[];
  setImage: any;
  setOpen: any;
  setPhotoIndex: any;
  setImageCaption: any;
  setImageTitle: any;
  index: number;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  images,
  setImage,
  setOpen,
  setPhotoIndex,
  setImageCaption,
  setImageTitle,
  index,
  onSelect,
  onTokenDetailsFetched = () => {},
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
    if(image) {
      setImage([...images, image]);
    }

  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image, description } = data ?? {};

  // console.log("data", data)

  const openModal = (index:number) => {
    setOpen(true);
    setPhotoIndex(images.indexOf(image));
    setImageTitle(name);
    setImageCaption(description);
    setImageTitle(name);
  }


  return (
    <div className={`card bordered max-w-xs compact rounded-md cursor-pointer`} onClick={() => openModal(index)}>
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            src={image}
            onError={onImageError}
            className="bg-gray-800 object-cover"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm text-left">{name}</h2>
      </div>
    </div>
  );
};
