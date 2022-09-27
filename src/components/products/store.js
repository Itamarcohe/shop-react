import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";
import axiosInstance from "../../axios";

export default function Store(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(props.data.total / 12);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let displayProducts = [];
  if (props.data.data) {
    displayProducts = props.data.data.map((product) => {
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
  }

  const [catLinks, setCatLinks] = useState([]);
  useEffect(() => {
    axiosInstance.get(`category_links`).then((res) => setCatLinks(res.data));
  }, []);

  const handleCategoryFilter = (e) => {
    props.setCategoryFilter(e.target.name);
    props.setPage(1);
  };

  const handlePriceFilter = (e) => {
    console.log(e.target.name);
    console.log("i reached here");
    props.setPriceSort(e.target.name);
    props.setPage(1);
  };

  let CategoriesMapped = catLinks.map((category) => (
    <li key={category.id}>
      <Link to='' name={category.category_name} onClick={handleCategoryFilter}>
        {category.category_name}
      </Link>
    </li>
  ));

  function getCategory(event) {
    console.log("event.target.name");
    console.log(event.target.name);

    const filterCategory = event.target.name;
    props.setCategoryFilter(filterCategory);
    props.setSearchText("");
  }

  const clearFilters = () => {
    props.setSearchText("");
    props.setCategoryFilter("");
    props.setTriggerSearch((oldValue) => !oldValue);
  };

  return (
    <>
      <div>
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
                        <h6 className='title'>Sort price</h6>
                      </Link>
                    </header>
                    <div
                      className='filter-content collapse show'
                      id='collapse_1'>
                      <div className='card-body'>
                        <ul className='list-menu'>
                          <li>
                            <Link to='' name='asc' onClick={handlePriceFilter}>
                              Ascending
                            </Link>
                          </li>
                          <li>
                            <Link to='' name='desc' onClick={handlePriceFilter}>
                              Descending
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

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
                            <Link to='' onClick={clearFilters}>
                              All Products | clear filters
                            </Link>
                          </li>
                          {CategoriesMapped}
                        </ul>
                      </div>
                    </div>
                  </article>
                </div>
              </aside>
              <main className='col-md-9'>
                <header className='border-bottom mb-4 pb-3'>
                  <div className='form-inline'>
                    {props.loading ? (
                      <Spinner animation='border' variant='primary' />
                    ) : (
                      <b>{props.data.total} items found</b>
                    )}
                  </div>
                </header>

                <div className='row'>
                  {props.data.data
                    ? displayProducts
                    : "Didn't found paginated products"}
                </div>

                <nav className='mt-4' aria-label='Page navigation sample'>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={props.changePage}
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
