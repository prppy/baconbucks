import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard} from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";


export default function HomeScreen(props) {
    const navigation = useNavigation();

    const [ isVisible, setIsVisible ] = useState(false)

    const toggleModal = () =>{
        setIsVisible(!isVisible);
    }

    const handleNewTransaction = () => {
        navigation.navigate("Add New Transaction");
        setIsVisible(false)
    }

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
            <SafeAreaView style={styles.background}>
                <Text style={styles.headertext}>Home</Text>
                
                <View style={styles.section}>
                    <Text style={styles.sectionheader}>Wallets</Text>
                    <TouchableOpacity style={styles.addwallet} onPress={toggleModal}>
                        <Ionicons name="add-circle" size={25} color={themeColors.buttons} />
                    </TouchableOpacity> 
                    <View style={styles.separator} />
                    <Text style={styles.walletname}>Wallet 1</Text>
                
                    <Modal 
                        isVisible={isVisible} 
                        onBackdropPress={toggleModal}
                        backdropColor={themeColors.backdrop}
                        backdropOpacity={0.3}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>New Wallet</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Type here"
                                // value={wallet}
                                // onChangeText={setnewwallet}
                                secureTextEntry="false"
                                autoCapitalize='none'
                                maxLength={50}
                            />
                            <TouchableOpacity style={styles.savebtn}>
                                <Text style={styles.btntext}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionheader}>Transactions</Text>
                    <TouchableOpacity style={styles.addwallet} onPress={handleNewTransaction}>
                        <Ionicons name="add-circle" size={25} color={themeColors.buttons} />
                    </TouchableOpacity> 
                    <View style={styles.separator} />
                    <Text style={styles.walletname}>Expense XXX</Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        
    );
}

const createStyles = (themeColors) => StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: themeColors.background,
        justifyContent: "flex-start",  
        alignItems: "center", 
        padding: 20,
    },
    headertext: {
        fontSize: 20,
        position: 'absolute',
        top: 70,
        left: 30,
        fontWeight: 'bold',
        color: themeColors.headertext,
    },
    modalContent: {
        width: 300, 
        height: 170,
        borderRadius: 10,
        backgroundColor: '#F4D5E1',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    modalHeader: {
        fontSize: 18,
        marginRight: 'auto',
    },
    modaltext: {
        fontSize: 15,
        padding: 10,
    },
    savebtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#df4b75',
        borderRadius: 5,
        marginTop: 20,
    },
    btntext: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        width: '100%',
        marginTop: 10,
        padding: 10,
    },
    section: {
        width: '90%',
        backgroundColor: themeColors.row,
        height: 100,
        borderRadius: 10,
        top: 60,
        padding: 10,
        marginBottom: 20,
    },
    sectionheader: {
        fontSize: 18,
        padding: 10,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
    },
    walletname: {
        fontSize: 14,
        padding: 10,
    },
    addwallet: {
        position: 'absolute',
        left: 310,
        top: 15,
    }

})
