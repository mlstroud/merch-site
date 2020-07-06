import React from 'react';
import ItemList from './ItemList';
import Cart from "./Cart";
import EditItem from "./EditItem";
import { connect } from "react-redux";

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
    const newCartList = { ...this.state.cartList, [item.name]: (this.state.cartList[item.name] || 0) + 1 }
    if (item.quantity > 0) {
      this.setState(prevState => ({
        cartList: newCartList,
        masterItemList: prevState.masterItemList.map(
          (obj, index) => (obj.name === item.name ? Object.assign({}, this.state.masterItemList[index], { quantity: item.quantity - 1 }) : obj)
        )
      }), () => {
        console.log(this.state.cartList);
        console.table(this.state.masterItemList);
      })
    }
  }

  handleAddingInventoryToItem = (amount, item) => {
    this.setState(prevState => ({
      masterItemList: prevState.masterItemList.map(
        (obj, index) => (obj.name === item ? Object.assign({}, this.state.masterItemList[index], { quantity: parseInt(obj.quantity) + parseInt(amount) }) : obj)
      )
    }))

  }

  handleSelectingItem = (id) => {
    const selectedItem = this.state.masterItemList.filter(item => item.id === id)[0];
    this.setState({ selectedItem: selectedItem });
  }

  handleEditingItem = (item) => {
    const { dispatch } = this.props;
    const { id, name, description, price, quanity } = item;
    const action = {
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
      itemState = <ItemList itemList={this.state.masterItemList}
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

ItemControl = connect()(ItemControl);

export default ItemControl;
