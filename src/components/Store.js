import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import URLS from "./Urls";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";

function Store(props) {
  const [PriceRange, setPriceRange] = useState({
    startRange: 0,
    maxRange: 2000,
  });

  const [products, setProducts] = useState(props.products);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  //dont remove yet checking search

  // const [products, setProducts] = useState([]);

  const [catLinks, setCatLinks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => {
      const { id, images, product_name, price } = product;
      const product_url = `/product-detail/${id}`;
      return (
        <div className='col-md-4' key={id}>
          <figure className='card card-product-grid' key={id}>
            <div className='img-wrap'>
              <Link to={product_url}>
                <img src={images} alt='Product' />
              </Link>
            </div>

            <figcaption className='info-wrap'>
              <div className='fix-height'>
                <Link to={product_url} className='title'>
                  {product_name}
                </Link>

                <div className='price-wrap mt-2'>
                  <span className='price'> ${price} </span>
                </div>
              </div>

              <Link to={product_url} className='btn btn-block btn-primary'>
                View Details
              </Link>
            </figcaption>
          </figure>
        </div>
      );
    });

  useEffect(() => {
    const min = `&min_range=${PriceRange.startRange}`;
    const max = `&max_range=${PriceRange.maxRange}`;
    const category = `?category=${categoryFilter}`;

    axios
      .get(`${URLS.all_products}${category}${min}${max}`)
      .then((res) => setProducts(res.data));

    axios.get(`${URLS.all_categories}`).then((res) => setCatLinks(res.data));
  }, [categoryFilter, PriceRange]);

  function getCategory(event) {
    const filterCategory = event.target.name;
    setCategoryFilter(filterCategory);
  }

  function orderPrice(event) {
    const { name, value, type, checked } = event.target;
    setPriceRange((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  let CategoriesMapped = catLinks.map((category) => (
    <li key={category.id}>
      <Link to='' name={category.category_name} onClick={getCategory}>
        {category.category_name}
      </Link>
    </li>
  ));

  return (
    <>
      <div>
        <section className='section-pagetop bg'>
          <div className='container'>
            <h2 className='title-page'> Store</h2>
            {/*"Do somechecking in case there is search result query load search result | TODO LATER" */}
          </div>
        </section>

        <section className='section-content padding-y'>
          <div className='container'>
            <div className='row'>
              <aside className='col-md-3'>
                <div className='card'>
                  <article className='filter-group'>
                    <header className='card-header'>
                      <Link
                        to=''
                        data-toggle='collapse'
                        data-target='#collapse_1'>
                        <i className='icon-control fa fa-chevron-down' />
                        <h6 className='title'>Categories</h6>
                      </Link>
                    </header>

                    <div
                      className='filter-content collapse show'
                      id='collapse_1'>
                      <div className='card-body'>
                        <ul className='list-menu'>
                          <li>
                            <Link to='' onClick={getCategory}>
                              All Products{" "}
                            </Link>
                          </li>

                          {CategoriesMapped}
                        </ul>
                      </div>
                    </div>
                  </article>
                  <article className='filter-group'>
                    <header className='card-header'>
                      <Link
                        to=''
                        data-toggle='collapse'
                        data-target='#collapse_4'
                        aria-expanded='true'>
                        <i className='icon-control fa fa-chevron-down' />
                        <h6 className='title'>Sizes </h6>
                      </Link>
                    </header>
                    <div
                      className='filter-content collapse show'
                      id='collapse_4'
                      style={{}}>
                      <div className='card-body'>
                        <label className='checkbox-btn'>
                          <input type='checkbox' />
                          <span className='btn btn-light'> XS </span>
                        </label>
                        <label className='checkbox-btn'>
                          <input type='checkbox' />
                          <span className='btn btn-light'> SM </span>
                        </label>
                        <label className='checkbox-btn'>
                          <input type='checkbox' />
                          <span className='btn btn-light'> LG </span>
                        </label>
                        <label className='checkbox-btn'>
                          <input type='checkbox' />
                          <span className='btn btn-light'> XXL </span>
                        </label>
                      </div>
                    </div>
                  </article>

                  <form>
                    <article className='filter-group'>
                      <header className='card-header'>
                        <Link
                          to=''
                          data-toggle='collapse'
                          data-target='#collapse_3'
                          aria-expanded='true'>
                          <i className='icon-control fa fa-chevron-down' />
                          <h6 className='title'>Price range </h6>
                        </Link>
                      </header>
                      <div
                        className='filter-content collapse show'
                        id='collapse_3'
                        style={{}}>
                        <div className='card-body'>
                          <div className='form-row'>
                            <div className='form-group col-md-6'>
                              <label>Min</label>

                              <input
                                onChange={orderPrice}
                                className='mr-2 form-control'
                                name='startRange'
                                value={PriceRange.startRange}
                              />
                            </div>
                            <div className='form-group text-right col-md-6'>
                              <label>Max</label>
                              <input
                                className='mr-2 form-control'
                                onChange={orderPrice}
                                name='maxRange'
                                value={PriceRange.maxRange}
                              />
                            </div>
                          </div>

                          <button className='btn btn-block btn-primary'>
                            Apply
                          </button>
                        </div>
                      </div>
                    </article>
                  </form>
                </div>
              </aside>
              <main className='col-md-9'>
                <header className='border-bottom mb-4 pb-3'>
                  <div className='form-inline'>
                    {products.length === 0 ? (
                      <Spinner animation='border' variant='primary' />
                    ) : (
                      <span className='mr-md-auto'>
                        <b>{products.length}</b> items found
                      </span>
                    )}
                  </div>
                </header>

                <div className='row'>
                  {displayProducts
                    ? displayProducts
                    : "Didn't found paginated products"}
                </div>

                <nav className='mt-4' aria-label='Page navigation sample'>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"page-item disabled"}
                    activeClassName={"paginationActive"}
                  />
                </nav>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Store;
