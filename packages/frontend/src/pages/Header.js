import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Fetch the token and username from sessionStorage (if available)
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username"); // assuming you save username during login

  // Logout functionality
  const handleLogout = () => {
    // Remove token and username from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token_expiry");

    // Redirect to Login page
    navigate("/login");
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-6">
            {/* Homepage link added to VedTry */}
            <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              VedTry
            </h2>
          </div>
          <div className="col-6 text-right d-flex justify-content-end align-items-center">
            {/* Show username and logout button only if user is logged in */}
            {token ? (
              <>
                <span className="mr-3">Hello, {username}</span>&nbsp;&nbsp;
                {/* Display username */}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
