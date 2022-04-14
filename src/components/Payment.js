import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { useSelector } from "react-redux";

function Payment(props) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axiosInstance.get(`orders/payments/`).then((res) => setOrder(res.data));
    console.log("render order");
  }, []);

  const cart = useSelector((state) => state.cart.cart);
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
                    <div className='text-muted small'>
                      amount: {c.quantity}
                      {variationDisplay}
                    </div>
                  </figcaption>
                </figure>
              </td>
              <td>
                <div className='price-wrap' style={{ textAlign: "right" }}>
                  <var className='price'>${c.product.price * c.quantity}</var>
                  <small className='text-muted'>{c.product.price} each</small>
                </div>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.product.price,
    0
  );

  function handleDeleteCart() {
    axiosInstance.delete(`cart/delete-cart/`).then((res) => {
      console.log("removed");
    });
  }

  const history = useNavigate();
  const totalTax = totalPrice * 0.03;
  const grandTotal = totalPrice + totalTax;

  function completeOrder() {
    handleDeleteCart();
    history("/");
    props.handleOrderDelete();
  }
  return (
    <>
      {/* <Confetti /> */}
      <section className='section-content padding-y bg'>
        <div className='container'>
          <div className='row'>
            <aside className='col-lg-8'>
              <div className='card'>
                <h5 className='card-header'>Billing Address</h5>
                <div className='card-body'>
                  <p className='card-text mb-1'>
                    {order.first_name} {order.last_name}
                  </p>
                  <p className='card-text mb-1'>
                    {order.address_line_1}
                    {order.address_line_2 &&
                      `| Address 2: ${order.address_line_2}`}
                  </p>
                  <p className='card-text mb-1'>
                    {order.city}, {order.country}
                  </p>
                  <p className='card-text mb-1'>{order.email}</p>
                  <p className='card-text mb-1'>{order.phone}</p>

                  {order.order_note && (
                    <>
                      <b>Order Note: </b> {order.order_note}
                    </>
                  )}
                </div>
              </div>
              <div className='card'>
                <h5 className='card-header'>Payment Method</h5>
                <div className='card-body'>
                  <p className='card-text'>Paypal</p>
                  <p className='card-text'>Debit card</p>
                </div>
              </div>
              <div className='card'>
                <h5 className='card-header'>Review Products</h5>
                <table className='table table-borderless table-shopping-cart mb-0'>
                  <thead className='text-muted'>
                    <tr className='small text-uppercase'>
                      <th scope='col'>Product</th>
                      <th
                        scope='col'
                        width={120}
                        style={{ textAlign: "center" }}>
                        Price
                      </th>
                    </tr>
                  </thead>
                </table>

                <div className='card-body'>{cartDisplay}</div>
              </div>
            </aside>
            <aside className='col-lg-4'>
              <div className='card'>
                <div className='card-body'>
                  <dl className='dlist-align'>
                    <dt>Total price:</dt>

                    <dd className='text-right'>
                      {parseFloat(totalPrice).toFixed(2)}
                    </dd>
                  </dl>
                  <dl className='dlist-align'>
                    <dt>Tax:</dt>
                    <dd className='text-right'>
                      {/* ${parseInt(order.tax).toFixed(2)} */}$
                      {parseFloat(totalTax).toFixed(2)}
                    </dd>
                  </dl>
                  <dl className='dlist-align'>
                    <dt>Grand Total:</dt>
                    <dd className='text-right text-dark b'>
                      <strong>${grandTotal}</strong>
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
                  <button
                    to='/checkout'
                    className='btn btn-primary btn-block'
                    onClick={completeOrder}>
                    Make Payment
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
