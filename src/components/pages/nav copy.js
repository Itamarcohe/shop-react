import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { setCart } from "../../redux/actions/constans/reducers/cartActions";

function Nav(props) {
  const [reload, setReload] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    props.setSearchText((oldValue) => newValue);
    console.log(` newValue ${newValue}`);
  };

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

  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log(props.searchText.trim().length);
    const searchText = props.searchText.trim();
    if (searchText.length > 0) {
      console.log("im here");
      props.setCategoryFilter(" ");
      props.setTriggerSearch((oldValue) => !oldValue);
    } else if (searchText.length === 0) {
      props.setSearchText("");
      props.setCategoryFilter(" ");
      props.setTriggerSearch((oldValue) => !oldValue);
    }
  };

  return (
    <>
      <div>
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
            </nav>
            <section className='header-main border-bottom'>
              <div className='container'>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className='row align-items-center'>
                    <div className='col-lg-2 col-md-3 col-6'>
                      {/* <Link to='/' className='brand-wrap'>
                        <img
                          className='logo'
                          src='https://djangogreatkart.com/static/images/logo.png'
                          alt='logo'
                        />
                      </Link>
 */}

                      <Link to='/' className='brand-wrap'>
                        <img
                          className='logo'
                          src='https://djangogreatkart.com/static/images/logo.png'
                          alt='logo'
                        />
                      </Link>
                    </div>
                  </div>
                  <Link to='/store' className='btn btn-outline-primary'>
                    Store
                  </Link>
                  <div className='col-lg  col-md-6 col-sm-12 col'>
                    <form>
                      <div className='input-group w-100'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search'
                          name='keyword'
                          value={props.searchText}
                          onChange={handleSearchChange}
                        />
                        <div
                          className='input-group-append'
                          style={{ display: "flex" }}>
                          <button
                            className='btn btn-primary'
                            type='submit'
                            onClick={onSearchSubmit}>
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
                    </form>
                  </div>
                  <div className='col-lg-3 col-sm-6 col-8 order-2 order-lg-3'>
                    <div className='d-flex justify-content-end mb-3 mb-lg-0'>
                      <div className='widget-header'>
                        {window.localStorage.getItem(["username"]) ? (
                          <div style={{ textAlign: "center" }}>
                            <small className='title text-muted'>
                              Welcome{" "}
                              {window.localStorage.getItem(["username"])}!
                            </small>

                            <Link to='/logout'>Logout</Link>
                          </div>
                        ) : (
                          <>
                            <small className='title text-muted'>
                              Welcome guest!
                            </small>

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
                          {window.localStorage.getItem(["access_token"])
                            ? cart.reduce((acc, cur) => acc + cur.quantity, 0)
                            : 0}
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
    </>
  );
}

export default Nav;
