import React from "react";
import PropTypes from "prop-types";

function Item(props) {
  return (
    <React.Fragment>
      <h3>{props.name}</h3>
      <p>Description: {props.description}</p>
      {props.quantity > 0 &&
        <p>Quantity in Stock: {props.quantity}</p>}
      {props.quantity === 0 &&
        <p>This item is out of stock.</p>
      }
    </React.Fragment>


  )
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  quantity: PropTypes.number,
}

export default Item;