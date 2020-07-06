export default (state = {}, action) => {
  const { name, description, price, quantity, id } = action;

  switch (action.type) {
    case "ADD_ITEM":
      return Object.assign({}, state, {
        [id]: {
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          id: id
        }
      });
    case "DELETE_ITEM":
      const newState = { ...state };
      delete newState[id];
      return newState;
    case "ADD_TO_CART":
      return Object.assign({}, state, {
        [id]: {
          name: name,
          description: description,
          price: price,
          quantity: parseInt(quantity - 1),
          id: id
        }
      });
    case "ADD_INVENTORY":
      return Object.assign({}, state, {
        [id]: {
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          id: id
        }
      });
    default:
      return state;
  }
};