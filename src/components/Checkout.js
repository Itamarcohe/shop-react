import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { useSelector } from "react-redux";

function Checkout(props) {
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  const history = useNavigate();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
    if (order === false) {
      axiosInstance
        .post(`orders/place_order/`, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address_line_1: formData.address_line_1,
          address_line_2: formData.address_line_2,
          city: formData.city,
          country: formData.country,
          order_note: formData.order_note,
        })
        .then((res) => {
          history("/payment");
        });
    } else {
      axiosInstance
        .put(`orders/place_order/`, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address_line_1: formData.address_line_1,
          address_line_2: formData.address_line_2,
          city: formData.city,
          country: formData.country,
          order_note: formData.order_note,
        })
        .then((res) => {
          history("/payment");
        });
    }
  };

  const [order, setOrder] = useState([]);

  useEffect(() => {
    axiosInstance.get(`orders/payments/`).then((res) => setOrder(res.data));
  }, []);

  console.log(order);
  if (order === false) {
    console.log("its false!!");
  } else {
    console.log("order exist");
  }

  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: "",
    order_note: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  return (
    <>
      <section className='section-content padding-y bg'>
        <div className='container'>
          <div className='row'>
            <aside className='col-lg-7'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title mb-4'>Billing Address</h4>
                  <form>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>First Name</label>
                        <input
                          type='text'
                          name='first_name'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.first_name}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Last Name</label>
                        <input
                          type='text'
                          name='last_name'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.last_name}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>Email</label>
                        <input
                          type='email'
                          name='email'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.email}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Phone Number</label>
                        <input
                          type='text'
                          name='phone'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.phone}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>Address Line 1</label>
                        <input
                          type='text'
                          name='address_line_1'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.address_line_1}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Address Line 2</label>
                        <input
                          type='text'
                          name='address_line_2'
                          className='form-control'
                          onChange={handleChange}
                          defaultValue={order.address_line_2}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>City</label>
                        <input
                          type='text'
                          name='city'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.city}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Country</label>
                        <input
                          type='text'
                          name='country'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={order.country}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <label htmlFor=''>Order Note</label>
                      <textarea
                        name='order_note'
                        rows={2}
                        className='form-control'
                        onChange={handleChange}
                        defaultValue={order.order_note}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </aside>
            <aside className='col-lg-5'>
              <div className='card'>
                <div className='card-body'>
                  <table className='table table-borderless table-shopping-cart'>
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
                  {cartDisplay}
                  <Link
                    to='/checkout'
                    className='btn btn-primary btn-block'
                    onClick={handleSubmit}>
                    Place Order
                  </Link>
                  <Link to='/store' className='btn btn-light btn-block'>
                    Continue Shopping
                  </Link>
                  {order && (
                    <div style={{ textAlign: "center" }}>
                      <Link
                        to='/checkout'
                        // style={{ width: "25%" }}
                        className='btn btn-danger mb-2 mt-2'
                        onClick={props.handleOrderDelete}>
                        Delete Address & add new
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// function Checkout(props) {
//   const cart = useSelector((state) => state.cart.cart);

//   const cartDisplay = cart.map((c, index) => {
//     const variationDisplay = c.variations.map((v, index) => {
//       return (
//         <div key={index}>
//           {v.variation_category} : {v.variation_value}
//         </div>
//       );
//     });
//     return (
//       <div className='card' key={index}>
//         <table className='table table-borderless table-shopping-cart'>
//           <tbody>
//             <tr>
//               <td>
//                 <figure className='itemside align-items-center'>
//                   <div className='aside'>
//                     <img
//                       src={c.product.images}
//                       style={{ height: "100%" }}
//                       className='img-sm'
//                       alt='product'
//                     />
//                   </div>
//                   <figcaption className='info'>
//                     <a
//                       href='{{ cart_item.product.get_url }}'
//                       className='title text-dark'>
//                       {c.product.product_name}
//                     </a>
//                     <div className='text-muted small'>
//                       amount: {c.quantity}
//                       {variationDisplay}
//                     </div>
//                   </figcaption>
//                 </figure>
//               </td>
//               <td>
//                 <div className='price-wrap' style={{ textAlign: "right" }}>
//                   <var className='price'>${c.product.price * c.quantity}</var>

//                   <small className='text-muted'>{c.product.price} each</small>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   });

//   const history = useNavigate();
//   const initialFormData = Object.freeze({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     address_line_1: "",
//     address_line_2: "",
//     city: "",
//     country: "",
//     order_note: "",
//   });

//   const [formData, updateFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     updateFormData({
//       ...formData,
//       // Trimming any whitespace
//       [e.target.name]: e.target.value.trim(),
//     });
//     console.log(formData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosInstance
//       .post(`orders/place_order/`, {
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         email: formData.email,
//         phone: formData.phone,
//         address_line_1: formData.address_line_1,
//         address_line_2: formData.address_line_2,
//         city: formData.city,
//         country: formData.country,
//         order_note: formData.order_note,
//       })
//       .then((res) => {
//         history("/payment");
//       });
//   };

//   const [order, setOrder] = useState([]);

//   useEffect(() => {
//     axiosInstance.get(`orders/payments/`).then((res) => setOrder(res.data));
//   }, []);

//   console.log(order);
//   if (order === false) {
//     console.log("its false!!");
//   }

//   return (
//     <>
//       <section className='section-content padding-y bg'>
//         <div className='container'>
//           <div className='row'>
//             {!order ? (
//               <aside className='col-lg-6'>
//                 <div className='card'>
//                   <div className='card-body'>
//                     <h4 className='card-title mb-4'>Billing Address</h4>
//                     <form>
//                       <div className='form-row'>
//                         <div className='col form-group'>
//                           <label htmlFor=''>First Name</label>
//                           <input
//                             type='text'
//                             name='first_name'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Last Name</label>
//                           <input
//                             type='text'
//                             name='last_name'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                       <div className='form-row'>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Email</label>
//                           <input
//                             type='email'
//                             name='email'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Phone Number</label>
//                           <input
//                             type='text'
//                             name='phone'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                       <div className='form-row'>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Address Line 1</label>
//                           <input
//                             type='text'
//                             name='address_line_1'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Address Line 2</label>
//                           <input
//                             type='text'
//                             name='address_line_2'
//                             className='form-control'
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                       <div className='form-row'>
//                         <div className='col form-group'>
//                           <label htmlFor=''>City</label>
//                           <input
//                             type='text'
//                             name='city'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className='col form-group'>
//                           <label htmlFor=''>Country</label>
//                           <input
//                             type='text'
//                             name='country'
//                             className='form-control'
//                             required={true}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                       <div className='form-row'>
//                         <label htmlFor=''>Order Note</label>
//                         <textarea
//                           name='order_note'
//                           rows={2}
//                           className='form-control'
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </aside>
//             ) : (
//               <div style={{ textAlign: "center" }}>
//                 <h4 className='text-center card-title mb-4'>
//                   Address being used:
//                 </h4>
//                 <p>
//                   {order.country}, {order.city}, {order.address_line_1}
//                 </p>
//                 <Link
//                   to='/checkout'
//                   style={{ width: "25%" }}
//                   className='btn btn-danger mb-4'
//                   onClick={props.handleOrderDelete}>
//                   Delete and add new
//                 </Link>
//               </div>
//             )}

//             <aside className={!order ? "col-lg-6" : "col-lg-12"}>
//               <div className='card'>
//                 <div className='card-body'>
//                   <table className='table table-borderless table-shopping-cart'>
//                     <thead className='text-muted'>
//                       <tr className='small text-uppercase'>
//                         <th scope='col'>Product</th>
//                         <th
//                           scope='col'
//                           width={120}
//                           style={{ textAlign: "center" }}>
//                           Price
//                         </th>
//                       </tr>
//                     </thead>
//                   </table>
//                   {cartDisplay}

//                   {!order ? (
//                     <>
//                       <Link
//                         to='/checkout'
//                         className='btn btn-primary btn-block'
//                         onClick={handleSubmit}>
//                         Place Order
//                       </Link>
//                       <Link to='/store' className='btn btn-light btn-block'>
//                         Continue Shopping
//                       </Link>
//                     </>
//                   ) : (
//                     <div style={{ textAlign: "center" }}>
//                       <Link
//                         style={{ width: "15%" }}
//                         to='/checkout'
//                         className='btn btn-primary'
//                         onClick={handleSubmit}>
//                         Place Order
//                       </Link>
//                       <Link
//                         to='/store'
//                         className='btn btn-light'
//                         style={{ width: "15%" }}>
//                         Continue Shopping
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

export default Checkout;
