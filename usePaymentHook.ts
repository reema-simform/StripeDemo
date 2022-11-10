import {
  BillingDetails,
  confirmApplePayPayment,
  presentGooglePay,
  useApplePay,
  useConfirmPayment,
  useGooglePay
} from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
const API_URL = ''

const usePaymentHook = () => {
  const { loading, confirmPayment } = useConfirmPayment();
  const { isApplePaySupported, presentApplePay } = useApplePay();
  const { isGooglePaySupported, initGooglePay } = useGooglePay();
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    setPaymentLoading(loading);
  }, [loading]);

  const onSuccess = () => {
      setPaymentLoading(false);
  };

  const showErrorMessage = (message: string, amount: number) => {
    setPaymentLoading(false);
    alert(message)
  };

  const fetchPaymentIntentClientSecret = async ({ amount, gateway }) => {
    const response = await fetch(`${API_URL}/'payments/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'eur',
        gateway: gateway,
      }),
    });
    const { clientSecret, error } = await response.json();
  
    return { clientSecret, error };
  };


  const handleResponse = ({ error, paymentIntent, amount }) => {
    if (error) {
      alert(error?.localizedMessage);
    } else if (paymentIntent) {
      onSuccess('Payment done successfully!');
    }
  };

  const paypal = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'paypal' });
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: user?.username
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'PayPal',
        paymentMethodData: { billingDetails: billingDetails }
      });
      handleResponse({ error, paymentIntent, amount });
    }
  };

  const googlePay = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: Strings.googlePay });
    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false
    });
    if (error) {
      alert(error?.localizedMessage || '', amount);
      return;
    } else {
      alert('Payment Successfull')
    }
  };

  const applePay = async ({ amount }) => {
    if (!isApplePaySupported || paymentLoading) return;
    setPaymentLoading(true);
    const { error } = await presentApplePay({
      cartItems: [{ label: 'topup', amount: amount.toString() }],
      country: 'DE',
      currency: 'EUR'
    });
    if (error) {
      showErrorMessage(error?.message || '', amount);
    } else {
      const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'applepay' });
      if (clientSecret) {
        const { error: confirmError } = await confirmApplePayPayment(
          clientSecret
        );
        if (confirmError) {
          showErrorMessage(confirmError?.localizedMessage || '', amount);
        } else {
          alert('Payment Successfull')
        }
      }
    }
  };

  const initializeGooglePay = async () => {
    // TODO: Test env false
    if (!(await isGooglePaySupported({ testEnv: true }))) {
      alert('Google Pay not supported');
      setIsSupported(false);
      return;
    }
    const { error } = await initGooglePay({
      testEnv: true,
      merchantName: 'GAVEL',
      countryCode: 'DE'
    });
    if (error) {
      alert(error.message);
      return;
    } else {
      setIsSupported(true);
    }
  };

  const giroPay = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'giropay' });
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: user?.username
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Giropay',
        paymentMethodData: { billingDetails: billingDetails }
      });
      if (error) {
        alert(error?.localizedMessage || '', amount);
      } else if (paymentIntent) {
        alert('Payment Successfull')
      }
    }
  };

  const epsPay = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'eps' });
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: user?.username
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Eps',
        paymentMethodData: { billingDetails: billingDetails }
      });
      if (error) {
        alert(error?.localizedMessage || '', amount);
      } else if (paymentIntent) {
        alert('Payment successfull')
      }
    }
  };

  return {
    paymentLoading,
    applePay,
    googlePay,
    initializeGooglePay,
    isSupported,
    giroPay,
    epsPay,
    paypal
  };
};

export default usePaymentHook;
