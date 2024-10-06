import { useState } from "react";
import Jobs from "../Jobs";
import Bookmarks from "../Bookmarks";
import "./index.css";

function Home() {
  // State to manage which page (Jobs or Bookmarks) is currently displayed
  const [navigationPage, setNavigationPage] = useState("Jobs");

  // Event handler to switch to Jobs page
  const onClickJobs = () => setNavigationPage("Jobs");

  // Event handler to switch to Bookmarks page
  const onClickBookmarks = () => setNavigationPage("Bookmarks");

  return (
    <div className="app">
      {/* Conditional rendering based on the current navigation page */}
      {navigationPage === "Jobs" ? <Jobs /> : <Bookmarks />}

      {/* Bottom navigation bar with buttons to switch between Jobs and Bookmarks */}
      <div className="bottom-nav-bar">
        <button
          onClick={onClickJobs}
          className={
            navigationPage === "Jobs" ? "active-nav-buttons" : "nav-buttons"
          }
        >
          Jobs
        </button>
        <button
          onClick={onClickBookmarks}
          className={
            navigationPage === "Bookmarks"
              ? "active-nav-buttons"
              : "nav-buttons"
          }
        >
          Bookmarks
        </button>
      </div>
    </div>
  );
}
export default Home;
