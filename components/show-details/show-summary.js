import classes from "./show-summary.module.css";

const ShowSummary = ({ title }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default ShowSummary;
