import { Html, Head, Main, NextScript } from "next/document";
import { useAuth } from "../context/AuthContext";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/icons/css/elysium-icons.css" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        {/*Required meta tags for page view */}
        <meta charset="utf-8" />
        {/*Required meta tags for page view */}
        <meta name="title" content="Elysium Cloud Wallet"></meta>
        <meta
          name="description"
          content="The Elysium Cloud Wallet is the easiest way to connect, use, and manage a account on the Elysium blockchain."
        ></meta>
        <meta itemprop="name" content="Elysium Cloud Wallet"></meta>
        <meta
          name="image"
          content="https://cdn.elysiumchain.tech/cloud-wallet-meta-img.png"
        ></meta>
        <meta
          itemprop="description"
          content="The Elysium Cloud Wallet is the easiest way to connect, use, and manage a account on the Elysium blockchain."
        ></meta>
        <meta itemprop="image" content="cloud-wallet-meta-img.png"></meta>
        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL}
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Elysium Cloud Wallet"></meta>
        <meta property="og:image:width" content="100"></meta>
        <meta property="og:image:height" content="100"></meta>
        <meta
          property="og:description"
          content="The Elysium Cloud Wallet is the easiest way to connect, use, and manage a account on the Elysium blockchain."
        ></meta>
        <meta
          property="og:image"
          content="https://cdn.elysiumchain.tech/cloud-wallet-meta-img.png"
        ></meta>
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_APP_URL}
        ></meta>
        <meta name="twitter:title" content="Elysium Cloud Wallet"></meta>
        <meta
          name="twitter:description"
          content="The Elysium Cloud Wallet is the easiest way to connect, use, and manage a account on the Elysium blockchain."
        ></meta>
        <meta
          name="twitter:image"
          content="https://cdn.elysiumchain.tech/cloud-wallet-meta-img.png"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
