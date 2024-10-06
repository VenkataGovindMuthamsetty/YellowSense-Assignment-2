import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Jobcard from "../JobCard/index";
import JobDetails from "../JobDetails";
import "./index.css";

class Jobs extends Component {
  // Initializing component state with jobs, bookmarks, loading status, error, and job details ID
  state = {
    jobs: [],
    bookmarks: [],
    isLoading: false,
    error: "",
    jobDetailsId: "", // Stores the ID of the selected job to show details
  };

  // Lifecycle method to fetch initial job details and load bookmarks from localStorage
  componentDidMount() {
    this.getJobDetails("1");
    this.getJobDetails("2");
    this.getJobDetails("3");
    this.detDataFromLocalstorage(); // Retrieve bookmarks from localStorage
  }

  // Function to retrieve bookmark data from localStorage
  detDataFromLocalstorage = () => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
  };

  // Function to fetch job details from the API based on page number
  getJobDetails = async (page) => {
    const { jobs } = this.state;
    this.setState({ isLoading: true }); // Set loading state to true while fetching
    try {
      const apiUrl = `https://testapi.getlokalapp.com/common/jobs?page=${page}`; //fetching data
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const result = data.results;

        // Mapping the fetched data into a structured format
        const updatedData = result.map((eachResult) => ({
          id: eachResult.id,
          companeyName: eachResult.company_name,
          jobCategory: eachResult.job_category,
          jobHours: eachResult.job_hours,
          location: eachResult.job_location_slug,
          jobRole: eachResult.job_role,
          openings: eachResult.openings_count,
          otherDetails: eachResult.other_details,
          primaryDetails: eachResult.primary_details,
          whatsappNo: eachResult.whatsapp_no,
          title: eachResult.title,
          numApplications: eachResult.num_applications,
        }));

        // Filtering out any invalid jobs (where ID is undefined)
        const validJobs = updatedData.filter((job) => job.id !== undefined);
        if (validJobs.length > 0) {
          // Updating state with newly fetched jobs
          this.setState((prevState) => ({
            jobs: [...prevState.jobs, ...validJobs], //update state with fetched data
            isLoading: false,
          }));
        } else {
          this.setState({ jobs, isLoading: false });
        }
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({ error, isLoading: false }); // Handle error by updating state
    }
  };

  // Loading view for when the data is being fetched
  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <ThreeDots color="black" height="70" width="70" />
    </div>
  );

  // Failure view in case of error or no jobs available
  renderFailureView = () => {
    const { error } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">All Jobs</h1>
        <div className="no-bookmarks-container">
          <p className="no-bookmarks">No jobs Available</p>
          {error !== "" && <p className="no-bookmarks">{error}</p>}
        </div>
      </div>
    );
  };

  // Handles when a job card is clicked to view job details
  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id }); // Update jobDetailsId to display detailed view
  };

  // Rendering the list of jobs
  renderJobsView = () => {
    const { jobs } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">All Jobs</h1>
        <ul className="jobs-ul-container">
          {jobs.map((eachjob) => (
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

  // Handle back button click in job details view
  onClickBack = () => {
    this.setState({ jobDetailsId: "" });
  };

  // Remove a job from bookmarks and update localStorage
  onClickRemoveBookMark = (id) => {
    const { bookmarks } = this.state;
    const removeBookMark = bookmarks.filter((eachJob) => eachJob.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(removeBookMark)); // Update localStorage
    this.setState({ bookmarks: removeBookMark }); // Update state
  };

  // Add a job to bookmarks and update localStorage
  onClickAddBookMark = (id) => {
    const { jobs, bookmarks } = this.state;
    const bookMarkJob = jobs.find((eachJob) => eachJob.id === id);
    const isBookMarkedAlready = bookmarks.find((eachJob) => eachJob.id === id);
    if (isBookMarkedAlready === undefined) {
      const addedbookMarks = [...bookmarks, bookMarkJob];
      localStorage.setItem("bookmarks", JSON.stringify(addedbookMarks)); // Update localStorage
      this.setState({ bookmarks: addedbookMarks }); // Update state
    }
  };

  // Handle swipe right event to add job to bookmarks
  onSwipedRight = (id) => {
    this.onClickAddBookMark(id);
    this.setState({ jobDetailsId: "" }); // Close job details after swipe
  };

  // Handle swipe left event to alert the user
  onswipedLeft = (id) => {
    alert("Swipe Right to add Bookmark"); // Inform user to swipe right to bookmark
  };

  // Render detailed view of the selected job
  renderJobDetailsView = () => {
    const { jobs, jobDetailsId } = this.state;
    const jobData = jobs.find((eachjob) => eachjob.id === jobDetailsId);
    return (
      <JobDetails
        jobData={jobData}
        clickBack={this.onClickBack}
        clickRemoveBookMark={this.onClickRemoveBookMark}
        clickAddBookMark={this.onClickAddBookMark}
        swipedRight={this.onSwipedRight}
        swipedLeft={this.onswipedLeft}
      />
    );
  };

  // Main render function to conditionally render views based on state
  render() {
    const { isLoading, jobs, error, jobDetailsId } = this.state;
    if (isLoading) {
      return this.renderLoadingView(); // Show loading view if data is being fetched
    } else if (jobDetailsId !== "") {
      return this.renderJobDetailsView(); // Show job details if a job is selected
    } else if (jobs.length === 0 || error !== "") {
      return this.renderFailureView(); // Show failure view if no jobs or error
    } else {
      return this.renderJobsView(); // Show list of jobs if data is available
    }
  }
}
export default Jobs;
