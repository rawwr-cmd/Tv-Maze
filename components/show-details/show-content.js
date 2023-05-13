import classes from "./show-content.module.css";
const ShowContent = (props) => {
  return <section className={classes.content}>{props.children}</section>;
};

export default ShowContent;
