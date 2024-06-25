import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    console.log(navigation);
    const screenWidth = Dimensions.get('window').width
    const handleNewReminder = (day) => {
      navigation.navigate("NewReminder");
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
                />
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
});
