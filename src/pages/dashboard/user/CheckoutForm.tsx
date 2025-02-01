import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useCreatePaymentIntentMutation,
  useProcessPaymentMutation,
} from '../../../redux/features/payment/paymentApi';
import '../../../styles/CheckoutForm.css';

type TCheckoutFormProps = {
  price: number;
  orderId: string;
  refetch: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckoutForm = ({
  price,
  orderId,
  refetch,
  setIsModalOpen,
}: TCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [processPayment, { isLoading: isProcessing }] =
    useProcessPaymentMutation();

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (price) {
      createPaymentIntent(price)
        .unwrap()
        .then((res) => {
          if (res?.clientSecret) {
            setClientSecret(res.clientSecret);
          } else {
            toast.error('Failed to get client secret!');
          }
        })
        .catch(() => toast.error('Error fetching client secret'));
    }
  }, [price, createPaymentIntent]);

  const handleSubmit: SubmitHandler<FieldValues> = async (event) => {
    const toastId = toast.loading('Creating...');

    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      toast.error('Stripe is not initialized!', {
        id: toastId,
        duration: 2000,
      });
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('Card element not found!', { id: toastId, duration: 2000 });
      return;
    }

    setClientSecret('');

    // ✅ Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message, { id: toastId, duration: 2000 });
      return;
    }

    // ✅ Confirm Card Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { email: user?.email || 'Unknown' },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message, { id: toastId, duration: 2000 });
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      const paymentData = {
        email: user?.email,
        amount: price,
        transactionId: paymentIntent.id,
        orderId,
      };

      // ✅ Process Payment in Backend
      try {
        const res = await processPayment(paymentData).unwrap();
        console.log(res);
        if (res.data) {
          refetch();
          toast.success(`Transaction Successful! ID: ${paymentIntent.id}`, {
            id: toastId,
            duration: 2000,
          });
          setIsModalOpen(false);
          navigate('/user/payment-history');
        }
      } catch (error) {
        toast.error('Failed to save payment data.', {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="payment-input-field"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button
        className="payment-btn"
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;
