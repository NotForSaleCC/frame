import type { NextPage } from "next";
import Head from "next/head";
import { GalleryView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Not for Sale</title>
        <meta name="description" content="The frame app from NotForSale collection" />
      </Head>
      <GalleryView />
    </div>
  );
};

export default Home;
