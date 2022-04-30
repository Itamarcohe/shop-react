import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { setCart } from "../../redux/actions/constans/reducers/cartActions";

function Nav(props) {
  const inputEl = useRef("");
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const fetchCart = async () => {
    const response = await axiosInstance
      .get(`cart/get_cart`)
      .catch((err) => {});
    console.log(response);
    if (response) {
      dispatch(setCart(response.data));
    }
  };

  useEffect(() => {
    localStorage.getItem(["access_token"]) && fetchCart();
  }, [props.clickAddCart]);

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <header className='section-header'>
          <nav className='navbar p-md-0 navbar-expand-sm navbar-light border-bottom'>
            <div className='container'>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarTop4'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon' />
              </button>
              <div className='collapse navbar-collapse' id='navbarTop4'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item dropdown'>
                    <p className='nav-link'>English</p>
                  </li>
                  <li className='nav-item dropdown'>
                    <p className='nav-link'>USD</p>
                  </li>
                </ul>
                <ul className='navbar-nav'>
                  <li>
                    <Link to='\' className='nav-link'>
                      <i className='fa fa-envelope' /> Email
                    </Link>
                  </li>
                  <li>
                    <Link to='\' className='nav-link'>
                      <i className='fa fa-phone' /> Call us
                    </Link>
                  </li>
                </ul>{" "}
                {/* list-inline //  */}
              </div>{" "}
              {/* navbar-collapse .// */}
            </div>{" "}
            {/* container //  */}
          </nav>
          <section className='header-main border-bottom'>
            <div className='container'>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className='row align-items-center'>
                  <div className='col-lg-2 col-md-3 col-6'>
                    <Link to='/' className='brand-wrap'>
                      <img
                        className='logo'
                        src='https://djangogreatkart.com/static/images/logo.png'
                        alt='logo'
                      />
                    </Link>{" "}
                    {/* brand-wrap.// */}
                  </div>
                </div>{" "}
                {/* closing div attempt*/}
                {/* CATEGORY DROP DWON REMOVED FROM*/}
                <Link to='/store' className='btn btn-outline-primary'>
                  Store
                </Link>
                <div className='col-lg  col-md-6 col-sm-12 col'>
                  <div className='input-group w-100'>
                    <input
                      ref={inputEl}
                      type='text'
                      className='form-control'
                      style={{ width: "60%" }}
                      placeholder='Search'
                      name='keyword'
                      value={props.term}
                      onChange={getSearchTerm}
                    />

                    <div className='input-group-append'>
                      <button className='btn btn-primary' type='submit'>
                        <i className='fa fa-search'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-search'
                            viewBox='0 0 16 16'>
                            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                          </svg>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>{" "}
                {/* col.// */}
                <div className='col-lg-3 col-sm-6 col-8 order-2 order-lg-3'>
                  <div className='d-flex justify-content-end mb-3 mb-lg-0'>
                    <div className='widget-header'>
                      <small className='title text-muted'>Welcome guest!</small>

                      {window.localStorage.getItem(["access_token"]) ? (
                        <>
                          <Link to='/logout'>Logout</Link>
                        </>
                      ) : (
                        <>
                          <Link to='/sign-in'>Sign in</Link>
                          <span className='dark-transp'> | </span>
                          <Link to='/user/create'> Register</Link>
                        </>
                      )}
                    </div>

                    <Link
                      to='/cart'
                      className='widget-header pl-3 ml-3'
                      onClick={() => fetchCart()}>
                      <div className='icon icon-sm rounded-circle border'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={16}
                          height={16}
                          fill='currentColor'
                          className='bi bi-cart-fill'
                          viewBox='0 0 16 16'>
                          <path
                            d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491
                              -.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1
                               0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'
                          />
                        </svg>
                      </div>

                      <span className='badge badge-pill badge-danger notify'>
                        {cart.reduce((acc, cur) => acc + cur.quantity, 0)}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
      </div>
    </div>
  );
}

export default Nav;
