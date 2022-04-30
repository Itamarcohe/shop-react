import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Carousel from "react-bootstrap/Carousel";

function Home(props) {
  console.log(props);
  const PageCount = Math.ceil(props.data.total / 12);
  const onNextPage = () => {
    props.setPage((oldValue) => oldValue);
    console.log("triggerd");
  };

  let displayHomeProducts = false;
  if (props.data.data) {
    displayHomeProducts = props.data.data.map((product) => {
      const { id, images, product_name, price } = product;
      const product_url = `/product-detail/${id}`;
      return (
        <div className='col-md-3' key={id}>
          <div className='card card-product-grid'>
            <Link to={product_url} className='img-wrap'>
              <img src={images} alt='product' />
            </Link>
            <figcaption className='info-wrap'>
              <Link to={product_url} className='title'>
                {product_name}
              </Link>
              <div className='price mt-1'> ${price}</div>{" "}
            </figcaption>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div>
        {/* here */}
        <section className='section-intro padding-y-sm'>
          <div className='container'>
            <div className='intro-banner-wrap'>
              <Carousel variant='dark' fade>
                <Carousel.Item interval={3000}>
                  <img
                    className='d-block w-100'
                    src='./images/cover_logo1.jpg'
                    alt='First slide'
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img
                    className='d-block w-100'
                    src='./images/summer_sale.png'
                    alt='Second slide'
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img
                    className='d-block w-100'
                    src='./images/summer_collection.jpg'
                    alt='Third slide'
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </section>

        <section className='section-name padding-y-sm'>
          <div className='container'>
            <header className='section-heading'>
              <Link
                to='\'
                className='btn btn-outline-primary float-right'
                onClick={props.seeAll}>
                See all
              </Link>
              <h3 className='section-title'>Popular products</h3>
            </header>

            <div className='row'>
              {props.data.data
                ? displayHomeProducts
                : "Didn't found home paginated products"}
            </div>
            <nav className='mt-4' aria-label='Page navigation sample'>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={PageCount}
                onPageChange={props.changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"page-item disabled"}
                activeClassName={"paginationActive"}
              />
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
