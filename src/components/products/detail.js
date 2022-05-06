import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";

const Detail = (props) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [variation, setVariation] = useState([]);

  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    axiosInstance
      .get(`product-detail/${id}/`)
      .then((response) => setProduct(response.data));

    axiosInstance
      .get(`variation-detail/${id}/`)
      .then((response) => setVariation(response.data));
  }, []);

  const handleAddToCart = () => {
    if (size === "" || color === "") {
      props.notifyFail("Please choose color/size");
    } else {
      let choosed_size = `size=${size}`;
      let choosed_color = `color=${color}`;
      axiosInstance
        .post(`cart/add_to_cart?${choosed_color}&${choosed_size}`, { id })
        .then((res) => {
          props.HandleAddCart();
          props.notifySuccess(
            `${product.product_name} Successfully added to cart`
          );
        });
    }
  };

  function variationDisplayFactory(variation_category) {
    const withDuplicates = variation
      .filter(
        (v) =>
          v.variation_category === variation_category && v.is_active === true
      )
      .map((v) => v.variation_value);
    const uniqueValues = Array.from(new Set(withDuplicates));

    const displayValues = uniqueValues.map((v, index) => (
      <option key={index} value={v.toLowerCase()}>
        {props.capFirst(v)}
      </option>
    ));
    return displayValues;
  }

  const sizesMapped = variationDisplayFactory("size");
  const colorsMapped = variationDisplayFactory("color");

  return (
    <>
      {product && (
        <section className='section-content padding-y bg'>
          <div className='container'>
            <div className='card'>
              <div className='row no-gutters'>
                <aside className='col-md-6'>
                  <article className='gallery-wrap'>
                    <div className='img-big-wrap'>
                      <Link to=''>
                        <img src={product.images} alt='product' />
                      </Link>
                    </div>
                  </article>
                </aside>

                <main className='col-md-6 border-left'>
                  <article className='content-body'>
                    <h3 className='title'>{product.product_name}</h3>
                    <div className='mb-3'>
                      <var className='price h4'>${product.price}</var>
                    </div>
                    <p>{product.description}</p>

                    <hr />
                    <div className='row'>
                      <div className='item-option-select'>
                        <h6>Select</h6>
                        <select
                          name='color'
                          style={{ width: "20%" }}
                          className='form-control'
                          value={color}
                          onChange={(e) => {
                            const selectedColor = e.target.value;
                            setColor(selectedColor);
                          }}>
                          <option value='' disabled>
                            Select
                          </option>

                          {colorsMapped}
                        </select>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='item-option-select'>
                        <h6>Select Size</h6>
                        <select
                          name='size'
                          className='form-control'
                          style={{ width: "20%" }}
                          value={size}
                          onChange={(e) => {
                            const selectedSize = e.target.value;
                            setSize(selectedSize);
                          }}>
                          <option value='' disabled>
                            Select
                          </option>
                          {sizesMapped}
                        </select>
                      </div>
                    </div>
                    <hr />

                    {product.stock === 0 ? (
                      <h5>Out of Stock</h5>
                    ) : (
                      <>
                        <h5>In Stock</h5>
                        <button
                          className='btn  btn-primary'
                          onClick={() => handleAddToCart(product.id)}>
                          <span className='text'>Add to cart</span>{" "}
                          <i className='fas fa-shopping-cart' />
                        </button>
                      </>
                    )}
                  </article>
                </main>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-md-9'>
                <header className='section-heading'>
                  <h3>Customer Reviews </h3>
                </header>
                <article className='box mb-3'>
                  <div className='icontext w-100'>
                    <img
                      src='https://static1.smartbear.co/smartbear/media/images/solutions/over-the-shoulder-code-review.png'
                      className='img-xs icon rounded-circle'
                      alt='reviewer'
                    />
                    <div className='text'>
                      <span className='date text-muted float-md-right'>
                        24.04.2020{" "}
                      </span>
                      <h6 className='mb-1'>Mike John </h6>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <p>
                      Dummy comment Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Detail;
