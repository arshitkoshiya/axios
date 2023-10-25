import "./index.css";
import { NavLink, Outlet } from "react-router-dom";

function Index() {
  const checkToken = localStorage?.getItem("token");
  function Link(props: any) {
    return (
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        {...props}
      />
    );
  }

  return (
    <div className="sidebar">
      <div className="side-buton">
        <ul>
          {checkToken == null ? (
            <li className="Login">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li className="Login">
                <Link to="/login">Profile</Link>
              </li>
              <li className="Createform">
                <Link to="/Createform">Create Form</Link>
              </li>
              <li className="Showdata">
                <Link to="/Showdata">Show Data</Link>
              </li>
              <li className="ShowState">
                <Link to="/ShowState">Show State</Link>
              </li>
              <li className="ShowState">
                <Link to="/Game">Tic Tac Toe</Link>
              </li>
              <li className="Updateform">
                {/* <Link to="/Updateform">Update Form</Link> */}
                <div className="update">Update Form</div>
              </li>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Index;
