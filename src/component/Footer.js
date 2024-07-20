import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import images
const homeIcon = require('../../assets/icons/home.png');
const searchIcon = require('../../assets/icons/search.png');
const bellIcon = require('../../assets/icons/bell.png');
const profileIcon = require('../../assets/icons/profile.png');

const Footer = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const isActive = (routeName) => {
        return route.name === routeName;
    };

    const iconStyle = (routeName) => {
        return {
            ...styles.icon,
            tintColor: isActive(routeName) ? '#8A2BE2' : '#B8B8B8', // Active color or inactive color
        };
    };

 return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Home')}>
          <Image source={homeIcon} style={iconStyle('Home')} />
          <Text style={isActive('Home') ? styles.activeText : styles.inactiveText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Searchdriver')}>
          <Image source={searchIcon} style={iconStyle('Searchdriver')} />
          <Text style={isActive('Searchdriver') ? styles.activeText : styles.inactiveText}>Active Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('NotificationsPage')}>
          <Image source={bellIcon} style={iconStyle('NotificationsPage')} />
          <Text style={isActive('NotificationsPage') ? styles.activeText : styles.inactiveText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Profile')}>
          <Image source={profileIcon} style={iconStyle('Profile')} />
          <Text style={isActive('Profile') ? styles.activeText : styles.inactiveText}>Profile</Text>
        </TouchableOpacity>
      </View>  
    </SafeAreaView>
 );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginBottom: 3, // space between icon and text
 },
 activeText: {
    fontSize: 12,
    color: '#8A2BE2', // active color
    fontWeight: '600',
 },
 inactiveText: {
    fontSize: 12,
    color: '#B8B8B8', // inactive color
 },
 safeArea: {
  flex:1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFF',
      borderTopWidth: 1,
      borderTopColor: '#E7E7E7',
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 60,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
   },
 iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
 },
 icon: {
    width: 24,
    height: 24
 }
});

export default Footer;