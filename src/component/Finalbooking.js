import React, { useState } from 'react';
import { Alert, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal, } from 'react-native';
import Footer from './Footer';
const Requestsent = require('../../assets/icons/requestdone.png');
import Callender from '../static_component/callendar';
import useNotification  from '../static_component/NotificationContext.js'; // Adjust the import path as necessary

const BookingPage = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [passengerCount, setPassengerCount] = useState(1); // assuming a state for passenger count
    const [isModalVisible, setIsModalVisible] = useState(false);
    const FOOTER_HEIGHT = 50;
    const [confirmationNumber, setConfirmationNumber] = useState(null);
    const { addNotification } = useNotification(); 


    const [selectedDate, setSelectedDate] = useState(); // defaulting to today

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };
    //logic to generate otp
    const generateConfirmationNumber = () => {
        const number = Math.floor(1000 + Math.random() * 9000);
        setConfirmationNumber(number);
    };

    const times = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00"];


    const handleConfirm = () => {
        if (selectedTime === null) {
            Alert.alert("Let's Drive says:", 'Please select a pick-up time before confirming.');
        }
        else {
            const number = Math.floor(1000 + Math.random() * 9000); // Generate the number here
            setConfirmationNumber(number); // Schedule the state update
            console.log("Selected Time:", times[selectedTime]); // This should log the selected time to the console.
            console.log("Your confirmation code is: ", number); // Use the number directly here
            addNotification(`Your booking confirmation number is: ${number}`); // Use the number directly here as well
            setIsModalVisible(true);
        }
    };

    const incrementPassenger = () => {
        setPassengerCount(prevCount => prevCount + 1);
    };

    const decrementPassenger = () => {
        setPassengerCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const handleInputChange = (text) => {
        const count = parseInt(text, 10);
        if (!isNaN(count) && count >= 1) {
            setPassengerCount(count);
        } else {
            setPassengerCount(1); // Reset to 1 if input is not a valid number
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Book a driver</Text>
                </View>

                <View style={styles.passengerContainer}>
                    <Text style={styles.passengerText}>Number of passengers</Text>
                    <View style={styles.passengerInputContainer}>
                        <TextInput
                            style={styles.passengerInput}
                            onChangeText={handleInputChange}
                            value={passengerCount.toString()}
                            keyboardType='numeric'
                        />
                        <View style={styles.arrowsContainer}>
                            <TouchableOpacity onPress={incrementPassenger} style={styles.arrowButton}>
                                <Text style={styles.arrowText}>▲</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={decrementPassenger} style={styles.arrowButton}>
                                <Text style={styles.arrowText}>▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={styles.DatepicktextStyle}>Pick the date</Text>
                <Callender

                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />
                <View style={styles.timePickerContainer}>
                    <Text style={styles.timePickerText}>Pick-up time</Text>
                    <View style={styles.timeOptions}>
                        {times.map((time, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.timeOption,
                                    selectedTime === index && styles.timeOptionSelected,
                                ]}
                                onPress={() => setSelectedTime(index)}
                            >
                                <Text style={styles.timeText}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirm}
                >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.iconWrap}>
                            <Image source={Requestsent} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>
                            Your request has been sent to the driver:
                        </Text>
                        <Text style={styles.modalText}>
                            OTP : {confirmationNumber}
                        </Text>
                        <Text style={styles.modalText}>
                            Date: {selectedDate}
                        </Text>
                        <Text style={styles.modalText}>
                            Time: {times[selectedTime]}
                        </Text>
                        <Text style={styles.modalText}>
                            Passengers: {passengerCount}
                        </Text>
                        <TouchableOpacity
                            style={styles.hideButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    DatepicktextStyle: {
        color: 'black',         // Text color
        fontSize: 24,           // Increase font size
        fontWeight: 'bold',     // Make text bold
        textAlign: 'center',    //
    },
    icon: {
        width: 100,
        height: 100
    },
    header: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 40
    },
    passengerContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    passengerText: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
    },
    passengerInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f5',
        borderRadius: 10,
    },
    passengerInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#000',
    },
    arrowsContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e0e0e0', // Slightly different color to distinguish buttons
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    arrowButton: {
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        fontSize: 16,
        color: '#000',
    },
    passengerInputText: {
        fontSize: 16,
        color: '#000',
    },
    timePickerContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    timePickerText: {
        color: 'black',         // Text color
        fontSize: 24,           // Increase font size
        fontWeight: 'bold',     // Make text bold
        textAlign: 'center',
    },
    timeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeOption: {
        backgroundColor: '#f0f0f5',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginBottom: 10,
    },
    timeOptionSelected: {
        backgroundColor: '#6698FF',
    },
    timeText: {
        fontSize: 16,
        color: '#000',
    },
    confirmButton: {
        backgroundColor: '#9D00FF',
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 20,
    },
    confirmButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
        color: "#000", // Set text color to black
    },
    hideButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default BookingPage;
