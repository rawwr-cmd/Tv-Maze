import ShowItem from "./show-item";
import classes from "./show-list.module.css";

const ShowList = ({ items }) => {
  //   console.log(items);
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <ShowItem
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          date={item.premieredOn}
          language={item.language}
          genres={item.genres}
          rating={item.rating}
        />
      ))}
    </ul>
  );
};

export default ShowList;
