import { useRef, useState } from "react";
import classes from "./booking-form.module.css";

const BookingForm = ({ bookingId, showTitle, language, rating, genres }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const seatInputRef = useRef();

  const userRating = rating || "No rating available";

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const seatNumber = seatInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !seatNumber ||
      seatNumber.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    //save the data into local session

    const bookingData = {
      bookingId: bookingId,
      showTitle: showTitle,
      language: language,
      rating: userRating,
      genres: genres,
      email: enteredEmail,
      name: enteredName,
      seatNumber: seatNumber,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    // console.log(bookingData);

    //clear the form
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    seatInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="rating">Ticket Id:</label>
        <input type="text" id="rating" value={bookingId} readOnly />
      </div>
      <div className={classes.control}>
        <label htmlFor="rating">Show Title:</label>
        <input type="text" id="rating" value={showTitle} readOnly />
      </div>
      <div className={classes.control}>
        <label htmlFor="rating">Language:</label>
        <input type="text" id="rating" value={language} readOnly />
      </div>
      <div className={classes.control}>
        <label htmlFor="rating">Rating:</label>
        <input type="text" id="rating" value={userRating} readOnly />
      </div>
      <div className={classes.control}>
        <label htmlFor="rating">Genres:</label>
        <input type="text" id="rating" value={genres} readOnly />
      </div>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">enter your email:</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="name">enter your name:</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="seatNumber">Seat No:</label>
        <input type="number" id="seatNumber" ref={seatInputRef}></input>
      </div>
      {isInvalid && <p>Email address or Name or seatNumber Incorrect!</p>}
      <button className={classes.button}>Submit</button>
    </form>
  );
};

export default BookingForm;
