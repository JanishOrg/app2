import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert, ScrollView } from 'react-native'; 
const cabregisterlogo = require('../../Images/drivecab.png');
import { useUser } from '../static_component/usercontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setusername] = useState('');
  const { updateUser } = useUser();

  const navigateTosignup = () => {
    navigation.navigate('DriverRegistration');
  };
  const navigateToLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Information', 'Please enter both mobile number and password.');
      return;
    }

    const loginData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { user_id } = responseData.main;
        console.log("User ID:",user_id);
        // Store user_id in AsyncStorage
        await AsyncStorage.setItem('driver', user_id.toString());
        setIsModalVisible(true);
        updateUser({ username: username });
      } else {
        const json = await response.json();
        console.log('Login failed response:', json);
        Alert.alert('Login Failed', json.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Login request error:', error);
    }
  };


  return (
    <ScrollView>
    <View style={styles.centeredContainer}>
      <View style={styles.headercontainer}>
        <TouchableOpacity style={styles.header}>
          <Image
            source={cabregisterlogo}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <View style={styles.Headertextdiv}>
          <Text style={styles.titleText}>DriverGo App</Text>
          <Text style={styles.subtitleText}>Find your way easily with DriverGo.</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor='#A9A9A9'
          value={username}
          onChangeText={setusername}
          style={styles.input}
        />
        <Text style={styles.heading}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          placeholderTextColor='#A9A9A9'
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.forgotPassword}>Forget Password?</Text>
        <Text style={styles.haveaccount} onPress={navigateTosignup}>Dont have account Signup!</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Welcome! to Driveme {'\n'} {'\n'}Your journey to effortless travel begins here.</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsModalVisible(!isModalVisible);
                navigation.navigate('Home'); // Navigate after closing the modal
              }}>
              <Text style={{ color: 'white' }}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headercontainer: {
    backgroundColor: '#357EC7',
    paddingBottom: 50
  },
  Headertextdiv: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -40, // Adjust to your screen
    color: 'black',
  },
  subtitleText: {
    fontSize: 16,
    color: 'white',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  centeredContainer: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: '40%',
    resizeMode: 'contain',
  },
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 50
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 16, // Adjusted from '12px' to a numeric value
  },
  heading: {
    color: 'black',
    marginBottom: 5,
  },
  haveaccount: {
    textAlign: 'right',
    color: '#6495ED',
    fontSize: 14, // Adjusted from '10px' to a numeric value
    marginBottom: 15,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'black',
    fontSize: 14, // Adjusted from '10px' to a numeric value
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6A0DAD',
    borderRadius: 20,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E6E6FA",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
  },
});

export default Login;
