import itemListReducer from "../../reducers/item-list-reducer";

describe("itemListReducer", () => {

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
});