import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Button, FlatList, KeyboardAvoidingView, Keyboard, Alert } from "react-native";

import colors from "../config/colors";
import { Context } from '../components/GlobalContext';

export default function NewWalletScreen(props) {

    const globalContext = useContext(Context);
    const { userObj, domain, fetchData, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    const [ walletName, setWalletName ] = useState("");

    const handleNewWallet = () => {

        console.log(walletName);

        if (walletName === "") {
            Alert.alert('Error', 'Please input a name.');
        }

        let body = JSON.stringify({
                "name": walletName
        });
        console.log('Fetch Body:', body);

        console.log('Fetch URL:', `${domain}/api/v1.0/user/create-wallet/`);

        fetchData('api/v1.0/user/create-wallet/', 'POST', body)
        .then(response => {
            console.log('Fetch Response Status:', response.status);
            return response.json();
        })
        .then(json => {
            console.log('Fetch Response JSON:', json);
        })
        .catch(error => {
            console.error('Error during create-wallet:', error);
            Alert.alert('Error', 'Failed to create wallet. Please try again.');
        });
    }    

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView>
                        <Text style={styles.text}>New Wallet Name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputtext}
                                placeholder="Type here"
                                value={walletName}
                                onChangeText={setWalletName}
                                autoCapitalize='none'
                            />
                        </View>
                        <TouchableOpacity style={styles.savebutn} onPress={handleNewWallet}>
                            <Text style={styles.savetext}>Add Wallet</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
        </TouchableWithoutFeedback>
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
    inputContainer: {
        width: 350,
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
        color: themeColors.headertext,
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
        fontSize: 15,
    }
});