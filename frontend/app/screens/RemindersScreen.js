import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import { navigationRef } from "../../App";

import colors from "../config/colors";

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    console.log(navigation);
    const screenWidth = Dimensions.get('window').width
    const newReminder = () => {
        console.log('Navigating to New Reminder');
        navigationRef.navigate("RemindersStack", { screen: "New Reminder" });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar 
                style={{ width: screenWidth }} 
                theme={{
                    calendarBackground: colors.lightPinkPink, // Change the background color of the calendar
                    selectedDayBackgroundColor: 'white', // Change the background color of the selected day
                    todayTextColor: colors.darkPink, // Change the text color of today's date
                    arrowColor: colors.darkPink, // Change the color of the arrows for navigating months
                }}
                />
            </View>
            <View style={styles.newbutton}>
                <TouchableOpacity
                    onPress={newReminder}>
                    <View style={styles.newreminder}>
                        <Text>Add Reminder</Text>
                        <View style= {styles.box}></View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    calendarContainer: {
        flex: 1,
        marginTop: 20,
    },
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