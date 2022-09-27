import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import jwt_decode from "jwt-decode";
import useInput from "../../hooks/use-input";

function SignIn(props) {
  const history = useNavigate();

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    InputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.length > 2);

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    InputBlurHandler: passwordBlurHandler,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`token/`, {
        email: enteredEmail,
        password: enteredPassword,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          localStorage.setItem(
            "username",
            jwt_decode(res.data.access).username
          );

          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          props.HandleAddCart();
          history("/");
        } else {
          props.notifyFail("Make sure password and username valid");
        }
      });
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  return (
    <>
      <div>
        <section
          className='section-conten padding-y'
          style={{ minHeight: "84vh" }}>
          <div
            className='card mx-auto'
            style={{ maxWidth: "380px", marginTop: "100px" }}>
            <div className='card-body'>
              <h4 className='card-title mb-4'>Sign in</h4>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email Address'
                    name='email'
                    onBlur={emailBlurHandler}
                    onChange={emailChangedHandler}
                    value={enteredEmail}
                  />
                  {emailInputHasError && (
                    <p className='error-text'>Email must be valid</p>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPassword}
                  />
                  {passwordInputHasError && (
                    <p className='error-text'>
                      Must be at least 6 characters length
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <Link to='\' className='float-right'>
                    Forgot password?
                  </Link>
                </div>
                <div className='form-group'>
                  <button
                    disabled={!formIsValid}
                    type='submit'
                    className='btn btn-primary btn-block'>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className='text-center mt-4'>
            Don't have account? <Link to='/user/create'>Sign up</Link>
          </p>
          <br />
          <br />
        </section>
      </div>
    </>
  );
}

export default SignIn;
