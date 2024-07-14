import React, { useState, useContext} from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Button, FlatList, KeyboardAvoidingView, Keyboard} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";
import Modal from 'react-native-modal';
import { Context } from "../components/GlobalContext";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function NewTransactionScreen(props) {
    const [number, setNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        if (date) {
            setSelectedDate(date);
        }
        hideDatePicker();
    };

    const handleDatePress = () => {
        // Show the date picker when the date area is pressed
        setDatePickerVisible(true);
    };

    const handleInputChange = (text) => {
        // Regular expression to allow numbers with up to 2 decimal places
        const regex = /^\d*\.?\d{0,2}$/;
    
        // Validate the input
        if (regex.test(text)) {
            setNumber(text);
        }
    };
    

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    const selectOption = (option) => {
        setSelectedOption(option);
        toggleModal();
    };

    const renderOption = ({ item }) => (
        <TouchableOpacity style={styles.option} onPress={() => selectOption(item)}>
          <Ionicons name={item.icon} size={20} color="#000" />
          <Text style={styles.optionLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    const options = [
        { id: '1', label: 'Salary', icon: 'logo-usd' },
        { id: '2', label: 'Transport', icon: 'car-outline' },
        { id: '3', label: 'Groceries', icon:'cart-outline' },
        { id: '4', label: 'Food', icon: 'restaurant-outline' },
        { id: '5', label: 'Entertainment', icon: 'film-outline' },
        { id: '6', label: 'Rent', icon: 'home-outline' },
        { id: '7', label: 'Top Up', icon: 'wallet-outline' },
    ];

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const globalContext = useContext(Context);
    const { userObj, isLightTheme, isLargeFont, defaultFontSizes, getLargerFontSizes } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.text}>Date</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={handleDatePress}>
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

                <Text style={styles.text}>Amount</Text>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputtext}
                    value={number}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                    placeholder="Enter number"
                />
                </View>
                
                

                <Text style={styles.text}>Category</Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputBox} onPress={toggleModal}>
                    {selectedOption ? (
                    <View style={styles.selectedOption}>
                        <Ionicons name={selectedOption.icon} size={24} color="#000" />
                        <Text style={styles.selectedOptionLabel}>{selectedOption.label}</Text>
                    </View>
                    ) : (
                    <Text style={styles.placeholdertext}>Select an option</Text>
                    )}
                    </TouchableOpacity>

                    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                        <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            renderItem={renderOption}
                            keyExtractor={(item) => item.id}
                        />
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity style={styles.savebutn}>
                    <Text style={styles.savetext}>Add Transaction</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'left',
        backgroundColor: themeColors.background,
        paddingHorizontal: 20,
        paddingVertical: 15,
    }, 
    inputContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'left',
    },
    text: {
        fontSize: fontSizes.fourteen,
        marginBottom: 5,
        color: themeColors.headertext,
    },
    inputtext: {
        fontSize: fontSizes.fifteen,
        marginLeft: 10,
    },
    placeholdertext: {
       paddingHorizontal: 10,
       borderRadius: 5,
       fontSize: fontSizes.fifteen,
       color: '#ccc', 
    },
    selectedOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    selectedOptionLabel: {
        marginLeft: 10,
        fontSize: fontSizes.fifteen,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionLabel: {
        marginLeft: 10,
        fontSize: fontSizes.sixteen,
    },
    savebutn: {
        width: 100,
        height: 40,
        backgroundColor: themeColors.buttons,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        width: '40%', // Adjust width as needed
        height: 30,
        left: 210,
        marginTop: 15,
    },
    savetext: {
        color: themeColors.whitetext,
        fontSize: fontSizes.fourteen,
    },
    dateText: {
        color: 'black',
        fontSize: fontSizes.fifteen,
        marginLeft: 10,
    },
    selectDateButtonText: {
        color: '#ccc',
        fontSize: fontSizes.fifteen,
        paddingHorizontal: 10,
    },
});