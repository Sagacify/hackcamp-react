import React from 'react';
import PropTypes from 'prop-types';

import '../../css/cart.css';
import {movie} from '../../types/movie';
import {CartBody} from './CartBody';
import {toggleCart} from '../../actions/cartActions';
import {connect} from 'react-redux';

const _Cart = props => {
  const {toggleCart, products, movies, isOpen, count} = props;

  const getProducts = (ids = [285]) =>
    ids.map(id => movies.find(movie => movie.id === id));

  const productsWithData = getProducts(products);

  return (
    <div className={`cart-wrapper ${isOpen ? 'cart-open' : ''}`}>
      {!isOpen
        ? <span onClick={toggleCart}>{count}</span>
        : <CartBody products={productsWithData} />}
    </div>
  );
};

_Cart.propTypes = {
  products: PropTypes.array.isRequired,
  movies: PropTypes.arrayOf(movie).isRequired,
  toggleCart: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = ({cart, movies}) => ({
  isOpen: cart.isOpen,
  count: cart.count,
  products: cart.products,
  movies
});

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCart())
});

export const Cart = connect(mapStateToProps, mapDispatchToProps)(_Cart);
