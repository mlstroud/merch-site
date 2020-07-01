import React from 'react';
import PropTypes from 'prop-types';


function Cart(props) {

  return (
    <React.Fragment>
      {Object.entries(props.cartList).map(([key, value]) => <p>{key} - {value}</p>)}

    </React.Fragment>
  )
}

export default Cart;