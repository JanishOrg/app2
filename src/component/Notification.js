import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Footer from './Footer';
import useNotification from '../static_component/NotificationContext.js';

const NotificationsPage = () => {
    const { notifications } = useNotification();

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id.toString()} // ensure that keyExtractor returns a string
                contentContainerStyle={styles.listContainer}
            />
            <Footer/>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Keeping the background color consistent with the booking page
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#357EC7',
        alignItems: 'center', // Align items horizontally in the center
        justifyContent: 'center', // Align items vertically in the center
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center', // Ensure the text itself is centered if it's in a multi-line
    },
    listContainer: {
        paddingBottom: 20, // Add padding at the bottom for scrollable content
    },
    notificationItem: {
        backgroundColor: '#f9f9f9', // Slightly off-white for each notification item
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10, // Rounded corners for the notification items
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notificationText: {
        fontSize: 16,
        color: '#333', // Darker color for text to ensure readability
    },
});

export default NotificationsPage;
