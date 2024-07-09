import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ScrollView} from "react-native";
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

    const handleNewWallet = () => {
        navigation.navigate("Add New Wallet");
        setIsVisible(false);
    }

    const globalContext = useContext(Context);
    const { userObj, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Home</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggleModal}>
                    <Ionicons name="add-circle" size={50} color={themeColors.buttons} />
                </TouchableOpacity>
                <Modal 
                    isVisible={isVisible} 
                    onBackdropPress={toggleModal}
                    backdropColor={themeColors.backdrop}
                    backdropOpacity={0.3}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleNewWallet} style={{paddingBottom: 20}}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>Add Wallet</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNewTransaction} >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>Add Transaction</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (themeColors) => StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: themeColors.background,
        justifyContent: "flex-start",  
        alignItems: "center", 
    },
    headertext: {
        fontSize: 20,
        position: 'absolute',
        top: 70,
        left: 30,
        fontWeight: 'bold',
        color: themeColors.headertext,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 150, 
        height: 40,
        borderRadius: 5,
        backgroundColor: '#F4D5E1',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: 100, 
        top: 190,
    },
    modaltext: {
        marginLeft: 10,
        fontSize: 15,
    }
})
