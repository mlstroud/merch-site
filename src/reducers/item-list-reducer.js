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
    default:
      return state;
  }
};