export function removeItemFromCart(cartItems, cartItemToRemove) {
  if (!cartItems.map(({id}) => id).includes(cartItemToRemove.id)) {
    return cartItems;
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item,
  );
}

export const getSelectItemCount = (cartItems) => {
  return cartItems.reduce(
    (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
    0,
  )
}

export const getSelectCartTotal = (cartItems) =>
  cartItems.reduce(
    (totalQuantity, cartItem) => totalQuantity + cartItem.quantity * cartItem.price,
    0,
  )

export function addItemToCart(cartItems, cartItemToAdd) {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}
