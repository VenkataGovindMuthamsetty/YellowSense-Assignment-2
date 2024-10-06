import { Component } from "react";
import Jobcard from "../JobCard/index";
import JobDetails from "../JobDetails";
import "./index.css";
class Bookmarks extends Component {
  // Initializing the state with bookmarks array, selected jobDetailsId, and removedBookMartk object
  state = { bookmarks: [], jobDetailsId: "", removedBookMartk: {} };

  // This lifecycle method runs after the component is mounted, used to get bookmarks from local storage
  componentDidMount() {
    this.detDataFromLocalstorage();
  }

  // Method to retrieve data from local storage and update the state with the bookmarks
  detDataFromLocalstorage = () => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
  };

  // Render a message when there are no bookmarks in local storage
  renderBookmarksEmptyView = () => {
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">Book Marks</h1>
        <div className="no-bookmarks-container">
          <p className="no-bookmarks">No jobs bookmarked yet.</p>
        </div>
      </div>
    );
  };

  // Method to handle clicking on a job card to view job details
  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id });
  };

  // Render the list of bookmarked jobs
  renderBookmarksView = () => {
    const { bookmarks } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">Book Marks</h1>
        <ul className="jobs-ul-container">
          {bookmarks.map((eachjob) => (
            <Jobcard
              key={eachjob.id}
              jobDetails={eachjob}
              clickJobCard={this.onclickJobCard}
            />
          ))}
        </ul>
      </div>
    );
  };

  // Method to handle the back button click in job details view
  onClickBack = () => {
    this.setState({ jobDetailsId: "" });
  };

  // Method to remove a bookmark by ID and update local storage
  onClickRemoveBookMark = (id) => {
    const { bookmarks } = this.state;
    const removeBookMark = bookmarks.filter((eachJob) => eachJob.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(removeBookMark));
    this.setState({ bookmarks: removeBookMark, jobDetailsId: "" });
  };

  // Swipe left action to remove a job from bookmarks
  onSwipedLeft = (id) => {
    this.onClickRemoveBookMark(id);
  };

  // Swipe right action to alert the user (placeholder action)
  onSwipedRight = (id) => {
    alert("Swipe Left to Remove Job Bookmark");
  };

  // Render the job details view for a selected job
  renderJobDetailsView = () => {
    const { bookmarks, jobDetailsId } = this.state;
    const jobData = bookmarks.find((eachjob) => eachjob.id === jobDetailsId);
    return (
      <>
        <JobDetails
          jobData={jobData}
          clickBack={this.onClickBack}
          clickRemoveBookMark={this.onClickRemoveBookMark}
          swipedRight={this.onSwipedRight}
          swipedLeft={this.onSwipedLeft}
        />
      </>
    );
  };

  render() {
    const { bookmarks, jobDetailsId } = this.state;
    // If no bookmarks are available, show the empty view
    if (bookmarks.length === 0) {
      return this.renderBookmarksEmptyView();
    }
    // If a job is selected, show job details view
    else if (jobDetailsId !== "") {
      return this.renderJobDetailsView();
    }
    // Otherwise, show the list of bookmarked jobs
    else {
      return this.renderBookmarksView();
    }
  }
}
export default Bookmarks;
