import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllShows } from "../helpers/api-util";
import ShowsSearch from "../components/shows/show-search";
// import EventList from "../../components/events/event-list";

const HomePage = ({ shows }) => {
  const router = useRouter();

  const findShowshandler = (year, month) => {
    const fullPath = `/shows/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Shows</title>
        <meta
          name="description"
          content="Find a lot of great shows of all kinds!"
        />
      </Head>
      <ShowsSearch onSearch={findShowshandler} />
      <ShowList items={shows} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const shows = await getAllShows();

  return {
    props: {
      shows: shows,
    },
    revalidate: 60,
  };
};

export default HomePage;
