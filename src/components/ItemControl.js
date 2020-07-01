import React from 'react';
import ItemList from './ItemList';

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterItemList: [],
      cartList: []
    }
  };

  handleCreatingItemsToList = (newItem) => {
    const newMasterItemList = this.state.masterItemList.concat(newItem)
    this.setState({
      masterItemList: newMasterItemList
    })
  }
  // handleAddingItemsToCart = (item) => {
  //   if (this.state.cartList.includes(item)) {
  //     cartList[item] 
  //   }
  // }

  // handleAddingInventoryToItem = () => {

  // }

  render() {
    let cartState = null;
    let itemListState = null;

    itemListState = <ItemList itemList={this.state.masterItemList}
      onItemCreation={this.handleCreatingItemsToList} />;

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
