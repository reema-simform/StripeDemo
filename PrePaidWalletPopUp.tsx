
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View, Platform } from 'react-native';
import CustomPayButton from './CustomPayButton';
import { ApplePayButton, useApplePay } from '@stripe/stripe-react-native';
import styles from './styles';
import usePaymentHook from './usePaymentHook';

const topUp = [5, 10, 25, 50, 100, 150, 200, 400, 800];

const PrePaidWalletPopUp = ({ openShippingModal }) => {
  const [selected, setSelected] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const { fetchURLForPayPal, paypal } = usePaymentHook();
  const { isApplePaySupported } = useApplePay();
  const { applePay } = usePaymentHook()

  const renderApplePayButton = () => {
    return <ApplePayButton onPress={applePay(topUp[selected])}
     type="plain"
    buttonStyle="black"
    borderRadius={4}
    style={{
      width: '100%',
      height: 50,
    }}/>;
  };

  const GooglePayButton = () => {
    return <CustomGooglePayButton amount={topUp[selected]} openShippingModal={openShippingModal} />;
  };

  const GiroPayButton = () => {
    return (
      <CustomPayButton 
        amount={topUp[selected]}
        gateway={'giropay'}
      />
    );
  };
  const EPSButton = () => {
    return (
      <CustomPayButton
        amount={topUp[selected]}
        gateway={'eps'}
      />
    );
  };

  const AllPaymentButton = () => {
    return (
      <View style = {styles.buttonContainer}>
        {Platform.OS === 'ios' ? isApplePaySupported? renderApplePayButton() : alert('Apple pay not supported') : GooglePayButton()}
        {/* {GiroPayButton()} */}
        {/* {EPSButton()} */}
      </View>
    );
  };

  return (
    <View style={styles.prePaidContainerStyle}>
      <FlatList
        data={topUp}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              style={[styles.itemView, selected === index && styles.itemSelected]}
              onPress={() => setSelected(index)}
            >
              <Text
                style={[styles.itemText, selected === index && styles.selectedText]}
              >{`${item} €`}</Text>
            </Pressable>
          );
        }}
      />
      {AllPaymentButton()}
    </View>
  );
};

export default PrePaidWalletPopUp;
