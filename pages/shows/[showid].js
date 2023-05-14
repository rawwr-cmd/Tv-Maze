import Head from "next/head";
import { Fragment, useState } from "react";
import { getShowById, getAllShows } from "../../helpers/api-util";
import ShowSummary from "../../components/show-details/show-summary";
import ShowLogistics from "../../components/show-details/show-logistics";
import ShowContent from "../../components/show-details/show-content";
import BookingForm from "../../components/input/booking-form";

const ShowDetails = ({ selectedShow }) => {
  const show = selectedShow;
  //   console.log(show);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleBookTicketClick = () => {
    setIsFormVisible(true);
  };

  const handleCancelClick = () => {
    setIsFormVisible(false);
  };

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
      {!isFormVisible && (
        <button
          style={{
            backgroundColor: "#ffffff",
            color: "#03be9f",
            border: "1px solid #03be9f",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginLeft: "50%",
            transform: "translateX(-50%)", // Center the button horizontally
          }}
          onClick={handleBookTicketClick}
        >
          Book Ticket
        </button>
      )}
      {isFormVisible && (
        <div>
          <button
            style={{
              backgroundColor: "#ffffff",
              color: "#ff0000",
              border: "1px solid #ff0000",
              borderRadius: "6px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginLeft: "50%",
              transform: "translateX(-50%)", // Center the button horizontally
            }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <BookingForm
            bookingId={show.id}
            showTitle={show.title}
            language={show.language}
            rating={show.rating}
            genres={show.genres}
          />
        </div>
      )}
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
