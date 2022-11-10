import {
  BillingDetails,
  confirmApplePayPayment,
  presentGooglePay,
  useApplePay,
  useConfirmPayment,
  useGooglePay
} from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
const API_URL = 'https://glory-fir-sloth.glitch.me'

const usePaymentHook = () => {
  const { loading, confirmPayment } = useConfirmPayment();
  const { isApplePaySupported, presentApplePay } = useApplePay();
  const { isGooglePaySupported, initGooglePay } = useGooglePay();
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    setPaymentLoading(loading);
  }, [loading]);

  const onSuccess = (message: string) => {
      setPaymentLoading(false);
      alert(message)
  };

  const showErrorMessage = (message: string, amount: number) => {
    setPaymentLoading(false);
    alert(message)
  };

  const fetchPaymentIntentClientSecret = async ({ amount, gateway }) => {
    const res =  await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'EUR',
        gateway: gateway,
      }),
    }).then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
     console.log(error)
    });
    console.log(res)
    return res?.client_secret;
  };


  const handleResponse = ({ error, paymentIntent, amount }) => {
    if (error) {
      console.log('error',error)
      alert(error?.localizedMessage);
    } else if (paymentIntent) {
      onSuccess(`Payment of EUR ${amount} is successful! `);
    }
  };

  const paypal = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'paypal' });
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: 'Test'
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
      onSuccess(`Payment of EUR ${amount} is successful! `)
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
          onSuccess(`Payment of EUR ${amount} is successful! `)
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
    console.log('inside giropay',clientSecret)
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: 'Test User'
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Giropay',
        paymentMethodData: { billingDetails: billingDetails }
      });
      if (error) {
        console.log('error', error)
        alert(error?.localizedMessage || '', amount);
      } else if (paymentIntent) {
        onSuccess(`Payment of EUR ${amount} is successful! `)
      }
    }
  };

  const epsPay = async ({ amount }) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret({ amount, gateway: 'eps' });
    if (clientSecret) {
      const billingDetails: BillingDetails = {
        name: 'Test User'
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Eps',
        paymentMethodData: { billingDetails: billingDetails }
      });
      if (error) {
        alert(error?.localizedMessage || '', amount);
      } else if (paymentIntent) {
        onSuccess(`Payment of EUR ${amount} is successful! `)
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
