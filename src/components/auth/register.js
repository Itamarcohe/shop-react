import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import URLS from "../Urls";
// import { base_url } from "./components/Urls";

toast.configure();
function Register() {
  function notifySuccess(message) {
    toast.success(message);
  }

  function notifyFail(message) {
    toast.error(message);
  }

  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // .post(`http://127.0.0.1:8000/api/user/register/`, {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    formData.password === formData.verifyPassword
      ? axios
          .post(`${URLS.base_url}user/register/`, {
            email: formData.email,
            username: formData.username,
            password: formData.password,
          })
          .then((res) => {
            history("/sign-in");
            notifySuccess("Successfully signed up ");
          })
      : notifyFail("Make sure passwords match");
  };

  return (
    <>
      <div>
        <section className='section-content padding-y'>
          {/* ============================ COMPONENT REGISTER   ================================= */}
          <div
            className='card mx-auto'
            style={{ maxWidth: "520px", marginTop: "40px" }}>
            <article className='card-body'>
              <header className='mb-4'>
                <h4 className='card-title'>Sign up</h4>
              </header>

              <form noValidate>
                <div className='form-row'>
                  <div className='col form-group'>
                    <label>UserName</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Username'
                      name='username'
                      onChange={handleChange}
                    />
                  </div>{" "}
                  {/* form-group end.// */}
                </div>{" "}
                {/* form-row end.// */}
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    onChange={handleChange}
                    placeholder='Enter Email'
                  />
                  <small className='form-text text-muted'>
                    We'll never share your email with anyone else.
                  </small>
                </div>{" "}
                {/* form-group end.// */}
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Create password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
                      onChange={handleChange}
                    />
                  </div>{" "}
                  {/* form-group end.// */}
                  <div className='form-group col-md-6'>
                    <label>Repeat password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='verifyPassword'
                      onChange={handleChange}
                    />
                  </div>{" "}
                  {/* form-group end.// */}
                </div>
                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    onClick={handleSubmit}>
                    {" "}
                    Register
                  </button>
                </div>{" "}
                {/* form-group// */}
              </form>
            </article>
          </div>{" "}
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
