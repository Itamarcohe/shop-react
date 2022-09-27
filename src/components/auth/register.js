import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axios";
import useInput from "../../hooks/use-input";
toast.configure();

const notifySuccess = (message) => toast.success(message);

const notifyFail = (message) => toast.error(message);

function Register() {
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
    value: enteredUsername,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangedHandler,
    InputBlurHandler: usernameBlurHandler,
    isValid: enteredUsernameIsValid,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    InputBlurHandler: passwordBlurHandler,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  const {
    value: enteredVerifyPassword,
    hasError: verifyPasswordInputHasError,
    valueChangeHandler: verifyPasswordChangedHandler,
    InputBlurHandler: verifyPasswordBlurHandler,
    isValid: enteredVerifyPasswordIsValid,
    reset: resetVerifyPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword !== enteredVerifyPassword) {
      return notifyFail("Passwords must match");
    }
    axiosInstance
      .post(`user/register/`, {
        email: enteredEmail,
        username: enteredUsername,
        password: enteredPassword,
      })
      .then((res) => {
        history("/sign-in");
        notifySuccess("Successfully signed up ");
      })
      .catch((err) => {
        notifyFail("Something went wrong");
      });
  };

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredVerifyPasswordIsValid
  ) {
    formIsValid = true;
  }

  return (
    <>
      <div>
        <section className='section-content padding-y'>
          <div
            className='card mx-auto'
            style={{ maxWidth: "520px", marginTop: "40px" }}>
            <article className='card-body'>
              <header className='mb-4'>
                <h4 className='card-title'>Sign up</h4>
              </header>

              <form onSubmit={handleSubmit}>
                <div className='form-row'>
                  <div className='col form-group'>
                    <label>Username</label>

                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Username'
                      name='username'
                      onChange={usernameChangedHandler}
                      onBlur={usernameBlurHandler}
                      value={enteredUsername}
                    />
                    {usernameInputHasError && (
                      <p className='error-text'>Username must be filled</p>
                    )}
                  </div>
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    onBlur={emailBlurHandler}
                    onChange={emailChangedHandler}
                    value={enteredEmail}
                    placeholder='Enter Email'
                  />
                  {emailInputHasError && (
                    <p className='error-text'>Email must be valid</p>
                  )}

                  <small className='form-text text-muted'>
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Create password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
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
                  <div className='form-group col-md-6'>
                    <label>Repeat password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='verifyPassword'
                      onChange={verifyPasswordChangedHandler}
                      onBlur={verifyPasswordBlurHandler}
                      value={enteredVerifyPassword}
                    />
                    {verifyPasswordInputHasError && (
                      <p className='error-text'>
                        Must be at least 6 characters length
                      </p>
                    )}
                  </div>
                </div>
                <div className='form-group'>
                  <button
                    type='submit'
                    disabled={!formIsValid}
                    className='btn btn-primary btn-block'>
                    Register
                  </button>
                </div>
              </form>
            </article>
          </div>
          <p className='text-center mt-4'>
            Have an account?<Link to='/sign-in'> Log In</Link>
          </p>
          <br />
          <br />
        </section>
      </div>
    </>
  );
}

export default Register;
