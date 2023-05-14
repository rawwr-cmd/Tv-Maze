import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

//general head setup
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Show Movies</title>
          <meta name="description" content="get your shows here" />
          <meta
            name="viewpoint"
            content="width=device-width, initial-scale=1"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
