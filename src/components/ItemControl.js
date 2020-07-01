import React from 'react';
import ItemList from './ItemList';
import Cart from "./Cart";

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterItemList: [],
      cartList: {}
    }
  };

  handleCreatingItemsToList = (newItem) => {
    const newMasterItemList = this.state.masterItemList.concat(newItem)
    this.setState({
      masterItemList: newMasterItemList
    })
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
        (obj, index) => (obj.name == item ? Object.assign({}, this.state.masterItemList[index], { quantity: parseInt(obj.quantity) + parseInt(amount) }) : obj)
      )
    }))

  }

  render() {
    let cartState = <Cart cartList={this.state.cartList} />;
    let itemListState = <ItemList itemList={this.state.masterItemList}
      onItemCreation={this.handleCreatingItemsToList}
      onAddToCart={this.handleAddingItemsToCart}
      onAddToStock={this.handleAddingInventoryToItem} />;

    return (

      <React.Fragment>
        <h3>Item Control</h3>
        {cartState}
        {itemListState}
      </React.Fragment>
    );
  }
}

export default ItemControl;
