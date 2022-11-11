import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles';
import usePaymentHook from './usePaymentHook';


const getText = (gateway?: string) => {
  if (gateway === 'eps') {
    return ' EPS';
  } else if (gateway === 'giropay') {
    return ' GiroPay'
  } else if (gateway === 'paypal') {
    return ' PayPal'
  } else if (gateway === 'klarna') {
    return ' Klarna'
  }
   else return null;
};

const CustomPayButton = ({ amount, gateway }) => {
  const { giroPay, googlePay, epsPay, klarnaPay } = usePaymentHook();

  // let disc:
  const openPaymentLink = {
    'giropay': () => giroPay({ amount }),
    'googlepay': () => googlePay({ amount }),
    'eps': () => epsPay({ amount }),
    'klarna': () => klarnaPay({amount})
  };

  return (
    <Pressable
      style={styles.buttonView}
      onPress={() => gateway && openPaymentLink[gateway]()}
    >
      <Text style={styles.buttonText}>{`Pay With`}</Text>
      <Text style={styles.buttonText}>{getText(gateway)}</Text>
    </Pressable>
  );
};

export default CustomPayButton;
