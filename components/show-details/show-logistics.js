import Image from "next/image";
import LanguageIcon from "../icons/language-icon";
import DateIcon from "../icons/date-icon";
import MovieIcon from "../icons/movie-icon";
import LogisticsItem from "./logistics-item";
import ScoreIcon from "../icons/score-icon";
import RatingIcon from "../icons/rating-icon";
import AverageRunTimeIcon from "../icons/average-runtime-icon";

import fallback from "../../public/images/fallback.jpg";

import Button from "../ui/button";
import classes from "./show-logistics.module.css";

const ShowLogistics = ({
  date,
  genres,
  image,
  imageAlt,
  language,
  score,
  rating,
  runtime,
}) => {
  const imageUrl = image || fallback; // fallback image if 'image' prop is empty
  const userRating = rating || "No rating available";
  const userScore = score || "No score available";
  const movieRuntime = runtime || "No runtime available";

  let humanReadableDate;
  console.log(genres);
  if (date) {
    const [year, month, day] = date.split("-");
    humanReadableDate = new Date(year, month, day).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    humanReadableDate = "No date available";
  }

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={imageUrl} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          {humanReadableDate && (
            <>
              <strong>PremieredOn: </strong>
              <time>{humanReadableDate}</time>
            </>
          )}
          {!humanReadableDate && <p>Premiere date not available.</p>}
        </LogisticsItem>
        <LogisticsItem icon={MovieIcon}>
          <strong>Genre: </strong>
          {genres.length > 0 && <span>{genres.join(" / ")}</span>}
        </LogisticsItem>
        <LogisticsItem icon={LanguageIcon}>
          <strong>Language: </strong>
          {language}
        </LogisticsItem>
        <LogisticsItem icon={ScoreIcon}>
          <strong>Score: </strong>
          {userScore}
        </LogisticsItem>
        <LogisticsItem icon={RatingIcon}>
          <strong>Rating: </strong>
          {userRating}
        </LogisticsItem>
        <LogisticsItem icon={AverageRunTimeIcon}>
          <strong>Average Runtime: </strong>
          {movieRuntime}
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default ShowLogistics;
