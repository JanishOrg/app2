// PaymentSection.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const phonepeLogo = require('../../assets/icons/phonepe.png');
const googlepayLogo = require('../../assets/icons/googlepe.png');
const creditcardIcon = require('../../assets/icons/creditcard.png');
const cashIcon = require('../../assets/icons/cash.png');

const PaymentOption = ({ icon, text }) => (
  <View style={styles.paymentOption}>
    <Image source={icon} style={styles.paymentIcon} />
    <Text style={styles.paymentText}>{text}</Text>
  </View>
);

const PaymentSection = () => {
  return (
    <View style={styles.paymentSection}>
      <Text style={styles.paymentTitle}>Payment Methods</Text>
      <View style={styles.paymentOptionsContainer}>
        <PaymentOption icon={creditcardIcon} text="Credit Card" />
        <PaymentOption icon={cashIcon} text="Cash" />
        <PaymentOption icon={phonepeLogo} text="PhonePe" />
        <PaymentOption icon={googlepayLogo} text="Google Pay" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff', 
    marginTop:20// Use the background color as per your theme
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333', // You can adjust the color to match your theme
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This will space your payment options evenly
    backgroundColor: '#f6f6f6', // Background color for the options container
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop:20
  },
  paymentOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  paymentText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  // ... Add other styles that you have in your component
});

export default PaymentSection;
