import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function SignIn(props) {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          props.HandleAddCart();
          history("/");
        } else {
          props.notifyFail("Make sure password and username valid");
        }
      });
  };

  return (
    <>
      <div>
        <section
          className='section-conten padding-y'
          style={{ minHeight: "84vh" }}>
          {/* ============================ COMPONENT LOGIN   ================================= */}
          <div
            className='card mx-auto'
            style={{ maxWidth: "380px", marginTop: "100px" }}>
            <div className='card-body'>
              <h4 className='card-title mb-4'>Sign in</h4>

              <form noValidate>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email Address'
                    name='email'
                    onChange={handleChange}
                  />
                </div>{" "}
                {/* form-group// */}
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                  />
                </div>{" "}
                {/* form-group// */}
                <div className='form-group'>
                  <Link to='\' className='float-right'>
                    Forgot password?
                  </Link>
                </div>{" "}
                {/* form-group form-check .// */}
                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    onClick={handleSubmit}>
                    {" "}
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

//  class SignIn extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       }

//   }

//   render() {

//     return (
//       <>
//   <div>
//   <section className="section-conten padding-y" style={{minHeight: '84vh'}}>
//     {/* ============================ COMPONENT LOGIN   ================================= */}
//     <div className="card mx-auto" style={{maxWidth: '380px', marginTop: '100px'}}>
//       <div className="card-body">
//         <h4 className="card-title mb-4">Sign in</h4>
//         <form>
//           <div className="form-group">
//             <input type="email" className="form-control" placeholder="Email Address" />
//           </div> {/* form-group// */}
//           <div className="form-group">
//             <input type="password" className="form-control" placeholder="Password" />
//           </div> {/* form-group// */}
//           <div className="form-group">
//             <a href="#" className="float-right">Forgot password?</a>
//           </div> {/* form-group form-check .// */}
//           <div className="form-group">
//             <button type="submit" className="btn btn-primary btn-block"> Login</button>
//           </div> {/* form-group// */}
//         </form>
//       </div> {/* card-body.// */}
//     </div> {/* card .// */}
//     <p className="text-center mt-4">Don't have account? <Link to="/user/create">Sign up</Link></p>
//     <br /><br />
//     {/* ============================ COMPONENT LOGIN  END.// ================================= */}
//   </section>
//   {/* ========================= SECTION CONTENT END// ========================= */}
//   {/* ========================= FOOTER ========================= */}
// </div>

//       </>
//     );
//   }
// }

export default SignIn;
