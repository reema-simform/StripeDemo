
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import CustomPayButton from './CustomPayButton';

import styles from './styles';
import usePaymentHook from './usePaymentHook';

const topUp = [5, 10, 25, 50, 100, 150, 200, 400, 800];

const PrePaidWalletPopUp = ({ openShippingModal }) => {
  const [selected, setSelected] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const { fetchURLForPayPal, paypal } = usePaymentHook();
  const openPayPal = async (amount: number) => {
    const url = await fetchURLForPayPal({ amount });
    setPaymentUrl(url);
    setModalVisible(true);
  };

  const ApplePayButton = () => {
    return <CustomApplePayButton amount={topUp[selected]} openShippingModal={openShippingModal} />;
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
  const PaypalButton = () => {
    const amount = topUp[selected];
    return (
      <CustomPayButton
        amount={topUp[selected]}
        gateway={'paypal'}
      />
    );
  };

  const AllPaymentButton = () => {
    return (
      <View style = {styles.buttonContainer}>
        {/* {ApplePayButton()}
        {GooglePayButton()} */}
        {GiroPayButton()}
        {EPSButton()}
        {PaypalButton()}
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
