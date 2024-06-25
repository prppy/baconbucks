import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";
import axios from 'axios';

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    console.log(navigation);
    const screenWidth = Dimensions.get('window').width
    const handleNewReminder = (day) => {
      navigation.navigate("NewReminder");
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({}); // State to mark selected date on calendar

    // Function to handle selection of a date on the calendar
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setMarkedDates({ [day.dateString]: { selected: true, selectedColor: colors.darkPink } }); // Mark selected date on calendar
        fetchReminders(day.dateString); // Fetch reminders for the selected date
    };

    const [reminders, setReminders] = useState([]);
    useEffect(() => {
        if (selectedDate) {
            fetchReminders(selectedDate);
        }
    }, [selectedDate]);

    const backendUrl = 'http://192.168.1.248';
    const fetchReminders = async (date) => {
        try {
            const response = await axios.get('http://192.168.1.248/api/v1.0/user/reminders/');
            setReminders(response.data.reminders);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar 
                style={{ width: screenWidth }} 
                theme={{
                    calendarBackground: 'white', // Change the background color of the calendar
                    todayTextColor: colors.darkPink, // Change the text color of today's date
                    arrowColor: colors.darkPink, // Change the color of the arrows for navigating months
                }}
                onDayPress={handleDayPress} // Handle date selection
                markedDates={markedDates}
            />
            {selectedDate && (
                    <Text style={styles.selectedDateText}>
                        Selected Date: {selectedDate}
                    </Text>
                )}
            </View>
            <View style={styles.remindersContainer}>
                {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                        <View key={reminder.id} style={styles.reminderItem}>
                            <Text>{reminder.note}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No reminders for selected date</Text>
                )}
            </View>
            

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNewReminder}>
                <Ionicons name="add-circle" size={35} color={colors.darkPink} />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPink,
    },
    calendarContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    newreminder: {
        width: 100,
        height: 35,
        backgroundColor: colors.darkPink,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    icon: {
        backgroundColor: 'transparent', // Set background color to transparent
    },
    remindersContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    reminderItem: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    selectedDateText: {
        fontSize: 16,
        color: colors.darkPink,
    },
});
