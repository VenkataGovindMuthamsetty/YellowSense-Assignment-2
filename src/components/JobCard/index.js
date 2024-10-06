import "./index.css";

function Jobcard(props) {
  // Destructuring the jobDetails and clickJobCard function from props
  const { jobDetails, clickJobCard } = props;

  // Destructuring individual fields from jobDetails object
  const { title, location, whatsappNo, primaryDetails, id } = jobDetails;
  const { Salary } = primaryDetails;

  // Function to handle clicking on the job card and passing the job id back to the parent component
  const onClickJobCard = () => {
    clickJobCard(id);
  };

  return (
    // li element representing a single job card
    <li className="jobcard" onClick={onClickJobCard}>
      <div className="job-card-container">
        {/* Displaying job title */}
        <p className="job-title">{title}</p>

        {/* Displaying WhatsApp number and salary in the same row */}
        <div className="watsapp-salary">
          <p className="whatsapp">{whatsappNo}</p>
          <p className="salary">{Salary}</p>
        </div>

        {/* Displaying job location */}
        <p className="location">Location: {location}</p>

        {/* Button for applying to the job */}
        <button className="apply-now-btn">Apply Now</button>
      </div>
    </li>
  );
}
export default Jobcard;
