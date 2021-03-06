import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'
import Head from "next/head";

const Devices: NextPage = (props) => {
  const router = useRouter()

  const { id } = router.query
  
  useEffect(() => {
    window.sessionStorage.encodedToken = id;
    
    if(window.sessionStorage.token) {
      router.push('/')
    } else {
      router.push('/?login=true')
    }
  }, [])

  return (
    <div>
      <Head>
        <title>NFT Gallery!</title>
        <meta name="description" content="This site will fly high 🦤" />
      </Head>
    </div>
  );
};

export default Devices;
