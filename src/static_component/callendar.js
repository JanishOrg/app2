import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import PropTypes from 'prop-types';

const Callender = ({ selectedDate, onDateChange }) => {
  const [selected, setSelected] = useState(selectedDate);

  // Update internal state when selectedDate prop changes
  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  const today = moment().format('YYYY-MM-DD');

  const onDaySelect = (day) => {
    if (!day.dateString) {
      Alert.alert("Let's Drive", 'You cannot select an empty date.');
    } else {
      console.log('selected day', day);
      setSelected(day.dateString); // Update internal state
      onDateChange(day.dateString); // Pass new date back to parent component
    }
  };



    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                initialDate={selectedDate || today}
                onDayPress={onDaySelect}
                minDate={today}
                maxDate="2025-01-30"
                disableAllTouchEventsForDisabledDays={true}
                theme={{
                    backgroundColor: '#9D00FF',
                    calendarBackground: '#9D00FF',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                }}
                style={{ borderRadius: 3 }}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: '#00adf5',
                        selectedTextColor: 'white'
                    }
                }}
            // ... other props
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
});

export default Callender;
