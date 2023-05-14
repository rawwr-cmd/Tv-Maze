import Head from "next/head";
import { getAllShows } from "../helpers/api-util";
import ShowList from "../components/shows/show-list";

const HomePage = ({ shows }) => {
  return (
    <div>
      <Head>
        <title>All Shows</title>
        <meta
          name="description"
          content="Find a lot of great shows of all kinds!"
        />
      </Head>
      <ShowList items={shows} />
    </div>
  );
};

export const getStaticProps = async () => {
  const shows = await getAllShows();

  return {
    props: {
      shows: shows,
    },
  };
};

export default HomePage;
