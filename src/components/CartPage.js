import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../axios";

function CartPage(props) {
  const cart = useSelector((state) => state.cart.cart);
  function handleDeleteCartItem(id) {
    console.log(id);
    axiosInstance.delete(`cart/remove-cart-item/${id}`).then((res) => {
      props.HandleAddCart();
      console.log("her");
    });
  }

  function handleReduceCartItem(id) {
    axiosInstance.delete(`cart/reduce-cart-item/${id}`).then((res) => {
      props.HandleAddCart();
    });
  }

  function handleIncreaseCartItem(id) {
    axiosInstance.post(`cart/increase-cart-item/${id}/`).then((res) => {
      props.HandleAddCart();
    });
  }

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.product.price,
    0
  );

  const totalTax = totalPrice * 0.03;
  const grandTotal = totalPrice + totalTax;
  const cartDisplay = cart.map((c, index) => {
    const variationDisplay = c.variations.map((v, index) => {
      return (
        <div key={index}>
          {v.variation_category} : {v.variation_value}
        </div>
      );
    });

    return (
      <div className='card' key={index}>
        <table className='table table-borderless table-shopping-cart'>
          <thead className='text-muted'>
            <tr className='small text-uppercase'>
              <th scope='col'>Product</th>
              <th scope='col' width={120}>
                Quantity
              </th>
              <th scope='col' width={120}>
                Price
              </th>
              <th scope='col' className='text-right' width={200}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <figure className='itemside align-items-center'>
                  <div className='aside'>
                    <img
                      src={c.product.images}
                      style={{ height: "100%" }}
                      className='img-sm'
                      alt='product'
                    />
                  </div>
                  <figcaption className='info'>
                    <a
                      href='{{ cart_item.product.get_url }}'
                      className='title text-dark'>
                      {c.product.product_name}
                    </a>
                    <div className='text-muted small'>{variationDisplay}</div>
                  </figcaption>
                </figure>
              </td>
              <td>
                <div className='col'>
                  <div className='input-group input-spinner'>
                    <div className='input-group-prepend'>
                      <button
                        onClick={() => handleReduceCartItem(c.id)}
                        className='btn btn-light'
                        id='button-plus'>
                        -
                        <i className='fa fa-minus' />
                      </button>
                    </div>

                    <p className='form-control' style={{ display: "flex" }}>
                      {c.quantity}
                    </p>

                    <div className='input-group-append'>
                      {c.product.stock > 0 ? (
                        <button
                          onClick={() => handleIncreaseCartItem(c.id)}
                          className='btn btn-light'
                          id='button-minus'>
                          +
                          <i className='fa fa-plus' />
                        </button>
                      ) : (
                        <button className='btn btn-light' id='button-minus'>
                          X
                          <i className='fa fa-plus' />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className='price-wrap'>
                  <var className='price'>${c.product.price * c.quantity}</var>
                  <small className='text-muted'>${c.product.price} each</small>
                </div>{" "}
              </td>
              <td className='text-right'>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDeleteCartItem(c.id)}>
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
  return (
    <>
      <section className='section-content padding-y bg'>
        <div className='container'>
          {cart.length < 1 ? (
            <>
              <h2 className='text-center'>Your Shopping Cart is Empty</h2>
              <br />
              <div className='text-center'>
                <Link to='/store' className='btn btn-primary'>
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className='row'>
                <aside className='col-lg-9'>{cartDisplay}</aside>
                <aside className='col-lg-3'>
                  <div className='card'>
                    <div className='card-body'>
                      <dl className='dlist-align'>
                        <dt>Total price:</dt>

                        <dd className='text-right'>${totalPrice}</dd>
                      </dl>
                      <dl className='dlist-align'>
                        <dt>Tax:</dt>
                        <dd className='text-right'>${totalTax.toFixed(2)}</dd>
                      </dl>
                      <dl className='dlist-align'>
                        <dt>Grand Total:</dt>
                        <dd className='text-right text-dark b'>
                          <strong>${grandTotal.toFixed(2)}</strong>
                        </dd>
                      </dl>
                      <hr />
                      <p className='text-center mb-3'>
                        <img
                          src='https://djangogreatkart.com/static/images/misc/payments.png'
                          height={26}
                          alt='text'
                        />
                      </p>
                      <Link
                        to='/checkout'
                        className='btn btn-primary btn-block'>
                        Checkout
                      </Link>
                      <Link to='/store' className='btn btn-light btn-block'>
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default CartPage;
