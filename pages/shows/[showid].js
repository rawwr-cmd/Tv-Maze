import Head from "next/head";
import { Fragment } from "react";
import { getShowById, getAllShows } from "../../helpers/api-util";
import ShowSummary from "../../components/show-details/show-summary";
import ShowLogistics from "../../components/show-details/show-logistics";
import ShowContent from "../../components/show-details/show-content";

const ShowDetails = ({ selectedShow }) => {
  const show = selectedShow;
  //   console.log(show);

  if (!show) {
    return (
      <div className="center">
        <p>No show found!!</p>
      </div>
    );
  }

  // Removing <p> and <b> tag
  const ShowDetails = show.summary
    .replace(/<p[^>]*>/g, "") // Remove <p> tags
    .replace(/<\/p>/g, "") // Remove </p> tags
    .replace(/<b[^>]*>/g, "") // Remove <b> tags
    .replace(/<\/b>/g, ""); // Remove </b> tags

  return (
    <Fragment>
      <Head>
        <title>{show.title}</title>
        <meta name="description" content={show.summary} />
      </Head>
      <ShowSummary title={show.title} />
      <ShowLogistics
        date={show.premieredOn}
        genres={show.genres}
        image={show.image}
        imageAlt={show.title}
        language={show.language}
        score={show.score}
        rating={show.rating}
        runtime={show.averageRuntime}
      />
      <ShowContent>
        <p>{ShowDetails}</p>
      </ShowContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { showid } = params;
  //   console.log(showid);

  const show = await getShowById(showid);

  return {
    props: {
      selectedShow: show,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const shows = await getAllShows();
  //   const showIds = shows.map((show) => show.id);
  //   const paths = showIds.map((showId) => ({ params: { showid: showId } }));
  const paths = shows.map((show) => ({
    params: { showid: show.id.toString() },
  }));
  //   console.log(paths);

  return {
    paths,
    fallback: "blocking",
  };
};

export default ShowDetails;
