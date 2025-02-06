import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { TOrder } from '../../../types/order.type';
import { loadStripe } from '@stripe/stripe-js';

type TPaymentModalProps = {
  paymentInfo: TOrder;
  refetch: () => void;
};

const stripePromise = loadStripe(import.meta.env.VITE_APP_Payment_Gateway_PK);

const PaymentModal = ({ paymentInfo, refetch }: TPaymentModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = paymentInfo.totalPrice as number;
  const orderId = paymentInfo._id as string;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} color="primary" variant="outlined">
        Pay
      </Button>
      <Modal
        title={`Total Payment $${price}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={price}
            orderId={orderId}
            refetch={refetch}
            setIsModalOpen={setIsModalOpen}
          />
        </Elements>
      </Modal>
    </>
  );
};

export default PaymentModal;
