import { useDispatch, useSelector } from 'react-redux';

import {
  addItemToCartAsync, removeItemFromCartAsync, clearItemFromCartAsync,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';
import { selectCurrentUser } from '../../store/user/user.selector';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const clearItemHandler = () =>
    dispatch(clearItemFromCartAsync(currentUser, cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCartAsync(currentUser, cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCartAsync(currentUser, cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
