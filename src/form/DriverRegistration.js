import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const cabregisterlogo = require('../../Images/drivecab.png');
import { API_URL } from '@env';
import DatePicker from 'react-native-date-picker';

const RadioOption = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
      <View style={selected ? styles.radioSelected : styles.radio} />
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const DriverRegistration = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adhaarId, setAadhar] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [eligible, setEligible] = useState(false);
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);


  const handleSignUp = async () => {

    const driverData = {
      username,
      full_name: fullName,
      address,
      email,
      phone_number: Phonenumber,
      password,
      adhaarId,
      birthdate,
      eligible,
      available,
      user_type: "driver",
    };

    if (!username || !fullName || !address || !Phonenumber || !email || !password || !adhaarId || !birthdate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phonenumber)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Password validation (e.g., minimum length)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/driver/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });

      if (!response.ok) {
        const errorBody = await response.text(); // or response.json() if the server sends JSON
        console.log('Error response body:', errorBody);
        throw new Error('Server responded with an error!');
      }

      const json = await response.json();
      Alert.alert("Success", "Your registration is successful");
      console.log("registration succesfull");
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert("Error Message", error.message);
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          placeholderTextColor='black'
          onChangeText={setusername}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          placeholderTextColor='black'
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor='black'
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={Phonenumber}
          placeholderTextColor='black'
          onChangeText={setPhonenumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor='black'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor='black'
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Adhaar Id"
          value={adhaarId}
          placeholderTextColor='black'
          onChangeText={setAadhar}
        />
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Birthdate</Text>
          <DatePicker
            mode="date"
            open={open}
            date={birthdate}
            onConfirm={(selectedDate) => {
              setOpen(false);
              setBirthdate(selectedDate);
            }}
            onCancel={() => setOpen(false)}
            placeholderTextColor='black'
            theme='auto'
          />
        </View>
        <View style={styles.radioGroup}>
          <Text style={{ color: 'black' }}>Are you legally eligible to drive in your country?</Text>
          <RadioOption label="Yes" selected={eligible} onSelect={() => setEligible(true)} />
          <RadioOption label="No" selected={!eligible} onSelect={() => setEligible(false)} />
        </View>

        {/* Custom Radio Buttons for Availability */}
        <View style={styles.radioGroup}>
          <Text style={{ color: 'black' }}>Are you able to provide driving services on 2 days a week?</Text>
          <RadioOption label="Yes" selected={available} onSelect={() => setAvailable(true)} />
          <RadioOption label="No" selected={!available} onSelect={() => setAvailable(false)} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  scrollViewContent: {
    flexGrow: 1, // Allows the content to expand to fill the space
    paddingBottom: 90, // Keeps a padding at the bottom
  },
  container: {
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
    color: 'black'
  },
  button: {
    height: 40,
    backgroundColor: '#6C63FF', // Use your color
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center', // This centers the button horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#6C63FF',
  }, radioText: {
    color: 'black',
  },
  radioGroup: {
    marginVertical: 10,
  },
  // Add a style for the file upload button if needed, otherwise reuse 'button'
  fileUploadButton: {
    // ... You can customize this style as needed
    height: 40,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  label: {
    color:'black',
  }
});

export default DriverRegistration;
