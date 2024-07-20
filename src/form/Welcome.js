import React ,{ useEffect,useState }from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
const drivemelogo = require('../../Images/registerpagelogo.png');

const TypewriterText = ({ text, typingSpeed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let intervalId;

    const type = () => {
      // Current index based on the displayed text length
      const index = isDeleting ? displayedText.length - 1 : displayedText.length;

      // Update the displayed text based on whether we're typing or deleting
      setDisplayedText(text.substring(0, index + (isDeleting ? -1 : 1)));

      // If we've reached the end of the text, start deleting, and vice versa
      if (!isDeleting && displayedText === text) {
        // Pause at the end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
      }
    };

    intervalId = setInterval(type, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed, displayedText, isDeleting]);

  return <Text style={styles.subtitleText}>{displayedText}</Text>;
};


const Welcomepage = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login'); 
  };
  const navigateTosignup = () => {
    navigation.navigate('DriverRegistration');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Driver-Connect App</Text>
      <TypewriterText 
        text="Find your way easily with Driver Connect." 
        typingSpeed={100} 
      />
      <Image
        source={drivemelogo}
        style={styles.mapImage}
      />
       <TouchableOpacity style={styles.button} onPress={navigateTosignup}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.loginButton}  onPress={navigateToLogin}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60, // Adjust to your screen
    color:'black'
  },
  subtitleText: {
    fontSize: 16,
    color: 'gray',
  },
  mapImage: {
    width: '100%', // Adjust width as needed
    resizeMode: 'contain', // Keep the image aspect ratio
  },
  button: {
    width: '70%',
    backgroundColor: '#007AFF', // Use your app's theme color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure text is centered within the button
  },
  loginContainer: {
    flexDirection: 'row',
    marginBottom: 30, // Adjust to your screen
  },
  loginText: {
    fontSize: 16,
    color: 'gray',
  },
  loginButton: {
    fontSize: 16,
    color: '#007AFF', // Use your app's theme color
    fontWeight: 'bold',
  },
});

export default Welcomepage;
