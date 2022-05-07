import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios";
import { setCart } from "../../redux/actions/constans/reducers/cartActions";

const Header = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const history = useNavigate();
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
      props.setCategoryFilter("");
      props.setTriggerSearch((oldValue) => !oldValue);
      history("store");
    } else if (searchText.length === 0) {
      props.setSearchText("");
      props.setCategoryFilter("");
      history("store");

      // props.setTriggerSearch((oldValue) => !oldValue);
    }
  };

  const handleCategoryFilter = (e) => {
    console.log(e.target.name);
    console.log("i reached here");
    props.setCategoryFilter(e.target.name);
    props.setPage(1);
    history("store");
  };

  const [catLinks, setCatLinks] = useState([]);
  useEffect(() => {
    axiosInstance.get(`category_links`).then((res) => setCatLinks(res.data));
  }, []);

  const navCategories = catLinks.map((cat) => {
    return (
      <NavDropdown.Item
        name={cat.category_name}
        key={cat.id}
        onClick={handleCategoryFilter}>
        {cat.category_name}
      </NavDropdown.Item>
    );
  });

  return (
    <div>
      <Navbar sticky='top' expand='sm' collapseOnSelect variant='#0D6EFD'>
        <Navbar.Brand>
          <Link to='/' className='brand-wrap' onClick={props.seeAll}>
            <img
              src='https://djangogreatkart.com/static/images/logo.png'
              alt='logo'
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle className='coloring' />
        <Navbar.Collapse>
          <div
            className='col-lg-3 col-sm-6 col-8 order-2 order-lg-3'
            style={{ marginLeft: "auto" }}>
            <div className='d-flex justify-content-end mb-3 mb-lg-0'>
              <div className='widget-header'>
                {window.localStorage.getItem(["username"]) ? (
                  <div style={{ textAlign: "center" }}>
                    <small className='title text-muted'>
                      Welcome {window.localStorage.getItem(["username"])}!
                    </small>

                    <Link to='/logout'>Logout</Link>
                  </div>
                ) : (
                  <>
                    <small className='title text-muted'>Welcome guest!</small>
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
          <Nav>
            <NavDropdown title='Categories'>{navCategories}</NavDropdown>
            <Nav.Link href='\store'>Store</Nav.Link>
            {/* <Nav.Link href='#about-us'>About Us</Nav.Link>
            <Nav.Link href='#contact-us'>Contact Us</Nav.Link> */}
          </Nav>
          <Form className='d-flex' style={{ alignItems: "center" }}>
            <FormControl
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              type='text'
              name='keyword'
              value={props.searchText}
              onChange={handleSearchChange}
            />
            <Button
              className='btn btn-primary'
              onClick={onSearchSubmit}
              type='submit'>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
