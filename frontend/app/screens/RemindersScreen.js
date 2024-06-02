import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';

import colors from "../config/colors";

export default function RemindersScreen(props) {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width
    const [selectedDate, setSelectedDate] = useState(null);
    const [notesData, setNotesData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [noteInput, setNoteInput] = useState('');
    const handleDayPress = (day) => {
      setSelectedDate(day.dateString);
      setModalVisible(true);
    };

    const handleSaveNote = () => {
        // Save the note input to the notesData object
        setNotesData(prevNotesData => ({
          ...prevNotesData,
          [selectedDate]: { note: noteInput }
        }));
        setModalVisible(false);
    };

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
                onDayPress={handleDayPress}
                markedDates={notesData}
                />
                <Modal visible={modalVisible}>
                  <View>
                    <Text>Note for {selectedDate}:</Text>
                    <TextInput
                      multiline
                      placeholder="Type your note here"
                      value={noteInput}
                    onChangeText={text => setNoteInput(text)}
                    />
                    <Button title="Save Note" onPress={handleSaveNote} />
                  </View>
                </Modal>
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
});