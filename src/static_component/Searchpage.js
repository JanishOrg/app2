import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView } from 'react-native';
import Footer from '../component/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useColorScheme } from 'react-native';

const Searchdriver = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activerides, setActiverides] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('driver');
        const response = await fetch(`${API_URL}/api/get-driver-rides/${value}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setActiverides(data); // Assuming the data is an array of rides
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

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredRides = activerides.filter((ride) => {
    const searchText = searchQuery.trim().toLowerCase();
    return (
      ride.destination_address.toLowerCase().includes(searchText) ||
      ride.pickup_address.toLowerCase().includes(searchText)
    );
  });

  const openModal = (ride) => {
    setSelectedRide(ride);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEndRide = async (rideId) => {
    try {
      // Send a request to your API to mark the ride as ended
      const response = await fetch(`${API_URL}/api/end-ride/${rideId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to end ride');
      }
    } catch (error) {
      console.error('Error ending ride:', error);
      // Handle error appropriately, such as displaying an error message to the user
    }
  };

  const renderRideItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={[styles.name]}>User Name:{item.username}</Text>
        <Text style={[styles.location]}>Phone Number: {item.phone_number}</Text>
        <Text style={[styles.address]} numberOfLines={2}>Pickup Address: {item.pickup_address}</Text>
        <Text style={[styles.address]} numberOfLines={2}>Destination Address: {item.destination_address}</Text>
        <Text style={[styles.additionalInfo]}>People Count: {item.people_count}</Text>
        <Text style={[styles.additionalInfo]}>Pickup Time: {item.pickup_time}</Text>
      </View>
    </TouchableOpacity>
  );

  const RideDetailsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        {selectedRide && (
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.nextButton}>Close</Text>
            </TouchableOpacity>
            <View style={styles.modalInfoContainer}>
              {/* Display all ride details here */}
              <Text style={[styles.modalInfo]}>Name: {selectedRide.username}</Text>
              <Text style={[styles.modalInfo]}>Phone Number: {selectedRide.phone_number}</Text>
              <Text style={[styles.modalInfo]}>Pickup Address: {selectedRide.pickup_address}</Text>
              <Text style={[styles.modalInfo]}>Destination Address: {selectedRide.destination_address}</Text>
              <Text style={[styles.modalInfo]}>People Count: {selectedRide.people_count}</Text>
              <Text style={[styles.modalInfo]}>Pickup Time: {selectedRide.pickup_time}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEndRide(selectedRide.id)} style={styles.endRideButton}>
              <Text style={styles.nextButton}>End Ride</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={[styles.searchBar]}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search Rides"
          placeholderTextColor="black"
          clearButtonMode="always"
        />
      </View>
        <FlatList
          data={filteredRides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noResult}>No rides found.</Text>}
        />
      <RideDetailsModal />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#357EC7', // Header background color
    padding: 30,// Padding at the bottom of the header
  },
  searchBar: {
    padding: 10,
    margin: 10,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: 100,
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white', // Item background
    borderWidth: 1,
    borderColor: 'black', // Border color for each item
    borderRadius: 10, // Rounded corners for the item cards
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black', // Border color for images
  },
  infoContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: 'black', // Name text color
  },
  location: {
    fontSize: 14,
    color: 'grey', // Location text color
  },
  noResult: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'black', // No results text color
  },
  additionalInfo: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  nextButton: {
    backgroundColor: '#9b59b6',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
},
});


export default Searchdriver;
