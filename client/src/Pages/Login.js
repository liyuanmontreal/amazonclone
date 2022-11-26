import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import {
  UserContext,
  RoleContext,
  IsAuthContext,
} from "../context/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const { roles, setRoles } = useContext(RoleContext);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const login = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    axios
      .post("http://localhost:4000/api/auth/signin", data)
      .then((response) => {
        if (!response.data.accessToken) {
          alert(response.data);
          setIsAuth(false);
          setUser(null);
          setRoles(null);
        } else {
          console.log(response, data);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          setIsAuth(true);
          setUser(response?.data);
          setRoles(response?.data?.roles);
          console.log(roles);
        }
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          setShow(true);
          setErrMsg("No Server Response");
        } else if (err.response?.status === 404) {
          setShow(true);
          setErrMsg("User not Found");
        } else if (err.response?.status === 401) {
          setShow(true);
          setErrMsg("Invalid password");
        } else {
          setShow(true);
          setErrMsg("Login Failed");
        }
      });
  };

  return (
    <div className="loginContainer">
      <h3 className="loginTitle">Login</h3>

      {show ? (
        <div className={errMsg ? "errmsg" : "offscreen"}>
          <Toast
            className="d-inline-block m-1"
            bg="info"
            position="top-center"
            onClose={() => setShow(false)}
            delay={5000}
            show={show}
            autohide
          >
            <Toast.Body ref={errRef} aria-live="assertive">
              {" "}
              {errMsg}{" "}
            </Toast.Body>
          </Toast>
        </div>
      ) : (
        <p>You are about to get your fav.</p>
      )}
      <form className="w-50 auto">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login </button>
      </form>
      <p className="text-center my-4">
        Not a user yet, <a href="/register">register here</a>
      </p>
    </div>
  );
}

export default Login;
