import Button from "../ui/button";
import classes from "./result-title.module.css";

const ResultsTitle = ({ date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Shows in {humanReadableDate}</h1>
      <Button link="/">Show all Shows</Button>
    </section>
  );
};

export default ResultsTitle;
