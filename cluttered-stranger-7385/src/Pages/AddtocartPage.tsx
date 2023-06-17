import React, { useState } from 'react';
import styled from 'styled-components';
import { Iproduct } from '../constrains/type';

const CartContainer = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  padding: 10px;
  margin-bottom: 10px;
  
  background-color: #f5f5f5;
`;
const EmptyCartImage = styled.img`
  margin-top: 20px;
  width: 450px;
`;
const CartImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
`;

const CartInfo = styled.div`
  flex-grow: 1;
  margin-left: 100px;

`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const EmptyCartMessage = styled.p`
  margin-top: 20px;
  font-style: italic;
  color: #999;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction:colume;
  align-items: center;
`;

const QuantityButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #283593;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const BuyNowButton = styled.button`
width:100%;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #283593;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const CartHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const AddtocartPage = () => {
  const storedCartItems = localStorage.getItem('AddedToCart');
  const [cartItems, setCartItems] = useState<Iproduct[]>(storedCartItems ? JSON.parse(storedCartItems) : []);

  const increaseItem = (itemId: string) => {
    const updatedItems = cartItems.map((item: Iproduct) => {
      if (item.id === itemId && item.quantity !== undefined) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('AddedToCart', JSON.stringify(updatedItems));
  };

  const decreaseItem = (itemId: string) => {
    const updatedItems = cartItems.map((item: Iproduct) => {
      if (item.id === itemId && item.quantity !== undefined && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('AddedToCart', JSON.stringify(updatedItems));
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item: Iproduct) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('AddedToCart', JSON.stringify(updatedItems));
  };

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item: Iproduct) => {
      if (item.quantity !== undefined) {
        total += item.price * item.quantity;
      }
    });
    return total;
  };

  return (
    <CartContainer>
      <CartHeading>Your Cart</CartHeading>
      {cartItems.length === 0 ? (<>
         <EmptyCartImage src="https://img.freepik.com/free-photo/3d-man-with-shopping-cart-blank-screen-tablet_1401-15.jpg?w=740&t=st=1687009634~exp=1687010234~hmac=98f90d2a90af1685f2b497c6001c2561fbcc4324ae9c8d8a578bfc5e9d49b93d" alt="Empty Cart" />
        <EmptyCartMessage>Your cart is empty. Start shopping now!</EmptyCartMessage></>
      ) : (
        <>
          {cartItems.map((item: Iproduct) => (
            <CartItem key={item.id}>
              <CartImage src={item.image} alt={item.title} />
              <CartInfo>
                <h4>{item.title}</h4>
                <h4>{item.description}</h4>
                <h4>Color:{item.color}</h4>
                <p>Price: ${item.price}</p>
              </CartInfo>
              <ButtonGroup>
                <QuantityButton onClick={() => decreaseItem(item.id)}>-</QuantityButton>
                <span>{item.quantity}</span>
                <QuantityButton onClick={() => increaseItem(item.id)}>+</QuantityButton>
                </ButtonGroup>
                <RemoveButton onClick={() => removeItem(item.id)}>Remove</RemoveButton>
              
            </CartItem>
          ))}
          <TotalAmount>Total Amount: ${getTotalAmount()}</TotalAmount>
          <BuyNowButton>Buy Now</BuyNowButton>
        </>
      )}
    </CartContainer>
  );
};

export default AddtocartPage;
