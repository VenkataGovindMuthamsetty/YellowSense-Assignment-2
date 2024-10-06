import React, { useState, useEffect } from "react";
import { FcLike } from "react-icons/fc";
import { GrFavorite } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";
import "./index.css";

function JobDetails(props) {
  // Destructuring props passed from the parent component
  const {
    jobData,
    clickAddBookMark,
    clickBack,
    clickRemoveBookMark,
    swipedRight,
    swipedLeft,
  } = props;

  // Destructuring job details from the jobData object
  const {
    id,
    companeyName,
    jobCategory,
    jobHours,
    location,
    jobRole,
    openings,
    primaryDetails,
    whatsappNo,
    numApplications,
    title,
  } = jobData;

  // Destructuring primary details like experience, qualification, and salary
  const { Experience, Qualification, Salary } = primaryDetails;

  // State to check if the job is present in bookmarks
  const [isJobpresent, setisJobPresent] = useState(false);

  // Effect to check if the job is already bookmarked when the component mounts
  useEffect(() => {
    // Get the jobs list from localStorage when component mounts
    const savedJobs = localStorage.getItem("bookmarks");
    const jobs = JSON.parse(savedJobs);
    if (jobs !== null) {
      const jobExists = jobs.some((job) => job.id === id);
      setisJobPresent(jobExists);
    }
  }, [id]);

  // Swipeable handlers for right and left swipe gestures
  const handlers = useSwipeable({
    onSwipedRight: () => swipedRight(id),
    onSwipedLeft: () => swipedLeft(id),
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Handler to add the job to bookmarks
  const onClickAddBookMark = () => {
    clickAddBookMark(id);
    setisJobPresent(true);
  };

  // Handler to go back to the previous page
  const onClickBack = () => {
    clickBack();
  };

  // Handler to remove the job from bookmarks
  const onClickRemoveBookMark = () => {
    clickRemoveBookMark(id);
    setisJobPresent(false);
  };

  return (
    // Main container for the job details, with swipeable functionality
    <div className="job-detail-container1">
      <div {...handlers} className="job-detail-container">
        <h1 className="companeyName">{companeyName}</h1>
        <p className="title">{title}</p>
        <div className="details-containe">
          <div className="details-containe-1">
            <p className="title">
              <span className="span">job Category : </span>
              {jobCategory}
            </p>
            <p className="title">
              <span className="span">job Role : </span>
              {jobRole}
            </p>
            <p className="title">
              <span className="span">Salary : </span>
              {Salary}
            </p>
            <p className="title">
              <span className="span">job Hours : </span>
              {jobHours}
            </p>
            <p className="title">
              <span className="span">openings : </span>
              {openings}
            </p>
          </div>
          <div>
            <p className="title">
              <span className="span">numApplications : </span>
              {numApplications}
            </p>
            <p className="title">
              <span className="span">Experience : </span>
              {Experience}
            </p>
            <p className="title">
              <span className="span">Qualification : </span>
              {Qualification}
            </p>{" "}
            <p className="title">
              <span className="span">location : </span>
              {location}
            </p>
            <p className="title">
              <span className="span">whatsappNo : </span>
              {whatsappNo}
            </p>
          </div>
        </div>
        <div className="apply-now-container">
          <button className="apply-now">Apply Now</button>
          {isJobpresent ? (
            <button
              className="add-bookmark apply-now"
              onClick={onClickRemoveBookMark}
            >
              Remove From Bookmark
            </button>
          ) : (
            <button
              className="add-bookmark apply-now"
              onClick={onClickAddBookMark}
            >
              Add Bookmark
            </button>
          )}

          {/* Icons for adding/removing bookmark */}
          {isJobpresent ? (
            <button
              className="add-bookmark-icon"
              onClick={onClickRemoveBookMark}
            >
              <FcLike />
            </button>
          ) : (
            <button className="add-bookmark-icon" onClick={onClickAddBookMark}>
              <GrFavorite />
            </button>
          )}
        </div>

        {/* Buttons to navigate back */}
        <button className="back-btn" onClick={onClickBack}>
          Back
        </button>
        <button className="back-arrow" onClick={onClickBack}>
          <FaArrowLeft />
        </button>
      </div>
    </div>
  );
}
export default JobDetails;
