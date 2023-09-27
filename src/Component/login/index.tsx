import React, { useEffect, useState } from "react";
import "../login/index.css";
import axios from "axios";

export default function Index() {
  const checkToken = localStorage?.getItem("token");
  const [user, setUser] = useState<any>();
  const [loading] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);
  const loginUrl = "http://10.37.55.216:5000/api/v1/Auth/UserLogin";
  function handleChange(evt: any) {
    const value = evt.target.value;
    const name = evt.target.name;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(true);
    window.location.href = "/";
  };
  useEffect(() => {
    if (checkToken === null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await axios
      ?.post(loginUrl, {
        username: user?.uname,
        password: user?.password,
      })
      .then((res: any) => {
        const result = res?.data?.result;
        if (result === "Success") {
          const token = res?.data?.data?.token;
          localStorage?.setItem("token", JSON?.stringify(token));
          window.location.href = "/Createform";
        } else {
          alert(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="main">
        <div className="heading">{login ? 'Login' : "User Profile"}</div>
        {login ? (
          <div className="form">
            {" "}
            <div className="form-group">
              UserName :
              <input
                type="text"
                className="userName"
                name="uname"
                id="pkId"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              Password :
              <input
                type="password"
                className="Password"
                id="country"
                name="password"
                aria-describedby="emailHelp"
                autoComplete="current-password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <i className=" fa-eye"></i>
            </div>
            <br />
            <input
              type="button"
              value={loading ? "Loading..." : "Login"}
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        ) : (
          <>
            <input type="button" value={"LogOut"} onClick={handleLogout} />
          </>
        )}
      </div>
    </>
  );
}
