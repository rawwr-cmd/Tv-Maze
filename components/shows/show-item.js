import Image from "next/image";
import Button from "../ui/button";
import classes from "./show-item.module.css";
// import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-icon";
// import DateIcon from "../icons/date-icon";
import fallback from "../../public/images/fallback.jpg";
import { Fragment } from "react";

const ShowItem = ({ title, image, date, id, genres, rating }) => {
  const imageUrl = image || fallback; // fallback image if 'image' prop is empty
  const userRating = rating || "No rating available";

  let humanReadableDate;

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

  //   const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/shows/${id}`;

  return (
    <li className={classes.item}>
      <Image src={imageUrl} alt={title} width={340} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            {/* <DateIcon /> */}
            <time>PremieredOn: {humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            {/* <AddressIcon /> */}
            {/* <address>{formattedAddress}</address> */}
          </div>
          <div>
            <span>Genre: </span>
            {genres.map((genre, index) => (
              <Fragment key={index}>
                {index > 0 && <span>/</span>}
                <span>{genre}</span>
              </Fragment>
            ))}
          </div>
          <div>Rating: {userRating}</div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Show Details</span>
            <span className={classes.icon}>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default ShowItem;
