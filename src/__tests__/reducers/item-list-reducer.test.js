import itemListReducer from "../../reducers/item-list-reducer";

describe("itemListReducer", () => {

  const currentState = {
    1: {
      name: "Dagger",
      description: "Pointy",
      price: 59.99,
      quantity: 5,
      id: 1
    },
    2: {
      name: "Staff",
      description: "Large stick",
      price: 79.99,
      quantity: 3,
      id: 2
    }
  };

  let action;
  const itemData = {
    name: "Dagger",
    description: "Sturdy and sharp.",
    price: 99.99,
    quantity: 1,
    id: 1
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(itemListReducer({}, { type: null })).toEqual({});
  });

  test("Should succesfully add new item data to masterItemList", () => {
    const { name, description, price, quantity, id } = itemData;
    action = {
      type: "ADD_ITEM",
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      id: id
    };

    expect(itemListReducer({}, action)).toEqual({
      [id]: {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        id: id
      }
    });
  });

  test("Should succesfully delete an item", () => {
    action = {
      type: "DELETE_ITEM",
      id: 1
    };

    expect(itemListReducer(currentState, action)).toEqual({
      2: {
        name: "Staff",
        description: "Large stick",
        price: 79.99,
        quantity: 3,
        id: 2
      }
    });
  });
});