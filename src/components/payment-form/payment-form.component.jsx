import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const cartTotal = useSelector(selectCartTotal);
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e) => {
    setIsProcessingPayment(true);
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then(res => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.name : 'guest',
        },
      },
    });

    if (paymentResult.error) {
      alert(JSON.stringify(paymentResult.error));
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
      }
    }
    setIsProcessingPayment(false);
  };

  return (
    <div className='w-100'>
      <Form onSubmit={paymentHandler}>
        <Row className='mb-3'>
          <label htmlFor='card-element'>Credit or debit card</label>
        </Row>
        <Row className='mb-3'>
          <CardElement />
        </Row>
        <Row className='d-flex justify-content-end'>
          <Button size='sm' styles={{ width: '100px'}} type='submit' disabled={isProcessingPayment}
                  variant='outline-primary'>{isProcessingPayment ? 'Loading…' : 'Pay Now'}</Button>
        </Row>
      </Form>
    </div>
  );
};

export default PaymentForm;