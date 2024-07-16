import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";
import axios from 'axios';
import { Context } from "../components/GlobalContext";

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    console.log(navigation);
    const screenWidth = Dimensions.get('window').width
    const handleNewReminder = (day) => {
      navigation.navigate("NewReminder");
    };

    const globalContext = useContext(Context);
    const { userObj, isLightTheme, isLargeFont, defaultFontSizes, getLargerFontSizes } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);


    const [selectedDate, setSelectedDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({}); // State to mark selected date on calendar


    // Function to handle selection of a date on the calendar
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setMarkedDates({ [day.dateString]: { selected: true, selectedColor: "#DF4B75" } }); // Mark selected date on calendar
    };


    const [reminders, setReminders] = useState([]);
   
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
            <Text style={styles.headertext}>Reminders</Text>
            <View style={styles.calendarContainer}>
                <Calendar
                style={{ width: 350 }}
                theme={{
                    calendarBackground: 'white', // Change the background color of the calendar
                    todayTextColor: "#DF4B75", // Change the text color of today's date
                    arrowColor: "#DF4B75", // Change the color of the arrows for navigating months
                }}
                onDayPress={handleDayPress} // Handle date selection
                markedDates={markedDates}
            />
            
            </View>
            {selectedDate && (
                    <Text style={styles.selectedDateText}>
                        Selected Date: {selectedDate}
                    </Text>
                )}
            <View style={styles.remindersContainer}>
                {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                        <View key={reminder.id} style={styles.reminderItem}>
                            <Text>{reminder.note}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.fetchedreminders}>No reminders for selected date</Text>
                )}
            </View>
           


            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNewReminder}>
                <Ionicons name="add-circle" size={35} color={themeColors.buttons} />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const createStyles = (themeColors, fontSizes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background,
        alignItems: 'flex-start',
    },
    calendarContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 70,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingLeft: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    newreminder: {
        width: 100,
        height: 35,
        backgroundColor: themeColors.buttons,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    icon: {
        backgroundColor: 'transparent', // Set background color to transparent
    },
    remindersContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: fontSizes.sixteen,
        marginBottom: 0,
        marginLeft: 20,
        color: themeColors.headertext,
    },
    headertext: {
        fontSize: fontSizes.twenty,
        position: 'absolute',
        top: 70,
        left: 30,
        fontWeight: 'bold',
        color: themeColors.headertext,
    },
    fetchedreminders: {
        marginBottom: 280,
        fontSize: fontSizes.fourteen,
        color: themeColors.headertext,
        paddingLeft: 20,
    }
});
