import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../static_component/usercontext';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const homeIcon = require('../../assets/icons/back.png');
const cabperson2 = require('../../Images/cabperson1.jpg');

const Profile = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = useState(null);
    const [image, setImage] = useState(null);
    const [editable, setEditable] = useState(false);

    const [userData, setUserData] = useState({
        id: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
        profileImage: '',
    });

    const selectProfilePicture = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                // Accessing the first image's URI from the assets array
                const source = { uri: response.assets[0].uri };
                setProfilePic(source);
            }
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const driverId = await AsyncStorage.getItem('driver');
                if (!driverId) {
                    console.log('No Driver Id available');
                    return;
                }
                const response = await fetch(API_URL + `/api/driver/${driverId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Profile data fetch failed');
                }

                const data = await response.json();
                if (data) {
                    setUserData({
                        id: data.id,
                        fullName: data.full_name,
                        address: data.address,
                        phoneNumber: data.phone_number,
                        email: data.email,
                        profileImage: data.profile_image,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user.phoneNumber]);

    const updateProfileImage = async () => {
        const driverId = await AsyncStorage.getItem('driver');
        if (!profilePic) {
            alert("Please select an image first.");
            return;
        }
        const formData = new FormData();
        formData.append('image', {
            uri: profilePic.uri,
            type: profilePic.type || 'image/jpeg', // The MIME type of the image, with a fallback default
            name: profilePic.fileName || `profilepic-${Date.now()}.jpg`,
        });
        formData.append('userID', userData.id);
        try {
            const response = await fetch(`${API_URL}/api/user/${driverId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: userData.fullName,
                    email: userData.email,
                    phone_number: userData.phoneNumber,
                    address: userData.address,
                    profile_image: userData.profileImage,
                }),
            });
            console.log("formdata", formData)
            if (response.ok) {
                console.log("Image updated successfully");
            } else {
                console.log("Failed to update image");
                // Handle error response
            }
        } catch (error) {
            console.error("Error while updating image: ", error);
        }
    };

    const toggleEdit = () => {
        setEditable(!editable);
    };

    const handleInputChange = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headcont}>
                    <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Home')}>
                        <Image source={homeIcon} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>
                <View style={styles.header}>
                </View>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={selectProfilePicture}>
                        <Image
                            source={
                                userData.profileImage
                                    ? { uri: `http://localhost:5000/images/${userData.profileImage}` }
                                    : cabperson2
                            }
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnimgset} onPress={updateProfileImage}>
                        <Text value={userData.id} style={{ color: 'black', textAlign: 'center', margin: 10 }}>Update Profile</Text>
                    </TouchableOpacity>

                    <View style={styles.infoContainer}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Username :</Text>
                        <TextInput
                            placeholder="Full name"
                            value={userData.fullName}
                            editable={editable}
                            onChangeText={(text) => handleInputChange('fullName', text)}
                            style={styles.input}
                            placeholderTextColor='#808080'
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Address :</Text>
                        <TextInput
                            placeholder="Address"
                            value={userData.address}
                            editable={editable}
                            onChangeText={(text) => handleInputChange('address', text)}
                            style={styles.input}
                            placeholderTextColor='#808080'
                        />
                    </View>
                    <View style={styles.infoContainer} key={userData.phoneNumber}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Phone-Number :</Text>
                        <TextInput
                            placeholder="PhoneNumber"
                            value={userData.phoneNumber}
                            editable={editable}
                            onChangeText={(text) => handleInputChange('phoneNumber', text)}
                            style={styles.input}
                            placeholderTextColor='#808080'
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Email :</Text>
                        <TextInput
                            placeholder="Gmail Account"
                            value={userData.email}
                            editable={editable}
                            onChangeText={(text) => handleInputChange('email', text)}
                            style={styles.input}
                            placeholderTextColor='#808080'
                        />
                    </View>
                    {!editable && (
                        <TouchableOpacity style={styles.button} onPress={toggleEdit}>
                            <Text style={styles.buttonText}>Edit profile</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <Footer style={styles.footer} />
        </View>
    );
};

const styles = StyleSheet.create({
    btnimgset: {
        backgroundColor: 'green',
        borderRadius: 20,
        margin: 10
    },
    headcont: {
        backgroundColor: '#357EC7', // This sets the background color for the header containing the icon and title
        flexDirection: 'row', // Ensures the items are in a row
        alignItems: 'center', // Centers items vertically
        justifyContent: 'flex-start', // Aligns items to the start of the row
        paddingHorizontal: 10, // Add horizontal padding if needed
        paddingTop: 30, // Adjust the top padding to fit your design
    },
    headerTitle: {
        position: 'relative',
        color: '#FFF',
        fontSize: 24,
        marginLeft: 30,
        marginTop: 0,
        fontWeight: 'bold'
    },
    input: {
        marginLeft: 10,
        flex: 1, // Take up all available space
        padding: 0, // Depending on your design you might want to adjust this
        fontSize: 16, // Set the font size as needed
        color: 'black'
    },
    icon: {
        width: 24,
        height: 24
    },

    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#357EC7',
        paddingTop: 160, // Adjust this value as needed to position the header content from the top of the screen
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center', // This will vertically align the icon and the title
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50, // Adjust as needed to position the profile image over the header
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 70,
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor: 'white'

    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: 10,
        width: '90%', // Adjust as needed
    },
    infoText: {
        color: 'black',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 60,
        marginBottom: 60
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default Profile;
