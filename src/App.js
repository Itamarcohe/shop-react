import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import "./css/responsive.css.map";
import "./css/ui.css";
import "./css/ui.css.map";
import Footer from "./components/pages/footer";
import Nav from "./components/pages/Navbar";
import Home from "./components/pages/home";
import Comments from "./components/pages/comments";
// shop pages
import Store from "./components/products/store";
import Detail from "./components/products/detail";
import CartPage from "./components/checkout/cartPage";
import Checkout from "./components/checkout/checkout";
import Payment from "./components/checkout/payment";
import Register from "./components/auth/register";
import SignIn from "./components/auth/signin";
import Logout from "./components/auth/logout";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "./axios";

export default function App(props) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [clickAddCart, setClickAddCart] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [priceSort, setPriceSort] = useState(null);
  const [loading, setLoading] = useState(false);

  const HandleAddCart = () => {
    setClickAddCart((oldValue) => !oldValue);
  };

  const changePage = ({ selected }) => {
    console.log(`selected ${selected}`);
    setPage(selected + 1);
  };

  useEffect(() => {
    setLoading(true);
    console.log("in use fetching products called app useeffect");
    axiosInstance
      .get(
        `search/?page=${page}&s=${searchText}&category=${categoryFilter}&sort=${priceSort}`
      )
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.log(`entered error since no data attempt ${err}`);
      });
    setLoading(false);

    console.log(categoryFilter);
  }, [page, categoryFilter, triggerSearch, priceSort]);

  function notifyFail(message) {
    toast.error(message);
  }

  function notifySuccess(message) {
    toast.success(message);
  }

  const capFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleOrderDelete = () => {
    axiosInstance.delete(`orders/delete_order/`);
    window.location.reload(false);
  };

  const [catLinks, setCatLinks] = useState([]);

  useEffect(() => {
    axiosInstance.get(`category_links`).then((res) => setCatLinks(res.data));
  }, []);

  return (
    <>
      <Router>
        <Nav
          loading={loading}
          clickAddCart={clickAddCart}
          searchText={searchText}
          setSearchText={setSearchText}
          setProducts={setProducts}
          data={products}
          setTriggerSearch={setTriggerSearch}
          catLinks={catLinks}
          setCategoryFilter={setCategoryFilter}
          setPage={setPage}
        />

        <Routes>
          <Route path='/comments' element={<Comments />} />
          <Route
            path='/store'
            element={
              <Store
                setPriceSort={setPriceSort}
                data={products}
                changePage={changePage}
                page={page}
                setCategoryFilter={setCategoryFilter}
                setSearchText={setSearchText}
                catLinks={catLinks}
                setPage={setPage}
                setTriggerSearch={setTriggerSearch}
              />
            }
          />

          <Route
            path='/product-detail/:id'
            element={
              <Detail
                capFirst={capFirst}
                HandleAddCart={HandleAddCart}
                notifyFail={notifyFail}
                notifySuccess={notifySuccess}
              />
            }
          />

          <Route exact path='/' element={<Home />} />
          <Route
            path='/sign-in'
            element={
              <SignIn
                HandleAddCart={HandleAddCart}
                notifyFail={notifyFail}
                notifySuccess={notifySuccess}
              />
            }
          />
          <Route
            path='/logout'
            element={
              <Logout
                notifySuccess={notifySuccess}
                HandleAddCart={HandleAddCart}
              />
            }
          />
          <Route path='/user/create' element={<Register />} />
          <Route
            path='/cart'
            element={
              <CartPage HandleAddCart={HandleAddCart} capFirst={capFirst} />
            }
          />
          <Route
            path='/checkout'
            element={<Checkout handleOrderDelete={handleOrderDelete} />}
          />
          <Route
            path='/payment'
            element={
              <Payment
                clickAddCart={clickAddCart}
                handleOrderDelete={handleOrderDelete}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
