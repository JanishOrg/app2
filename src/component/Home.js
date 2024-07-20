import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, ScrollView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Footer from './Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const dropdownIcon = require('../../assets/icons/dopdown.png');
const cabperson1 = require('../../Images/cabperson.jpg'); // Ensure these images are available in your project
const cabperson2 = require('../../Images/cabperson1.jpg');
const cabperson3 = require('../../Images/cabperson2.jpg');
const tickmark = require('../../Images/cabperson2.jpg');
import { API_URL } from '@env';
import { useColorScheme } from 'react-native';

const Home = ({ navigation }) => {
  const [users, setusers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const GOOGLE_API_KEY = 'AIzaSyBJvvPvzCPEAaTa2abV448G_aYJPgDz0-c';
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('driver');
        const response = await fetch(`${API_URL}/api/get-nearby-user/${value}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setusers(data); // Assuming the data is an array of drivers
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Set up interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);

  }, []);

  const handleSelectUser = (user) => {
    Alert.alert(
      'Confirm Booking',
      `Are you sure you want to choose ${user.location.full_name} for booking?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => confirmBooking(user) }
      ]
    );
  };

  const confirmBooking = async (user) => {
    try {
      // Run your endpoint here to confirm the booking
      console.log('Booking confirmed for:', user.location.full_name);
      const id = user.location.user_id;
      const driver = await AsyncStorage.getItem('driver');

      // Prepare the data payload
      const data = {
        driver_id: driver, // Assuming the driver_id is constant
        status: 2 // Assuming status 2 indicates the booking is accepted
      };

      // Make the POST request to update the driver's status
      const response = await fetch(`${API_URL}/api/accpet-from-driver/` + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming you don't need to update the users data after confirming booking
      console.log('Booking confirmed successfully');
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectUser(item)}>
      <View style={styles.item}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Pick Up - {item.location.username}</Text>
          <Text style={styles.location}>Pickup Location: {item.location.pickup_address}</Text>
          <Text style={styles.location}>Drop Location: {item.location.destination_address}</Text>
          <Text style={styles.location}>Pickup Time: {item.location.pickup_time}</Text>
          <Text style={styles.location}>People Count: {item.location.people_count}</Text>
          <Text style={styles.location}>Phone Number: {item.location.phone_number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drop users on their destination with us!</Text>
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder='Enter your location'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            textInputProps={{ placeholderTextColor: 'black'}}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
            styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
            }}
          />
        </View>
      </View>
  
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentContainer}
      >
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Users requested for drive
          </Text>
          <View style={styles.driversList}>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item.location.user_id.toString()}
              ListEmptyComponent={<Text style={styles.noResult}>No Requests found.</Text>}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
  
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 40,
    backgroundColor: '#357EC7',
    // Removed the height percentage to avoid shrinking
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: 'black',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    maxHeight: 150,
  },
  dropdownText: {
    padding: 10,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1, // This ensures that the content uses the available space
  },
  listContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  driversList: {
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
  },
  listTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: '#000',
    marginTop: 35,
    marginBottom: 45,
  },
  item: {
    flexDirection: 'row',
    padding: 10, // Adjust padding if necessary
    marginVertical: 5, // Adjust margin if necessary
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  noResult: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
  textInputContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
});

export default Home;
