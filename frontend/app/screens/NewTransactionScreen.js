import React, { useState} from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Button, FlatList, KeyboardAvoidingView, Keyboard } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";
import Modal from 'react-native-modal';

export default function NewTransactionScreen(props) {
    const [number, setNumber] = useState('');
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

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

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.text}>Amount</Text>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputtext}
                    value={number}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                    placeholder="Enter number"
                    placeholdertext={styles.placeholdertext}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'left',
        backgroundColor: colors.lightPink,
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
        fontSize: 18,
        marginBottom: 10,
    },
    inputtext: {
        fontSize: 15,
        marginLeft: 10,
    },
    placeholdertext: {
       paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 15,
        color: '#ccc', 
    },
    selectedOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    selectedOptionLabel: {
        marginLeft: 10,
        fontSize: 15,
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
        fontSize: 16,
    },
    savebutn: {
        width: 100,
        height: 30,
        backgroundColor: colors.darkPink,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        width: '40%', // Adjust width as needed
        height: 30,
        left: 210,
        marginTop: 15,
    },
    savetext: {
        color: 'white',
        fontSize: 15,
    }
});