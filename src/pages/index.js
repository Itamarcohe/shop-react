import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Carousel from "react-bootstrap/Carousel";

function Home(props) {
  const [homeProducts, setHomeProducts] = useState(props.products);
  const [homePageNumber, setHomePageNumber] = useState(0);
  const homeProductsPerPage = 8;
  const homePagesVisited = homePageNumber * homeProductsPerPage;
  const homePageCount = Math.ceil(homeProducts.length / homeProductsPerPage);
  const changeHomePage = ({ selected }) => {
    setHomePageNumber(selected);
  };

  useEffect(() => {
    setHomeProducts(props.products);
  }, [props.products]);

  const displayHomeProducts = homeProducts
    .slice(homePagesVisited, homePagesVisited + homeProductsPerPage)
    .map((product) => {
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
              <Link to='\home' className='btn btn-outline-primary float-right'>
                See all
              </Link>
              <h3 className='section-title'>Popular products</h3>
            </header>

            <div className='row'>
              {displayHomeProducts
                ? displayHomeProducts
                : "Didn't found home paginated products"}
            </div>
            <nav className='mt-4' aria-label='Page navigation sample'>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={homePageCount}
                onPageChange={changeHomePage}
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
