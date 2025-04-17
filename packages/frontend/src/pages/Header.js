import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  const [profileImageUrl, setProfileImageUrl] = useState("/default-avatar.jpg"); // dummy avatar by default

  useEffect(() => {
    if (username) {

      const imageUrl = `${process.env.REACT_APP_API_URL}/faces/${username}.jpg`;

      // Check if image exists
      fetch(imageUrl)
        .then((res) => {
          if (res.ok) {
            setProfileImageUrl(imageUrl);
          }
        })
        .catch(() => {
          // Use default if there's an error
          setProfileImageUrl("/default-avatar.jpg");
        });
    }
  }, [username]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token_expiry");
    navigate("/login");
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              VedTry
            </h2>
          </div>
          <div className="col-6 text-right d-flex justify-content-end align-items-center">
            {token ? (
              <>
                <img
                  src={profileImageUrl}
                  alt="User"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 10,
                  }}
                  onError={() => setProfileImageUrl("/default-avatar.jpg")}
                />
                <span className="mr-3">Hello, {username} &nbsp;&nbsp;</span>
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
