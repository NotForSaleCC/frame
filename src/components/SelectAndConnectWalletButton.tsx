import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

type Props = {
  onUseWalletClick: () => void;
};

export const SelectAndConnectWalletButton: FC<Props> = ({
  onUseWalletClick,
}) => {
  const { wallet, connect, connecting, publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey && wallet) {
      try {
        connect();
      } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
      }
    }
  }, [wallet]);

  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={onUseWalletClick}
      disabled={connecting}
    >
      {<div>Use Wallet Address</div>}
    </button>
  );
};
