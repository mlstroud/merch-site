import React from 'react';
import ItemForm from './ItemForm';
import PropTypes from 'prop-types';

function EditItem(props) {
  const { item } = props;

  function handleItemEditSubmission(event) {
    event.preventDefault();
    props.onEditItem({
      name: event.target.name.value, description: event.target.description.value, quantity: event.target.quantity.value, price: event.target.price.value, id: item.id
    })
  };
  return (
    <React.Fragment>
      <ItemForm buttonText="Edit Item" submitHandler={handleItemEditSubmission} />
    </React.Fragment>
  )
}

EditItem.propTypes = {
  onEditItem: PropTypes.func
}

export default EditItem;