import Link from "next/link";

import classes from "./main-header.module.css";
import MovieIcon from "../icons/movie-icon";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">MovieMaze</Link>
      </div>
    </header>
  );
};

export default MainHeader;
