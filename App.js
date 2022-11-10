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
  StyleSheet, useColorScheme
} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import PrePaidWalletPopUp from './PrePaidWalletPopUp';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StripeProvider
    publishableKey='pk_test_51KiaDaLxWLkd15GeXoTmIqL0EE00ACj275tHjkArAUZLGaCTnYiu3L8RN3rFaQHeJOcbDEbOpdBFjNioBo9aMSNe00XMJrZGOs'
    urlScheme="stripeDemo://openApp" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.demo" // required for Apple Pay
   >
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
       <PrePaidWalletPopUp />
    </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
