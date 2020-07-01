import React from 'react';
import PropTypes from 'prop-types';
import Item from "./Item";
import { v4 } from 'uuid';

function ItemList(props) {

  function handleNewItemSubmission(event) {
    event.preventDefault();
    props.onItemCreation({ name: event.target.name.value, description: event.target.description.value, quantity: event.target.quantity.value, price: event.target.price.value, id: v4() })
  }
  return (
    <React.Fragment>
      <form onSubmit={handleNewItemSubmission}>
        <input
          type='text'
          name='name'
          placeholder='Item Name' />
        <input
          type='text'
          name='description'
          placeholder='Item Description' />
        <input
          type='number'
          name='quantity'
          placeholder='Initial Stock Quantity' />
        <input
          type='number'
          name='price'
          placeholder='Item Price Point' />
        <button type='submit'>Add Item to Shop</button>
      </form>
      <br></br><br></br>
      <hr />
      {props.itemList.map((item, index) =>
        <Item name={item.name}
          description={item.description}
          quantity={parseInt(item.quantity)}
          id={item.id}
          price={parseInt(item.price)}
          key={index}
          onAddToCart={props.onAddToCart}
          onAddToStock={props.onAddToStock}
        />
      )}

    </React.Fragment>
  );
}

ItemList.propTypes = {
  itemList: PropTypes.array,
  onItemCreation: PropTypes.func
};

export default ItemList;