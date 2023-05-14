import { useState, useEffect, useRef } from "react";
import classes from "./booking-form.module.css";
import Notification from "../ui/notification";

const BookingForm = ({ bookingId, showTitle, language, rating, genres }) => {
  // const [isInvalid, setIsInvalid] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(""); //pending, success, error
  const [requestError, setRequestError] = useState("");

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const seatInputRef = useRef();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError("");
      }, 3000);

      //cleanUpFunction
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

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
      setRequestError("Please enter valid data");
      setRequestStatus("error");
      // setIsInvalid(true);
      return;
    }

    setRequestStatus("pending");
    //save the data into local session
    const bookingData = {
      bookingId: bookingId,
      email: enteredEmail,
      name: enteredName,
      seatNumber: seatNumber,
    };

    try {
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
      setRequestStatus("success");
      setEnteredMessage("Booking data saved successfully!");
      //clear the form
      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      seatInputRef.current.value = "";
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
      setEnteredMessage("Failed to save booking data.");
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      title: "Saving your seat...",
      message: "About to be booked!",
      status: "pending",
    };
  }

  if (requestStatus === "success") {
    notification = {
      title: "Success!",
      message: "Successfully saved the data in the local session!",
      status: "success",
    };
  }

  if (requestStatus === "error") {
    notification = {
      title: "Error!",
      message: "Email address or name or seat number incorrect or empty!",
      status: "error",
    };
  }

  return (
    <section>
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
        {/* {isInvalid && (
          <p>Email address or name or seat number incorrect or empty!</p>
        )} */}
        <button className={classes.button}>Submit</button>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};

export default BookingForm;
