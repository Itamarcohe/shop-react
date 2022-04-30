import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className='section-footer border-top'>
        <div className='container'>
          <section className='footer-bottom border-top row'>
            <div className='col-md-2'>
              <p className='text-muted'> shopping project </p>
            </div>
            <div className='col-md-8 text-md-center'>
              <span className='px-2'>Itamar@email.com</span>
              <span className='px-2'>0507000000</span>
              <span className='px-2'>Street name 123, Avanue abc</span>
            </div>
            <div className='col-md-2 text-md-right text-muted'>
              <i className='fab fa-lg fa-cc-visa' />
              <i className='fab fa-lg fa-cc-paypal' />
              <i className='fab fa-lg fa-cc-mastercard' />
            </div>
          </section>
        </div>
      </footer>
    );
  }
}
