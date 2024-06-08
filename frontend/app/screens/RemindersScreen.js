import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
<<<<<<< Updated upstream
import { navigationRef } from "../../App";

=======
import Ionicons from 'react-native-vector-icons/Ionicons';
>>>>>>> Stashed changes
import colors from "../config/colors";

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    console.log(navigation);
    const screenWidth = Dimensions.get('window').width
<<<<<<< Updated upstream
    const newReminder = () => {
        console.log('Navigating to New Reminder');
        navigationRef.navigate("RemindersStack", { screen: "New Reminder" });
    }
=======
    const handleNewReminder = (day) => {
      navigation.navigate("New Reminder");
    };
>>>>>>> Stashed changes

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
                />
            </View>
<<<<<<< Updated upstream
            <View style={styles.newbutton}>
                <TouchableOpacity
                    onPress={newReminder}>
                    <View style={styles.newreminder}>
                        <Text>Add Reminder</Text>
                        <View style= {styles.box}></View>
                    </View>
                </TouchableOpacity>
=======
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNewReminder}>
                <Ionicons name="add-circle" size={35} color={colors.darkPink} />
            </TouchableOpacity>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    newbutton: {
        height: 200,
        width: Dimensions.get('window').width,
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 1,
    },
    newreminder: {
      width: 150, 
      heigth: 200,
    },
    box: {
      width: 25,
      height: 25, 
      backgroundColor: colors.darkPink,
      borderRadius: 10,
    },
});
=======
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
});
>>>>>>> Stashed changes
