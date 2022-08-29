import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Proton Pay</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" typ="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="ProtonDemo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="ProtonDemo" />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:site" content="@protonxpr" key="twhandle" />
        <meta name="twitter:image" content="/bg.jpeg" key="twimage" />
        <meta name="twitter:title" content="ProtonDemo" key="twtitle" />
        <meta
          name="twitter:description"
          content="Proton Demo Site"
          key="twdescription"
        />

        {/* Open Graph */}
        <meta name="og:site_name" content="ProtonDemo" key="ogsitename" />
        <meta name="og:image" content="/bg.jpeg" key="ogimage" />
        <meta
          name="og:description"
          content="Proton Demo Site"
          key="ogdescription"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
