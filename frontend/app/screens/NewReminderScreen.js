import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from "../config/colors";
import axios from 'axios';
import moment from 'moment';
import { Context } from "../components/GlobalContext";

export default function NewReminderScreen(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [note, setNote] = useState("");


    const showDatePicker = () => {
        setDatePickerVisible(true);
    };


    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };


    const showTimePicker = () => {
        setTimePickerVisible(true);
    };


    const hideTimePicker = () => {
        setTimePickerVisible(false);
    };


    const handleDateConfirm = (date) => {
        if (date) {
            setSelectedDate(date);
        }
        hideDatePicker();
    };


    const handleTimeConfirm = (time) => {
        if (time) {
            setSelectedTime(time);
        }
        hideTimePicker();
    };


    const handleSaveReminder = () => {
        if (!selectedDate || !selectedTime || !note) {
            Alert.alert('Error', 'Please select date, time, and enter a reminder note.');
            return;
        }


        // Prepare data object to send to backend
        const reminderData = {
            date: selectedDate,
            time: selectedTime,
            note: note,
        };


        // Replace with your backend API endpoint
        const backendUrl = 'http://192.168.1.248';
        const apiUrl = `${backendUrl}/api/reminders/saveReminder/`;


        // Example using axios to send POST request
        axios.post(apiUrl, reminderData)
            .then(response => {
                console.log('Reminder saved successfully:', response.data);
                Alert.alert('Success', 'Reminder saved successfully.');
                // Clear inputs after successful save if needed
                setSelectedDate(null);
                setSelectedTime(null);
                setNote("");
            })
            .catch(error => {
                console.error('Error saving reminder:', error);
                Alert.alert('Error', 'Failed to save reminder. Please try again later.');
            });
    };


    const handleDatePress = () => {
        // Show the date picker when the date area is pressed
        setDatePickerVisible(true);
    };


    const handleTimePress = () => {
        // Show the time picker when the time area is pressed
        setTimePickerVisible(true);
    };

    const globalContext = useContext(Context);
    const { userObj, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Date</Text>
            <TouchableOpacity style={styles.dateBox} onPress={handleDatePress}>
                {selectedDate ? (
                    <Text style={styles.dateText}>{moment(selectedDate).format("MMMM D, YYYY")}</Text>
                ) : (
                    <Text style={styles.selectDateButtonText}>Select a date</Text>
                )}
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate || new Date()}
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />


            <Text style={styles.text}>Time</Text>
            <TouchableOpacity style={styles.dateBox} onPress={handleTimePress}>
                {selectedTime ? (
                    <Text style={styles.dateText}>{moment(selectedTime).format("HH:mm")}</Text>
                ) : (
                    <Text style={styles.selectDateButtonText}>Select a time</Text>
                )}
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                date={selectedTime || new Date()}
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />




            <Text style={styles.text}>Reminder</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.date}
                    placeholder="Type here"
                    value={note}
                    onChangeText={setNote}
                    secureTextEntry="false"
                    autoCapitalize='none'
                    maxLength={50}
                ></TextInput>
            </View>
            <TouchableOpacity style={styles.savebutn}>
                <Text style={styles.savetext}>Add Reminder</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


const createStyles = (themeColors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'left',
        backgroundColor: themeColors.background,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    text: {
        fontFamily: "System",
        fontSize: 15,
        color: themeColors.headertext,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    date: {
        fontFamily: "System",
        fontSize: 15,
        color: 'black',
    },
    dateBox: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'left',
        width: '100%',
    },
    dateText: {
        color: 'black',
        fontSize: 15,
    },
    selectDateButtonText: {
        color: '#ccc',
        fontSize: 15,
    },
    textbox: {
        alignContent: "center",
        justifyContent: "flex-start",
        alignItems: "left",
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 350,
        height: 100,
        borderRadius: 4,
        backgroundColor: 'white',
        marginBottom: 20
    },
    savebutn: {
        width: 100,
        height: 30,
        backgroundColor: themeColors.buttons,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        width: '40%', // Adjust width as needed
        height: 30,
        left: 210,
    },
    savetext: {
        color: themeColors.whitetext,
    }
});
