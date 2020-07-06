import React from 'react';
import ItemList from './ItemList';
import Cart from "./Cart";
import EditItem from "./EditItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: {},
      selectedItem: null,
    }
  };

  handleCreatingItemsToList = (newItem) => {
    const { dispatch } = this.props;
    const { id, name, description, price, quantity } = newItem;
    const action = {
      type: "ADD_ITEM",
      id: id,
      name: name,
      description: description,
      price: price,
      quantity: quantity
    };

    dispatch(action);
    this.setState({ selectedItem: null });
  }

  handleAddingItemsToCart = (item) => {
    if (item.quantity > 0) {
      const { dispatch } = this.props;
      const newCartList = { ...this.state.cartList, [item.name]: (this.state.cartList[item.name] || 0) + 1 };
      const { name, description, price, quantity, id } = item;
      const action = {
        type: "ADD_TO_CART",
        id: id,
        name: name,
        description: description,
        price: price,
        quantity: quantity
      };
      dispatch(action);
      this.setState({ cartList: newCartList })
    }
  }

  handleAddingInventoryToItem = (amount, item) => {
    const { dispatch } = this.props;
    const { name, description, price, quantity, id } = item;
    const action = {
      type: "ADD_INVENTORY",
      id: id,
      name: name,
      description: description,
      price: price,
      quantity: quantity + parseInt(amount)
    };
    dispatch(action);
  }

  handleSelectingItem = (id) => {
    const selectedItem = this.props.masterItemList[id];
    this.setState({ selectedItem: selectedItem });
  }

  handleEditingItem = (item) => {
    const { dispatch } = this.props;
    const { name, description, price, quanity, id } = item;
    const action = {
      type: "ADD_ITEM",
      id: id,
      name: name,
      description: description,
      price: price,
      quanity: quanity
    };

    dispatch(action);
    this.setState({ selectedItem: null });
  }

  handleDeletingItem = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_ITEM",
      id: id
    };

    dispatch(action);
    this.setState({ selectedItem: null });
  }

  render() {
    let cartState = <Cart cartList={this.state.cartList} />;
    let itemState = null

    if (this.state.selectedItem == null) {
      itemState = <ItemList itemList={this.props.masterItemList}
        onItemCreation={this.handleCreatingItemsToList}
        onAddToCart={this.handleAddingItemsToCart}
        onAddToStock={this.handleAddingInventoryToItem}
        onSelectingItem={this.handleSelectingItem} />;
    } else if (this.state.selectedItem != null) {
      itemState = <EditItem item={this.state.selectedItem}
        onEditItem={this.handleEditingItem}
        onDeleteItem={this.handleDeletingItem} />
    }
    return (

      <React.Fragment>
        <h3>Item Control</h3>
        {cartState}
        {itemState}
      </React.Fragment>
    );
  }
}

ItemControl.propTypes = {
  masterItemList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterItemList: state
  }
};

ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;
