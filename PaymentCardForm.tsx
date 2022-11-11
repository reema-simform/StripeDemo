import { CardField } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import styles from './styles';
import { View, Text } from 'react-native'
import CustomPayButton from './CustomPayButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import usePaymentHook from './usePaymentHook';

const PaymentCardForm = () => {
  const [isFocus, setOnFocus] = useState(false);
  const cardInputStyle = { ...styles.cardStyle, ...styles.selectedCardStyle };
  const cardStyle = { ...styles.cardStyle };
  const { addCardToWallet } = usePaymentHook()
  return (
  <View style={{ backgroundColor: 'white' }}>
     <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderColor: '#d3d3d3',
          borderWidth: 1
        }}
        style={{
          height: 50,
          marginVertical: 30,
          marginHorizontal: 5
        }}
        onCardChange={(cardDetails) => {
          // console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          // console.log('focusField', focusedField);
        }}
      />
    <Pressable onPress={() => addCardToWallet()} style={[styles.buttonView, { alignSelf: 'center'}]}>
      <Text style={styles.buttonText}>Add Card to Wallet</Text>
    </Pressable>
  </View>
  );
};

export default PaymentCardForm;
