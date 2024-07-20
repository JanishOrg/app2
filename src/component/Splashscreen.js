import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
const drivemelogo = require('../../Images/frontlogo.png');

const Splashscreen = ({navigation}) => {
  console.log("yesss"); // Correct placement for console.log

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('Welcomepage');
    }, 4000);
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={drivemelogo} style={styles.image} resizeMode="contain"/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#357EC7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {  
    width: 250, // Set a specific width for the logo
    height: 250, // Set a specific height for the logo
    resizeMode: 'contain', // This ensures the logo scales within the given width and height without distortion
  },
});


export default Splashscreen;