import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="col-md-3 bg-light p-4 d-flex flex-column"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <h4>Navigation</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/dashboard/face-detection" className="nav-link">
            Face Detection
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
