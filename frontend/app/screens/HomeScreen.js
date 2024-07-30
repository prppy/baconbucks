import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";


export default function HomeScreen(props) {
    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const handleNewTransaction = () => {
        navigation.navigate("Add New Transaction");
        setIsVisible(false);
    }

    const globalContext = useContext(Context);
    const { userObj, domain, fetchData, isLightTheme, isLargeFont, defaultFontSizes, getLargerFontSizes } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);
    const [walletName, setWalletName] = useState("");

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
                    <View style={styles.headersection}>
                        <Text style={styles.sectionheader}>Wallet 1</Text>
                        <TouchableOpacity style={styles.viewwallet}>
                            <Ionicons name="folder-open-outline" size={20} color={themeColors.row} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addtransaction} onPress={handleNewTransaction}>
                            <Ionicons name="add" size={20} color={themeColors.row} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.transactionssection}>
                        <Text style={styles.walletname}>Transaction 1</Text>
                        <View style={styles.separator} />
                        <Text style={styles.walletname}>Transaction 2</Text>
                        <View style={styles.separator} />
                        <Text style={styles.walletname}>Transaction 3</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.addwallet} onPress={toggleModal}>
                    <Ionicons name="add-circle" size={35} color={themeColors.buttons} />
                </TouchableOpacity>
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
                            value={walletName}
                            onChangeText={setWalletName}
                            secureTextEntry={false}
                            autoCapitalize='none'
                            maxLength={50}
                        />
                        <TouchableOpacity style={styles.savebtn} onPress={handleNewWallet}>
                            <Text style={styles.btntext}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: themeColors.background,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    headertext: {
        fontSize: fontSizes.twenty,
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
        fontSize: fontSizes.eighteen,
        marginRight: 'auto',
    },
    modaltext: {
        fontSize: fontSizes.fifteen,
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
        fontSize: fontSizes.sixteen,
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
        height: 200,
        top: 60,
        padding: 10,
        marginBottom: 20,
    },
    headersection: {
        backgroundColor: themeColors.buttons,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    transactionssection: {
        backgroundColor: themeColors.row,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    sectionheader: {
        fontSize: fontSizes.eighteen,
        padding: 10,
        color: themeColors.row,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
    },
    walletname: {
        fontSize: fontSizes.fourteen,
        padding: 10,
        color: themeColors.headertext,
    },
    addtransaction: {
        position: 'absolute',
        left: 300,
        top: 10,
    },
    addwallet: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    viewwallet: {
        position: 'absolute',
        left: 270,
        top: 10,
    }
});
