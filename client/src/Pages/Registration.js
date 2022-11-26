import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Registration = () => {
  let navigate = useNavigate();
  const [serverState, SetServerState] = useState("");
  const HandleServerResponse = (ok, Msg) => {
    SetServerState({ ok, Msg });
  };
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const [show, setShow] = useState(false);

  const patternUsername = /^[A-z][A-z0-9-_]{4,20}$/;
  //4 to 20 characters.Must begin with a letter.Letters, numbers, underscores, hyphens allowed

  const patternPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-_@#$%]).{6,14}$/;
  //6 to 14 characters. Must include uppercase and lowercase letters, a number and a special character. special characters allowed.
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/  1 upper 1 lower,1 number

  //validation
  const SignupSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, "Username need to greater than 4 characters")
      .max(20, "Username can not more than 20 characters")
      .required("Username is required please")
      .matches(patternUsername, {
        message:
          "Must begin with a letter.Letters, numbers, underscores, hyphens allowed",
      }),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required please"),
    password: yup
      .string()
      .min(6, "Password need to be greater than 6 characters")
      .max(16, "Password can not more than 16 characters")
      .matches(patternPassword, {
        message:
          "Must include uppercase and lowercase letters, a number and a special character. special characters allowed",
      })
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  //handle submit
  const onSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "http://localhost:4000/api/auth/signup",
      data: values,
    })
      .then((response) => {
        console.log(response.data);
        actions.setSubmitting(false);
        actions.resetForm();
        HandleServerResponse(true, "Thanks!");
        navigate("/login");
      })
      .catch((err) => {
        if (!err?.response) {
          setShow(true);
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setShow(true);
          setErrMsg("Username or Email Taken");
        } else {
          setShow(true);
          setErrMsg("Registration Failed");
        }
      });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <div className="RegisterForm">
      <h3 className="registerTitle">Sign Up</h3>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </Alert>
      ) : (
        <p>Welcome to become our lovely customer.</p>
      )}
      <div className="inputs">
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.username && touched.username && (
            <p className="error">{errors.username}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password..."
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit">
            Submit
          </button>
          {/* {serverState && (
                  <p ClassName={!serverState.ok ? "errorMsg" : ""}>
                    {serverState.msg}
                  </p>
                )} */}
        </form>
      </div>
    </div>
  );
};

export default Registration;
