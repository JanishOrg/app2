import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Footer from './Footer';
const profilephoto = require('../../Images/cabperson.jpg');
const homeIcon = require('../../assets/icons/back.png');
const profileIcon = require('../../assets/icons/profile.png');
const phoneIcon = require('../../assets/icons/phone.png');
const cancleIcon = require('../../assets/icons/cancle.png');
import { useNavigation } from '@react-navigation/native';


const DriverDetailsScreen = () => {
  // Placeholder function for navigation or actions
  const handleActionPress = (action) => {
    console.log(`Performing action: ${action}`);
    // Here you would typically handle the navigation or any other action
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Home')}>
          <Image source={homeIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Details</Text>
      </View>
      <Image
        source={profilephoto}
        style={styles.driverImage}
      />
      <View style={styles.floatingContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Driver Name</Text>
          <Text style={styles.infoContent}>12 May</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Estimated</Text>
          <Text style={styles.infoContent}>21:30</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('view_profile')}>
        <Text style={styles.actionText}>View Driver Profile</Text>
        <Image source={profileIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('contact_driver')}>
        <Text style={styles.actionText}>Contact Driver</Text>
        <Image source={phoneIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('cancel')}>
        <Text style={styles.actionText}>Cancel</Text>
        <Image source={cancleIcon} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bookingpage')}>
          <Text style={styles.buttonText}>Book Me</Text>
        </TouchableOpacity>
      </View>
      {/* Add navigation footer here if needed */}
      
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginBottom: 80, // Adjust this value based on the height of your fixed footer and button
  },
  scrollViewContent: {
    paddingBottom: 20, // This will ensure there's some padding at the bottom inside the ScrollView
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  driverImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'contain',
    backgroundColor: '#e0e0e0', // A placeholder color
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#9D00FF',
  },
  floatingContainer: {
    marginVertical: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBox: {
    flex: 1, // Each infoBox will take up equal space within the container
    alignItems: 'center', // Center items within each infoBox
    // If you want borders or more separation, add them here
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContent: {
    fontSize: 14,
    color: '#666',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionText: {
    fontSize: 14,
    color: 'black'
  },
  buttonContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: '#fff', // You can change this as per your theme
  },
  button: {
    backgroundColor: '#9D00FF', // Or any color that suits your app's theme
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Optional: for stylistic choice
  },
});

export default DriverDetailsScreen;
