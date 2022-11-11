/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, useColorScheme, Text
} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import PrePaidWalletPopUp from './PrePaidWalletPopUp';
import PaymentCardForm from './PaymentCardForm';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

  return (
    <StripeProvider
    publishableKey='pk_test_51KiaDaLxWLkd15GeXoTmIqL0EE00ACj275tHjkArAUZLGaCTnYiu3L8RN3rFaQHeJOcbDEbOpdBFjNioBo9aMSNe00XMJrZGOs'
    urlScheme="stripeDemo://openApp" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.demo" // required for Apple Pay
   >
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
       <PrePaidWalletPopUp />
       <Text style={styles.title}>Add Card - Set up intent</Text>
       <PaymentCardForm />
    </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#d3d3d3',
    width: '100%',
    textAlign: 'center'
  }
});

export default App;
